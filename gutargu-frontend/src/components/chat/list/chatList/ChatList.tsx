import { useState } from 'react';
import './ChatList.css'
import AddUser from './addUser/AddUser';

const ChatList = () => {

  const [addMode, toggleAddMode] = useState(false)

  const changeAddMode = () => {
    toggleAddMode((prev) => !prev);
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

        {addMode && <AddUser toggleAddMode={changeAddMode}/>}
    </div>
  )
};

export default ChatList;