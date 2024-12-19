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
    </div>
  )
};

export default UserInfo;