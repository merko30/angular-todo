import { createReducer, on } from '@ngrx/store';
import {
  getUserInfo,
  getUserInfoFailure,
  getUserInfoSuccess,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from './actions';
import { State } from './types';

export const initialState: State = {
  loggedIn: false,
  loading: false,
  error: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    loggedIn: true,
  })),
  on(loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(getUserInfo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getUserInfoSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    loggedIn: true,
    user: action.user,
  })),
  on(getUserInfoFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
