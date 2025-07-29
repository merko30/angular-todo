import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { getUserInfo } from '../store/auth/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loggedIn$ = this.store.select((state) => state.auth.loggedIn);
    this.loading$ = this.store.select((state) => state.auth.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(getUserInfo());
  }
}
