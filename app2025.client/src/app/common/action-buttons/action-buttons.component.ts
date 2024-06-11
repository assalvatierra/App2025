import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
  standalone: true,
  imports:[MatMenuModule,MatButtonModule,]

})
export class ActionButtonsComponent {

}
