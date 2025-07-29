import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { filter, map, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject<Store<AppState>>(Store);
  const router = inject(Router);

  return store
    .select((state) => state.auth.loading)
    .pipe(
      filter((loading) => !loading),
      take(1),
      switchMap(() =>
        store
          .select((state) => state.auth.loggedIn)
          .pipe(
            take(1),
            map((loggedIn) => {
              if (!loggedIn) {
                return router.createUrlTree(['/login']);
              }
              return true;
            })
          )
      )
    );
};

export const nonAuthGuard: CanActivateFn = () => {
  const store = inject<Store<AppState>>(Store);
  const router = inject(Router);

  return store
    .select((state) => state.auth.loading)
    .pipe(
      filter((loading) => !loading),
      take(1),
      switchMap(() =>
        store
          .select((state) => state.auth.loggedIn)
          .pipe(
            take(1),
            map((loggedIn) => {
              if (loggedIn) {
                return router.createUrlTree(['/']);
              }
              return true;
            })
          )
      )
    );
};
