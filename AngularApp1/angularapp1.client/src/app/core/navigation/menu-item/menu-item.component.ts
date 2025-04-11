import { Component,input, signal } from '@angular/core';
import { MenuItem } from '../navigation.component';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);

  nestedMenuOpen = signal(false);

  toggleNested(){
    if(!this.item().subItems){
      return;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
