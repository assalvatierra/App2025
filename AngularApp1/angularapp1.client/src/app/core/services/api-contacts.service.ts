import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiContactsService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  /**
   * Get all contacts
   */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/api/Contacts`).pipe(
      map((res: any) => res.map((c: any) => this.mapContact(c))),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single contact by ID
   */
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/api/Contacts/${id}`).pipe(
      map((c: any) => this.mapContact(c)),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new contact
   */
  addContact(contact: Contact): Observable<Contact> {
    // Sanitize contact object before sending to prevent validation errors
    const sanitizedContact = this.sanitizeContactForCreate(contact);

    return this.http.post<Contact>(`${this.baseUrl}/api/Contacts`, sanitizedContact).pipe(
      map((c: any) => this.mapContact(c)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding contact:', error);
        
        // Log validation errors for debugging
        if (error.status === 400 && error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        
        return throwError(() => ({
          status: error.status,
          message: error.error?.title || error.message || 'Failed to add contact',
          errors: error.error?.errors || {}
        }));
      })
    );
  }

  /**
   * Update an existing contact
   */
  updateContact(id: number, contact: Contact): Observable<any> {
    // Sanitize contact object before sending
    const sanitizedContact = this.sanitizeContactForUpdate(contact);

    return this.http.put<any>(`${this.baseUrl}/api/Contacts/${id}`, sanitizedContact).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating contact:', error);
        
        if (error.status === 400 && error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        
        return throwError(() => ({
          status: error.status,
          message: error.error?.title || error.message || 'Failed to update contact',
          errors: error.error?.errors || {}
        }));
      })
    );
  }

  /**
   * Delete a contact
   */
  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/Contacts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sanitize contact object for creation
   */
  private sanitizeContactForCreate(contact: Contact): any {
    const now = new Date().toISOString();
    
    return {
      name: contact.name || '',
      remarks: contact.remarks || '',
      contactNo1: contact.contactNo1 || '',
      contactNo2: contact.contactNo2 || '',
      address1: contact.address1 || '',
      address2: contact.address2 || '',
      email1: contact.email1 || '',
      email2: contact.email2 || '',
      
      // Required boolean fields - must be explicitly set
      isArchived: contact.isArchived ?? false,
      isPrivate: contact.isPrivate ?? false,
      isActive: contact.isActive ?? true,
      
      // Foreign keys
      typeId: contact.typeId || null,
      statusId: contact.statusId || 1,  // Default status
      refCityId: contact.refCityId ?? null,
      
      // Required audit fields - set by frontend, will be overridden by backend
      createdBy: 'System',
      createdOn: now,
      lastEditBy: 'System',
      lastEditOn: now,
      
      // Remove server-managed fields
      id: undefined,
      
      // Remove navigation properties for POST
      type: undefined,
      status: undefined,
      refCity: undefined
    };
  }

  /**
   * Sanitize contact object for update
   */
  private sanitizeContactForUpdate(contact: Contact): any {
    const now = new Date().toISOString();
    
    return {
      id: contact.id,
      name: contact.name || '',
      remarks: contact.remarks || '',
      contactNo1: contact.contactNo1 || '',
      contactNo2: contact.contactNo2 || '',
      address1: contact.address1 || '',
      address2: contact.address2 || '',
      email1: contact.email1 || '',
      email2: contact.email2 || '',
      
      // Required boolean fields - must be explicitly set
      isArchived: contact.isArchived ?? false,
      isPrivate: contact.isPrivate ?? false,
      isActive: contact.isActive ?? true,
      
      // Foreign keys
      typeId: contact.typeId || null,
      statusId: contact.statusId || 1,
      refCityId: contact.refCityId ?? null,
      
      // Required audit fields - send existing values or defaults
      // Backend will preserve CreatedBy/CreatedOn from database
      createdBy: contact.createdBy || 'System',
      createdOn: contact.createdOn || now,
      lastEditBy: contact.lastEditBy || 'System',
      lastEditOn: contact.lastEditOn || now,
      
      // Remove navigation properties
      type: undefined,
      status: undefined,
      refCity: undefined
    };
  }

  /**
   * Map raw API response to Contact model
   */
  private mapContact(data: any): Contact {
    return {
      id:          data.id,
      name:        data.name,
      remarks:     data.remarks ?? '',
      contactNo1:  data.contactNo1 ?? '',
      contactNo2:  data.contactNo2 ?? '',
      address1:    data.address1 ?? '',
      address2:    data.address2 ?? '',
      email1:      data.email1 ?? '',
      email2:      data.email2 ?? '',
      createdBy:   data.createdBy,
      createdOn:   data.createdOn,
      lastEditBy:  data.lastEditBy,
      lastEditOn:  data.lastEditOn,
      isArchived:  data.isArchived,
      isPrivate:   data.isPrivate,
      isActive:    data.isActive,
      typeId:      data.typeId,
      statusId:    data.statusId,
      refCityId:   data.refCityId,
      type:        data.type ? {
        id:   data.type.id,
        name: data.type.name,
        code: data.type.code
      } : undefined,
      status:      data.status ? {
        id:   data.status.id,
        name: data.status.name,
        code: data.status.code
      } : undefined,
      refCity:     data.refCity ? {
        id:   data.refCity.id,
        name: data.refCity.name,
        code: data.refCity.code
      } : undefined
    };
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
