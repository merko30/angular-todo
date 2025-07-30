import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import z from 'zod';
import { Store } from '@ngrx/store';

import { FieldComponent } from '../field/field.component';
import { ButtonComponent } from '../shared/button/button.component';
import { AppState } from '../../store';
import { createPost } from '../../store/posts/actions';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  tags: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^([a-zA-Z0-9-]+)(\s*,\s*[a-zA-Z0-9-]+)*$/.test(val),
      {
        message:
          'Tags must be comma-separated words (letters, numbers, or dashes)',
      }
    ),
});
@Component({
  selector: 'app-create-post-modal',
  imports: [FieldComponent, FormsModule, ButtonComponent],
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
})
export class CreatePostModalComponent {
  errors: Record<string, string> = {};

  constructor(private store: Store<AppState>) {}

  onSubmit(form: NgForm) {
    this.errors = {};
    const parsedValue = schema.safeParse(form.value);

    if (parsedValue.error) {
      parsedValue.error.issues.forEach((issue) => {
        this.errors[issue.path[0].toString()] = issue.message;
      });
    } else {
      this.store.dispatch(createPost(form.value));
    }
  }
}
