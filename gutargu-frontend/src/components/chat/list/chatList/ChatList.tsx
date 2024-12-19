import './ChatList.css'
import AddUser from './addUser/AddUser';
import { useEffect, useState } from 'react';
import useChatStore from '../../../../stores/ChatStore';
import useAuthStore from '../../../../stores/UserStore';
import apiService from '../../../../services/ApiService';
import { UserContactInformation, UserContactsResponseModel } from '../../../../models/UserContactsResponse';

const ChatList = () => {

  const { chatUser, setChatUser } = useChatStore();
  const { currentUser } = useAuthStore();

  const [contacts, setContacts] = useState([] as UserContactInformation[]);

  const [addMode, toggleAddMode] = useState(false)

  const [filterText, setFilterText] = useState("")

  const changeAddMode = () => {
    toggleAddMode((prev) => !prev);
  }

  useEffect(() => {
    getUserContacts();
  }, [currentUser?.id, chatUser?.userId]);

  const getUserContacts = async () => {
    const queryParams = { 
      'userId': currentUser?.id,
    };

    const { data, status } = await apiService.get<UserContactsResponseModel>('users/contacts', queryParams);

    if (status === 'success') {
      setContacts(data?.contacts as UserContactInformation[]);
    }
  };

  const handleContactClick = async (contact: UserContactInformation) => {
    setChatUser(contact);
    await setLastChatSeenStatus(contact);
  }

  const setLastChatSeenStatus = async (contact: UserContactInformation) => {
    if (!contact.isLastChatSentByContact || contact.lastChatId == null || contact.isLastChatRead) return;

    const updateChatRequest = {
      chatId: contact.lastChatId,
      recieverEmail: currentUser?.email
    };

    const { status } = await apiService.put('chats', updateChatRequest);
    if (status === 'success') {
      contact.isLastChatRead = true;
    }
  }

  const filteredContacts = contacts.filter(
    c => c.userName.toLocaleLowerCase().includes(filterText) 
    || c.userEmail.toLocaleLowerCase().includes(filterText)
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}/>
        </div>

        <img src={addMode ? "./minus.png" : "./plus.png"} onClick={changeAddMode} alt="" className='add' />
      </div>
      {
        filteredContacts.map((contact) => (
          <div 
            className="item" 
            key={contact.userId} 
            onClick={() => handleContactClick(contact)}
            style={{
              backgroundColor: contact.isLastChatSentByContact && !contact.isLastChatRead ? "#5183fe" : "transparent"
            }}
          >
            <img src={ !contact.isContactBlocked && !contact.hasBlockedCurrentUser && contact.profileImageUrl || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{contact.userName}</span>
              <p>
                { !contact.isContactBlocked && !contact.hasBlockedCurrentUser ? contact.lastChatMessage
                    : contact?.isContactBlocked 
                      ? "You have blocked this contact."
                        : "This user has blocked you."
                }
              </p>
            </div>
          </div>
        ))
      }
      {addMode && <AddUser toggleAddMode={changeAddMode}/>}
    </div>
  )
};

export default ChatList;