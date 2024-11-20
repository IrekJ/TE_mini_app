import { atom } from 'recoil';
import { PostModel } from '../models/PostModel';

export const postsState = atom<PostModel[]>({
  key: 'postsState',
  default: [],
});
