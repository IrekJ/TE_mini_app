import { atom } from 'recoil';
import { UserInfoModel } from '../models/UserInfoModel';

export const userState = atom<UserInfoModel | null>({
  key: 'userState',  
  default: null,
});

