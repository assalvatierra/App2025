import { Component, Input, AfterViewInit } from '@angular/core';
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
export class JobMainScheduleComponent implements AfterViewInit {
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
    this.loadJobSchedules();
    setTimeout(() => this.loadJobServices());
  }

  loadJobSchedules    () {
    if (!this.jobMainId) return;
    this.jobScheduleService.getByJobService(this.jobMainId).subscribe(data => {
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
      width: '400px',
      data: {
        ...(jobSchedule ? { ...jobSchedule } : { jobServiceId: this.jobMainId }),
        jobServices: this.jobServices
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.jobScheduleService.update(result.id, result).subscribe(() => this.loadJobSchedules());
        } else {
          this.jobScheduleService.create(result).subscribe(() => this.loadJobSchedules());
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
