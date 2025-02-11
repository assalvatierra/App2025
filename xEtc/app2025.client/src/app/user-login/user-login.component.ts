import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  standalone: true,
  imports:[CommonModule,]
})
export class UserLoginComponent {

  @Input()
  public isUserAuthenticated:boolean=false;

  @Output() isUserAuthenticatedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private user: UserService, private router: Router) {
    this.isUserAuthenticated = user.isAuthenticated();
  }

  public login() {
    // alert('Continue Login?');
    var t = this.user.login('username', 'pwd');
    this.isUserAuthenticated = t;
    // this.isUserAuthenticatedChange.emit(t);
  }

  public logout(){
    alert('Are you sure to logout?');
    var t = this.user.logout();
    this.isUserAuthenticated = t;
    // this.isUserAuthenticatedChange.emit(t);
  }

}
