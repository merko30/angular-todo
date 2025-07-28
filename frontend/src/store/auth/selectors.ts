import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const selectAuth = (state: AppState) => state.auth;

export const loadingSelector = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const errorSelector = createSelector(selectAuth, (auth) => auth.error);
