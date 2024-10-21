import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/32597517/Guangxing/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      { username, password },
      { withCredentials: true }
    );
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { username, password });
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  navigateToSignup(): void {
    this.router.navigate(['signup']);
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }
}
