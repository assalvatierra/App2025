import { Component, Inject, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobSchedule } from 'src/app/core/services/api-job-schedule.service';
import { ApiService } from 'src/app/core/api.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-job-schedule-dialog',
  standalone: true,
  templateUrl: './job-schedule-dialog.component.html',
  styleUrls: ['./job-schedule-dialog.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class JobScheduleDialogComponent implements OnInit {
  public jobServices: any[] = [];
  public form!: FormGroup;
  public itemTypes: any[] = [];
  public itemStatuses: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<JobScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    // Do not assign jobServices or build form here
  }


  ngOnInit(): void {
    // Assign jobServices and build form in ngOnInit for correct binding
    this.jobServices = this.data.jobServices || [];
    // If jobServiceId is present, use the selected jobService's dateStart as estimatedDate
    let estimatedDate = this.data.estimated ? new Date(this.data.estimated) : null;
    if (!estimatedDate && this.data.jobServiceId && this.jobServices && this.jobServices.length > 0) {
      const selectedService = this.jobServices.find(s => s.id === this.data.jobServiceId);
      if (selectedService && selectedService.dateStart) {
        estimatedDate = new Date(selectedService.dateStart);
      }
    }
    const actualDate = this.data.actual ? new Date(this.data.actual) : null;
    // Determine initial leadtime radio value and other value
    let leadtimeRadio: any = null;
    let leadtimeOther: any = '';
    if (this.data.leadtime === 1 || this.data.leadtime === '1') {
      leadtimeRadio = 1;
    } else if (this.data.leadtime === 1.5 || this.data.leadtime === '1.5') {
      leadtimeRadio = 1.5;
    } else if (this.data.leadtime === 2 || this.data.leadtime === '2') {
      leadtimeRadio = 2;
    } else if (this.data.leadtime) {
      leadtimeRadio = 'other';
      leadtimeOther = this.data.leadtime;
    }
    this.form = this.fb.group({
      id: [this.data.id],
      jobServiceId: [this.data.jobServiceId, Validators.required],
      estimatedDate: [estimatedDate ? estimatedDate : null],
      estimatedTime: [estimatedDate ? estimatedDate.toISOString().substring(11, 16) : ''],
      actualDate: [actualDate ? actualDate : null],
      actualTime: [actualDate ? actualDate.toISOString().substring(11, 16) : ''],
      leadtime: [leadtimeRadio],
      leadtimeOther: [leadtimeOther],
      notes: [this.data.notes],
      itemTypeId: [this.data.itemTypeId],
      itemStatusId: [this.data.itemStatusId]
    });
    // Filter itemTypes and itemStatuses by class name 'JobSchedule'
    this.api.getItemTypesByClassName('JobSchedule').subscribe(types => this.itemTypes = types);
    this.api.getItemStatusesByClassName('JobSchedule').subscribe(statuses => this.itemStatuses = statuses);
  }

  onSave() {
    if (this.form.valid) {
      const value = this.form.value;
      // Combine date and time fields into ISO strings or null
      const combineDateTime = (date: Date, time: string) => {
        if (!date || !time) return null;
        const [hours, minutes] = time.split(':');
        const dt = new Date(date);
        dt.setHours(Number(hours), Number(minutes), 0, 0);
        return dt.toISOString();
      };
      // Determine leadtime value
      let leadtimeValue = value.leadtime === 'other' ? value.leadtimeOther : value.leadtime;
      const result = {
        ...value,
        leadtime: leadtimeValue,
        estimated: combineDateTime(value.estimatedDate, value.estimatedTime),
        actual: combineDateTime(value.actualDate, value.actualTime)
      };
      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onJobServiceChange(jobServiceId: number) {
    const selectedService = this.jobServices.find(s => s.id === jobServiceId);
    if (selectedService && selectedService.dateStart) {
      this.form.patchValue({
        estimatedDate: new Date(selectedService.dateStart)
      });
    }
  }
}
