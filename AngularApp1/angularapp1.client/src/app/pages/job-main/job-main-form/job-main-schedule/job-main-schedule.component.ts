import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiJobScheduleService, JobSchedule } from 'src/app/core/services/api-job-schedule.service';
import { JobScheduleDialogComponent } from './job-schedule-dialog/job-schedule-dialog.component';
import { ApiJobServiceService, JobService } from 'src/app/core/services/api-job-service.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-job-main-schedule',
  standalone: true,
  templateUrl: './job-main-schedule.component.html',
  styleUrls: ['./job-main-schedule.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    JobScheduleDialogComponent
  ]
})
export class JobMainScheduleComponent implements AfterViewInit, OnChanges {
  @Input() jobMainId!: number;
  jobSchedules: JobSchedule[] = [];
  jobServices: JobService[] = [];
  displayedColumns = ['id', 'jobServiceId', 'actions'];

  constructor(
    private jobScheduleService: ApiJobScheduleService,
    private jobServiceService: ApiJobServiceService,
    private dialog: MatDialog
  ) {}


  ngAfterViewInit(): void {
    setTimeout(() => this.loadJobServices());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobMainId'] && this.jobMainId && this.jobMainId !== 0) {
      this.loadJobSchedules();
    }
  }

  loadJobSchedules() {
    debugger;
    if (!this.jobMainId) return;
    this.jobScheduleService.getByJobId(this.jobMainId).subscribe(data => {
      this.jobSchedules = data;
    });
  }

  loadJobServices() {
    if (!this.jobMainId) return;
    this.jobServiceService.getJobsServiceByJobId(this.jobMainId).subscribe(services => {
      this.jobServices = services;
    });
  }

  openJobScheduleDialog(jobSchedule?: JobSchedule) {
    const dialogRef = this.dialog.open(JobScheduleDialogComponent, {
      width: '500px',
      data: {
        ...(jobSchedule ? { ...jobSchedule } : { jobServiceId: this.jobMainId }),
        jobServices: this.jobServices
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Sanitize result for API
        const toIsoString = (val: any) => {
          if (!val) return null;
          if (typeof val === 'string') return val;
          if (val instanceof Date) return val.toISOString();
          return val;
        };
        const sanitized: any = {
          jobServiceId: result.jobServiceId,
          estimated: toIsoString(result.estimated),
          actual: toIsoString(result.actual),
          leadtime: result.leadtime !== undefined && result.leadtime !== null && result.leadtime !== '' ? Number(result.leadtime) : null,
          notes: result.notes ?? null,
          itemTypeId: result.itemTypeId ?? null,
          itemStatusId: result.itemStatusId ?? null
        };
        if (result.id) {
          sanitized.id = result.id;
          this.jobScheduleService.update(sanitized.id, sanitized).subscribe(() => this.loadJobSchedules());
        } else {
          debugger;
          // Example: Adding error handling to your subscription
          this.jobScheduleService.create(sanitized).subscribe({
            next: (res) => console.log('Success!', res),
            error: (err) => {
              // Access the specific server-side validation messages
              console.error('Backend returned:', err.error);
            }
          });

          //this.jobScheduleService.create(sanitized).subscribe(() => this.loadJobSchedules());
        }
      }
    });
  }

  deleteJobSchedule(jobSchedule: JobSchedule) {
    if (confirm('Delete this job schedule?')) {
      this.jobScheduleService.delete(jobSchedule.id).subscribe(() => this.loadJobSchedules());
    }
  }
}
