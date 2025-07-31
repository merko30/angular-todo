import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../types/post';
import { HttpErrorResponse } from '@angular/common/http';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-post-detail',
  imports: [TagListComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  post: Post | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.loadPost(id).subscribe((data) => {
        if (data instanceof HttpErrorResponse && data.status === 404) {
          this.router.navigate(['/404']);
        }
        const { post } = data;

        if (post) {
          this.post = post;
        } else {
          this.router.navigate(['/404']);
        }
      });
    } else {
      this.router.navigate(['/404']);
    }
  }
}
