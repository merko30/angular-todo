import { Component, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  onClick = output();
  className = input<string>();
  disabled = input<boolean>();

  get buttonClass() {
    return twMerge(
      'bg-primary hover:bg-primary/90 px-4 py-2 text-white rounded-md uppercase text-sm cursor-pointer',
      this.className() ?? ''
    );
  }

  onButtonClick() {
    this.onClick.emit();
  }
}
