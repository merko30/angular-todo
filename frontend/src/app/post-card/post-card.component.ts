import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Post } from '../types/post';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink, TagListComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  post = input.required<Post>();

  get postBody() {
    return this.post().body.replace(/<[^>]+>/g, '');
  }
}
