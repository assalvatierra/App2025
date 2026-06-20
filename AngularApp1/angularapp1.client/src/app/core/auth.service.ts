import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError,switchMap } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, RedirectRequest, SilentRequest } from '@azure/msal-browser';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly authTokenKey = 'auth-token';
  private readonly authApiUrl = '/api';
  private readonly BASE_URL = 'http://localhost:5157';
  private readonly msalAuthFlagKey = 'msal-authenticated';
  private readonly entraRedirectRequest: RedirectRequest = {
    scopes: ['API.Access','user.read'],
    redirectStartPage: '/Entities'
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

    Entralogin() {
    this.msalService.loginRedirect().subscribe({
      error: (error) => {
        console.error('MSAL login redirect failed:', error);
      }
    });
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
          debugger;
          if (result?.account) {
            this.msalService.instance.setActiveAccount(result.account);
            this.storeMsalToken(result.accessToken);
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
            this.router.navigate(['/Entities']);
          }
        });
    }
  
    private storeMsalToken(token?: string): void {
      if (token) {
        localStorage.setItem(this.authTokenKey, token);
      }
    }
  
    private acquireAndStoreMsalToken(account: AccountInfo): void {
      const tokenRequest: SilentRequest = {
        scopes: this.entraRedirectRequest.scopes ?? ['user.read'],
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
  

  // Call this method periodically (e.g., every 30 minutes)
  //setInterval(() => {
  //  this.authService.silentRefresh();
  //}, 1800000);

}
