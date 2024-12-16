import './Chat.css'
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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

  return (
    <div className="chat">
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Batul</span>
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
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>This is a sample message by me</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>This is a sample message by me</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>This is a sample message by me</p>
              <span>1 min ago</span>
            </div>
          </div>
          <div className="message own">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <img src="https://cdn.pixabay.com/photo/2024/05/27/12/27/gargoyle-8791108_1280.jpg" alt="" />
              <p>This is a sample message by me long size</p>
              <span>1 min ago</span>
            </div>
          </div>
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

export default Chat;