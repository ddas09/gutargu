export interface ChatInformation {
    senderId: number;
    message: string;
    imageUrl?: string;
    isRead: boolean;
    isSentByCurrentUser: boolean;
    sentAt: string;
}

export interface ChatResponseModel
{
    chats: ChatInformation[]
}