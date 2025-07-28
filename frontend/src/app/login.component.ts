import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FieldComponent } from './field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import z from 'zod';
import { ButtonComponent } from './shared/button/button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FieldComponent, FormsModule, CommonModule, ButtonComponent],
})
export class LoginComponent {
  email = '';
  password = '';
  responseError = null;
  errors: Record<string, string> = {};
  loading = false;

  private schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  constructor(private auth: AuthService) {}

  onSubmit(form: NgForm) {
    this.errors = {};
    const parsed = this.schema.safeParse(form.value);
    if (parsed.error) {
      parsed.error.issues.forEach((issue) => {
        this.errors[issue.path[0].toString()] = issue.message;
      });
      return;
    }
    this.loading = true;
    this.auth.login(form.value).subscribe({
      next: () => (window.location.href = '/'),
      error: (err) => {
        this.responseError = err.error?.message || 'Login failed';
        this.loading = false;
      },
    });
  }
}
