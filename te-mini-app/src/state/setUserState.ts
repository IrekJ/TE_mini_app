import { userState } from './userState';
import { UserInfoModel } from '../models/UserInfoModel';
import { useSetRecoilState } from 'recoil';

/**
 * Function to set only the user state during registration or login.
 */
export const useSetUserState = () => {
    const setUserState = useSetRecoilState(userState);

    return (userInfo: UserInfoModel | null) => {
        setUserState(userInfo);
    };
};
