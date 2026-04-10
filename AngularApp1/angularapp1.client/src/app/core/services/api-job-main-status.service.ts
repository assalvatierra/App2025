import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiJobMainStatusService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getJobMainStatusList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/JobMainStatus`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          jobMainId: item.jobMainId,
          itemStatusId: item.itemStatusId,
          statusDate: item.statusDate,
          remarks: item.remarks,
          createdBy: item.createdBy,
          createdOn: item.createdOn,
          lastEditBy: item.lastEditBy,
          lastEditOn: item.lastEditOn,
          isArchived: item.isArchived,
          isPrivate: item.isPrivate,
          isActive: item.isActive
        }));
      })
    );
  }

  getJobMainStatusByJobId(jobMainId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/JobMainStatus/ByJobMain/${jobMainId}`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          jobMainId: item.jobMainId,
          itemStatusId: item.itemStatusId,
          statusDate: item.statusDate,
          remarks: item.remarks,
          createdBy: item.createdBy,
          createdOn: item.createdOn,
          lastEditBy: item.lastEditBy,
          lastEditOn: item.lastEditOn,
          isArchived: item.isArchived,
          isPrivate: item.isPrivate,
          isActive: item.isActive
        }));
      })
    );
  }

  getJobMainStatus(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/JobMainStatus/${id}`).pipe(
      map((item: any) => ({
        id: item.id,
        jobMainId: item.jobMainId,
        itemStatusId: item.itemStatusId,
        statusDate: item.statusDate,
        remarks: item.remarks,
        createdBy: item.createdBy,
        createdOn: item.createdOn,
        lastEditBy: item.lastEditBy,
        lastEditOn: item.lastEditOn,
        isArchived: item.isArchived,
        isPrivate: item.isPrivate,
        isActive: item.isActive
      }))
    );
  }

  addJobMainStatus(data: any): Observable<any> {
    const payload = {
      id: data.id || 0,
      jobMainId: data.jobMainId,
      itemStatusId: data.itemStatusId,
      statusDate: data.statusDate,
      remarks: data.remarks,
      createdOn: data.createdOn,
      createdBy: data.createdBy,
      lastEditOn: data.lastEditOn,
      lastEditBy: data.lastEditBy,
      isArchived: data.isArchived || false,
      isPrivate: data.isPrivate || false,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    return this.http.post<any>(`${this.url}/api/JobMainStatus`, payload);
  }

  updateJobMainStatus(id: number, data: any): Observable<any> {
    const payload = {
      id: data.id,
      jobMainId: data.jobMainId,
      itemStatusId: data.itemStatusId,
      statusDate: data.statusDate,
      remarks: data.remarks,
      createdOn: data.createdOn,
      createdBy: data.createdBy,
      lastEditOn: data.lastEditOn,
      lastEditBy: data.lastEditBy,
      isArchived: data.isArchived || false,
      isPrivate: data.isPrivate || false,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    return this.http.put<any>(`${this.url}/api/JobMainStatus/${id}`, payload);
  }

  deleteJobMainStatus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/JobMainStatus/${id}`);
  }
}
