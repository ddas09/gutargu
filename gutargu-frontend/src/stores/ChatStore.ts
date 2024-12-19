import { create } from 'zustand';
import { UserContactInformation } from '../models/UserContactsResponse';

interface ChatState {
  isDetailOpen: boolean;

  chatUser: UserContactInformation | null;

  sharedPhotos: string[];

  toggleDetail: () => void;
  
  setChatUser: (chatUser: UserContactInformation) => void;

  isBlocked: () => boolean;

  setSharedPhotos: (photos: string[]) => void;

  clearChatStore: () => void; 
}

const useChatStore = create<ChatState>((set, get) => ({
  isDetailOpen: false,

  chatUser: null,

  sharedPhotos: [],

  toggleDetail: () => set((state) => ({ isDetailOpen: !state.isDetailOpen })),

  setChatUser: (chatUser) => set({ chatUser }),

  isBlocked: () => {
    const chatUser = get().chatUser;
    return chatUser?.hasBlockedCurrentUser || chatUser?.isContactBlocked || false;
  },

  setSharedPhotos: (photos) => set({ sharedPhotos: photos }),

  clearChatStore: () => set({ sharedPhotos: [], chatUser: null }) 
}));

export default useChatStore;
