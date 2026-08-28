import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiJobOrderService {

  private url = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  getJobMainByRecordGuid(recordGuid: string): Observable<any> {
    return this.http.get<any>(`${this.url}/api/JobOrder/byguid/${recordGuid}`);
  }
}
