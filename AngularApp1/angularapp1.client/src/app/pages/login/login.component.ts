import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
// import { MsalService } from '@azure/msal-angular';
// import { AccountInfo, RedirectRequest, SilentRequest } from '@azure/msal-browser';
// import { catchError, switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit  {
  username = 'admin@gmail.com';
  password = 'Admin123!';
  // private readonly entraRedirectRequest: RedirectRequest = {
  //   scopes: ['API.Access','user.read'],
  //   redirectStartPage: '/Entities'
  // };

  constructor(
    private authService: AuthService,
    // private msalService: MsalService,
    private router: Router) { }

  ngOnInit(): void {
    // this.msalService.initialize()
    //   .pipe(
    //     // handleRedirectObservable uses msal-browser handleRedirectPromise under the hood
    //     switchMap(() => this.msalService.handleRedirectObservable()),
    //     catchError((error) => {
    //       console.error('MSAL redirect handling failed:', error);
    //       return of(null);
    //     })
    //   )
    //   .subscribe((result) => {
    //     debugger;
    //     if (result?.account) {
    //       this.msalService.instance.setActiveAccount(result.account);
    //       this.storeMsalToken(result.accessToken);
    //       this.authService.setMsalAuthenticated(true);
    //       this.router.navigate(['/Entities']);
    //       return;
    //     }

    //     const activeAccount =
    //       this.msalService.instance.getActiveAccount() ??
    //       this.msalService.instance.getAllAccounts()[0] ??
    //       null;

    //     if (activeAccount) {
    //       this.msalService.instance.setActiveAccount(activeAccount);
    //       this.acquireAndStoreMsalToken(activeAccount);
    //       this.authService.setMsalAuthenticated(true);
    //       this.router.navigate(['/Entities']);
    //     }
    //   });
  }

  // private storeMsalToken(token?: string): void {
  //   if (token) {
  //     localStorage.setItem(this.authTokenKey, token);
  //   }
  // }

  // private acquireAndStoreMsalToken(account: AccountInfo): void {
  //   const tokenRequest: SilentRequest = {
  //     scopes: this.entraRedirectRequest.scopes ?? ['user.read'],
  //     account
  //   };

  //   this.msalService.acquireTokenSilent(tokenRequest).subscribe({
  //     next: (tokenResult) => {
  //       this.storeMsalToken(tokenResult.accessToken);
  //     },
  //     error: (error) => {
  //       console.error('MSAL silent token acquisition failed:', error);
  //     }
  //   });
  // }

  onSubmit() {
    console.log({ username: this.username, password: this.password });

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          this.authService.storeAuthToken(response?.token ?? response);
          this.router.navigate(['/Entities']);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  Entralogin() {
    this.authService.Entralogin();
    // this.msalService.loginRedirect().subscribe({
    //   error: (error) => {
    //     console.error('MSAL login redirect failed:', error);
    //   }
    // });
  }

  logout(){
    // this.msalService.logoutRedirect();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
