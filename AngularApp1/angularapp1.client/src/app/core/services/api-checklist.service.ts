import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChecklistItem, ChecklistTransaction } from '../models/checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ApiChecklistService {
  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  // Checklist Items
  getItems(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(`${this.baseUrl}/api/Checklist/items`).pipe(
      map((res: any) => res.map((i: any) => this.mapItem(i)))
    );
  }

  getItem(id: number): Observable<ChecklistItem> {
    return this.http.get<ChecklistItem>(`${this.baseUrl}/api/Checklist/items/${id}`).pipe(
      map((i: any) => this.mapItem(i))
    );
  }

  addItem(item: ChecklistItem): Observable<ChecklistItem> {
    return this.http.post<ChecklistItem>(`${this.baseUrl}/api/Checklist/items`, item).pipe(
      map((i: any) => this.mapItem(i))
    );
  }

  updateItem(id: number, item: ChecklistItem): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Checklist/items/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Checklist/items/${id}`);
  }

  // Checklist Transactions
  getTransactions(refObject?: string, refId?: number): Observable<ChecklistTransaction[]> {
    let params = new HttpParams();
    if (refObject) params = params.set('refObject', refObject);
    if (refId != null) params = params.set('refId', refId.toString());

    return this.http.get<ChecklistTransaction[]>(`${this.baseUrl}/api/Checklist/transactions`, { params }).pipe(
      map((res: any) => res.map((t: any) => this.mapTransaction(t)))
    );
  }

  getTransaction(id: number): Observable<ChecklistTransaction> {
    return this.http.get<ChecklistTransaction>(`${this.baseUrl}/api/Checklist/transactions/${id}`).pipe(
      map((t: any) => this.mapTransaction(t))
    );
  }

  addTransaction(trx: ChecklistTransaction): Observable<ChecklistTransaction> {
    return this.http.post<ChecklistTransaction>(`${this.baseUrl}/api/Checklist/transactions`, trx).pipe(
      map((t: any) => this.mapTransaction(t))
    );
  }

  updateTransaction(id: number, trx: ChecklistTransaction): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/Checklist/transactions/${id}`, trx);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Checklist/transactions/${id}`);
  }

  private mapItem(data: any): ChecklistItem {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      remarks: data.remarks,
      code: data.code,
      sortOrder: data.sortOrder,
      itemTypeId: data.itemTypeId,
      itemStatusId: data.itemStatusId
    };
  }

  private mapTransaction(data: any): ChecklistTransaction {
    return {
      id: data.id,
      createdBy: data.createdBy,
      createdOn: data.createdOn,
      lastEditBy: data.lastEditBy,
      lastEditOn: data.lastEditOn,
      isArchived: data.isArchived,
      isPrivate: data.isPrivate,
      isActive: data.isActive,
      notes: data.notes,
      isDone: data.isDone,
      checklistItemId: data.checklistItemId,
      refId: data.refId,
      refObject: data.refObject
    };
  }
}
