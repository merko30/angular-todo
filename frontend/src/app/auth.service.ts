import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3005/api';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    // Better Auth login endpoint is /api/auth/login
    return this.http.post(`${this.apiUrl}/auth/sign-in/email`, data, {
      withCredentials: true,
    });
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    // Better Auth register endpoint is /api/auth/register
    return this.http.post(`${this.apiUrl}/auth/sign-up/email`, data, {
      withCredentials: true,
    });
  }

  getUserInfo() {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
