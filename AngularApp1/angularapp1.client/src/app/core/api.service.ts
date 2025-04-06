import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/RefCountries`);
  }

  getCountry(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/RefCountries/${id}`);
  }
  addCountry(country: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/RefCountries`, country);
  }
  updateCountry(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.url}/api/RefCountries/${id}`, country);
  }
  deleteCountry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/RefCountries/${id}`);
  }

}
