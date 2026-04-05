import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';
import { ContactDataService } from './services/contact-data.service';
import { Contact } from '../../core/models/contact.model';

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
  public allContacts: Contact[] = []; // Store unfiltered contacts
  
  // Filter properties
  public filterName?: string;
  public filterRemarks?: string;
  public filterEmail1?: string;
  public filterContactNo1?: string;
  public filterIsActive?: boolean | null = null;
  public filterIsArchived?: boolean | null = null;
  
  // UI state
  public filterExpanded: boolean = false;
  
  private destroy$ = new Subject<void>();

  public get tableFields() {
    return this.getTableFields();
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
          this.allContacts = contacts; // Store all contacts
          this.applyFilters(); // Apply current filters
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
   * Apply filters to the contact list
   */
  onFilter(): void {
    this.applyFilters();
  }

  /**
   * Clear all filters and show all contacts
   */
  onClearFilter(): void {
    this.filterName = undefined;
    this.filterRemarks = undefined;
    this.filterEmail1 = undefined;
    this.filterContactNo1 = undefined;
    this.filterIsActive = null;
    this.filterIsArchived = null;
    this.applyFilters();
  }

  /**
   * Get filter description for the expansion panel
   */
  getFilterDescription(): string {
    const activeFilters: string[] = [];
    
    if (this.filterName && this.filterName.trim()) {
      activeFilters.push(`Name: ${this.filterName}`);
    }
    if (this.filterRemarks && this.filterRemarks.trim()) {
      activeFilters.push(`Remarks: ${this.filterRemarks}`);
    }
    if (this.filterEmail1 && this.filterEmail1.trim()) {
      activeFilters.push(`Email: ${this.filterEmail1}`);
    }
    if (this.filterContactNo1 && this.filterContactNo1.trim()) {
      activeFilters.push(`Contact: ${this.filterContactNo1}`);
    }
    if (this.filterIsActive !== null && this.filterIsActive !== undefined) {
      activeFilters.push(`Status: ${this.filterIsActive ? 'Active' : 'Inactive'}`);
    }
    if (this.filterIsArchived !== null && this.filterIsArchived !== undefined) {
      activeFilters.push(`Archive: ${this.filterIsArchived ? 'Archived' : 'Not Archived'}`);
    }

    if (activeFilters.length === 0) {
      return 'No filters applied';
    }
    
    return activeFilters.join(' | ');
  }

  /**
   * Apply current filters to contacts
   */
  private applyFilters(): void {
    let filtered = [...this.allContacts];

    // Filter by name
    if (this.filterName && this.filterName.trim()) {
      const nameFilter = this.filterName.toLowerCase().trim();
      filtered = filtered.filter(c => 
        c.name?.toLowerCase().includes(nameFilter)
      );
    }

    // Filter by remarks
    if (this.filterRemarks && this.filterRemarks.trim()) {
      const remarksFilter = this.filterRemarks.toLowerCase().trim();
      filtered = filtered.filter(c => 
        c.remarks?.toLowerCase().includes(remarksFilter)
      );
    }

    // Filter by email1
    if (this.filterEmail1 && this.filterEmail1.trim()) {
      const emailFilter = this.filterEmail1.toLowerCase().trim();
      filtered = filtered.filter(c => 
        c.email1?.toLowerCase().includes(emailFilter)
      );
    }

    // Filter by contactNo1
    if (this.filterContactNo1 && this.filterContactNo1.trim()) {
      const contactFilter = this.filterContactNo1.toLowerCase().trim();
      filtered = filtered.filter(c => 
        c.contactNo1?.toLowerCase().includes(contactFilter)
      );
    }

    // Filter by isActive
    if (this.filterIsActive !== null && this.filterIsActive !== undefined) {
      filtered = filtered.filter(c => c.isActive === this.filterIsActive);
    }

    // Filter by isArchived
    if (this.filterIsArchived !== null && this.filterIsArchived !== undefined) {
      filtered = filtered.filter(c => c.isArchived === this.filterIsArchived);
    }

    this.contacts = filtered;
    if (this.TableList) {
      this.initializeEntityList(this.contacts);
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

    this.TableList.initialize(mappedData);
  }
}
