import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiReceivablesService } from '../../../core/services/api-receivables.service';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { Receivable } from '../../../core/models/receivable.model';

@Injectable({
  providedIn: 'root'
})
export class ReceivableDataService {
  
  private receivablesSubject = new BehaviorSubject<Receivable[]>([]);
  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public receivables$ = this.receivablesSubject.asObservable();
  public entities$ = this.entitiesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  public dataloading: boolean = true;

  constructor(
    private apiReceivables: ApiReceivablesService,
    private apiEntity: ApiEntityService
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
        next: () => this.loadingSubject.next(false),
        error: () => this.loadingSubject.next(false)
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
}
