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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { ApiResourceCalendarService } from '../../../../core/services/api-resource-calendar.service';
import { JobCalendarDto, JobServiceCalendarDto } from '../../../../core/models/resource-calendar.model';
import { ServiceRequirementCellComponent, ServiceRequirementCellItem } from './service-requirement-cell/service-requirement-cell.component';
import { AssignedResourceCellComponent, AssignedResourceCellItem } from './assigned-resource-cell/assigned-resource-cell.component';


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
    MatNativeDateModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatExpansionModule,
    ServiceRequirementCellComponent,
    AssignedResourceCellComponent
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
  calendarData: Map<string, ServiceRequirementCellItem[]> = new Map();
  assignedResourceData: Map<string, AssignedResourceCellItem[]> = new Map();
  viewMode: 'compact' | 'expanded' = 'compact';
  densityMode: 'comfortable' | 'compact' | 'dense' = 'compact';
  layoutMode: 'calendar' | 'stack' = 'calendar';

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
        this.populateCalendarData();
        this.populateAssignedResourceData();
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
      this.populateCalendarData();
      this.populateAssignedResourceData();
    }
  }

  private populateCalendarData(): void {
    this.calendarData.clear();

    this.dataSource.data.forEach(service => {
      if (!service.customerName || !service.requirements || service.requirements.length === 0) {
        return;
      }

      const serviceStartDate = service.dateStart ? new Date(service.dateStart) : null;
      const serviceEndDate = service.dateEnd ? new Date(service.dateEnd) : null;

      if (!serviceStartDate || !serviceEndDate) {
        return;
      }

      serviceStartDate.setHours(0, 0, 0, 0);
      serviceEndDate.setHours(0, 0, 0, 0);

      service.requirements.forEach(requirement => {
        const currentDate = new Date(serviceStartDate);

        while (currentDate <= serviceEndDate) {
          const key = this.getCalendarKey(service.customerName, currentDate);

          if (!this.calendarData.has(key)) {
            this.calendarData.set(key, []);
          }

          const cellItem: ServiceRequirementCellItem = {
            customerId: service.jobMainId,
            customerName: service.customerName,
            dateFrom: new Date(serviceStartDate),
            dateTo: new Date(serviceEndDate),
            itemType: requirement.itemTypeName || 'Unknown',
            requiredQty: requirement.requiredQty,
            notes: requirement.notes || service.particulars || '',
            jobReference: service.jobReference
          };

          this.calendarData.get(key)?.push(cellItem);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });
  }

  private populateAssignedResourceData(): void {
    this.assignedResourceData.clear();

    this.dataSource.data.forEach(service => {
      if (!service.customerName || !service.assignedResources || service.assignedResources.length === 0) {
        return;
      }

      const serviceStartDate = service.dateStart ? new Date(service.dateStart) : null;
      const serviceEndDate = service.dateEnd ? new Date(service.dateEnd) : null;

      if (!serviceStartDate || !serviceEndDate) {
        return;
      }

      serviceStartDate.setHours(0, 0, 0, 0);
      serviceEndDate.setHours(0, 0, 0, 0);

      service.assignedResources.forEach(resource => {
        const currentDate = new Date(serviceStartDate);

        while (currentDate <= serviceEndDate) {
          const key = this.getCalendarKey(service.customerName, currentDate);

          if (!this.assignedResourceData.has(key)) {
            this.assignedResourceData.set(key, []);
          }

          const cellItem: AssignedResourceCellItem = {
            jobServiceResourceId: resource.jobServiceResourceId,
            resourceId: resource.resourceId,
            resourceName: resource.resourceName,
            resourceCode: resource.resourceCode,
            resourceType: resource.resourceType || 'Other',
            customerName: service.customerName,
            jobReference: service.jobReference,
            dateFrom: new Date(serviceStartDate),
            dateTo: new Date(serviceEndDate),
            notes: service.particulars
          };

          this.assignedResourceData.get(key)?.push(cellItem);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });
  }

  private getCalendarKey(customerName: string, date: Date): string {
    const dateStr = date.toISOString().split('T')[0];
    return `${customerName}|${dateStr}`;
  }

  getCellItems(customer: string, day: Date): ServiceRequirementCellItem[] {
    const key = this.getCalendarKey(customer, day);
    return this.calendarData.get(key) || [];
  }

  getAssignedResources(customer: string, day: Date): AssignedResourceCellItem[] {
    const key = this.getCalendarKey(customer, day);
    return this.assignedResourceData.get(key) || [];
  }

  hasCellData(customer: string, day: Date): boolean {
    const items = this.getCellItems(customer, day);
    return items.length > 0;
  }

  hasAssignedResources(customer: string, day: Date): boolean {
    const resources = this.getAssignedResources(customer, day);
    return resources.length > 0;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'compact' ? 'expanded' : 'compact';
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

  // Quick Win #1: Check if date is weekend
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  }

  // Quick Win #2: Check if date is today
  isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate.getTime() === today.getTime();
  }
}

interface JobServiceWithJob extends JobServiceCalendarDto {
  jobReference: string;
  customerName: string;
}
