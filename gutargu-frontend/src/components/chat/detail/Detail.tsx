import './Detail.css'
import { toast } from 'react-toastify';
import useAuthStore from '../../../stores/UserStore';
import useChatStore from '../../../stores/ChatStore';
import StorageService from '../../../services/StorageService';

const Detail = () => {

  const { chatUser } = useChatStore();
  const { clearUser } = useAuthStore();
  
  const handleLogout = () => {
    clearUser();
    StorageService.clearStorage();
    toast.success("Logged out successfully.");
  }

  return (
    <div className="detail">
        <div className="user">
          <img src={ chatUser?.profileImageUrl || "./avatar.png" } alt="" />
          <h2>{chatUser?.name}</h2>
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
          <button>Block User</button>
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Detail;