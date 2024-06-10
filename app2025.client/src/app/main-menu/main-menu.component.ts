import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MainmenuService } from '../services/mainmenu.service';
import { MenuItem } from '../models/menu-item';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
  standalone: true,
  imports: [BrowserModule, MatButtonModule, MatIconModule,AppRoutingModule,MatListModule,MatCardModule,],
})
export class MainMenuComponent implements OnInit, OnDestroy {

  private _isauthenticated:boolean = false;
  @Input()
  public get isUserAuthenticated():boolean{
     return this._isauthenticated;
  }
  public set isUserAuthenticated(value:boolean){
    this._isauthenticated = value;
    this.setMenu(value);
  }
  private authenticationEventSubscription: Subscription | undefined;

  public menuItems: MenuItem[] | undefined;

  constructor(private menusrv:MainmenuService,private user:UserService, private router: Router ) {
  }

  ngOnInit() {
    this.authenticationEventSubscription = this.user.authenticationEvent$.subscribe(data => {
      //TODO: handle data
      this._isauthenticated = data;
      this.setMenu(data);


    });
  }
  ngOnDestroy() {
    if(this.authenticationEventSubscription)
      this.authenticationEventSubscription.unsubscribe();
  }
  private setMenu(auth:boolean){
    if(auth){
      this.menuItems = this.menusrv.getMenu(0);
      this.router.navigate([this.menusrv.getDefaultMenuItem()]);
    }
    else{
      this.menuItems = this.menusrv.getMenuUnauthenticated();
    }
  }
}
