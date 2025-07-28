import { inject } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  login,
  loginFail,
  loginSuccess,
  register,
  registerFail,
  registerSuccess,
} from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(login.type),
      switchMap(({ type, ...data }) =>
        authService.login(data).pipe(
          map(() => loginSuccess()),
          catchError((error) =>
            of(
              loginFail({ error: error.error.message ?? 'Invalid credentials' })
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
              registerFail({
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
