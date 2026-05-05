import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { ApiChecklistService } from '../../../core/services/api-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChecklistTransaction } from '../../../core/models/checklist.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-transaction-form',
  templateUrl: './checklist-transaction-form.component.html',
  styleUrl: './checklist-transaction-form.component.css',
  standalone: false
})
export class ChecklistTransactionFormComponent implements OnInit, AfterViewInit {
  public currentData: ChecklistTransaction;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn: boolean = false;
  public TitleInfo: string = 'Edit Checklist Transaction Form';
  public checklistItems: any[] = [];
  public transactionForm!: FormGroup;
  public hideReferenceFields: boolean = false;

  constructor(
    private api: ApiChecklistService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChecklistTransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentData = this.getDefaultData();
    this.initForm();
  }

  ngOnInit(): void {
    this.loadChecklistItems();
  }

  ngAfterViewInit(): void {
    if (this.data && this.data.id !== undefined) {
      this.paramId = this.data.id;
      this.hideReferenceFields = this.data.hideReferenceFields || false;
    } else {
      this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    }

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if (this.paramId != 0) {
      this.TitleInfo = 'Edit Checklist Transaction Form';
      this.retrieveApiData(this.paramId);
    }

    if (this.paramId == 0) {
      this.TitleInfo = 'Add New Checklist Transaction Form';
      this.currentData = this.getDefaultData();
      this.dataloading = false;
      this.ShowAddBtn = true;

      // Set default values from data
      if (this.data && this.data.refObject) {
        this.transactionForm.patchValue({ refObject: this.data.refObject });
      }
      if (this.data && this.data.refId) {
        this.transactionForm.patchValue({ refId: this.data.refId });
      }
    }
  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    this.dialogRef.close(true);
  }

  onAdd(): void {
    this.updateCurrentDataValues();
    this.addApiData(this.currentData);
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getTransaction(paramId)
      .subscribe({
        next: (res: ChecklistTransaction) => {
          this.initializeData(res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private addApiData(data: ChecklistTransaction): void {
    this.dataloading = true;
    this.api.addTransaction(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateCurrentDataValues(): void {
    this.currentData = {
      ...this.currentData,
      ...this.transactionForm.value
    };
  }

  private updateApiData(paramId: number, data: ChecklistTransaction): void {
    this.api.updateTransaction(paramId, data).subscribe();
  }

  private initializeData(data: ChecklistTransaction): void {
    this.currentData = data;
    this.transactionForm.patchValue({
      checklistItemId: data.checklistItemId,
      refObject: data.refObject,
      refId: data.refId,
      isDone: data.isDone,
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      isActive: data.isActive,
      notes: data.notes
    });
  }

  private getDefaultData(): ChecklistTransaction {
    return {
      id: 0,
      createdBy: '',
      createdOn: new Date().toISOString(),
      lastEditBy: '',
      lastEditOn: new Date().toISOString(),
      isArchived: false,
      isPrivate: false,
      isActive: true,
      notes: '',
      isDone: false,
      checklistItemId: null,
      refId: null,
      refObject: ''
    };
  }

  private loadChecklistItems(): void {
    this.api.getItems().subscribe({
      next: (res: any[]) => {
        this.checklistItems = res;
      },
      error: (err) => {
        console.error('Error loading Checklist Items:', err);
      }
    });
  }

  private initForm(): void {
    this.transactionForm = this.fb.group({
      checklistItemId: null,
      refObject: '',
      refId: null,
      isDone: false,
      isArchived: false,
      isPrivate: false,
      isActive: true,
      notes: ''
    });
  }
}
