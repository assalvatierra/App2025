import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiChecklistService } from '../../core/services/api-checklist.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistTransactionFormComponent } from './checklist-transaction-form/checklist-transaction-form.component';

@Component({
  selector: 'app-checklist-transaction',
  templateUrl: './checklist-transaction.component.html',
  styleUrl: './checklist-transaction.component.css',
  standalone: false
})
export class ChecklistTransactionComponent implements AfterViewInit, OnChanges {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;
  public filterForm!: FormGroup;

  @Input() refObject: string = '';
  @Input() refId: number | null = null;
  @Input() hideReferenceParam: boolean = false;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiChecklistService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.initFilterForm();
    this.setupReactiveFiltering();
  }

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reset form and retrieve data when inputs change
    if (changes['refObject'] || changes['refId']) {
      this.filterForm.patchValue({
        refObject: this.refObject,
        refId: this.refId
      });
      this.retrieveApiData();
    }
  }

  onAddRecord() {
    const dialogRef = this.dialog.open(ChecklistTransactionFormComponent, {
      data: { id: 0, refObject: this.refObject, refId: this.refId, hideReferenceFields: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveApiData();
      }
    });
  }

  onEdit(param: any) {
    const dialogRef = this.dialog.open(ChecklistTransactionFormComponent, {
      data: { id: param, hideReferenceFields: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveApiData();
      }
    });
  }

  onEditDetails(param: any) {}

  onArchive(param: any) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.api.deleteTransaction(param).subscribe({
        next: () => {
          this.retrieveApiData();
        },
        error: (err) => {
          console.error('Delete Error:', err);
        }
      });
    }
  }

  retrieveApiData() {
    this.dataloading = true;
    const filterValues = this.filterForm.value;
    this.api.getTransactions(filterValues.refObject, filterValues.refId).subscribe({
      next: (res: any) => {
        if (this.TableList) {
          this.TableList.initialize(res);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'checklistItemId', label: 'Checklist Item ID' },
      { key: 'refObject', label: 'Reference Object' },
      { key: 'refId', label: 'Reference ID' },
      { key: 'isDone', label: 'Done' },
      { key: 'notes', label: 'Notes' },
      { key: 'createdBy', label: 'Created By' },
      { key: 'createdOn', label: 'Created On' }
    ];
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      refObject: [this.refObject],
      refId: [this.refId]
    });
  }

  private setupReactiveFiltering(): void {
    // Automatically filter when form values change (with debounce)
    this.filterForm.valueChanges.subscribe(() => {
      this.retrieveApiData();
    });
  }
}
