import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$ = new BehaviorSubject<Post[]>([]);
  postURL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  loadPosts() {
    console.log('calling');
    this.http
      .get<Post[]>(this.postURL + '/posts?_limit=10')
      .subscribe((posts) => {
        console.log('posts', posts);
        this.posts$.next(posts);
      });
  }

  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }
}
