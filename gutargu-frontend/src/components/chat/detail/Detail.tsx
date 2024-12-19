import './Detail.css'
import { toast } from 'react-toastify';
import useAuthStore from '../../../stores/UserStore';
import useChatStore from '../../../stores/ChatStore';
import apiService from '../../../services/ApiService';
import StorageService from '../../../services/StorageService';

const Detail = () => {

  const { isBlocked, chatUser } = useChatStore();
  const { currentUser, clearUser } = useAuthStore();
  
  const handleLogout = () => {
    clearUser();
    StorageService.clearStorage();
    toast.success("Logged out successfully.");
  }
  
  const getBlockButtonText = () => {
    if (chatUser?.isContactBlocked)
      return "Unblock User"
    else
      return "Block User"
  };

  const isContactBlocked = chatUser?.isContactBlocked;

  const handleBlockUnblock = async () => {
    const updateBlockStatus = {
      blockedUserId: chatUser?.userId,
      blockingUserId: currentUser?.id,
      blockingUserEmail: currentUser?.email,
      shouldBlock: !isContactBlocked
    };

    const { status } = await apiService.put('users/contacts/block', updateBlockStatus);

    if (status === 'success') {
      if (isContactBlocked) {
        toast.success("Contact has been unblocked.")
      } else {
        toast.info("Contact has been blocked.")
      }
    }
  };

  return (
    <div className="detail">
        <div className="user">
          <img src={ !isBlocked() && chatUser?.profileImageUrl || "./avatar.png" } alt="" />
          <h2>{chatUser?.userName}</h2>
          <p>This is my status</p>
        </div>

        <div className="info">
          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Privacy & Help</span>
              <img src="./arrowUp.png" alt="" />
            </div>  
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Photos</span>
              <img src="./arrowDown.png" alt="" />
            </div>
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg" alt="" />
                  <span>My photo</span>
                </div>
                <img src="./download.png" className='icon' alt="" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg" alt="" />
                  <span>My photo</span>
                </div>
                <img src="./download.png" className='icon' alt="" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg" alt="" />
                  <span>My photo</span>
                </div>
                <img src="./download.png" className='icon' alt="" />
              </div>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <img src="./arrowUp.png" alt="" />
            </div>  
          </div>
          <button onClick={handleBlockUnblock}>{getBlockButtonText()}</button>
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Detail;