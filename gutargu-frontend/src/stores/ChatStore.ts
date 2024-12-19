import { create } from 'zustand';
import { UserContactInformation } from '../models/UserContactsResponse';

interface ChatState {
  chatUser: UserContactInformation | null;
  
  setChatUser: (chatUser: UserContactInformation) => void;

  isBlocked: () => boolean;
}

const useChatStore = create<ChatState>((set, get) => ({
  chatUser: null,

  setChatUser: (chatUser) => set({ chatUser }),

  isBlocked: () => {
    const chatUser = get().chatUser;
    return chatUser?.hasBlockedCurrentUser || chatUser?.isContactBlocked || false;
  }
}));

export default useChatStore;
