export interface UserInformation {
    id: number;
    name: string;
    profileImageUrl?: string;
}

export interface UserResponseModel {
    userInfo: UserInformation;
}

export interface UserSearchResponseModel
{
    users: UserInformation[]
}