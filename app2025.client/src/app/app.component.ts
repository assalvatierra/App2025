import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  private _isauthenticated:boolean = false;
  public get isAuthenticated():boolean{
     return this._isauthenticated;
  }
  public set isAuthenticated(value:boolean){
    this._isauthenticated = value;
  }

  constructor(
    private http: HttpClient,
    private user:UserService
  ) {

    this.isAuthenticated = user.isAuthenticated();

  }

  ngOnInit() {
  }


}
