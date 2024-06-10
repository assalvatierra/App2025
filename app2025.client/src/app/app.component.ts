import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {

  public isAuthenticated:boolean = false;
  private authenticationEventSubscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private user:UserService
  ) {

    this.isAuthenticated = user.isAuthenticated();

  }

  ngOnInit() {
    this.authenticationEventSubscription = this.user.authenticationEvent$.subscribe(data => {
      //TODO: handle data
      this.isAuthenticated = data;
    });
  }
  ngOnDestroy() {
    if(this.authenticationEventSubscription)
      this.authenticationEventSubscription.unsubscribe();
  }

}
