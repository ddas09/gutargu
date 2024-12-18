import { create } from 'zustand';
import { UserInformation } from '../models/UserResponse';

interface AuthState {
  currentUser: UserInformation | null;

  login: (currentUser: UserInformation) => void;

  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  currentUser: null,

  login: (currentUser) => set({ currentUser }),
  
  logout: () => set({ currentUser: null }),
}));

export default useAuthStore;
