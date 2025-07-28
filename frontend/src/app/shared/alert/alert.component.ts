import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  className = input<string>();

  get alertClass() {
    return twMerge(
      'inline-flex w-full p-2 bg-red-200 border border-red-600 text-red-600 rounded-md text-sm',
      this.className()
    );
  }
}
