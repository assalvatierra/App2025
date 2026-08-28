import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ItemTypeClass {
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
export class ApiItemTypeClassService {
  private apiUrl = environment.apiConfig.uri + '/api/itemtypeclass';

  constructor(private http: HttpClient) { }

  getItemTypeClasses(): Observable<ItemTypeClass[]> {
    return this.http.get<ItemTypeClass[]>(this.apiUrl);
  }

  getItemTypeClass(id: number): Observable<ItemTypeClass> {
    return this.http.get<ItemTypeClass>(`${this.apiUrl}/${id}`);
  }

  createItemTypeClass(itemTypeClass: ItemTypeClass): Observable<ItemTypeClass> {
    return this.http.post<ItemTypeClass>(this.apiUrl, itemTypeClass);
  }

  updateItemTypeClass(id: number, itemTypeClass: ItemTypeClass): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, itemTypeClass);
  }

  deleteItemTypeClass(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
