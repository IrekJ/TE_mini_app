import { useSetAuthState } from './setAuthState';
import { useSetUserState } from './setUserState';
import { AuthStateModel } from '../models/AuthStateModel';
import { UserInfoModel } from '../models/UserInfoModel';

/**
 * Function to set both authentication tokens and user state during registration or login.
 */
export const useSetAuth = () => {
    const setAuthState = useSetAuthState();
    const setUserState = useSetUserState();

    return (tokens: AuthStateModel, user: UserInfoModel) => {
        // Set tokens in auth state
        setAuthState(tokens);

        // Set user information in user state
        setUserState(user);
    };
};
