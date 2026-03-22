import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class ApiResourcesService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all resources or filter by code, name, and/or itemTypeId
   * @param code Optional code filter
   * @param name Optional name filter (partial match)
   * @param itemTypeId Optional item type ID filter
   * @returns Observable of Resource array
   */
  getResources(code?: string, name?: string, itemTypeId?: number): Observable<Resource[]> {
    let params = new HttpParams();
    
    if (code) {
      params = params.set('code', code);
    }
    
    if (name) {
      params = params.set('name', name);
    }
    
    if (itemTypeId) {
      params = params.set('itemTypeId', itemTypeId.toString());
    }

    return this.http.get<Resource[]>(`${this.baseUrl}/api/Resources`, { params }).pipe(
      map((res: any) => {
        return res.map((resource: any) => this.mapResource(resource));
      })
    );
  }

  /**
   * Get a single resource by ID
   * @param id Resource ID
   * @returns Observable of Resource
   */
  getResource(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/api/Resources/${id}`).pipe(
      map((resource: any) => this.mapResource(resource))
    );
  }

  /**
   * Get a single resource by code
   * @param code Resource code
   * @returns Observable of Resource
   */
  getResourceByCode(code: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/api/Resources/ByCode/${code}`).pipe(
      map((resource: any) => this.mapResource(resource))
    );
  }

  /**
   * Get all active resources
   * @returns Observable of Resource array
   */
  getActiveResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/api/Resources/Active`).pipe(
      map((res: any) => {
        return res.map((resource: any) => this.mapResource(resource));
      })
    );
  }

  /**
   * Get resources by item type ID
   * @param itemTypeId Item type ID
   * @returns Observable of Resource array
   */
  getResourcesByType(itemTypeId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/api/Resources/ByType/${itemTypeId}`).pipe(
      map((res: any) => {
        return res.map((resource: any) => this.mapResource(resource));
      })
    );
  }

  /**
   * Add a new resource
   * @param resource Resource object
   * @returns Observable of created Resource
   */
  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.baseUrl}/api/Resources`, resource).pipe(
      map((resource: any) => this.mapResource(resource))
    );
  }

  /**
   * Update an existing resource
   * @param id Resource ID
   * @param resource Updated Resource object
   * @returns Observable of any
   */
  updateResource(id: number, resource: Resource): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Resources/${id}`, resource);
  }

  /**
   * Delete a resource
   * @param id Resource ID
   * @returns Observable of any
   */
  deleteResource(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Resources/${id}`);
  }

  /**
   * Helper method to map API response to Resource model
   * @param data Raw API data
   * @returns Mapped Resource object
   */
  private mapResource(data: any): Resource {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      remarks: data.remarks,
      code: data.code,
      sortOrder: data.sortOrder,
      itemTypeId: data.itemTypeId,
      itemStatusId: data.itemStatusId,
      jsonProperties: data.jsonProperties
    };
  }
}
