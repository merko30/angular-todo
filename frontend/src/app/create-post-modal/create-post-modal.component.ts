import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import z from 'zod';
import { Store } from '@ngrx/store';
import quill from 'quill';

import { FieldComponent } from '../field/field.component';
import { ButtonComponent } from '../shared/button/button.component';
import { AppState } from '../../store';
import { createPost } from '../../store/posts/actions';
import Quill from 'quill';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(100, 'Body must contain at least 100 characters'),
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

  @ViewChild('editor', { static: false }) editorContainer!: ElementRef;
  quillEditor!: Quill;

  content = '';

  ngAfterViewInit(): void {
    this.quillEditor = new Quill(this.editorContainer.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });

    this.quillEditor.on('text-change', () => {
      this.content = this.quillEditor.root.innerHTML;
    });
  }

  onSubmit(form: NgForm) {
    this.errors = {};
    const data = {
      ...form.value,
      body: this.content,
    };
    const parsedValue = schema.safeParse(data);

    if (parsedValue.error) {
      parsedValue.error.issues.forEach((issue) => {
        this.errors[issue.path[0].toString()] = issue.message;
      });
    } else {
      this.store.dispatch(createPost(data));
    }
  }
}
