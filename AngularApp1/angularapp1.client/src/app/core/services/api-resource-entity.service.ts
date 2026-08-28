import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceEntity } from '../models/resource-entity.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceEntityService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  /**
   * Get all resource entities
   * @returns Observable of ResourceEntity array
   */
  getResourceEntities(): Observable<ResourceEntity[]> {
    return this.http.get<ResourceEntity[]>(`${this.baseUrl}/api/ResourceEntity`);
  }

  /**
   * Get a single resource entity by ID
   * @param id Resource Entity ID
   * @returns Observable of ResourceEntity
   */
  getResourceEntity(id: number): Observable<ResourceEntity> {
    return this.http.get<ResourceEntity>(`${this.baseUrl}/api/ResourceEntity/${id}`);
  }

  /**
   * Get resource entities by resource ID
   * @param resourceId Resource ID
   * @returns Observable of ResourceEntity array
   */
  getByResource(resourceId: number): Observable<ResourceEntity[]> {
    return this.http.get<ResourceEntity[]>(`${this.baseUrl}/api/ResourceEntity/ByResource/${resourceId}`);
  }

  /**
   * Get resource entities by entity ID
   * @param entityId Entity ID
   * @returns Observable of ResourceEntity array
   */
  getByEntity(entityId: number): Observable<ResourceEntity[]> {
    return this.http.get<ResourceEntity[]>(`${this.baseUrl}/api/ResourceEntity/ByEntity/${entityId}`);
  }

  /**
   * Add a new resource entity
   * @param resourceEntity ResourceEntity object
   * @returns Observable of created ResourceEntity
   */
  addResourceEntity(resourceEntity: ResourceEntity): Observable<ResourceEntity> {
    return this.http.post<ResourceEntity>(`${this.baseUrl}/api/ResourceEntity`, resourceEntity);
  }

  /**
   * Update an existing resource entity
   * @param id Resource Entity ID
   * @param resourceEntity Updated ResourceEntity object
   * @returns Observable of any
   */
  updateResourceEntity(id: number, resourceEntity: ResourceEntity): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ResourceEntity/${id}`, resourceEntity);
  }

  /**
   * Delete a resource entity
   * @param id Resource Entity ID
   * @returns Observable of any
   */
  deleteResourceEntity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ResourceEntity/${id}`);
  }
}
