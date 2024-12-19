export interface UserContactInformation {
    userId: number;
    userName: string;
    userEmail: string;
    profileImageUrl?: string;
    lastChatId?: number;
    lastChatMessage: string;
    isLastChatRead: boolean;
    isLastChatSentByContact: boolean;
    isContactBlocked: boolean;
    hasBlockedCurrentUser: boolean;
}

export interface UserContactsResponseModel {
    contacts: UserContactInformation[];
}