import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EntityListTableComponent } from './entity-list-table/entity-list-table.component';
import { ItemPopupMenuComponent } from './entity-list-table/item-popup-menu/item-popup-menu.component';

@NgModule({
  declarations: [
    EntityListTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    ItemPopupMenuComponent // Import the standalone component
  ],
  exports: [
    EntityListTableComponent
  ]
})
export class SharedModule { }
