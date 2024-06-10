import { Component } from '@angular/core';
// import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { MainCommandPanelComponent } from './main-command-panel/main-command-panel.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone:true,
  imports:[AppRoutingModule,MainCommandPanelComponent,]

})
export class MainPageComponent {

}
