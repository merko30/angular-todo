import { createReducer, on } from '@ngrx/store';
import { register, registerFail, registerSuccess } from './actions';

export type State = {
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  loggedIn: false,
  loading: false,
  error: null,
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
  on(registerFail, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);
