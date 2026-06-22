import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError,switchMap } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, RedirectRequest, SilentRequest } from '@azure/msal-browser';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly authTokenKey = 'auth-token';
  private readonly authApiUrl = '/api';
  private readonly BASE_URL = 'http://localhost:5157';
  private readonly msalAuthFlagKey = 'msal-authenticated';
  private readonly entraRedirectRequest: RedirectRequest = {
    scopes: ['api://384786e9-f7b8-4634-a95c-9239daf8d57a/API.Access'],
    redirectStartPage: window.location.origin
  };

  //private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private msalService: MsalService,
    private router: Router
  ) { 
    this.initializeMsalService();
  }

  login(user: { username: string, password: string }) {
    return this.http.post(`${this.authApiUrl}/User/Login`, user);
  }

  Entralogin() {
    this.msalService.loginRedirect().subscribe({
      error: (error) => {
        console.error('MSAL login redirect failed:', error);
      }
    });
  }

  logout() {  
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.msalAuthFlagKey);
    this.msalService.logoutRedirect();

  }

  isAuthenticated(): boolean {
    return this.getToken() !== null
      || localStorage.getItem(this.msalAuthFlagKey) === 'true';
  }

  storeAuthToken(tokenCandidate: unknown): void {
    localStorage.setItem(this.authTokenKey, tokenCandidate as string);
  }



  getToken() {
    const token = localStorage.getItem(this.authTokenKey);
    if (!token) {
      return null;
    }

    return token;
  }

  setMsalAuthenticated(value: boolean): void {
    if (value) {
      localStorage.setItem(this.msalAuthFlagKey, 'true');
      return;
    }

    localStorage.removeItem(this.msalAuthFlagKey);
  }




  initializeMsalService(): void {
    this.msalService.initialize()
      .pipe(
        // handleRedirectObservable uses msal-browser handleRedirectPromise under the hood
        switchMap(() => this.msalService.handleRedirectObservable()),
        catchError((error) => {
          console.error('MSAL redirect handling failed:', error);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result?.account) {
          this.msalService.instance.setActiveAccount(result.account);
          this.acquireAndStoreMsalToken(result.account);
          this.setMsalAuthenticated(true);
          this.router.navigate(['/Entities']);
          return;
        }

        const activeAccount =
          this.msalService.instance.getActiveAccount() ??
          this.msalService.instance.getAllAccounts()[0] ??
          null;

        if (activeAccount) {
          this.msalService.instance.setActiveAccount(activeAccount);
          this.acquireAndStoreMsalToken(activeAccount);
          this.setMsalAuthenticated(true);
        }
      });
  }

  private storeMsalToken(token?: string): void {
    this.storeAuthToken(token);
  }

  private acquireAndStoreMsalToken(account: AccountInfo): void {
    const tokenRequest: SilentRequest = {
      scopes: this.entraRedirectRequest.scopes,
      account
    };

    this.msalService.acquireTokenSilent(tokenRequest).subscribe({
      next: (tokenResult) => {
        this.storeMsalToken(tokenResult.accessToken);
      },
      error: (error) => {
        console.error('MSAL silent token acquisition failed:', error);
      }
    });
  }

/*
  register(user: { username: string, password: string }) {
    return this.http.post(`${this.BASE_URL}/Register`, user);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  silentRefresh(): void {
    const token = localStorage.getItem(this.authTokenKey);
    if (token) {
      this.http.post(`${this.BASE_URL}/refresh-token`, { token })
        .subscribe({
          next: (response) => {
            this.storeAuthToken(response);
          },
          error: (error) => {
            localStorage.clear();
          }
        });
    }
  }

  private normalizeToken(tokenCandidate: unknown): string | null {
    const asTokenString = this.extractTokenString(tokenCandidate);
    if (!asTokenString) {
      return null;
    }

    const trimmedToken = asTokenString.trim();
    if (!trimmedToken || trimmedToken === 'null' || trimmedToken === 'undefined') {
      return null;
    }

    const unwrappedToken = trimmedToken.startsWith('Bearer ')
      ? trimmedToken.slice('Bearer '.length).trim()
      : trimmedToken;

    return this.looksLikeJwt(unwrappedToken) ? unwrappedToken : null;
  }

  private extractTokenString(tokenCandidate: unknown): string | null {
    if (typeof tokenCandidate === 'string') {
      return tokenCandidate;
    }

    if (tokenCandidate && typeof tokenCandidate === 'object') {
      const map = tokenCandidate as Record<string, unknown>;
      const preferredFields = ['token', 'accessToken', 'access_token', 'jwt'];

      for (const field of preferredFields) {
        const value = map[field];
        if (typeof value === 'string') {
          return value;
        }
      }
    }

    return null;
  }

  private looksLikeJwt(token: string): boolean {
    const segments = token.split('.');
    return segments.length === 3 || segments.length === 5;
  }
  */

  // Call this method periodically (e.g., every 30 minutes)
  //setInterval(() => {
  //  this.authService.silentRefresh();
  //}, 1800000);

}
