import { Component, input } from '@angular/core';
import { Tag } from '../types/post';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-tag-list',
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css',
})
export class TagListComponent {
  tags = input.required<{ tag: Tag }[]>();
  className = input<string>();

  get containerClass() {
    return twMerge('flex gap-2 mt-2', this.className());
  }
}
