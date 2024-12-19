import './ChatArea.css'
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../../stores/UserStore';
import useChatStore from '../../../stores/ChatStore';
import apiService from '../../../services/ApiService';
import { ChatInformation, ChatResponseModel } from '../../../models/ChatResponse';

const ChatArea = () => {

  const { chatUser } = useChatStore();
  const { currentUser } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  
  const [chats, setChats] = useState([] as ChatInformation[]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [endRef]);

  useEffect(() => {
    getChats();
  }, [chatUser?.id, currentUser?.id])

  const getChats = async () => {
    if (!currentUser || !chatUser) return;

    const queryParams = { 
      'senderId': currentUser?.id,
      'recieverId': chatUser?.id,
    };

    const { data, status } = await apiService.get<ChatResponseModel>('chats', queryParams);

    if (status === 'success') {
      setChats(data?.chats as ChatInformation[]);
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
          <img src={ chatUser?.profileImageUrl || "./avatar.png" } alt="" />
          <div className="texts">
            <span>{chatUser?.name}</span>
            <p>This is a sample chat</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {
          chats.length === 0 ? (
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
        
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>

        <input type="text" value={text} placeholder='Type a message...' onChange={e => handleMessageChange(e?.target.value)} />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={openEmojiPicker} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}></EmojiPicker>
          </div>
        </div>
        
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
};

export default ChatArea;