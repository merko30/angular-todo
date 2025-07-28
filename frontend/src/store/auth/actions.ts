import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction('[Auth] LoginSucceeded');
export const loginFail = createAction(
  '[Auth] LoginFailed',
  props<{ error: string }>()
);

export const register = createAction(
  '[Register Page] Register',
  props<{ name: string; email: string; password: string }>()
);

export const registerSuccess = createAction('[Auth] RegisterSucceeded');
export const registerFail = createAction(
  '[Auth] RegisterFailed',
  props<{ error: string }>()
);
