import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface JobServiceRequirement {
  id: number;
  jobServiceId: number;
  requiredQty: number;
  itemTypeId?: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiJobServiceRequirementService {
  private apiUrl = 'http://localhost:5157/api/JobServiceRequirements';

  constructor(private http: HttpClient) { }

  getJobServiceRequirements(): Observable<JobServiceRequirement[]> {
    return this.http.get<JobServiceRequirement[]>(this.apiUrl);
  }

  getJobServiceRequirement(id: number): Observable<JobServiceRequirement> {
    return this.http.get<JobServiceRequirement>(`${this.apiUrl}/${id}`);
  }

  getRequirementsByJobService(jobServiceId: number): Observable<JobServiceRequirement[]> {
    return this.http.get<JobServiceRequirement[]>(`${this.apiUrl}/ByJobService/${jobServiceId}`);
  }

  createJobServiceRequirement(requirement: JobServiceRequirement): Observable<JobServiceRequirement> {
    return this.http.post<JobServiceRequirement>(this.apiUrl, requirement);
  }

  updateJobServiceRequirement(id: number, requirement: JobServiceRequirement): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, requirement);
  }

  deleteJobServiceRequirement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
