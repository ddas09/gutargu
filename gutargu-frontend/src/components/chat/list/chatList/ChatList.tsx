import './ChatList.css'
import AddUser from './addUser/AddUser';
import { useEffect, useState } from 'react';
import useAuthStore from '../../../../stores/AuthStore';
import apiService from '../../../../services/ApiService';
import { UserContactInformation, UserContactsResponseModel } from '../../../../models/UserContactsResponse';

const ChatList = () => {

  const { currentUser } = useAuthStore();

  const [contacts, setContacts] = useState([] as UserContactInformation[]);

  const [addMode, toggleAddMode] = useState(false)

  const changeAddMode = () => {
    toggleAddMode((prev) => !prev);
  }

  useEffect(() => {
    getUserContacts();
  }, [currentUser?.id]);

  const getUserContacts = async () => {
    const queryParams = { 
      'userId': currentUser?.id,
    };

    const { data, status } = await apiService.get<UserContactsResponseModel>('users/contacts', queryParams);

    if (status === 'success') {
      setContacts(data?.contacts as UserContactInformation[]);
    }
  };

  return (
    <div className="chatList">
        <div className="search">
          <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='Search' />
          </div>

          <img src={addMode ? "./minus.png" : "./plus.png"} onClick={changeAddMode} alt="" className='add' />
        </div>
        {
          contacts.map((contact) => (
            <div className="item" key={contact.userId}>
              <img src={ contact.profileImageUrl || "./avatar.png"} alt="" />
              <div className="texts">
                <span>{contact.userName}</span>
                <p>hello</p>
              </div>
            </div>
          ))
        }
        {addMode && <AddUser toggleAddMode={changeAddMode}/>}
    </div>
  )
};

export default ChatList;