import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private BASE_URL = 'http://localhost:5157';

  //private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/api/User/Login`, user);
  }

  register(user: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/Register`, user);
  }

  logout() {
    localStorage.removeItem('auth-token');
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  silentRefresh(): void {
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.http.post(`${this.BASE_URL}/refresh-token`, { token })
        .subscribe({
          next: (response) => {
            localStorage.setItem('auth-token', response.toString());
          },
          error: (error) => {
            localStorage.clear();
          }
        });
    }
  }

  // Call this method periodically (e.g., every 30 minutes)
  //setInterval(() => {
  //  this.authService.silentRefresh();
  //}, 1800000);

}
