import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {
  private apiUrl = 'https://localhost:44351/WeatherForecast';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };


  constructor(@Inject(HttpClient) private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions);
  }

}
