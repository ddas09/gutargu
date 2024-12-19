import './App.css';
import { useEffect } from 'react';
import Auth from './components/auth/Auth';
import Chat from './components/chat/Chat';
import useAuthStore from './stores/UserStore';
import Notification from './components/notification/Notification';
import StorageService from './services/StorageService';
import { UserInformation } from './models/UserResponse';

const App = () => {

  const { currentUser, setUser } = useAuthStore();

  useEffect(() => {
    const user = StorageService.getValue<UserInformation>('currentUser');
    if (user != null) {
      setUser(user);
    }
  }, [setUser]);

  return (
    <div className="container">
      {
        currentUser == null ? <Auth /> : <Chat />
      }
      
      <Notification />
    </div>
  );
};

export default App;