import { Component } from '@angular/core';
import { FieldComponent } from './field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import z from 'zod';
import { ButtonComponent } from './shared/button/button.component';
import { Store } from '@ngrx/store';
import { login } from '../store/auth/actions';
import { Observable } from 'rxjs';
import { errorSelector, loadingSelector } from '../store/auth/selectors';
import { AppState } from '../store';
import { AlertComponent } from './shared/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FieldComponent,
    FormsModule,
    CommonModule,
    ButtonComponent,
    AsyncPipe,
    AlertComponent,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  errors: Record<string, string> = {};
  loading$: Observable<boolean>;
  responseError$: Observable<string | null>;

  private schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(loadingSelector);
    this.responseError$ = this.store.select(errorSelector);
  }

  onSubmit(form: NgForm) {
    this.errors = {};
    const parsed = this.schema.safeParse(form.value);
    if (parsed.error) {
      parsed.error.issues.forEach((issue) => {
        this.errors[issue.path[0].toString()] = issue.message;
      });
      return;
    }
    this.store.dispatch(
      login(
        form.value as {
          email: string;
          password: string;
        }
      )
    );
  }
}
