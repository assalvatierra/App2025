import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';
import { ApiResourceCalendarService } from '../../../core/services/api-resource-calendar.service';
import {
  ResourceCalendarDto,
  CalendarDayDto,
  CalendarEntryDto,
  ResourceOption,
  StatusOption
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    UiPageTitleComponent
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

    this.calendarService.getCalendarData(filterOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // Generate calendar days first
          this.generateCalendarDays(filterOptions.startDate, filterOptions.endDate);
          
          // If no resource filter is applied, ensure ALL resources are shown
          if (!filterOptions.resourceIds || filterOptions.resourceIds.length === 0) {
            this.calendarData = this.ensureAllResourcesDisplayed(data);
          } else {
            // If resources are filtered, only show filtered resources
            this.calendarData = data;
          }
          
          console.log('Calendar data loaded:', this.calendarData.length, 'resources');
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
}
