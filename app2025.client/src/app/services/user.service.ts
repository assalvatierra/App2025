import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isauthenticated: boolean = false;
  constructor() {}

  public isAuthenticated(): boolean {
    return this._isauthenticated;
  }

  public login(username: string, password: string): boolean {
    this._isauthenticated = true;

    //TODO: implement authentication process

    return this.isAuthenticated();
  }

  public logout():boolean{
    this._isauthenticated = false;
    return this._isauthenticated;
  }
}
