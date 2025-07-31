import { Component, OnInit } from '@angular/core';
import { Post } from '../types/post';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { loadPosts } from '../../store/posts/actions';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, PostCardComponent],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  loggedIn$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select((state) => state.posts.posts);
    this.loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
}
