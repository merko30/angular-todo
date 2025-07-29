import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../app/post.service';
import {
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  createPost,
  createPostFailure,
  createPostSuccess,
} from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ModalService } from '../../app/modal.service';

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

export const createPostEffect = createEffect(
  (
    actions$ = inject(Actions),
    postService = inject(PostService),
    modalService = inject(ModalService)
  ) =>
    actions$.pipe(
      ofType(createPost.type),
      switchMap((action) => {
        const { type, ...data } = action;

        return postService.createPost(data).pipe(
          map((data) => {
            console.log(data);
            return createPostSuccess({ post: data.post });
          }),
          tap(() => modalService.close()),
          catchError((error) => {
            return of(
              createPostFailure({
                error: error?.message ?? 'Failed to create the post',
              })
            );
          })
        );
      })
    ),
  { functional: true }
);
