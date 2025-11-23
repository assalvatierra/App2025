import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface JobService {
  id: number;
  jobMainId: number;
  particulars: string;
  dateStart: Date ;
  dateEnd: Date;
  quotedAmt: number;
  supplierAmt: number;
  createdBy: string;
  createdOn: Date;
  lastEditBy: string;
  lastEditOn: Date;
  isArchived: boolean;
  isPrivate: boolean;
  isActive: boolean;
  serviceItemId: number;
  supplierId: number;
  itemStatusId: number;
  sortOrder: number;
  // Add or remove properties here to match the new JobService.cs definition
}

@Injectable({
  providedIn: 'root'
})
export class ApiJobServiceService {
  //private apiUrl = '/api/jobservices'; // Adjust based on your API endpoint
  private apiUrl = 'http://localhost:5157/api/jobservices';

  constructor(private http: HttpClient) { }

  getJobServices(): Observable<JobService[]> {

    return this.http.get<JobService[]>(this.apiUrl);

  //  return this.http.get<JobService[]>(this.apiUrl).pipe(
  //    map((res: any) => {
  //      return res.map((item: any) => ({
  //        id: item.id,
  //        jobId: item.jobMainId,
  //        serviceDate: item.serviceDate,
  //        description: item.description,
  //        serviceTypeId: item.serviceTypeId,
  //        cost: item.cost,
  //        createdOn: item.createdOn,
  //        createdBy: item.createdBy,
  //        lastEditOn: item.lastEditOn,
  //        lastEditBy: item.lastEditBy,
  //        statusId: item.statusId
  //      }));
  //    })
  //  );
  }

  getJobService(id: number): Observable<JobService> {
    return this.http.get<JobService>(`${this.apiUrl}/${id}`);

    //return this.http.get<JobService>(`${this.apiUrl}/${id}`).pipe(
    //  map((res: any)=> {
    //    // Defensive: handle missing or unexpected fields
    //    if (!res) {
    //      throw new Error('JobService not found');
    //    }
    //    return {
    //      id: res.id,
    //      jobId: res.jobMainId // Ensure API returns 'jobMainId'
    //      //serviceDate: res.serviceDate ? new Date(res.serviceDate) : null,
    //      //description: res.description ?? '',
    //      //serviceTypeId: res.serviceTypeId ?? 0,
    //      //cost: res.cost ?? 0,
    //      //createdOn: res.createdOn ? new Date(res.createdOn) : null,
    //      //createdBy: res.createdBy ?? '',
    //      //lastEditOn: res.lastEditOn ? new Date(res.lastEditOn) : null,
    //      //lastEditBy: res.lastEditBy ?? '',
    //      //statusId: res.statusId ?? 0
    //    };
    //  })
    //  // Optionally, add error handling here if desired
    //);
  }

  getJobsServiceByJobId(jobId: number): Observable<JobService[]> {
    return this.http.get<JobService[]>(`${this.apiUrl}/byJob/${jobId}`);
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
