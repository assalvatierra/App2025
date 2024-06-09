import {Component, Input} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MainmenuService } from '../services/mainmenu.service';
import { MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
  standalone: true,
  imports: [BrowserModule, MatButtonModule, MatIconModule,AppRoutingModule,MatListModule,MatCardModule,],
})
export class MainMenuComponent {

  private _isauthenticated:boolean = false;
  @Input()
  public get isUserAuthenticated():boolean{
     return this._isauthenticated;
  }
  public set isUserAuthenticated(value:boolean){
    this._isauthenticated = value;
    this.setMenu(value);
  }


  public menuItems: MenuItem[] | undefined;

  constructor(private menusrv:MainmenuService ) {
  }

  private setMenu(auth:boolean){
    if(auth)
      this.menuItems = this.menusrv.getMenu(0);
    else
      this.menuItems = this.menusrv.getMenuUnauthenticated();
  }
}
