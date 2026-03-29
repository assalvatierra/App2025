import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { Receivable } from '../../../core/models/receivable.model';

@Component({
  selector: 'app-receivable-form',
  standalone: true,
  templateUrl: './receivable-form.component.html',
  styleUrls: ['./receivable-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UiPageTitleComponent
  ]
})
export class ReceivableFormComponent implements OnInit, AfterViewInit {
  @Input() receivable: Receivable | null = null;
  @Input() entities: any[] = [];
  @Input() dataloading: boolean = false;

  @Output() saveRecordClicked = new EventEmitter<Receivable>();
  @Output() cancelClicked = new EventEmitter<void>();

  public receivableForm!: FormGroup;
  public currentData: Receivable | null = null;
  public isNewRecord: boolean = true;
  public titleInfo: string = 'Add Receivable';

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.receivable) {
      this.currentData = this.receivable;
      this.isNewRecord = false;
      this.titleInfo = 'Edit Receivable';
      this.populateForm();
    } else {
      this.isNewRecord = true;
      this.titleInfo = 'Add Receivable';
    }
  }

  ngAfterViewInit(): void {
    // Component initialization if needed
  }

  private initForm(): void {
    this.receivableForm = this.fb.group({
      id: [null],
      trxRef: ['', Validators.required],
      trxDate: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      entityId: [null],
      remarks: ['', Validators.required],
      isActive: [true],
      isArchived: [false],
      isPrivate: [false],
      createdBy: ['System'],
      lastEditBy: ['System']
    });
  }

  private populateForm(): void {
    if (this.currentData) {
      this.receivableForm.patchValue({
        id: this.currentData.id,
        trxRef: this.currentData.trxRef,
        trxDate: this.currentData.trxDate ? this.formatDateForInput(this.currentData.trxDate) : '',
        amount: this.currentData.amount,
        entityId: this.currentData.entityId,
        remarks: this.currentData.remarks || '',
        isActive: this.currentData.isActive,
        isArchived: this.currentData.isArchived,
        isPrivate: this.currentData.isPrivate,
        createdBy: this.currentData.createdBy || 'System',
        lastEditBy: this.currentData.lastEditBy || 'System'
      });
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.receivableForm.valid) {
      const formValue = this.receivableForm.value;
      const receivable: Receivable = {
        id: formValue.id,
        trxRef: formValue.trxRef,
        trxDate: new Date(formValue.trxDate),
        amount: parseFloat(formValue.amount),
        entityId: formValue.entityId,
        remarks: formValue.remarks || '',
        isActive: formValue.isActive,
        isArchived: formValue.isArchived,
        isPrivate: formValue.isPrivate,
        createdBy: formValue.createdBy || 'System',
        lastEditBy: formValue.lastEditBy || 'System'
      };
      this.saveRecordClicked.emit(receivable);
    }
  }

  onAdd(): void {
    this.onSubmit();
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }

  getEntityName(entityId: number): string {
    const entity = this.entities.find(e => e.id === entityId);
    return entity ? entity.name : 'Unknown';
  }
}
