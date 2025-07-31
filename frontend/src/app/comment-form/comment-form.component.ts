import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import z from 'zod';
import { FieldComponent } from '../field/field.component';
import { ButtonComponent } from '../shared/button/button.component';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

const schema = z.object({
  comment: z.string().min(10, 'Comment must contain at least 10 characters'),
});

@Component({
  selector: 'app-comment-form',
  imports: [FieldComponent, FormsModule, ButtonComponent],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  error: string | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  onSubmit(form: NgForm) {
    const validationError = schema.safeParse(form.value);
    if (validationError.error) {
      this.error = validationError.error.issues[0].message;
    } else {
      const postId = this.route.snapshot.paramMap.get('id');
      this.postService.createComment(form.value, postId!).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
