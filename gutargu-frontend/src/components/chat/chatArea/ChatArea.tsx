import './ChatArea.css'
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../../stores/UserStore';
import useChatStore from '../../../stores/ChatStore';
import apiService from '../../../services/ApiService';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'; 
import { ChatInformation, ChatResponseModel } from '../../../models/ChatResponse';

const ChatArea = () => {

  const { isBlocked, chatUser, toggleDetail, setSharedPhotos } = useChatStore();
  const { currentUser } = useAuthStore();

  const [open, setOpen] = useState(false);

  const [text, setText] = useState("");
  const [image, setImage] = useState({ file: null as Blob | null, url: '' });

  const [chats, setChats] = useState([] as ChatInformation[]);
  
  const endRef = useRef<HTMLDivElement>(null);

  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [endRef]);

  useEffect(() => {
    getChats();
    setupSignalRConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [chatUser?.userId, currentUser?.id]);

  // This needs to be refactored in a seperate service
  // And we must ensure that connection is closed. i.e erro handling
  const setupSignalRConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5158/chatHub?userId=${currentUser?.id}`)
      .build();

    newConnection.start()
      .then(() => {
        console.log('SignalR connected');

        newConnection.on('RecieveChat', (chat: ChatInformation) => {
          addChatMessage(chat);
          console.log(chat);
        });
        
      })
      .catch(err => console.log('SignalR Connection Error: ', err));

    setConnection(newConnection);
  };

  const addChatMessage = (chat: ChatInformation) => {
    setChats(prevChats => [...prevChats, chat]);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const getChats = async () => {
    if (!currentUser || !chatUser) return;

    const queryParams = { 
      'senderId': currentUser?.id,
      'recieverId': chatUser?.userId,
    };

    const { data, status } = await apiService.get<ChatResponseModel>('chats', queryParams);

    if (status === 'success') {
      setChats(data?.chats as ChatInformation[]);

      const sharedPhotosUrl = data?.chats
        .filter((chat) => chat.imageUrl != undefined)
        .map((chat) => chat.imageUrl as string);

      setSharedPhotos(sharedPhotosUrl as string[]);
    }
  };

  const openEmojiPicker = () => {
    setOpen((prev) => !prev);
  };

  const handleEmoji = (e: { emoji: string; }) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleMessageChange = (msg: string) => {
    setText(msg);
  };

  const handleSend = async () => {
    if (!text || text === "") {
      toast.info("Please enter some message.");
      return;
    }

    const formData = new FormData();

    formData.append("senderId", currentUser?.id?.toString() || "");
    formData.append("receiverId", chatUser?.userId?.toString() || "");
    formData.append("message", text.trim() || "");
    formData.append("senderEmail", currentUser?.email || "");

    if (image.file) {
      formData.append("chatImage", image.file);
    }

    const customHeaders = { 'Content-Type': 'multipart/form-data' };
    const { status } = await apiService.post('chats', formData, customHeaders);

    if (status === 'success') {
      setImage({
        file: null,
        url: ""
      });

      setText("");
    }
  };

  const handleCancelImage = () => {
    setImage({ file: null, url: "" });
  };

  if (chatUser == null) {
    return (
      <div className="chat center">
        <div className="info">Select a chat to continue...</div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={ !isBlocked() && chatUser?.profileImageUrl || "./avatar.png" } alt="" />
          <div className="texts">
            <span>{chatUser?.userName}</span>
            <p>This is a sample chat</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" onClick={toggleDetail}/>
        </div>
      </div>

      <div className="center">
        {
          !isBlocked && chats.length === 0 ? (
            <div className="noMessages">
              <p>Type some messages to start the conversation...</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div className={`message ${chat.isSentByCurrentUser ? 'own' : ''}`} key={chat.sentAt}>
                <img src={chat.isSentByCurrentUser ? currentUser?.profileImageUrl : chatUser?.profileImageUrl || "./avatar.png"} alt="" />
                <div className="texts">
                  {chat.imageUrl && <img src={chat.imageUrl} alt="" />}
                  <p>{chat.message}</p>
                  <span>{chat.sentAt}</span>
                </div>
              </div>
            ))
          )
        }
        {
          image.url &&
          <div className='message own'>
            <div className="texts">
              <img src={image.url} alt="" />
              <button onClick={handleCancelImage} className="cancel-button">X</button>
            </div>
          </div>
        }
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        { isBlocked() ? (
          <p className='blocked-info'>
            {chatUser.hasBlockedCurrentUser
              ? "Can't send message. This user blocked you."
              : "Can't send messaage. You have blocked this user."}
          </p>
        ) : (
          <>
            <div className="icons">
              <label htmlFor="img">
                <img src="./img.png" alt="Upload" />
              </label>
              <input 
                type="file" 
                id="img" 
                style={{ display: "none" }} 
                onChange={handleImage} 
              />
              <img src="./camera.png" alt="Camera" />
              <img src="./mic.png" alt="Microphone" />
            </div>

            <input 
              type="text" 
              value={text} 
              placeholder="Type a message..." 
              onChange={(e) => handleMessageChange(e?.target.value)} 
            />

            <div className="emoji">
              <img 
                src="./emoji.png" 
                alt="Emoji" 
                onClick={openEmojiPicker} 
              />
              <div className="picker">
                <EmojiPicker open={open} onEmojiClick={handleEmoji} />
              </div>
            </div>

            <button 
              className="sendButton" 
              onClick={handleSend}>
              Send
            </button>
          </>
        )}
      </div>
    </div>
  )
};

export default ChatArea;