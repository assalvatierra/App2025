import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiJobMainService {

  private readonly url = '/api/JobMains';

  constructor(
    private http: HttpClient,
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

  getJobMains(): Observable<any[]> {
    const hdr = this.getAuthOptions();
    return this.http.get<any[]>(`${this.url}/List`, hdr);
  }

  getJobMain(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.getAuthOptions()).pipe(
      map((item: any) => ({
        id: item.id,
        jobDate: item.jobDate,
        description: item.description,
        createdOn: item.createdOn,
        createdBy: item.createdBy,
        lastEditOn: item.lastEditOn,
        lastEditBy: item.lastEditBy,
        itemStatusId: item.itemStatusId,
        businessUnitId: item.businessUnitId,
        recordGuid: item.recordGuid,
        itemTypeId: item.itemTypeId
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
      businessUnitId: data.businessUnitId,
      itemTypeId: data.itemTypeId
    };
    return this.http.post<any>(`${this.url}`, payload, this.getAuthOptions());
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
      businessUnitId: data.businessUnitId,
      recordGuid: data.recordGuid,
      itemTypeId: data.itemTypeId
    };
    return this.http.put<any>(`${this.url}/${id}`, payload, this.getAuthOptions());
  }

  deleteJobMain(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, this.getAuthOptions());
  }
}
