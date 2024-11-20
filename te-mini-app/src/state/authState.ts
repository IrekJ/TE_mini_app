import { atom } from 'recoil';
import { AuthStateModel } from '../models/AuthStateModel';



export const authState = atom<AuthStateModel>({
  key: 'authState',  
  default: {
    tokens: {
      accessToken: '',
      refreshToken: '',
    },
  },
});
