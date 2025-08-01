import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Comment, Post } from '../types/post';
import { TagListComponent } from '../tag-list/tag-list.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { BehaviorSubject, map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-post-detail',
  imports: [
    TagListComponent,
    CommentFormComponent,
    AsyncPipe,
    CommentListComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  post$ = new BehaviorSubject<Post | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.loadPost(id).subscribe({
        next: (data) => this.post$.next(data.post),
        error: () => this.router.navigate(['/404']),
      });
    } else {
      this.router.navigate(['/404']);
    }
  }

  get postTags() {
    if (this.post$) {
      return this.post$.pipe(
        map((post) => post?.tags.map((postTag) => postTag.tag) ?? [])
      );
    }
    return of([]);
  }

  onCommentCreate(comment: Comment) {
    console.log(comment);
    this.post$.next({
      ...this.post$.getValue()!,
      comments: [comment, ...this.post$.getValue()!.comments!],
    });
  }
}
