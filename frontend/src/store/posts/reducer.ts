import { createReducer, on } from '@ngrx/store';
import { State } from './types';
import {
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  createPost,
  createPostFailure,
  createPostSuccess,
  loadTags,
  loadTagsSuccess,
  loadTagsFailure,
} from './actions';

const initialState: State = {
  posts: [],
  loading: false,
  error: null,
  tags: [],
};

export const reducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadPostsSuccess, (state, action) => ({
    ...state,
    loading: false,
    posts: action.posts,
  })),
  on(loadPostsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(createPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(createPostSuccess, (state, action) => ({
    ...state,
    loading: false,
    posts: [action.post, ...state.posts],
  })),
  on(createPostFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(loadTags, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadTagsSuccess, (state, action) => ({
    ...state,
    loading: false,
    tags: action.tags,
  })),
  on(loadTagsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
