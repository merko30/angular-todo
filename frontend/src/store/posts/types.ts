import { Post } from '../../app/types/post';

export type State = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};
