import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ItemStatusClass {
  id: number;
  name: string;
  description?: string;
  remarks?: string;
  code?: string;
  sortOrder?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiItemStatusClassService {
  private apiUrl = environment.apiConfig.uri + '/api/itemstatusclass';

  constructor(private http: HttpClient) { }

  getItemStatusClasses(): Observable<ItemStatusClass[]> {
    return this.http.get<ItemStatusClass[]>(this.apiUrl);
  }

  getItemStatusClass(id: number): Observable<ItemStatusClass> {
    return this.http.get<ItemStatusClass>(`${this.apiUrl}/${id}`);
  }

  createItemStatusClass(itemStatusClass: ItemStatusClass): Observable<ItemStatusClass> {
    return this.http.post<ItemStatusClass>(this.apiUrl, itemStatusClass);
  }

  updateItemStatusClass(id: number, itemStatusClass: ItemStatusClass): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, itemStatusClass);
  }

  deleteItemStatusClass(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
