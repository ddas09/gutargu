import './AddUser.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../../../../stores/AuthStore';
import apiService from '../../../../../services/ApiService';
import { UserInformation, UserSearchResponseModel } from '../../../../../models/UserResponse';

interface AddUserProps {
  toggleAddMode: () => void;
}

const AddUser = (props: AddUserProps) => {
  const { toggleAddMode } = props;
  const { currentUser } = useAuthStore();

  const [users, setUsers] = useState([] as UserInformation[]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchText = formData.get('searchText')?.toString().trim() || '';

    if (!searchText) {
      toast.error('Please enter a name or email to search user(s).');
      return;
    }

    const queryParams = { 
      'userId': currentUser?.id,
      'searchKey': searchText 
    };

    const { data, status } = await apiService.get<UserSearchResponseModel>('users/search', queryParams);
      
    if (status === 'success') {
      setUsers(data?.users as UserInformation[]);
    }
  };

  const handleAdd = async (contactUser: UserInformation) => {
    const contactData = {
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      contactUserId: contactUser.id,
    };

    const { status } = await apiService.post('users/contacts', contactData);

    if (status === 'success') {
      toast.success("User added successfully");
      toggleAddMode();
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Type user email or name" name="searchText" />
        <button>Search</button>
      </form>
      {users.length > 0 ? (
        users.map((user) => (
          <div className="user" key={user.id}>
            <div className="detail">
              <img src={user.profileImageUrl || './avatar.png'} alt={`${user.name}'s avatar`} />
              <span>{user.name}</span>
            </div>
            <button onClick={() => handleAdd(user)}>Add User</button>
          </div>
        ))
      ) : (
        <p className='info'>Try entering a different name or email.</p>
      )}
    </div>
  );
};

export default AddUser;
