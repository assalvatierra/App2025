import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiJobOrderService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getJobMainByRecordGuid(recordGuid: string): Observable<any> {
    return this.http.get<any>(`${this.url}/api/JobOrder/byguid/${recordGuid}`);
  }
}
