
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobSchedule } from 'src/app/core/services/api-job-schedule.service';
import { ApiService } from 'src/app/core/api.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-schedule-dialog',
  standalone: true,
  templateUrl: './job-schedule-dialog.component.html',
  styleUrls: ['./job-schedule-dialog.component.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class JobScheduleDialogComponent implements OnInit {
  jobServices: any[] = [];
  form: FormGroup;
  itemTypes: any[] = [];
  itemStatuses: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<JobScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.jobServices = data.jobServices || [];
    this.form = this.fb.group({
      id: [data.id],
      jobServiceId: [data.jobServiceId, Validators.required],
      estimated: [data.estimated],
      actual: [data.actual],
      leadtime: [data.leadtime],
      notes: [data.notes],
      itemTypeId: [data.itemTypeId],
      itemStatusId: [data.itemStatusId]
    });
  }

  ngOnInit(): void {
    this.api.getItemTypes().subscribe(types => this.itemTypes = types);
    this.api.getItemStatuses().subscribe(statuses => this.itemStatuses = statuses);
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
