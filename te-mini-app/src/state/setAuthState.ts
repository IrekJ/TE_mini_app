import { AuthStateModel } from '../models/AuthStateModel';
import { useSetRecoilState } from 'recoil';
import { authState } from './authState';

/**
 * Function to set only the Auth state during registration or login.
 */
export const useSetAuthState = () => {
    const setAuthState = useSetRecoilState(authState);

    return (tokens: AuthStateModel) => {
        setAuthState(tokens);
    };
};
