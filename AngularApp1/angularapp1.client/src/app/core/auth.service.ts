import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly authApiUrl = '/api';
  private readonly BASE_URL = 'http://localhost:5157';
  private readonly msalAuthFlagKey = 'msal-authenticated';

  //private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private msalService: MsalService
  ) { }

  login(user: { username: string, password: string }) {
    return this.http.post(`${this.authApiUrl}/User/Login`, user);
  }

  register(user: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/Register`, user);
  }

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem(this.msalAuthFlagKey);
    this.msalService.logoutRedirect();

  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  isAuthenticated() {
    return this.getToken() !== null || localStorage.getItem(this.msalAuthFlagKey) === 'true';
  }

  setMsalAuthenticated(value: boolean): void {
    if (value) {
      localStorage.setItem(this.msalAuthFlagKey, 'true');
      return;
    }

    localStorage.removeItem(this.msalAuthFlagKey);
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
