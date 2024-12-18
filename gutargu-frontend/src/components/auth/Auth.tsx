import './Auth.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../stores/AuthStore';
import apiService from '../../services/ApiService';
import { UserInformation, UserResponseModel } from '../../models/UserResponse';

const Auth = () => {
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [avatar, setAvatar] = useState({ file: null as Blob | null, url: '' });

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!email || !password) {
      toast.error('Please fill in all the fields.');
      setLoading(false);
      return;
    }

    try {
      const { data, status, message } = await apiService.post<UserResponseModel>('accounts/signin', formData);

      if (status === 'success') {
        toast.success(message);
        login(data?.userInfo as UserInformation);
      }
    } finally {
      setLoading(false);
    }
  };

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

    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    if (!name || !email || !password || !confirmPassword) {
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
      const customHeaders = { 'Content-Type': 'multipart/form-data' };
      const { status, message } = await apiService.post('accounts/signup', formData, customHeaders);

      if (status === 'success') {
        toast.success(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-component">
      <div className="forms">
        {activeTab === 'login' && (
          <div className="login-form">
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Email" name="email" />
              <input type="password" placeholder="Password" name="password" />
              <button disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>
            <p className="toggle-link">
              Don't have an account?{' '}
              <span onClick={() => handleTabChange('register')}>Register here</span>
            </p>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="register-form">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="file">
                <img src={avatar.url || './avatar.png'} alt="Avatar Preview" />
                Upload an image
              </label>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={handleAvatar}
              />
              <input type="text" placeholder="Full Name" name="name" />
              <input type="text" placeholder="Email" name="email" />
              <input type="password" placeholder="Password" name="password" />
              <input type="password" placeholder="Confirm your password" name="confirmPassword" />
              <button disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
            </form>
            <p className="toggle-link">
              Already have an account?{' '}
              <span onClick={() => handleTabChange('login')}>Login here</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
