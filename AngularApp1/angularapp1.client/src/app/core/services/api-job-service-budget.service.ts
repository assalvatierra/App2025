import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobServiceBudget } from '../models/job-service-budget.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiJobServiceBudgetService {
  private apiUrl = '/api/JobServiceBudget';

  constructor(private http: HttpClient,
    private authService: AuthService
) { }

  private getAuthOptions() {
    const token = this.authService.getToken();
    const accessToken = token?.startsWith('Bearer ')
      ? token.slice('Bearer '.length)
      : token;

    const headers = accessToken
      ? new HttpHeaders({ Authorization: `Bearer ${accessToken}` })
      : new HttpHeaders();

    return { headers };
  }

  /**
   * Get all job service budgets
   */
  getJobServiceBudgets(): Observable<JobServiceBudget[]> {
    return this.http.get<JobServiceBudget[]>(this.apiUrl,
      this.getAuthOptions());
  }

  /**
   * Get budgets by job main ID
   */
  getJobServiceBudgetsByJobId(jobMainId: number): Observable<JobServiceBudget[]> {
    return this.http.get<JobServiceBudget[]>(`${this.apiUrl}/ByJobIdWithBudgetForecast/${jobMainId}`,
      this.getAuthOptions());
  }

  /**
   * Get a single job service budget by ID
   */
  getJobServiceBudget(id: number): Observable<JobServiceBudget> {
    return this.http.get<JobServiceBudget>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get a single job service budget by record GUID
   */
  getJobServiceBudgetByGuid(recordGuid: string): Observable<JobServiceBudget> {
    return this.http.get<JobServiceBudget>(`${this.apiUrl}/ByGuid/${recordGuid}`);
  }

  /**
   * Create a new job service budget
   */
  createJobServiceBudget(jobServiceBudget: JobServiceBudget): Observable<JobServiceBudget> {
    return this.http.post<JobServiceBudget>(this.apiUrl, jobServiceBudget);
  }

  /**
   * Update an existing job service budget
   */
  updateJobServiceBudget(id: number, jobServiceBudget: JobServiceBudget): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jobServiceBudget);
  }

  /**
   * Delete a job service budget
   */
  deleteJobServiceBudget(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
