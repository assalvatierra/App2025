import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityContact } from '../models/entity-contact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiEntityContactService {
  private baseUrl = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  getEntityContacts(): Observable<EntityContact[]> {
    return this.http.get<EntityContact[]>(`${this.baseUrl}/api/EntityContacts`);
  }

  getEntityContact(id: number): Observable<EntityContact> {
    return this.http.get<EntityContact>(`${this.baseUrl}/api/EntityContacts/${id}`);
  }

  getEntityContactsByContactId(contactId: number): Observable<EntityContact[]> {
    return this.http.get<EntityContact[]>(`${this.baseUrl}/api/EntityContacts/ByContact/${contactId}`);
  }

  getEntityContactsByEntityId(entityId: number): Observable<EntityContact[]> {
    return this.http.get<EntityContact[]>(`${this.baseUrl}/api/EntityContacts/ByEntity/${entityId}`);
  }

  addEntityContact(data: EntityContact): Observable<EntityContact> {
    return this.http.post<EntityContact>(`${this.baseUrl}/api/EntityContacts`, data);
  }

  updateEntityContact(id: number, data: EntityContact): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/EntityContacts/${id}`, data);
  }

  deleteEntityContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/EntityContacts/${id}`);
  }
}
