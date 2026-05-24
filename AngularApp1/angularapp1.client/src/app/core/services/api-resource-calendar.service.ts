import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  ResourceCalendarDto,
  CalendarFilterOptions,
  ResourceOption,
  StatusOption,
  JobCalendarDto
} from '../models/resource-calendar.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceCalendarService {
  private apiUrl = '/api/ResourceCalendar';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  /**
   * Get calendar rows (resources) for the provided date range.
   * Resolves item type by human-readable class name 'RESOURCE' and fetches resources by that type.
   * Falls back to active resources if no item type is found.
   */
  getCalendarResources(options: CalendarFilterOptions): Observable<ResourceCalendarDto[]> {
    return this.apiService.getItemTypesByClassName('RESOURCE').pipe(
      switchMap((types: any[]) => {
        if (types && types.length > 0) {
          const itemTypeId = types[0].id;
          return this.http.get<ResourceOption[]>(`/api/Resources/ByType/${itemTypeId}`);
        }
        return this.http.get<ResourceOption[]>(`/api/Resources/Active`);
      }),
      map((resources: ResourceOption[]) => {
        // Build day range
        const start = new Date(options.startDate);
        const end = new Date(options.endDate);
        const days: Date[] = [];
        const cur = new Date(start);
        cur.setHours(0, 0, 0, 0);
        while (cur <= end) {
          days.push(new Date(cur));
          cur.setDate(cur.getDate() + 1);
        }

        // Map resources into ResourceCalendarDto and include itemTypeId/sortOrder
        const rows: ResourceCalendarDto[] = resources.map(r => ({
          resourceId: r.id,
          resourceName: r.name,
          resourceCode: r.code || '',
          itemTypeId: r.itemTypeId,
          itemTypeName: r.itemTypeName,
          sortOrder: r.sortOrder,
          days: days.map(d => ({ date: new Date(d), entries: [] }))
        }));

        // Sort by itemTypeId, then sortOrder, then resourceName
        rows.sort((a, b) => {
          const aType = a.itemTypeId ?? 0;
          const bType = b.itemTypeId ?? 0;
          if (aType !== bType) return aType - bType;
          const aSort = a.sortOrder ?? 0;
          const bSort = b.sortOrder ?? 0;
          if (aSort !== bSort) return aSort - bSort;
          return a.resourceName.localeCompare(b.resourceName);
        });

        return rows;
      })
    );
  }

  /**
   * Get jobs with services for calendar display
   * @param options Filter options including date range
   * @returns Observable of job calendar data
   */
  getJobsCalendar(options: CalendarFilterOptions): Observable<JobCalendarDto[]> {
    let params = new HttpParams()
      .set('startDate', this.formatDate(options.startDate))
      .set('endDate', this.formatDate(options.endDate));

    if (options.statusIds && options.statusIds.length > 0) {
      params = params.set('statusIds', options.statusIds.join(','));
    }

    return this.http.get<JobCalendarDto[]>(`${this.apiUrl}/jobs`, { params }).pipe(
      map(data => this.mapJobCalendarData(data))
    );
  }

  /**
   * Get available resources for filtering
   * @returns Observable of resource options
   */
  getAvailableResources(): Observable<ResourceOption[]> {
    // Use calendar resources endpoint which includes itemTypeName
    return this.http.get<any[]>(`${this.apiUrl}/resources`).pipe(
      map(data => data.map(d => ({
        id: (d as any).id,
        name: (d as any).name,
        code: (d as any).code,
        itemTypeId: (d as any).itemTypeId,
        itemTypeName: (d as any).itemTypeName,
        sortOrder: (d as any).sortOrder
      })))
    );
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

  /**
   * Map job calendar data from API response
   * @param data Raw API response
   * @returns Mapped job calendar data
   */
  private mapJobCalendarData(data: any[]): JobCalendarDto[] {
    return data.map(job => ({
      ...job,
      services: job.services.map((service: any) => ({
        ...service,
        dateStart: service.dateStart ? new Date(service.dateStart) : undefined,
        dateEnd: service.dateEnd ? new Date(service.dateEnd) : undefined,
        requirements: service.requirements || []
      }))
    }));
  }
}
