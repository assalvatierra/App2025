import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiReceivablesService } from '../../../core/services/api-receivables.service';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { Receivable, ReceivableCustomer, JobReceivable } from '../../../core/models/receivable.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceivableDataService {
  
private receivablesSubject = new BehaviorSubject<Receivable[]>([]);
private entitiesSubject = new BehaviorSubject<any[]>([]);
private loadingSubject = new BehaviorSubject<boolean>(true);
private baseUrl = 'http://localhost:5157';

public receivables$ = this.receivablesSubject.asObservable();
public entities$ = this.entitiesSubject.asObservable();
public loading$ = this.loadingSubject.asObservable();

public dataloading: boolean = true;

constructor(
  private apiReceivables: ApiReceivablesService,
  private apiEntity: ApiEntityService,
  private http: HttpClient
) { }

  /**
   * Load all entities from the API
   */
  loadEntities(): void {
    this.apiEntity.getEntities().subscribe({
      next: (res: any) => {
        this.entitiesSubject.next(res || []);
      },
      error: (err: any) => {
        console.error('Error loading entities:', err);
      }
    });
  }

  /**
   * Load all receivables from the API
   */
  loadReceivables(): void {
    this.loadingSubject.next(true);
    this.apiReceivables.getReceivables().subscribe({
      next: (res: any) => {
        console.log('Receivables loaded:', res);
        this.receivablesSubject.next(res || []);
        this.loadingSubject.next(false);
      },
      error: (err: any) => {
        console.error('Error loading receivables:', err);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Load a single receivable by ID
   * @param id Receivable ID
   * @returns Observable of Receivable
   */
  loadReceivable(id: number): Observable<Receivable> {
    this.loadingSubject.next(true);
    return this.apiReceivables.getReceivable(id).pipe(
      tap({
        next: (receivable) => {
          console.log('Receivable loaded:', receivable);
          this.loadingSubject.next(false);
        },
        error: (error) => {
          console.error('Error loading receivable:', error);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Add a new receivable
   * @param receivable Receivable data to create
   * @returns Observable of created Receivable
   */
  addReceivable(receivable: Receivable): Observable<Receivable> {
    return this.apiReceivables.addReceivable(receivable);
  }

  /**
   * Update an existing receivable
   * @param id Receivable ID
   * @param receivable Updated Receivable data
   * @returns Observable of any
   */
  updateReceivable(id: number, receivable: Receivable): Observable<any> {
    return this.apiReceivables.updateReceivable(id, receivable).pipe(
      tap({
        error: (err) => console.error('Error updating receivable:', err)
      })
    );
  }

  /**
   * Delete a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  deleteReceivable(id: number): Observable<any> {
    return this.apiReceivables.deleteReceivable(id).pipe(
      tap({
        error: (err) => console.error('Error deleting receivable:', err)
      })
    );
  }

  /**
   * Archive a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  archiveReceivable(id: number): Observable<any> {
    return this.apiReceivables.archiveReceivable(id).pipe(
      tap({
        error: (err) => console.error('Error archiving receivable:', err)
      })
    );
  }

  /**
   * Activate a receivable
   * @param id Receivable ID
   * @returns Observable of any
   */
  activateReceivable(id: number): Observable<any> {
    return this.apiReceivables.activateReceivable(id).pipe(
      tap({
        error: (err) => console.error('Error activating receivable:', err)
      })
    );
  }

  /**
   * Get receivables by entity ID
   * @param entityId Entity ID
   * @returns Observable of Receivable array
   */
  getReceivablesByEntity(entityId: number): Observable<Receivable[]> {
    return this.apiReceivables.getReceivablesByEntity(entityId);
  }

  // ===== ReceivableCustomer Methods =====

  /**
   * Get customers by receivable ID
   * @param receivableId Receivable ID
   * @returns Observable of ReceivableCustomer array
   */
  getReceivableCustomers(receivableId: number): Observable<ReceivableCustomer[]> {
    return this.http.get<ReceivableCustomer[]>(`${this.baseUrl}/api/ReceivableCustomers/byReceivable/${receivableId}`);
  }

  /**
   * Add a new receivable customer
   * @param customer ReceivableCustomer data to create
   * @returns Observable of created ReceivableCustomer
   */
  addReceivableCustomer(customer: ReceivableCustomer): Observable<ReceivableCustomer> {
    return this.http.post<ReceivableCustomer>(`${this.baseUrl}/api/ReceivableCustomers`, customer);
  }

  /**
   * Update an existing receivable customer
   * @param id ReceivableCustomer ID
   * @param customer Updated ReceivableCustomer data
   * @returns Observable of any
   */
  updateReceivableCustomer(id: number, customer: ReceivableCustomer): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/ReceivableCustomers/${id}`, customer);
  }

  /**
   * Delete a receivable customer
   * @param id ReceivableCustomer ID
   * @returns Observable of any
   */
  deleteReceivableCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/ReceivableCustomers/${id}`);
  }

  // ===== JobReceivable Methods =====

  /**
   * Get job receivables by receivable ID
   * @param receivableId Receivable ID
   * @returns Observable of JobReceivable array
   */
  getJobReceivables(receivableId: number): Observable<JobReceivable[]> {
    return this.http.get<JobReceivable[]>(`${this.baseUrl}/api/JobReceivables/byReceivable/${receivableId}`);
  }

  /**
   * Add a new job receivable
   * @param jobReceivable JobReceivable data to create
   * @returns Observable of created JobReceivable
   */
  addJobReceivable(jobReceivable: JobReceivable): Observable<JobReceivable> {
    return this.http.post<JobReceivable>(`${this.baseUrl}/api/JobReceivables`, jobReceivable);
  }

  /**
   * Update an existing job receivable
   * @param id JobReceivable ID
   * @param jobReceivable Updated JobReceivable data
   * @returns Observable of any
   */
  updateJobReceivable(id: number, jobReceivable: JobReceivable): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/JobReceivables/${id}`, jobReceivable);
  }

  /**
   * Delete a job receivable
   * @param id JobReceivable ID
   * @returns Observable of any
   */
  deleteJobReceivable(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/JobReceivables/${id}`);
  }
}
