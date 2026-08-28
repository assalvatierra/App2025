import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SysFeature {
  id: number;
  name: string;
  description?: string;
  isEnabled: boolean;
  expiry: Date;
  sysCode: string;
  settings?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiSysFeaturesService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  /**
   * Get all system features or filter by sysCode and/or name
   * @param sysCode Optional system code filter
   * @param name Optional name filter (partial match)
   * @returns Observable of SysFeature array
   */
  getSysFeatures(sysCode?: string, name?: string): Observable<SysFeature[]> {
    let params = new HttpParams();
    
    if (sysCode) {
      params = params.set('sysCode', sysCode);
    }
    
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<SysFeature[]>(`${this.baseUrl}/api/SysFeatures`, { params }).pipe(
      map((res: any) => {
        return res.map((feature: any) => ({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          isEnabled: feature.isEnabled,
          expiry: new Date(feature.expiry),
          sysCode: feature.sysCode,
          settings: feature.settings
        }));
      })
    );
  }

  /**
   * Get a single system feature by ID
   * @param id System feature ID
   * @returns Observable of SysFeature
   */
  getSysFeature(id: number): Observable<SysFeature> {
    return this.http.get<SysFeature>(`${this.baseUrl}/api/SysFeatures/${id}`).pipe(
      map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        isEnabled: feature.isEnabled,
        expiry: new Date(feature.expiry),
        sysCode: feature.sysCode,
        settings: feature.settings
      }))
    );
  }

  /**
   * Get a single system feature by system code
   * @param sysCode System code
   * @returns Observable of SysFeature
   */
  getSysFeatureBySysCode(sysCode: string): Observable<SysFeature> {
    return this.http.get<SysFeature>(`${this.baseUrl}/api/SysFeatures/BySysCode/${sysCode}`).pipe(
      map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        isEnabled: feature.isEnabled,
        expiry: new Date(feature.expiry),
        sysCode: feature.sysCode,
        settings: feature.settings
      }))
    );
  }

  /**
   * Get all enabled system features (not expired)
   * @returns Observable of SysFeature array
   */
  getEnabledSysFeatures(): Observable<SysFeature[]> {
    return this.http.get<SysFeature[]>(`${this.baseUrl}/api/SysFeatures/Enabled`).pipe(
      map((res: any) => {
        return res.map((feature: any) => ({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          isEnabled: feature.isEnabled,
          expiry: new Date(feature.expiry),
          sysCode: feature.sysCode,
          settings: feature.settings
        }));
      })
    );
  }

  /**
   * Get the current authentication type from server configuration
   * @returns Observable of authentication type string (e.g., "Bearer" or "EntraID")
   */
  getAuthenticationType(): Observable<string> {
    return this.http.get(`${this.baseUrl}/api/SysFeatures/GetAuthenticationType`, { responseType: 'text' });
  }

  /**
   * Add a new system feature
   * @param sysFeature SysFeature object
   * @returns Observable of created SysFeature
   */
  addSysFeature(sysFeature: SysFeature): Observable<SysFeature> {
    return this.http.post<SysFeature>(`${this.baseUrl}/api/SysFeatures`, sysFeature);
  }

  /**
   * Update an existing system feature
   * @param id System feature ID
   * @param sysFeature Updated SysFeature object
   * @returns Observable of any
   */
  updateSysFeature(id: number, sysFeature: SysFeature): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/SysFeatures/${id}`, sysFeature);
  }

  /**
   * Delete a system feature
   * @param id System feature ID
   * @returns Observable of any
   */
  deleteSysFeature(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/SysFeatures/${id}`);
  }
}
