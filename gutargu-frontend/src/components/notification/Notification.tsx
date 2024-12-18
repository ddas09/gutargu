import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <div className="notification">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
};

export default Notification;
