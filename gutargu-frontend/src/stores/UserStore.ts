import { create } from 'zustand';
import { UserInformation } from '../models/UserResponse';

interface UserState {
  currentUser: UserInformation | null;

  setUser: (currentUser: UserInformation) => void;

  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  currentUser: null,

  setUser: (currentUser) => set({ currentUser }),
  
  clearUser: () => set({ currentUser: null }),
}));

export default useUserStore;
