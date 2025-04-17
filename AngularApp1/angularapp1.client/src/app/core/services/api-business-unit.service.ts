import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBusinessUnitService {

  private url = 'http://localhost:5157';
  private controller = 'BusinessUnits';
  constructor(private http: HttpClient) { }

  getList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/${this.controller}`).pipe(
      map((res: any) => {
        return res.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          remarks: item.remarks,
          code: item.code,
          sortOrder: item.sortOrder,
        }));
      })
    );
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/${this.controller}/${id}`);
  }
  addItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/${this.controller}`, data);
  }
  updateItem(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/api/${this.controller}/${id}`, data);
  }
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/${this.controller}/${id}`);
  }

}
