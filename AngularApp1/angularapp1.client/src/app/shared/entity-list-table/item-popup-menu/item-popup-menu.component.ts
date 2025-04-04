import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-popup-menu',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './item-popup-menu.component.html',
  styleUrl: './item-popup-menu.component.css'
})
export class ItemPopupMenuComponent {

}
