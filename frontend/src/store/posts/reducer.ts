import { createReducer, on } from '@ngrx/store';
import { State } from './types';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './actions';

const initialState: State = {
  posts: [],
  loading: false,
  error: null,
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
  }))
);
