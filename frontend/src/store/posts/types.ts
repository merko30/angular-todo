import { Post, Tag } from '../../app/types/post';

export type State = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  tags: Tag[];
};
