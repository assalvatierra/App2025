import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared.module';

import { ChecklistTransactionComponent } from './checklist-transaction.component';
import { ChecklistTransactionFormComponent } from './checklist-transaction-form/checklist-transaction-form.component';
import { ChecklistTemplateDialogComponent } from './checklist-template-dialog/checklist-template-dialog.component';

@NgModule({
  declarations: [
    ChecklistTransactionComponent,
    ChecklistTransactionFormComponent,
    ChecklistTemplateDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    SharedModule
  ],
  exports: [
    ChecklistTransactionComponent,
    ChecklistTransactionFormComponent,
    ChecklistTemplateDialogComponent
  ]
})
export class ChecklistModule { }
