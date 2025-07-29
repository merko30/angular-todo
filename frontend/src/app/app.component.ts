import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { getUserInfo, logout as logoutAction } from '../store/auth/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
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

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
