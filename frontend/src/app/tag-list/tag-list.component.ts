import { Component, input, output } from '@angular/core';
import { Tag } from '../types/post';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-tag-list',
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css',
})
export class TagListComponent {
  tags = input.required<Tag[]>();
  className = input<string>();
  itemClassName = input<string>();
  onTagClick = output<Tag>();

  get containerClass() {
    return twMerge('flex flex-wrap gap-2 mt-2', this.className());
  }

  get tagClass() {
    return twMerge(
      'list-none p-1 bg-gray-100 rounded text-xs border border-primary/20',
      this.itemClassName()
    );
  }

  onClick(tag: Tag): void {
    this.onTagClick.emit(tag);
  }
}
