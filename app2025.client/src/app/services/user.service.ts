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
    return this._isauthenticated;
  }

  public login(username: string, password: string): boolean {
    this._isauthenticated = true;

    //TODO: implement authentication process

    this.authenticationSubject.next(this._isauthenticated);
    return this._isauthenticated;
  }

  public logout():boolean{
    this._isauthenticated = false;

    //TODO: implement logout process

    this.authenticationSubject.next(this._isauthenticated);
    return this._isauthenticated;
  }
}
