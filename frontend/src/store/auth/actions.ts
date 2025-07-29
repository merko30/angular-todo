import { createAction, props } from '@ngrx/store';
import { User } from './types';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction('[Auth] LoginSucceeded');
export const loginFailure = createAction(
  '[Auth] LoginFailed',
  props<{ error: string }>()
);

export const register = createAction(
  '[Register Page] Register',
  props<{ name: string; email: string; password: string }>()
);
export const registerSuccess = createAction('[Auth] RegisterSucceeded');
export const registerFailure = createAction(
  '[Auth] RegisterFailed',
  props<{ error: string }>()
);

export const getUserInfo = createAction('[Auth] GetUserInfo');
export const getUserInfoSuccess = createAction(
  '[Auth] GetUserInfoSucceeded',
  props<{ user: User }>()
);
export const getUserInfoFailure = createAction(
  '[Auth] RegisterFailed',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] LogoutSucceeded');
export const logoutFailure = createAction(
  '[Auth] RegisterFailed',
  props<{ error: string }>()
);

export const clearError = createAction('[Auth] Clear error');
