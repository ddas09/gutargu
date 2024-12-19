export interface UserContactInformation {
    userId: number;
    userName: string;
    userEmail: string;
    profileImageUrl?: string;
    lastChatId?: number;
    lastChatSenderId?: number;
    lastChatMessage: string;
    isLastChatRead: boolean;
    isLastChatSentByContact: boolean;
}

export interface UserContactsResponseModel {
    contacts: UserContactInformation[];
}