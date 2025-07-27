import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types/post';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalHostComponent } from '../modal-host/modal-host.component';
import { ModalService } from '../modal.service';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AsyncPipe, RouterLink, ModalHostComponent, ButtonComponent],
})
export class HomeComponent implements OnInit, AfterViewInit {
  posts$: Observable<Post[]> = of([]);

  @ViewChild(ModalHostComponent) modalHost!: ModalHostComponent;

  constructor(
    private postService: PostService,
    private modalService: ModalService
  ) {
    this.posts$ = this.postService.getPosts();
  }

  ngOnInit(): void {
    this.postService.loadPosts();
  }

  ngAfterViewInit(): void {
    this.modalService.registerHost(this.modalHost);
  }

  openCreateModal() {
    this.modalService.open(CreatePostModalComponent);
  }
}
