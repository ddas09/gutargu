import './App.css';
import Auth from './components/auth/Auth';
import Chat from './components/chat/Chat';
import Notification from './components/notification/Notification';
import useAuthStore from './stores/AuthStore';

const App = () => {

  const { currentUser } = useAuthStore();

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