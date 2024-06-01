import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { AppRoutingModule } from './../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MainMenu {
  name: string;
  linkUrl: string;
  children?: MainMenu[];
}

const TREE_DATA: MainMenu[] = [
  {
    name: 'Module-1',
    linkUrl: '',
    children: [{name: 'Transactions', linkUrl: '/Sample01'}, {name: 'Contacts', linkUrl: '/Sample02'} ],
  },
  {
    name: 'Module-2',
    linkUrl: '',
    children: [
      {
        name: 'Green',
        linkUrl: '',
        children: [{name: 'Broccoli',linkUrl: ''}, {name: 'Brussels sprouts',linkUrl: ''}],
      }
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule,AppRoutingModule,],
})
export class MainMenuComponent {
  private _transformer = (node: MainMenu, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
