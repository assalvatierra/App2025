import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet, JobTimesheet, JobServiceTimesheet, ApprovalRequest } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTimesheetsService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all timesheets or filter by resourceId, date range, and/or statusId
   * @param resourceId Optional resource ID filter
   * @param startDate Optional start date filter
   * @param endDate Optional end date filter
   * @param statusId Optional status ID filter
   * @returns Observable of Timesheet array
   */
  getTimesheets(
    resourceId?: number,
    startDate?: Date,
    endDate?: Date,
    statusId?: number
  ): Observable<Timesheet[]> {
    let params = new HttpParams();
    
    if (resourceId) {
      params = params.set('resourceId', resourceId.toString());
    }
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    if (statusId) {
      params = params.set('statusId', statusId.toString());
    }

    return this.http.get<Timesheet[]>(`${this.baseUrl}/api/Timesheets`, { params }).pipe(
      map((res: any) => {
        return res.map((timesheet: any) => this.mapTimesheet(timesheet));
      })
    );
  }

  /**
   * Get a single timesheet by ID
   * @param id Timesheet ID
   * @returns Observable of Timesheet
   */
  getTimesheet(id: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.baseUrl}/api/Timesheets/${id}`).pipe(
      map((timesheet: any) => this.mapTimesheet(timesheet))
    );
  }

  /**
   * Get timesheets by resource ID
   * @param resourceId Resource ID
   * @returns Observable of Timesheet array
   */
  getTimesheetsByResource(resourceId: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}/api/Timesheets/ByResource/${resourceId}`).pipe(
      map((res: any) => {
        return res.map((timesheet: any) => this.mapTimesheet(timesheet));
      })
    );
  }

  /**
   * Get timesheets by date range
   * @param startDate Start date
   * @param endDate End date
   * @returns Observable of Timesheet array
   */
  getTimesheetsByDateRange(startDate: Date, endDate: Date): Observable<Timesheet[]> {
    let params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<Timesheet[]>(`${this.baseUrl}/api/Timesheets/ByDateRange`, { params }).pipe(
      map((res: any) => {
        return res.map((timesheet: any) => this.mapTimesheet(timesheet));
      })
    );
  }

  /**
   * Get timesheets by status ID
   * @param statusId Status ID
   * @returns Observable of Timesheet array
   */
  getTimesheetsByStatus(statusId: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}/api/Timesheets/ByStatus/${statusId}`).pipe(
      map((res: any) => {
        return res.map((timesheet: any) => this.mapTimesheet(timesheet));
      })
    );
  }

  /**
   * Get job timesheets for a specific timesheet
   * @param id Timesheet ID
   * @returns Observable of JobTimesheet array
   */
  getTimesheetJobs(id: number): Observable<JobTimesheet[]> {
    return this.http.get<JobTimesheet[]>(`${this.baseUrl}/api/Timesheets/${id}/Jobs`);
  }

  /**
   * Get job service timesheets for a specific timesheet
   * @param id Timesheet ID
   * @returns Observable of JobServiceTimesheet array
   */
  getTimesheetJobServices(id: number): Observable<JobServiceTimesheet[]> {
    return this.http.get<JobServiceTimesheet[]>(`${this.baseUrl}/api/Timesheets/${id}/JobServices`);
  }

  /**
   * Add a new timesheet
   * @param timesheet Timesheet object
   * @returns Observable of created Timesheet
   */
  addTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.baseUrl}/api/Timesheets`, timesheet).pipe(
      map((timesheet: any) => this.mapTimesheet(timesheet))
    );
  }

  /**
   * Update an existing timesheet
   * @param id Timesheet ID
   * @param timesheet Updated Timesheet object
   * @returns Observable of any
   */
  updateTimesheet(id: number, timesheet: Timesheet): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Timesheets/${id}`, timesheet);
  }

  /**
   * Delete a timesheet
   * @param id Timesheet ID
   * @returns Observable of any
   */
  deleteTimesheet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Timesheets/${id}`);
  }

  /**
   * Submit a timesheet for approval
   * @param id Timesheet ID
   * @param statusId Optional status ID to set
   * @returns Observable of any
   */
  submitTimesheet(id: number, statusId?: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Timesheets/${id}/Submit`, statusId);
  }

  /**
   * Approve a timesheet
   * @param id Timesheet ID
   * @param request Optional approval request with statusId and remarks
   * @returns Observable of any
   */
  approveTimesheet(id: number, request?: ApprovalRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Timesheets/${id}/Approve`, request || {});
  }

  /**
   * Reject a timesheet
   * @param id Timesheet ID
   * @param request Rejection request with statusId and remarks
   * @returns Observable of any
   */
  rejectTimesheet(id: number, request: ApprovalRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Timesheets/${id}/Reject`, request);
  }

  /**
   * Helper method to map API response to Timesheet model
   * @param data Raw API data
   * @returns Mapped Timesheet object
   */
  private mapTimesheet(data: any): Timesheet {
    return {
      id: data.id,
      tsDate: new Date(data.tsDate),
      remarks: data.remarks,
      resourceId: data.resourceId,
      resourceId1: data.resourceId1,
      itemStatusId: data.itemStatusId,
      resource: data.resource,
      resourceId1Navigation: data.resourceId1Navigation
    };
  }
}
