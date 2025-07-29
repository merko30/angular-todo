import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { FieldComponent } from './field/field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import z from 'zod';
import { ButtonComponent } from './shared/button/button.component';
import { State, Store } from '@ngrx/store';
import { clearError, register } from '../store/auth/actions';
import { Observable, of } from 'rxjs';
import { AppState } from '../store';
import { AlertComponent } from './shared/alert/alert.component';
import { errorSelector, loadingSelector } from '../store/auth/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FieldComponent,
    FormsModule,
    CommonModule,
    ButtonComponent,
    AlertComponent,
  ],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errors: Record<string, string> = {};
  responseError$: Observable<string | null>;
  loading$: Observable<boolean> = of(false);
  destroyRef = inject(DestroyRef);

  private schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  constructor(private store: Store<AppState>) {
    this.responseError$ = this.store.select(errorSelector);
    this.loading$ = this.store.select(loadingSelector);

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
    this.store.dispatch(register(form.value));
  }
}
