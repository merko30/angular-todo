import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types/post';
import { Observable, of } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, JsonPipe],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);

  constructor(private postService: PostService) {
    this.posts$ = this.postService.getPosts();
  }

  ngOnInit(): void {
    this.postService.loadPosts();
  }
}
