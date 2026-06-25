import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceRate } from '../models/resource-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceRatesService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all resource rates or filter by resourceId, isActive, validFrom, and/or validTo
   * @param resourceId Optional resource ID filter
   * @param isActive Optional active status filter
   * @param validFrom Optional valid from date filter
   * @param validTo Optional valid to date filter
   * @returns Observable of ResourceRate array
   */
  getResourceRates(resourceId?: number, isActive?: boolean, validFrom?: Date, validTo?: Date): Observable<ResourceRate[]> {
    let params = new HttpParams();

    if (resourceId) {
      params = params.set('resourceId', resourceId.toString());
    }

    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    if (validFrom) {
      params = params.set('validFrom', validFrom.toISOString().split('T')[0]);
    }

    if (validTo) {
      params = params.set('validTo', validTo.toISOString().split('T')[0]);
    }

    return this.http.get<ResourceRate[]>(`${this.baseUrl}/api/ResourceRates`, { params }).pipe(
      map((res: any) => {
        return res.map((resourceRate: any) => this.mapResourceRate(resourceRate));
      })
    );
  }

  /**
   * Get a single resource rate by ID
   * @param id Resource rate ID
   * @returns Observable of ResourceRate
   */
  getResourceRate(id: number): Observable<ResourceRate> {
    return this.http.get<ResourceRate>(`${this.baseUrl}/api/ResourceRates/${id}`).pipe(
      map((resourceRate: any) => this.mapResourceRate(resourceRate))
    );
  }

  /**
   * Get all resource rates for a specific resource
   * @param resourceId Resource ID
   * @returns Observable of ResourceRate array
   */
  getResourceRatesByResource(resourceId: number): Observable<ResourceRate[]> {
    return this.http.get<ResourceRate[]>(`${this.baseUrl}/api/ResourceRates/ByResource/${resourceId}`).pipe(
      map((res: any) => {
        return res.map((resourceRate: any) => this.mapResourceRate(resourceRate));
      })
    );
  }

  /**
   * Get the active resource rate for a specific resource
   * @param resourceId Resource ID
   * @returns Observable of ResourceRate
   */
  getActiveResourceRate(resourceId: number): Observable<ResourceRate> {
    return this.http.get<ResourceRate>(`${this.baseUrl}/api/ResourceRates/Active/${resourceId}`).pipe(
      map((resourceRate: any) => this.mapResourceRate(resourceRate))
    );
  }

  /**
   * Add a new resource rate
   * @param resourceRate ResourceRate object
   * @returns Observable of created ResourceRate
   */
  addResourceRate(resourceRate: ResourceRate): Observable<ResourceRate> {
    return this.http.post<ResourceRate>(`${this.baseUrl}/api/ResourceRates`, resourceRate).pipe(
      map((resourceRate: any) => this.mapResourceRate(resourceRate))
    );
  }

  /**
   * Update an existing resource rate
   * @param id Resource rate ID
   * @param resourceRate Updated ResourceRate object
   * @returns Observable of any
   */
  updateResourceRate(id: number, resourceRate: ResourceRate): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ResourceRates/${id}`, resourceRate);
  }

  /**
   * Delete a resource rate
   * @param id Resource rate ID
   * @returns Observable of any
   */
  deleteResourceRate(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ResourceRates/${id}`);
  }

  /**
   * Helper method to map API response to ResourceRate model
   * @param data Raw API data
   * @returns Mapped ResourceRate object
   */
  private mapResourceRate(data: any): ResourceRate {
    debugger;
    return {
      id: data.id,
      resourceId: data.resourceId,
      createdBy: data.createdBy,
      createdOn: new Date(data.createdOn),
      lastEditBy: data.lastEditBy,
      lastEditOn: new Date(data.lastEditOn),
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      isActive: data.isActive,
      validFrom: new Date(data.validFrom),
      validTo: new Date(data.validTo),
      daily: data.daily,
      monthly: data.monthly,
      hourly: data.hourly,
      percent: data.percent,
      otRate: data.otRate,
      itemPrice: data.itemPrice
    };
  }
}
