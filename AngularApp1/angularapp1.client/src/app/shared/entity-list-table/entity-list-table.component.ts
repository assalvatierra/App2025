import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityListTableDataSource, EntityListTableItem } from './entity-list-table-datasource';
import { ItemPopupMenuComponent } from './item-popup-menu/item-popup-menu.component';

@Component({
  selector: 'app-entity-list-table',
  templateUrl: './entity-list-table.component.html',
  styleUrl: './entity-list-table.component.css',
  standalone: false
})
export class EntityListTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EntityListTableItem>;

  //@Input()
  //public get data(): EntityListTableItem[] {
  //  return this._data;
  //}
  //public set data(param: EntityListTableItem[]) {
  //  this.data = param;
  //}
  //private _data: EntityListTableItem[] = [];

  dataSource = new EntityListTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['actions','id', 'name'];

  constructor() {

  }

  ngAfterViewInit(): void {

  }

  initialize(param: EntityListTableItem[]): void {
    this.dataSource.data = param;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }
}
