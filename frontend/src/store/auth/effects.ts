import { inject } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from './types';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(login.type),
      switchMap(({ type, ...data }) =>
        authService.login(data).pipe(
          map(() => loginSuccess()),
          catchError((error) =>
            of(
              loginFailure({
                error: error.error.message ?? 'Invalid credentials',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(register.type),
      switchMap((action) => {
        const { type, ...data } = action;
        return authService.register(data).pipe(
          map(() => registerSuccess()),
          catchError((error) =>
            of(
              registerFailure({
                error: error?.error?.message ?? 'Invalid credentials',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const getUserInfoEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(getUserInfo.type),
      switchMap(() => {
        return authService.getUserInfo().pipe(
          map((data) => {
            console.log(data);

            return getUserInfoSuccess(data as { user: User });
          }),
          catchError((error) => {
            console.log(error);

            return of(
              getUserInfoFailure({
                error: error?.error?.message ?? 'Failed to load user',
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
