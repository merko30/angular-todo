import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types/post';
import { Observable, of } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, RouterLink],
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
