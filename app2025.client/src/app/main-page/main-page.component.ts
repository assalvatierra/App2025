import { Component } from '@angular/core';
// import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone:true,
  imports:[AppRoutingModule,]

})
export class MainPageComponent {

}
