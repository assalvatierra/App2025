import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/RefCountries`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,

          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
          
        }));
      })
    );
  }

  getCountry(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/RefCountries/${id}`);
  }
  addCountry(country: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/RefCountries`, country);
  }
  updateCountry(id: number, country: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/RefCountries/${id}`, country);
  }
  deleteCountry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/RefCountries/${id}`);
  }

  
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/RefCities`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,

          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
          
        }));
      })
    );
  }

  getCity(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Api/RefCities/${id}`);
  }

  updateCity(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Api/RefCities/${id}`, data);
  }



  // CONTACTS API

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Contacts`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder
        }));
      })
    );
  }

  getContact(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Contacts/${id}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Contacts`, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Contacts/${id}`);
  }






}
