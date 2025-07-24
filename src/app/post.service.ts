import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$ = new BehaviorSubject<Post[]>([]);
  postURL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  loadPosts(): void {
    this.http
      .get<Post[]>(this.postURL + '/posts?_limit=10')
      .subscribe((posts) => {
        this.posts$.next(posts);
      });
  }

  loadPost(id: string): Observable<Post> {
    return this.http
      .get<Post>(this.postURL + `/posts/${id}`)
      .pipe(catchError((error) => of(error)));
  }

  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }
}
