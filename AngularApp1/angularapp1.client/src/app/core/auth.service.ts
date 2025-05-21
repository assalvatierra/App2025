import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private BASE_URL = 'http://localhost:5157';

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
}
