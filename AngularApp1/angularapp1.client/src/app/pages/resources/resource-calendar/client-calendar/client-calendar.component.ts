import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ApiResourceCalendarService } from '../../../../core/services/api-resource-calendar.service';
import { JobCalendarDto, JobServiceCalendarDto } from '../../../../core/models/resource-calendar.model';

@Component({
  selector: 'app-client-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './client-calendar.component.html',
  styleUrls: ['./client-calendar.component.css']
})
export class ClientCalendarComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'jobReference',
    'customerName',
    'serviceItemName',
    'dateStart',
    'dateEnd',
    'particulars',
    'resourceStatus',
    'assignedResources',
    'requirements'
  ];

  dataSource = new MatTableDataSource<JobServiceWithJob>();
  isLoading = false;
  uniqueCustomers: string[] = [];
  calendarDays: Date[] = [];
  dateFrom: Date;
  dateTo: Date;

  constructor(private calendarService: ApiResourceCalendarService) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.dateFrom = new Date(today);

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);
    this.dateTo = sevenDaysLater;
  }

  ngOnInit(): void {
    this.loadJobServices();
    this.generateCalendarDays();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadJobServices(): void {
    this.isLoading = true;

    // Get current month date range
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.calendarService.getJobsCalendar({ startDate, endDate }).subscribe({
      next: (jobs: JobCalendarDto[]) => {
        const jobServices = this.flattenJobServices(jobs);
        this.dataSource.data = jobServices;
        this.updateUniqueCustomers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading job services:', error);
        this.isLoading = false;
      }
    });
  }

  private flattenJobServices(jobs: JobCalendarDto[]): JobServiceWithJob[] {
    const result: JobServiceWithJob[] = [];

    jobs.forEach(job => {
      job.services.forEach(service => {
        result.push({
          ...service,
          jobReference: job.jobReference,
          customerName: job.customerName || ''
        });
      });
    });

    return result;
  }

  private updateUniqueCustomers(): void {
    const customerSet = new Set<string>();
    this.dataSource.data.forEach(service => {
      if (service.customerName && service.customerName.trim() !== '') {
        customerSet.add(service.customerName);
      }
    });
    this.uniqueCustomers = Array.from(customerSet).sort();
  }

  private generateCalendarDays(): void {
    this.calendarDays = [];

    const currentDate = new Date(this.dateFrom);
    currentDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.dateTo);
    endDate.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      this.calendarDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  applyDateFilter(): void {
    if (this.dateFrom && this.dateTo) {
      if (this.dateFrom > this.dateTo) {
        alert('Date From must be before or equal to Date To');
        return;
      }
      this.generateCalendarDays();
    }
  }

  formatCalendarDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  formatDayOfWeek(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRequirementsText(requirements: any[]): string {
    if (!requirements || requirements.length === 0) {
      return 'None';
    }
    return requirements
      .map(req => `${req.itemTypeName || 'Unknown'} (${req.requiredQty})`)
      .join(', ');
  }

  getAssignedResourcesText(assignedResources: any[]): string {
    if (!assignedResources || assignedResources.length === 0) {
      return 'None';
    }
    return assignedResources
      .map(res => `${res.resourceName}${res.resourceCode ? ' (' + res.resourceCode + ')' : ''}`)
      .join(', ');
  }

  getResourceStatusIcon(service: any): string {
    return service.hasResourcesAssigned ? 'check_circle' : 'warning';
  }

  getResourceStatusColor(service: any): string {
    return service.hasResourcesAssigned ? 'primary' : 'warn';
  }

  getResourceStatusText(service: any): string {
    if (service.hasResourcesAssigned) {
      const count = service.assignedResources?.length || 0;
      return `${count} Resource${count !== 1 ? 's' : ''} Assigned`;
    }
    return 'No Resources Assigned';
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString();
  }
}

interface JobServiceWithJob extends JobServiceCalendarDto {
  jobReference: string;
  customerName: string;
}
