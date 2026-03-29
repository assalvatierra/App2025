import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Receivable } from '../models/receivable.model';

@Injectable({
  providedIn: 'root'
})
export class ApiReceivablesService {

  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Get all receivables
   * @returns Observable of Receivable array
   */
  getReceivables(): Observable<Receivable[]> {
    return this.http.get<Receivable[]>(`${this.baseUrl}/api/Receivables`).pipe(
      map((res: any) => {
        return res.map((receivable: any) => this.mapReceivable(receivable));
      })
    );
  }

  /**
   * Get receivables by entity ID
   * @param entityId Entity ID
   * @returns Observable of Receivable array
   */
  getReceivablesByEntity(entityId: number): Observable<Receivable[]> {
    return this.http.get<Receivable[]>(`${this.baseUrl}/api/Receivables/byEntity/${entityId}`).pipe(
      map((res: any) => {
        return res.map((receivable: any) => this.mapReceivable(receivable));
      })
    );
  }

  /**
   * Get a single receivable by ID
   * @param id Receivable ID
   * @returns Observable of Receivable
   */
  getReceivable(id: number): Observable<Receivable> {
    return this.http.get<Receivable>(`${this.baseUrl}/api/Receivables/${id}`).pipe(
      map((receivable: any) => this.mapReceivable(receivable))
    );
  }

  /**
   * Add a new receivable
   * @param receivable Receivable object
   * @returns Observable of created Receivable
   */
  addReceivable(receivable: Receivable): Observable<Receivable> {
    // Create a copy without the id field for POST request
    const { id, ...receivableData } = receivable;
    return this.http.post<Receivable>(`${this.baseUrl}/api/Receivables`, receivableData).pipe(
      map((receivable: any) => this.mapReceivable(receivable))
    );
  }

  /**
   * Update an existing receivable
   * @param id Receivable ID
   * @param receivable Updated Receivable object
   * @returns Observable of any
   */
  updateReceivable(id: number, receivable: Receivable): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Receivables/${id}`, receivable);
  }

  /**
   * Delete a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  deleteReceivable(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Receivables/${id}`);
  }

  /**
   * Archive a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  archiveReceivable(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Receivables/${id}/archive`, {});
  }

  /**
   * Activate a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  activateReceivable(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Receivables/${id}/activate`, {});
  }

  /**
   * Helper method to map API response to Receivable model
   * @param data Raw API data
   * @returns Mapped Receivable object
   */
  private mapReceivable(data: any): Receivable {
    return {
      id: data.id,
      trxRef: data.trxRef,
      trxDate: data.trxDate ? new Date(data.trxDate) : new Date(),
      amount: data.amount,
      entityId: data.entityId,
      remarks: data.remarks,
      createdOn: data.createdOn ? new Date(data.createdOn) : undefined,
      createdBy: data.createdBy,
      lastEditOn: data.lastEditOn ? new Date(data.lastEditOn) : undefined,
      lastEditBy: data.lastEditBy,
      isActive: data.isActive,
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      jobReceivables: data.jobReceivables,
      receivableCustomers: data.receivableCustomers,
      receivablePayments: data.receivablePayments,
      receivableStatuses: data.receivableStatuses
    };
  }
}
