import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { JobTimesheet, Resource, PayPeriod } from '../../../core/models/timesheet.model';

@Component({
  selector: 'app-timesheet-main',
  standalone: true,
  templateUrl: './timesheet-main.component.html',
  styleUrls: ['./timesheet-main.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class TimesheetMainComponent {
  @Input() timesheetForm!: FormGroup;
  @Input() resourceIdLabel: string = 'Resource/Employee';
  @Input() resourceId1Label: string = 'Approver (Optional)';
  @Input() resourcesForResourceId: Resource[] = [];
  @Input() resourcesForResourceId1: Resource[] = [];
  @Input() statuses: any[] = [];
  @Input() payPeriods: PayPeriod[] = [];
  @Input() showAddBtn: boolean = false;
  @Input() featureLoaded: boolean = false;
  @Input() dataloading: boolean = false;
  @Input() jobTimesheets: JobTimesheet[] = [];
  @Input() showJobLinkForm: boolean = false;
  @Input() jobMains: any[] = [];
  @Input() selectedJobMainId: number | null = null;
  @Input() jobLinkLoading: boolean = false;
  @Input() allowMultiJobLink: boolean = true;

  @Output() showJobLinkFormChange = new EventEmitter<boolean>();
  @Output() selectedJobMainIdChange = new EventEmitter<number | null>();
  @Output() linkJob = new EventEmitter<void>();
  @Output() cancelJobLink = new EventEmitter<void>();
  @Output() removeJobLink = new EventEmitter<JobTimesheet>();
  @Output() showJobLinkFormRequested = new EventEmitter<void>();

  onShowJobLinkForm(): void {
    this.showJobLinkFormRequested.emit();
  }

  onCancelJobLink(): void {
    this.cancelJobLink.emit();
  }

  onLinkJob(): void {
    this.linkJob.emit();
  }

  onRemoveJobLink(jt: JobTimesheet): void {
    this.removeJobLink.emit(jt);
  }

  onSelectedJobMainIdChange(value: number | null): void {
    this.selectedJobMainIdChange.emit(value);
  }
}
