import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiChecklistService } from '../../core/services/api-checklist.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistTransactionFormComponent } from './checklist-transaction-form/checklist-transaction-form.component';
import { ChecklistTemplateDialogComponent } from './checklist-template-dialog/checklist-template-dialog.component';
import { ChecklistTransaction } from '../../core/models/checklist.model';
import { debounceTime } from 'rxjs/operators';

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
      data: { id: 0, refObject: this.refObject, refId: this.refId, hideReferenceFields: true, referenceObject: this.refObject }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveApiData();
      }
    });
  }

  onEdit(param: any) {
    const dialogRef = this.dialog.open(ChecklistTransactionFormComponent, {
      data: { id: param, hideReferenceFields: true, referenceObject: this.refObject }
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

  onAddTemplate() {
    const dialogRef = this.dialog.open(ChecklistTemplateDialogComponent, {
      data: { refObject: this.refObject, refId: this.refId, referenceObject: this.refObject },
      width: '520px'
    });

    dialogRef.afterClosed().subscribe((selectedItemIds: number[] | null) => {
      if (selectedItemIds && selectedItemIds.length > 0) {
        const addRequests = selectedItemIds.map(itemId => {
          const transaction: ChecklistTransaction = {
            id: 0,
            createdBy: '',
            createdOn: new Date().toISOString(),
            lastEditBy: '',
            lastEditOn: new Date().toISOString(),
            isArchived: false,
            isPrivate: false,
            isActive: true,
            isDone: false,
            notes: '',
            checklistItemId: itemId,
            refId: this.refId,
            refObject: this.refObject
          };
          return this.api.addTransaction(transaction);
        });

        let completed = 0;
        addRequests.forEach(req => {
          req.subscribe({
            next: () => {
              completed++;
              if (completed === addRequests.length) {
                this.retrieveApiData();
              }
            },
            error: (err) => {
              console.error('Error adding transaction from template:', err);
            }
          });
        });
      }
    });
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
      { key: 'sortOrder', label: 'Order' },
      { key: 'checklistItemName', label: 'Checklist Item' },
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
    this.filterForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      if (this.TableList) {
        this.retrieveApiData();
      }
    });
  }
}
