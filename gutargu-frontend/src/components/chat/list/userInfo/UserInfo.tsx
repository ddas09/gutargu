import './UserInfo.css'
import useAuthStore from '../../../../stores/UserStore';

const UserInfo = () => {
  
  const { currentUser } = useAuthStore();

  return (
    <div className="userInfo">
        <div className="user">
            <img src={ currentUser?.profileImageUrl || "./avatar.png"} alt="" />
            <h2>{ currentUser?.name }</h2>
        </div>
        <div className="icons">
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
};

export default UserInfo;