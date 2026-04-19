import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil, forkJoin } from 'rxjs';

import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { ApiResourceCalendarService } from '../../../core/services/api-resource-calendar.service';
import { JobCardComponent, JobCardData } from './job-card/job-card.component';
import {
  ResourceCalendarDto,
  CalendarDayDto,
  CalendarEntryDto,
  ResourceOption,
  StatusOption,
  JobCalendarDto
} from '../../../core/models/resource-calendar.model';

@Component({
  selector: 'app-resource-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    UiPageTitleComponent,
    JobCardComponent
  ],
  templateUrl: './resource-calendar.component.html',
  styleUrls: ['./resource-calendar.component.css']
})
export class ResourceCalendarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  titleInfo = 'Resource Calendar';
  filterForm!: FormGroup;
  
  // Calendar data
  calendarData: ResourceCalendarDto[] = [];
  calendarDays: Date[] = [];
  jobsCalendar: JobCalendarDto[] = [];
  
  // Filter options
  availableResources: ResourceOption[] = [];
  availableStatuses: StatusOption[] = [];
  
  // Loading states
  isLoading = false;
  isLoadingFilters = false;
  
  // Current date range
  currentStartDate: Date;
  currentEndDate: Date;

  constructor(
    private fb: FormBuilder,
    private calendarService: ApiResourceCalendarService
  ) {
    // Initialize with current month
    const today = new Date();
    this.currentStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.currentEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadFilterOptions();
    this.loadCalendarData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [this.currentStartDate],
      endDate: [this.currentEndDate],
      selectedResources: [[]],
      selectedStatuses: [[]]
    });
  }

  private loadFilterOptions(): void {
    this.isLoadingFilters = true;
    
    // Load resources
    this.calendarService.getAvailableResources()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resources) => {
          this.availableResources = resources;
          console.log('Loaded resources:', resources.length);
        },
        error: (err) => {
          console.error('Error loading resources:', err);
        }
      });
    
    // Load statuses
    this.calendarService.getAvailableStatuses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (statuses) => {
          this.availableStatuses = statuses;
          console.log('Loaded statuses:', statuses.length);
          this.isLoadingFilters = false;
        },
        error: (err) => {
          console.error('Error loading statuses:', err);
          this.isLoadingFilters = false;
        }
      });
  }

  loadCalendarData(): void {
    const formValue = this.filterForm.value;
    
    this.isLoading = true;
    
    const filterOptions = {
      startDate: formValue.startDate || this.currentStartDate,
      endDate: formValue.endDate || this.currentEndDate,
      resourceIds: formValue.selectedResources || [],
      statusIds: formValue.selectedStatuses || []
    };

    // Load both resource calendar and jobs calendar
    forkJoin({
      resources: this.calendarService.getCalendarData(filterOptions),
      jobs: this.calendarService.getJobsCalendar(filterOptions)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ resources, jobs }) => {
          // Generate calendar days first
          this.generateCalendarDays(filterOptions.startDate, filterOptions.endDate);
          
          // If no resource filter is applied, ensure ALL resources are shown
          if (!filterOptions.resourceIds || filterOptions.resourceIds.length === 0) {
            this.calendarData = this.ensureAllResourcesDisplayed(resources);
          } else {
            // If resources are filtered, only show filtered resources
            this.calendarData = resources;
          }
          
          this.jobsCalendar = jobs;
          
          console.log('Calendar data loaded:', this.calendarData.length, 'resources');
          console.log('Jobs calendar loaded:', this.jobsCalendar.length, 'jobs');
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading calendar data:', err);
          this.isLoading = false;
        }
      });
  }

  /**
   * Ensure all available resources are displayed in the calendar,
   * even if they have no entries for the selected date range
   */
  private ensureAllResourcesDisplayed(calendarData: ResourceCalendarDto[]): ResourceCalendarDto[] {
    const resourcesWithData = new Map<number, ResourceCalendarDto>();
    
    // First, add all resources that have calendar data
    calendarData.forEach(resource => {
      resourcesWithData.set(resource.resourceId, resource);
    });
    
    // Then, add resources that don't have calendar data with empty days
    this.availableResources.forEach(resource => {
      if (!resourcesWithData.has(resource.id)) {
        // Create empty calendar data for this resource
        const emptyResource: ResourceCalendarDto = {
          resourceId: resource.id,
          resourceName: resource.name,
          resourceCode: resource.code || '',
          days: this.calendarDays.map(date => ({
            date: date,
            entries: []
          }))
        };
        resourcesWithData.set(resource.id, emptyResource);
      }
    });
    
    // Convert map back to array and sort by resource name
    return Array.from(resourcesWithData.values())
      .sort((a, b) => a.resourceName.localeCompare(b.resourceName));
  }

  private generateCalendarDays(startDate: Date, endDate: Date): void {
    this.calendarDays = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      this.calendarDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  onApplyFilter(): void {
    const formValue = this.filterForm.value;
    this.currentStartDate = formValue.startDate;
    this.currentEndDate = formValue.endDate;
    this.loadCalendarData();
  }

  onResetFilter(): void {
    const today = new Date();
    this.currentStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.currentEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    this.filterForm.patchValue({
      startDate: this.currentStartDate,
      endDate: this.currentEndDate,
      selectedResources: [],
      selectedStatuses: []
    });
    
    this.loadCalendarData();
  }

  navigateToPreviousMonth(): void {
    this.currentStartDate = new Date(
      this.currentStartDate.getFullYear(),
      this.currentStartDate.getMonth() - 1,
      1
    );
    this.currentEndDate = new Date(
      this.currentStartDate.getFullYear(),
      this.currentStartDate.getMonth() + 1,
      0
    );
    
    this.filterForm.patchValue({
      startDate: this.currentStartDate,
      endDate: this.currentEndDate
    });
    
    this.loadCalendarData();
  }

  navigateToNextMonth(): void {
    this.currentStartDate = new Date(
      this.currentStartDate.getFullYear(),
      this.currentStartDate.getMonth() + 1,
      1
    );
    this.currentEndDate = new Date(
      this.currentStartDate.getFullYear(),
      this.currentStartDate.getMonth() + 1,
      0
    );
    
    this.filterForm.patchValue({
      startDate: this.currentStartDate,
      endDate: this.currentEndDate
    });
    
    this.loadCalendarData();
  }

  navigateToToday(): void {
    const today = new Date();
    this.currentStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.currentEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    this.filterForm.patchValue({
      startDate: this.currentStartDate,
      endDate: this.currentEndDate
    });
    
    this.loadCalendarData();
  }

  getEntriesForDate(resource: ResourceCalendarDto, date: Date): CalendarEntryDto[] {
    const day = resource.days.find(d => 
      this.isSameDay(new Date(d.date), date)
    );
    return day?.entries || [];
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatTime(timeSpan?: string): string {
    if (!timeSpan) return '';
    
    // TimeSpan from API comes as "HH:mm:ss"
    const parts = timeSpan.split(':');
    if (parts.length >= 2) {
      const hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes} ${ampm}`;
    }
    return timeSpan;
  }

  getDayOfWeek(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  getMonthYear(): string {
    return this.currentStartDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  onEntryClick(entry: CalendarEntryDto): void {
    console.log('Entry clicked:', entry);
    // TODO: Open detail dialog or navigate to job details
  }

  /**
   * Get job services (cards) for a specific date
   * Each service becomes a separate card displayed on its date range
   */
  getJobsForDate(date: Date): JobCardData[] {
    const cards: JobCardData[] = [];

    this.jobsCalendar.forEach(job => {
      job.services.forEach(service => {
        // Check if this service's date range includes the specified date
        if (service.dateStart && this.isDateInServiceRange(date, service.dateStart, service.dateEnd)) {
          cards.push({
            id: service.id, // Use service ID as the card ID
            jobMainId: job.jobMainId,
            jobReference: job.jobReference,
            customerName: job.customerName,
            service: {
              id: service.id,
              jobMainId: service.jobMainId,
              serviceItemId: service.serviceItemId,
              serviceItemName: service.serviceItemName,
              dateStart: service.dateStart,
              dateEnd: service.dateEnd,
              particulars: service.particulars,
              requirements: service.requirements.map(r => ({
                id: r.id,
                requiredQty: r.requiredQty,
                itemTypeId: r.itemTypeId,
                itemTypeName: r.itemTypeName,
                resourceType: r.resourceType,
                allocatedQuantity: r.allocatedQuantity,
                notes: r.notes
              }))
            }
          });
        }
      });
    });

    return cards;
  }

  /**
   * Check if a date is within the service's date range
   */
  private isDateInServiceRange(date: Date, startDate?: Date, endDate?: Date): boolean {
    if (!startDate) return false;

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = endDate ? new Date(endDate) : start;
    end.setHours(0, 0, 0, 0);
    
    return checkDate >= start && checkDate <= end;
  }

  /**
   * Check if a date is within the job's date range (legacy method, no longer used)
   */
  private isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    
    return checkDate >= start && checkDate <= end;
  }

  /**
   * Handle job card click
   */
  onJobClick(job: JobCardData): void {
    console.log('Job service clicked:', job);
    // TODO: Open job service details dialog or navigate to job service page
  }
}
