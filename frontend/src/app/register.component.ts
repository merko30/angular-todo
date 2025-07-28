import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FieldComponent } from './field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import z from 'zod';
import { ButtonComponent } from './shared/button/button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FieldComponent, FormsModule, CommonModule, ButtonComponent],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errors: Record<string, string> = {};
  responseError: string | null = null;
  loading = false;

  private schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  constructor(private auth: AuthService) {}

  onSubmit(form: NgForm) {
    this.errors = {};
    this.responseError = null;
    const parsed = this.schema.safeParse(form.value);
    if (parsed.error) {
      parsed.error.issues.forEach((issue) => {
        this.errors[issue.path[0].toString()] = issue.message;
      });
      return;
    }
    this.loading = true;
    this.auth.register(form.value).subscribe({
      next: () => {
        window.location.href = '/login';
      },
      error: (err) => {
        this.responseError = err.error?.message || 'Registration failed';
        this.loading = false;
      },
    });
  }
}
