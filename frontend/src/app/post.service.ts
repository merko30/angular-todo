import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$ = new BehaviorSubject<Post[]>([]);
  // todo: read from config
  postURL: string = 'http://localhost:3005/api/posts';

  constructor(private http: HttpClient) {}

  loadPosts() {
    return this.http.get<{ posts: Post[] }>(this.postURL);
  }

  loadPost(id: string): Observable<Post> {
    return this.http
      .get<Post>(this.postURL + `/${id}`)
      .pipe(catchError((error) => of(error)));
  }

  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  createPost(post: Omit<Post, 'id'>) {
    return this.http.post<Post>(this.postURL, post).pipe(
      tap((newPost) => {
        const currentPosts = this.posts$.getValue();
        this.posts$.next([newPost, ...currentPosts]);
      }),
      catchError((error) => of(error))
    );
  }
}
