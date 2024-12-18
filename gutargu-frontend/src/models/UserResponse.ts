export interface UserInformation {
    id: number;
    name: string;
    email: string;
    profileImageUrl?: string;
}

export interface UserResponseModel {
    userInfo: UserInformation;
}
