import { Component, OnInit } from '@angular/core';
import { Post, Tag } from '../types/post';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { loadPosts, loadTags } from '../../store/posts/actions';
import { PostCardComponent } from '../post-card/post-card.component';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, PostCardComponent, TagListComponent],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  tags$: Observable<Tag[]> = of([]);
  loggedIn$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select((state) => state.posts.posts);
    this.tags$ = this.store.select((state) => state.posts.tags);
    this.loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.store.dispatch(loadTags());
  }

  onTagClick(tag: Tag) {
    console.log(tag);
  }
}
