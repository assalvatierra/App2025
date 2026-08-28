import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobServiceResource } from '../models/job-service-resource.model';
import { environment } from '../../../environments/environment';

export type { JobServiceResource };

@Injectable({
  providedIn: 'root'
})
export class ApiJobServiceResourceService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  /**
   * Get all job service resources
   * @returns Observable of JobServiceResource array
   */
  getJobServiceResources(): Observable<JobServiceResource[]> {
    return this.http.get<JobServiceResource[]>(`${this.baseUrl}/JobServiceResource`);
  }

  /**
   * Get a single job service resource by ID
   * @param id Job Service Resource ID
   * @returns Observable of JobServiceResource
   */
  getJobServiceResource(id: number): Observable<JobServiceResource> {
    return this.http.get<JobServiceResource>(`${this.baseUrl}/JobServiceResource/${id}`);
  }

  /**
   * Get job service resources by job service ID
   * @param jobServiceId Job Service ID
   * @returns Observable of JobServiceResource array
   */
  getByJobService(jobServiceId: number): Observable<JobServiceResource[]> {
    return this.http.get<JobServiceResource[]>(`${this.baseUrl}/JobServiceResource/ByJobService/${jobServiceId}`);
  }

  /**
   * Get job service resources by resource ID
   * @param resourceId Resource ID
   * @returns Observable of JobServiceResource array
   */
  getByResource(resourceId: number): Observable<JobServiceResource[]> {
    return this.http.get<JobServiceResource[]>(`${this.baseUrl}/JobServiceResource/ByResource/${resourceId}`);
  }

  /**
   * Add a new job service resource
   * @param jobServiceResource JobServiceResource object
   * @returns Observable of created JobServiceResource
   */
  addJobServiceResource(jobServiceResource: JobServiceResource): Observable<JobServiceResource> {
    return this.http.post<JobServiceResource>(`${this.baseUrl}/JobServiceResource`, jobServiceResource);
  }

  /**
   * Update an existing job service resource
   * @param id Job Service Resource ID
   * @param jobServiceResource Updated JobServiceResource object
   * @returns Observable of any
   */
  updateJobServiceResource(id: number, jobServiceResource: JobServiceResource): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/JobServiceResource/${id}`, jobServiceResource);
  }

  /**
   * Delete a job service resource
   * @param id Job Service Resource ID
   * @returns Observable of any
   */
  deleteJobServiceResource(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/JobServiceResource/${id}`);
  }
}
