
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';


const samplemenu2: MenuItem[] = [
  {
    name: 'Authentication',
    linkUrl: '',
    OrderNo: 1,
    children: [
      {
        name: 'Login',
        linkUrl: '/Login',
        OrderNo: 1,
      },
      {
        name: 'About',
        linkUrl: '/About',
        OrderNo: 2,
      }
    ]
  }
];


const samplemenu: MenuItem[] = [
  {
    name: 'Module-01',
    linkUrl: '',
    OrderNo: 1,
    children: [
      {name: 'Sample 01', linkUrl: '/Sample01', OrderNo:1},
      {name: 'Sample 02', linkUrl: '/Sample02', OrderNo:2}
    ],
  },
  {
    name: 'Module-02',
    linkUrl: '',
    OrderNo: 2,
    children: [
      {name: 'References',linkUrl: '/References', OrderNo:1},
      {name: 'Reports',linkUrl: '/reports',OrderNo:2}
    ],
  },

  {
    name: 'Account',
    linkUrl: '',
    OrderNo: 2,
    children: [
      {name: 'Logout',linkUrl: '/Login', OrderNo:1},

    ],
  },

];




@Injectable({
  providedIn: 'root'
})
export class MainmenuService {

  private menudata: MenuItem[];
  private unauthenticatedMenu: MenuItem[];

  constructor() {
    this.menudata = samplemenu;
    this.unauthenticatedMenu = samplemenu2;
  }

  public getMenu(menuid:number): MenuItem[] {
    return this.menudata;

  }

  public getMenuUnauthenticated():MenuItem[] {
    return this.unauthenticatedMenu;

  }

}

