import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EntityContact } from '../../../core/models/entity-contact.model';
import { ApiEntityContactService } from '../../../core/services/api-entity-contact.service';
import { ApiEntityService } from '../../../core/services/api-entity.service';

@Component({
  selector: 'app-contact-entity-list',
  templateUrl: './contact-entity-list.component.html',
  styleUrls: ['./contact-entity-list.component.css'],
  standalone: false
})
export class ContactEntityListComponent implements OnInit, OnDestroy {
  @Input() contactId: number | undefined = 0;

  public entityContacts: EntityContact[] = [];
  public availableEntities: any[] = [];
  public dataloading: boolean = false;
  public showAddForm: boolean = false;
  public editingItem: EntityContact | null = null;

  // Form data
  public selectedEntityId: number | undefined;
  public notes: string = '';
  public isActive: boolean = true;
  public activeFrom: Date | null = null;
  public activeTo: Date | null = null;

  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['entityName', 'notes', 'activeFrom', 'activeTo', 'isActive', 'actions'];

  constructor(
    private apiEntityContactService: ApiEntityContactService,
    private apiEntityService: ApiEntityService
  ) {}

  ngOnInit(): void {
    this.loadEntityContacts();
    this.loadAvailableEntities();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEntityContacts(): void {
    if (!this.contactId || this.contactId === 0) {
      return;
    }

    this.dataloading = true;
    this.apiEntityContactService.getEntityContactsByContactId(this.contactId)
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

  loadAvailableEntities(): void {
    this.apiEntityService.getEntities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.availableEntities = data;
        },
        error: (err) => {
          console.error('Error loading entities:', err);
        }
      });
  }

  onAdd(): void {
    this.showAddForm = true;
    this.editingItem = null;
    this.selectedEntityId = undefined;
    this.notes = '';
    this.isActive = true;
    this.activeFrom = null;
    this.activeTo = null;
  }

  onEdit(item: EntityContact): void {
    this.editingItem = item;
    this.selectedEntityId = item.entityId;
    this.notes = item.notes || '';
    this.isActive = item.isActive ?? true;
    this.activeFrom = item.activeFrom ? new Date(item.activeFrom) : null;
    this.activeTo = item.activeTo ? new Date(item.activeTo) : null;
    this.showAddForm = true;
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to remove this entity?')) {
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
    if (!this.selectedEntityId) {
      alert('Please select an entity');
      return;
    }

    const entityContact: EntityContact = {
      contactId: this.contactId,
      entityId: this.selectedEntityId,
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
    this.selectedEntityId = undefined;
    this.notes = '';
    this.isActive = true;
    this.activeFrom = null;
    this.activeTo = null;
  }
}
