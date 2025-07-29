import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FieldComponent {
  @Input() label!: string;
  @Input() error: string | null = null;
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() className: string = '';

  get containerClass() {
    return twMerge('mb-2', this.className);
  }
}
