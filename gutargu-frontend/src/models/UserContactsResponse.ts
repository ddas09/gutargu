export interface UserContactInformation {
    userId: number;
    userName: string;
    profileImageUrl?: string;
}

export interface UserContactsResponseModel {
    contacts: UserContactInformation[];
}