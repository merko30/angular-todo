import { Component, input } from '@angular/core';
import { Comment } from '../types/post';

@Component({
  selector: 'app-comment-list',
  imports: [],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  comments = input<Comment[]>();
}
