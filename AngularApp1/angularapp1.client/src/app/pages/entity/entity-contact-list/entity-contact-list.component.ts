import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EntityContact } from '../../../core/models/entity-contact.model';
import { ApiEntityContactService } from '../../../core/services/api-entity-contact.service';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-entity-contact-list',
  templateUrl: './entity-contact-list.component.html',
  styleUrls: ['./entity-contact-list.component.css'],
  standalone: false
})
export class EntityContactListComponent implements OnInit, OnDestroy {
  @Input() entityId: number | undefined = 0;

  public entityContacts: EntityContact[] = [];
  public availableContacts: any[] = [];
  public dataloading: boolean = false;
  public showAddForm: boolean = false;
  public editingItem: EntityContact | null = null;

  // Form data
  public selectedContactId: number | undefined;
  public notes: string = '';
  public isActive: boolean = true;
  public activeFrom: Date | null = null;
  public activeTo: Date | null = null;

  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['contactName', 'notes', 'activeFrom', 'activeTo', 'isActive', 'actions'];

  constructor(
    private apiEntityContactService: ApiEntityContactService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadEntityContacts();
    this.loadAvailableContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEntityContacts(): void {
    if (!this.entityId || this.entityId === 0) {
      return;
    }

    this.dataloading = true;
    this.apiEntityContactService.getEntityContactsByEntityId(this.entityId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.entityContacts = data;
          this.dataloading = false;
        },
        error: (err) => {
          console.error('Error loading entity contacts:', err);
          this.dataloading = false;
        }
      });
  }

  loadAvailableContacts(): void {
    this.apiService.getContacts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.availableContacts = data;
        },
        error: (err) => {
          console.error('Error loading contacts:', err);
        }
      });
  }

  onAdd(): void {
    this.showAddForm = true;
    this.editingItem = null;
    this.selectedContactId = undefined;
    this.notes = '';
    this.isActive = true;
    this.activeFrom = null;
    this.activeTo = null;
  }

  onEdit(item: EntityContact): void {
    this.editingItem = item;
    this.selectedContactId = item.contactId;
    this.notes = item.notes || '';
    this.isActive = item.isActive ?? true;
    this.activeFrom = item.activeFrom ? new Date(item.activeFrom) : null;
    this.activeTo = item.activeTo ? new Date(item.activeTo) : null;
    this.showAddForm = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to remove this contact?')) {
      this.apiEntityContactService.deleteEntityContact(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadEntityContacts();
          },
          error: (err) => {
            console.error('Error deleting entity contact:', err);
            alert('Failed to delete entity contact.');
          }
        });
    }
  }

  onSave(): void {
    if (!this.selectedContactId) {
      alert('Please select a contact');
      return;
    }

    const entityContact: EntityContact = {
      entityId: this.entityId,
      contactId: this.selectedContactId,
      notes: this.notes,
      isActive: this.isActive,
      activeFrom: this.activeFrom ? new Date(this.activeFrom) : null,
      activeTo: this.activeTo ? new Date(this.activeTo) : null
    };

    if (this.editingItem && this.editingItem.id) {
      // Update existing
      entityContact.id = this.editingItem.id;
      this.apiEntityContactService.updateEntityContact(this.editingItem.id, entityContact)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadEntityContacts();
            this.onCancel();
          },
          error: (err) => {
            console.error('Error updating entity contact:', err);
            alert('Failed to update entity contact.');
          }
        });
    } else {
      // Add new
      this.apiEntityContactService.addEntityContact(entityContact)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadEntityContacts();
            this.onCancel();
          },
          error: (err) => {
            console.error('Error adding entity contact:', err);
            alert('Failed to add entity contact.');
          }
        });
    }
  }

  onCancel(): void {
    this.showAddForm = false;
    this.editingItem = null;
    this.selectedContactId = undefined;
    this.notes = '';
    this.isActive = true;
    this.activeFrom = null;
    this.activeTo = null;
  }
}
