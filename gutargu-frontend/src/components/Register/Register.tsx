import './Register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from '../../services/ApiService';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState({
    file: null as Blob | null,
    url: "",
  });

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (avatar.file) {
      formData.append('profileImage', avatar.file);
    }

    // Validation: Early exit if invalid data
    const lastName = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    if (!lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all the fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Entered passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const customHeaders = {
        'Content-Type': 'multipart/form-data',
      };

      const { status, message } = await apiService.post('accounts/signup', formData, customHeaders);

      if (status === 'success') {
        toast.success(message);
      } else {
        toast.error('Registration failed');
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Full Name" name="name" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input type="password" placeholder="Confirm your password" name="confirmPassword" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
