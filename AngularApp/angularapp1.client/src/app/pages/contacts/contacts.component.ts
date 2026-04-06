import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';
import { ContactDataService } from './services/contact-data.service';
import { Contact } from '../../core/models/contact.model';
import { AdvancedFilterField } from '../../shared/entity-list-table/advanced-filter-dialog/advanced-filter-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  standalone: false,
})
export class ContactsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  
  public showEdit: boolean = true;
  public dataloading: boolean = true;
  public contacts: Contact[] = [];
  
  private destroy$ = new Subject<void>();

  public get tableFields() {
    return this.getTableFields();
  }

  public get advancedFilterFields(): AdvancedFilterField[] {
    return [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'remarks', label: 'Remarks', type: 'string' },
      { key: 'contactNo1', label: 'Contact No 1', type: 'string' },
      { key: 'contactNo2', label: 'Contact No 2', type: 'string' },
      { key: 'email1', label: 'Email 1', type: 'string' },
      { key: 'email2', label: 'Email 2', type: 'string' }
    ];
  }

  constructor(
    private contactDataService: ContactDataService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.subscribeToContacts();
    this.retrieveApiData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Subscribe to contacts observable for reactive updates
   */
  private subscribeToContacts(): void {
    // Subscribe to contacts data
    this.contactDataService.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          if (this.TableList) {
            this.initializeEntityList(contacts);
          }
        }
      });

    // Subscribe to loading state
    this.contactDataService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (loading) => {
          this.dataloading = loading;
        }
      });
  }

  /**
   * Navigate to add new contact form
   */
  onAddRecord(): void {
    this.router.navigate(['/contacts/form', 0]);
  }

  /**
   * Navigate to edit contact form
   */
  onEdit(id: number): void {
    this.router.navigate(['/contacts/form', id]);
  }

  /**
   * Handle edit details event
   */
  onEditDetails(id: number): void {
    // Navigate to contact details page (implement as needed)
    console.log('Edit contact details:', id);
    // this.router.navigate(['/contacts/details', id]);
  }

  /**
   * Archive a contact
   */
  onArchive(id: number): void {
    if (confirm('Are you sure you want to archive this contact?')) {
      this.contactDataService.archiveContact(id).subscribe({
        next: () => {
          console.log('Contact archived successfully');
          this.retrieveApiData(); // Refresh the list
        },
        error: (err) => {
          console.error('Error archiving contact:', err);
          alert('Failed to archive contact. Please try again.');
        }
      });
    }
  }

  /**
   * Retrieve contacts data from API
   */
  retrieveApiData(): void {
    this.contactDataService.loadContacts();
  }

  /**
   * Define table columns
   */
  getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'contactNo1', label: 'Contact No 1' },
      { key: 'contactNo2', label: 'Contact No 2' },
      { key: 'email1', label: 'Email 1' },
      { key: 'email2', label: 'Email 2' },
      { key: 'isActive', label: 'Active' },
      { key: 'isArchived', label: 'Archived' }
    ];
  }

  /**
   * Initialize entity list table with data
   */
  private initializeEntityList(contacts: Contact[]): void {
    console.log('=== Initializing Contact List ===');
    console.log('Contacts to display:', contacts.length);
    
    // Map contacts to table-friendly format matching EntityListTableItem interface
    const mappedData = contacts.map(contact => ({
      id: contact.id || 0,
      name: contact.name || '',
      description: '', // Required by EntityListTableItem
      remarks: contact.remarks || '',
      code: '', // Required by EntityListTableItem
      sortOrder: '', // Required by EntityListTableItem
      contactNo1: contact.contactNo1 || '',
      contactNo2: contact.contactNo2 || '',
      email1: contact.email1 || '',
      email2: contact.email2 || '',
      isActive: contact.isActive ? 'Yes' : 'No',
      isArchived: contact.isArchived ? 'Yes' : 'No'
    }));

    console.log('Mapped data count:', mappedData.length);
    this.TableList.initialize(mappedData);
  }
}
