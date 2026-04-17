import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ResourceCalendarDto,
  CalendarFilterOptions,
  ResourceOption,
  StatusOption
} from '../models/resource-calendar.model';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceCalendarService {
  private apiUrl = '/api/ResourceCalendar';

  constructor(private http: HttpClient) { }

  /**
   * Get resource calendar data for a specific date range
   * @param options Filter options including date range and optional resource/status filters
   * @returns Observable of resource calendar data
   */
  getCalendarData(options: CalendarFilterOptions): Observable<ResourceCalendarDto[]> {
    let params = new HttpParams()
      .set('startDate', this.formatDate(options.startDate))
      .set('endDate', this.formatDate(options.endDate));

    if (options.resourceIds && options.resourceIds.length > 0) {
      params = params.set('resourceIds', options.resourceIds.join(','));
    }

    if (options.statusIds && options.statusIds.length > 0) {
      params = params.set('statusIds', options.statusIds.join(','));
    }

    return this.http.get<ResourceCalendarDto[]>(this.apiUrl, { params }).pipe(
      map(data => this.mapCalendarData(data))
    );
  }

  /**
   * Get available resources for filtering
   * @returns Observable of resource options
   */
  getAvailableResources(): Observable<ResourceOption[]> {
    return this.http.get<ResourceOption[]>(`${this.apiUrl}/resources`);
  }

  /**
   * Get available statuses for filtering
   * @returns Observable of status options
   */
  getAvailableStatuses(): Observable<StatusOption[]> {
    return this.http.get<StatusOption[]>(`${this.apiUrl}/statuses`);
  }

  /**
   * Format date to ISO string (YYYY-MM-DD)
   * @param date Date to format
   * @returns Formatted date string
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Map API response to properly typed calendar data
   * Ensures dates are converted from strings to Date objects
   * @param data Raw API response
   * @returns Mapped calendar data
   */
  private mapCalendarData(data: any[]): ResourceCalendarDto[] {
    return data.map(resource => ({
      ...resource,
      days: resource.days.map((day: any) => ({
        ...day,
        date: new Date(day.date),
        entries: day.entries || []
      }))
    }));
  }
}
