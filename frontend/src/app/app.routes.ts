import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { authGuard, nonAuthGuard } from './auth.guard';
import { CreatePostComponent } from './create-post/create-post.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts/create',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
