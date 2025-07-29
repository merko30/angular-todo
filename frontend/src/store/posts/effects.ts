import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../app/post.service';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadPostsEffect = createEffect(
  (actions$ = inject(Actions), postService = inject(PostService)) =>
    actions$.pipe(
      ofType(loadPosts.type),
      switchMap(() => {
        console.log('called');

        return postService.loadPosts().pipe(
          map((data) => {
            console.log(data);
            return loadPostsSuccess({ posts: data.posts });
          }),
          catchError((error) => {
            console.log(error);

            return of(
              loadPostsFailure({
                error: error?.message ?? 'Failed to load posts',
              })
            );
          })
        );
      })
    ),
  { functional: true }
);
