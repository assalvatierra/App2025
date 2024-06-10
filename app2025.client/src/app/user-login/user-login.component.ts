import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, EnabledBlockingInitialNavigationFeature, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  standalone: true,
})
export class UserLoginComponent {

  @Input()
  set isUserAuthenticated(value: boolean) {
    this._isauthenticated=value;
  }
  get isUserAuthenticated(): boolean {
    return this._isauthenticated;
  }

  @Output() isUserAuthenticatedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isauthenticated: boolean = false;

  constructor(private user: UserService, private router: Router) {}

  public login() {
    alert('Continue Login?');
    var t = this.user.login('username', 'pwd');
    this.isUserAuthenticatedChange.emit(t);
    this._isauthenticated = t;
  }

  public logout(){
    alert('Are you sure to logout?');
    var t = this.user.logout();
    this.isUserAuthenticatedChange.emit(t);
  }

}
