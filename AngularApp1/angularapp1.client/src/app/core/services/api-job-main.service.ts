import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiJobMainService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getJobMains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/JobMains`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          jobDate: item.jobDate,
          description: item.description,
          createdOn: item.createdOn,
          createdBy: item.createdBy,
          lastEditOn: item.lastEditOn,
          lastEditBy: item.lastEditBy,
          itemStatusId: item.itemStatusId,
          businessUnitId: item.businessUnitId
        }));
      })
    );
  }

  getJobMain(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/JobMains/${id}`).pipe(
      map((item: any) => ({
        id: item.id,
        jobDate: item.jobDate,
        description: item.description,
        createdOn: item.createdOn,
        createdBy: item.createdBy,
        lastEditOn: item.lastEditOn,
        lastEditBy: item.lastEditBy,
        itemStatusId: item.itemStatusId,
        businessUnitId: item.businessUnitId
      }))
    );
  }

  addJobMain(data: any): Observable<any> {
    // Only send the specified fields
    const payload = {
      id: data.id,
      jobDate: data.jobDate,
      description: data.description,
      createdOn: data.createdOn,
      createdBy: data.createdBy,
      lastEditOn: data.lastEditOn,
      lastEditBy: data.lastEditBy,
      itemStatusId: data.itemStatusId,
      businessUnitId: data.businessUnitId
    };
    return this.http.post<any>(`${this.url}/api/JobMains`, payload);
  }

  updateJobMain(id: number, data: any): Observable<any> {
    const payload = {
      id: data.id,
      jobDate: data.jobDate,
      description: data.description,
      createdOn: data.createdOn,
      createdBy: data.createdBy,
      lastEditOn: data.lastEditOn,
      lastEditBy: data.lastEditBy,
      itemStatusId: data.itemStatusId,
      businessUnitId: data.businessUnitId
    };
    return this.http.put<any>(`${this.url}/api/JobMains/${id}`, payload);
  }

  deleteJobMain(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/JobMains/${id}`);
  }
}
