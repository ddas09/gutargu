import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Register from './components/Register/Register';
import Notification from './components/notification/Notification';

const App = () => {
  const user = true;

  return (
    <Router>
      <div className="container">
          {user ? (
            <>
              <List></List>
              <Chat></Chat>
              <Detail></Detail>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        <Notification />
      </div>
    </Router>
  );
};

export default App;
