import {Component} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

interface MainMenu {
  name: string;
  linkUrl: string;
  children?: MainMenu[];
}

const TREE_DATA: MainMenu[] = [
  {
    name: 'Module-1',
    linkUrl: '',
    children: [
      {name: 'Sample 1', linkUrl: '/Sample01'},
      {name: 'Sample 2', linkUrl: '/Sample02'}
    ],
  },
  {
    name: 'Module-2',
    linkUrl: '',
    children: [
      {name: 'References',linkUrl: '/References'},
      {name: 'Reports',linkUrl: '/reports'}
    ],
  },
];


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
  standalone: true,
  imports: [BrowserModule, MatButtonModule, MatIconModule,AppRoutingModule,MatListModule,MatCardModule,],
})
export class MainMenuComponent {
  private _transformer = (node: MainMenu, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };


  public menuItems: MainMenu[] | undefined;

  constructor() {
    this.menuItems = TREE_DATA;
  }

}
