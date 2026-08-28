import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface JobSchedule {
  id: number;
  jobServiceId?: number;
  estimated?: string | Date | null;
  actual?: string | Date | null;
  leadtime?: number | null;
  notes?: string | null;
  itemTypeId?: number | null;
  itemStatusId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ApiJobScheduleService {
  //private url = '/api/JobSchedule';
  private url = environment.apiConfig.uri + '/api/JobSchedule';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JobSchedule[]> {
    debugger;
    return this.http.get<JobSchedule[]>(this.url);
  }

  get(id: number): Observable<JobSchedule> {
    return this.http.get<JobSchedule>(`${this.url}/${id}`);
  }

  getByJobService(jobServiceId: number): Observable<JobSchedule[]> {
    debugger;
    return this.http.get<JobSchedule[]>(`${this.url}/ByJobService/${jobServiceId}`);
  }

  getByJobId(jobMainId: number): Observable<JobSchedule[]> {
    return this.http.get<JobSchedule[]>(`${this.url}/ByJobId/${jobMainId}`);
  }

  create(jobSchedule: JobSchedule): Observable<JobSchedule> {
    return this.http.post<JobSchedule>(this.url, jobSchedule);
  }

  update(id: number, jobSchedule: JobSchedule): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, jobSchedule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
