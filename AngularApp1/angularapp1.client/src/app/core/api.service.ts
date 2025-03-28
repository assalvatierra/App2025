import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${this.url}/api/RefCountries`);
  }
}
