import { Component } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import z from 'zod';
import { PostService } from '../post.service';
import { ModalService } from '../modal.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { createPost } from '../../store/posts/actions';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});
@Component({
  selector: 'app-create-post-modal',
  imports: [FieldComponent, FormsModule, ButtonComponent],
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
})
export class CreatePostModalComponent {
  errors: Record<string, string> = {};

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) {}

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
