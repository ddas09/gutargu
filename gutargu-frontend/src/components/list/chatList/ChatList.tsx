import { useState } from 'react';
import './ChatList.css'

const ChatList = () => {

  const [addMode, setAddMode] = useState(false)

  const changeAddMode = () => {
    setAddMode((prev) => !prev);
  }

  return (
    <div className="chatList">
        <div className="search">
          <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='Search' />
          </div>

          <img src={addMode ? "./minus.png" : "./plus.png"} onClick={changeAddMode} alt="" className='add' />
        </div>

        <div className="item">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Dim</span>
            <p>hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Dim</span>
            <p>hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Dim</span>
            <p>hello</p>
          </div>
        </div>
    </div>
  )
};

export default ChatList;