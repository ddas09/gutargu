import './Detail.css'
import { toast } from 'react-toastify';
import useAuthStore from '../../../stores/UserStore';
import useChatStore from '../../../stores/ChatStore';
import apiService from '../../../services/ApiService';
import StorageService from '../../../services/StorageService';
import { useState } from 'react';

const Detail = () => {

  const { isBlocked, chatUser, sharedPhotos, clearChatStore  } = useChatStore();

  const { currentUser, clearUser } = useAuthStore();

  const [isSharePhotoSectionOpen, setIsSharePhotoSectionOpen] = useState(false);

  const toggleSharePhotoSection = () => {
    setIsSharePhotoSectionOpen((prevState) => !prevState);
  };


  const handleLogout = () => {
    clearUser();
    clearChatStore();
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
            <div className="title" onClick={toggleSharePhotoSection}>
              <span>Shared Photos</span>
                <img 
                  src={isSharePhotoSectionOpen ? "./arrowUp.png" : "./arrowDown.png"} 
                  alt={isSharePhotoSectionOpen ? "Collapse" : "Expand"} 
                />
            </div>
            {isSharePhotoSectionOpen && (
              <div className="photos">
                {sharedPhotos.map((photoUrl, index) => (
                  <div className="photoItem" key={index}>
                    <div className="photoDetail">
                      <img src={photoUrl} alt="Shared Photo" />
                      <span>My photo</span>
                    </div>
                    <a href={photoUrl} download={`photo-${index + 1}.jpg`}>
                      <img src="./download.png" className="icon" alt="Download Icon" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleBlockUnblock}>{getBlockButtonText()}</button>
          <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Detail;