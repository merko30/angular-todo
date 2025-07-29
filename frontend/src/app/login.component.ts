import { Component, DestroyRef, inject } from '@angular/core';
import { FieldComponent } from './field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import z from 'zod';
import { ButtonComponent } from './shared/button/button.component';
import { Store } from '@ngrx/store';
import { clearError, login } from '../store/auth/actions';
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
  destroyRef = inject(DestroyRef);

  private schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(loadingSelector);
    this.responseError$ = this.store.select(errorSelector);

    this.destroyRef.onDestroy(() => {
      this.store.dispatch(clearError());
    });
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
