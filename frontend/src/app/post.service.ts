import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Tag } from './types/post';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

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

  loadTags() {
    return this.http.get<{ tags: Tag[] }>('http://localhost:3005/api/tags');
  }

  loadPost(id: string): Observable<{ post: Post }> {
    return this.http
      .get<Post>(this.postURL + `/${id}`)
      .pipe(catchError((error) => of(error)));
  }

  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  createPost(post: Omit<Post, 'id'>) {
    return this.http.post<{ post: Post }>(this.postURL, post, {
      withCredentials: true,
    });
  }

  createComment(
    data: {
      comment: string;
    },
    postId: string
  ) {
    return this.http.post<{ comment: Comment }>(
      this.postURL + `/${postId}`,
      data,
      { withCredentials: true }
    );
  }
}
