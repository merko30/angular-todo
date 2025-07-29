import { State } from './auth/types';
import { State as PostState } from './posts/types';

export type AppState = {
  auth: State;
  posts: PostState;
};
