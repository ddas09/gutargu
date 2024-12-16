import ChatList from './chatList/ChatList';
import './List.css'
import UserInfo from './userInfo/UserInfo';

const List = () => {

  return (
    <div className="list">
        <UserInfo />
        <ChatList></ChatList>
    </div>
  )
};

export default List;