import { createAction, props } from '@ngrx/store';
import { Post } from '../../app/types/post';

export const loadPosts = createAction('[Posts] LoadPosts');
export const loadPostsSuccess = createAction(
  '[Posts] LoadPostsSucceeded',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] LoadPostsFailed',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Posts] CreatePost',
  props<{ post: Omit<Post, 'id'> }>()
);
export const createPostSuccess = createAction(
  '[Posts] CreatePostSucceeded',
  props<{ post: Post }>()
);
export const createPostFailure = createAction(
  '[Posts] CreatePostFailed',
  props<{ error: string }>()
);
