import { create } from 'zustand';
import { UserInformation } from '../models/UserResponse';

interface ChatState {
  chatUser: UserInformation | null;

  setChatUser: (chatUser: UserInformation) => void;
}

const useChatStore = create<ChatState>((set) => ({
    chatUser: null,

    setChatUser: (chatUser) => set({ chatUser })
}));

export default useChatStore;