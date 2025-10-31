import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface JobService {
  id: number;
  jobId: number;
  serviceDate: Date;
  description: string;
  serviceTypeId: number;
  cost: number;
  createdOn: Date;
  createdBy: string;
  lastEditOn: Date;
  lastEditBy: string;
  statusId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiJobServiceService {
  //private apiUrl = '/api/jobservices'; // Adjust based on your API endpoint
  private apiUrl = 'http://localhost:5157/api/jobservices';

  constructor(private http: HttpClient) { }

  getJobServices(): Observable<JobService[]> {
    return this.http.get<JobService[]>(this.apiUrl).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          jobId: item.jobId,
          serviceDate: item.serviceDate,
          description: item.description,
          serviceTypeId: item.serviceTypeId,
          cost: item.cost,
          createdOn: item.createdOn,
          createdBy: item.createdBy,
          lastEditOn: item.lastEditOn,
          lastEditBy: item.lastEditBy,
          statusId: item.statusId
        }));
      })
    );
  }

  getJobService(id: number): Observable<JobService> {
    return this.http.get<JobService>(`${this.apiUrl}/${id}`);
  }

  createJobService(jobService: JobService): Observable<JobService> {
    return this.http.post<JobService>(this.apiUrl, jobService);
  }

  updateJobService(id: number, jobService: JobService): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jobService);
  }

  deleteJobService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
