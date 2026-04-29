import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobSchedule {
  id: number;
  jobServiceId?: number;
  // Add other JobSchedule properties as needed
}

@Injectable({ providedIn: 'root' })
export class ApiJobScheduleService {
  private url = '/api/JobSchedule';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JobSchedule[]> {
    return this.http.get<JobSchedule[]>(this.url);
  }

  get(id: number): Observable<JobSchedule> {
    return this.http.get<JobSchedule>(`${this.url}/${id}`);
  }

  getByJobService(jobServiceId: number): Observable<JobSchedule[]> {
    return this.http.get<JobSchedule[]>(`${this.url}/ByJobService/${jobServiceId}`);
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
