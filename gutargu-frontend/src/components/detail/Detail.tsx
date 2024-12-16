import './Detail.css'

const Detail = () => {

  return (
    <div className="detail">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <h2>Dip Das</h2>
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
          <button className='logout'>Logout</button>
        </div>
    </div>
  );
};

export default Detail;