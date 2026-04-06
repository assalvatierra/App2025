import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EntityListTableComponent } from './entity-list-table/entity-list-table.component';
import { ItemPopupMenuComponent } from './entity-list-table/item-popup-menu/item-popup-menu.component';
import { UiPageTitleComponent } from './ui-page-title/ui-page-title.component';
import { AdvancedFilterDialogComponent } from './entity-list-table/advanced-filter-dialog/advanced-filter-dialog.component';

@NgModule({
  declarations: [
    EntityListTableComponent,
    AdvancedFilterDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    ItemPopupMenuComponent, // Import the standalone component
    UiPageTitleComponent
  ],
  exports: [
    EntityListTableComponent,
    UiPageTitleComponent
  ]
})
export class SharedModule { }
