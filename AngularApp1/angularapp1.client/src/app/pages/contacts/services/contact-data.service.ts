import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiContactsService } from '../../../core/services/api-contacts.service';
import { Contact } from '../../../core/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public contacts$ = this.contactsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiContacts: ApiContactsService) { }

  /**
   * Get current contacts value
   */
  get currentContacts(): Contact[] {
    return this.contactsSubject.value;
  }

  /**
   * Load all contacts
   */
  loadContacts(): void {
    this.loadingSubject.next(true);
    this.apiContacts.getContacts().subscribe({
      next: (res) => {
        this.contactsSubject.next(res || []);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
        this.contactsSubject.next([]);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Load a single contact by ID
   */
  loadContact(id: number): Observable<Contact> {
    this.loadingSubject.next(true);
    return this.apiContacts.getContact(id).pipe(
      tap({
        next: () => this.loadingSubject.next(false),
        error: (err) => {
          console.error('Error loading contact:', err);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Add a new contact
   */
  addContact(contact: Contact): Observable<Contact> {
    this.loadingSubject.next(true);
    return this.apiContacts.addContact(contact).pipe(
      tap({
        next: (newContact) => {
          // Add new contact to the current list
          const currentContacts = this.contactsSubject.value;
          this.contactsSubject.next([...currentContacts, newContact]);
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Error adding contact:', err);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Update an existing contact
   */
  updateContact(id: number, contact: Contact): Observable<any> {
    this.loadingSubject.next(true);
    return this.apiContacts.updateContact(id, contact).pipe(
      tap({
        next: () => {
          // Update contact in the current list
          const currentContacts = this.contactsSubject.value;
          const index = currentContacts.findIndex(c => c.id === id);
          if (index !== -1) {
            currentContacts[index] = { ...contact, id };
            this.contactsSubject.next([...currentContacts]);
          }
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Error updating contact:', err);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Delete a contact
   */
  deleteContact(id: number): Observable<any> {
    this.loadingSubject.next(true);
    return this.apiContacts.deleteContact(id).pipe(
      tap({
        next: () => {
          // Remove contact from the current list
          const currentContacts = this.contactsSubject.value;
          this.contactsSubject.next(currentContacts.filter(c => c.id !== id));
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          this.loadingSubject.next(false);
        }
      })
    );
  }

  /**
   * Archive a contact (soft delete)
   */
  archiveContact(id: number): Observable<any> {
    // Get the contact
    const contact = this.currentContacts.find(c => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }

    // Update with isArchived = true
    const archivedContact = { ...contact, isArchived: true };
    return this.updateContact(id, archivedContact);
  }

  /**
   * Activate a contact
   */
  activateContact(id: number): Observable<any> {
    // Get the contact
    const contact = this.currentContacts.find(c => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }

    // Update with isActive = true
    const activeContact = { ...contact, isActive: true };
    return this.updateContact(id, activeContact);
  }

  /**
   * Refresh the contacts list
   */
  refresh(): void {
    this.loadContacts();
  }

  /**
   * Clear the contacts cache
   */
  clear(): void {
    this.contactsSubject.next([]);
  }
}
