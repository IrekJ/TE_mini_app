import { UserResponseModel } from './UserResponseModel';
export type LoginResponseModel ={
    accessToken: string;
    refreshToken: string;
    user: UserResponseModel;
}