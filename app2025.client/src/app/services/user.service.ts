import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isauthenticated: boolean = false;

  private authenticationSubject = new Subject<any>();
  authenticationEvent$ = this.authenticationSubject.asObservable();
  emitEvent(data: any) {
    this.authenticationSubject.next(data);
  }

  constructor() {}

  public isAuthenticated(): boolean {

    if(document.cookie)
    {
      //TODO: implement authentication process
      this._isauthenticated = true;
    }

    return this._isauthenticated;
  }

  public login(username: string, password: string): boolean {
    this._isauthenticated = true;

    //TODO: implement authentication process

    document.cookie = "user=" + username;

    this.authenticationSubject.next(this._isauthenticated);
    return this._isauthenticated;
  }

  public logout():boolean{
    this._isauthenticated = false;

    //TODO: implement logout process
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    this.authenticationSubject.next(this._isauthenticated);
    return this._isauthenticated;
  }
}
