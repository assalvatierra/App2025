import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { JobContactFormComponent } from './job-contact-form/job-contact-form.component';
import { ApiJobCustomersService, JobCustomerDto } from '../../../../core/services/api-job-customers.service';
import { ApiEntityContactService } from '../../../../core/services/api-entity-contact.service';
import { ApiService } from '../../../../core/api.service';

@Component({
  selector: 'app-job-main-contacts',
  templateUrl: './job-main-contacts.component.html',
  styleUrls: ['./job-main-contacts.component.css'],
  standalone: false
})
export class JobMainContactsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() jobMainId: number = 0;

  public mergedContacts: any[] = [];
  public dataloading: boolean = false;
  public displayColumns: string[] = ['id','name', 'contactNo1', 'email1', 'notes', 'source', 'actions'];

  // dialog state handled via MatDialog

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // initial load if parent already provided an id
    if (this.jobMainId && this.jobMainId !== 0) {
      this.loadContacts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobMainId'] && !changes['jobMainId'].isFirstChange()) {
      const val = changes['jobMainId'].currentValue as number;
      if (val && val !== 0) {
        this.loadContacts();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadContacts(): void {
    this.dataloading = true;

    // 1) Load JobCustomers for the job and fetch EntityContacts for each customer
    this.apiJobCustomers.getJobCustomersByJobMain(this.jobMainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (jobCustomers: JobCustomerDto[]) => {
          const calls = jobCustomers
            .filter(jc => !!jc.customerId)
            .map(jc => this.apiEntityContact.getEntityContactsByEntityId(jc.customerId as number));

          if (calls.length === 0) {
            // Still attempt to load job contacts (if any)
            this.loadJobContactsAndFinalize([]);
            return;
          }

          forkJoin(calls).pipe(takeUntil(this.destroy$)).subscribe({
            next: (results: any[]) => {
              // results is array of EntityContact[] per customer in same order
              const collected: any[] = [];
              results.forEach((arr: any[], idx: number) => {
                const cust = jobCustomers.filter(jc => !!jc.customerId)[idx];
                arr.forEach((ec: any) => {
                  const contact = ec.contact || {};
                  collected.push({
                    contactId: contact.id || ec.contactId,
                    name: contact.name || '',
                    contactNo1: contact.contactNo1 || contact.contactNo || '',
                    email1: contact.email1 || '',
                    source: `Customer: ${cust.customerName || cust.customerId}`,
                    entityContactId: ec.id,
                    entityId: ec.entityId,
                    notes: ec.notes
                  });
                });
              });

              this.loadJobContactsAndFinalize(collected);
            },
            error: (err: any) => {
              console.error('Error loading entity contacts for job customers:', err);
              this.loadJobContactsAndFinalize([]);
            }
          });
        },
        error: (err: any) => {
          console.error('Error loading job customers:', err);
          this.loadJobContactsAndFinalize([]);
        }
      });
  }

  private loadJobContactsAndFinalize(collectedFromCustomers: any[]): void {
    // 2) Try to load JobContacts (if the backend exposes this endpoint). If not available, it will fail gracefully.
    const jobContacts$ = (this.apiService as any).getJobContactsByJobMain
      ? (this.apiService as any).getJobContactsByJobMain(this.jobMainId)
      : null;

    if (!jobContacts$) {
      this.finalizeMergedList(collectedFromCustomers, []);
      return;
    }

    jobContacts$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (jobContacts: any[]) => {
        // Map jobContacts to unified shape. Backend may return nested contact info or just contactId.
        const mapped = (jobContacts || []).map(jc => {
          const contact = jc.contact || jc.contactInfo || {};
          return {
            contactId: contact.id || jc.contactId,
            name: contact.name || jc.contactName || '',
            contactNo1: contact.contactNo1 || contact.contactNo || '',
            email1: contact.email1 || '',
            source: 'Job Contact',
            jobContactId: jc.id,
            notes: jc.notes
          };
        });

        this.finalizeMergedList(collectedFromCustomers, mapped);
      },
      error: (err: any) => {
        // If endpoint not present or error, still show collectedFromCustomers
        console.warn('JobContacts endpoint unavailable or failed:', err);
        this.finalizeMergedList(collectedFromCustomers, []);
      }
    });
  }

  constructor(
    private apiJobCustomers: ApiJobCustomersService,
    private apiEntityContact: ApiEntityContactService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  onAddClick(): void {
    const dialogRef = this.dialog.open(JobContactFormComponent, {
      width: '600px',
      data: { jobMainId: this.jobMainId },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.action === 'save') {
        this.loadContacts();
      }
    });
  }

  onRemove(item: any): void {
    // Only allow removing if it's a JobContact (has jobContactId or source === 'Job Contact')
    const id = item.jobContactId || item.jobContactId === 0 ? item.jobContactId : null;
    if (!id) {
      alert('This contact cannot be removed from the job (source is not JobContacts).');
      return;
    }

    if (!confirm('Are you sure you want to remove this contact from the job?')) {
      return;
    }

    this.apiService.deleteJobContact(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadContacts();
        },
        error: (err: any) => {
          console.error('Error deleting job contact:', err);
          alert('Failed to remove contact');
        }
      });
  }

  private finalizeMergedList(fromCustomers: any[], fromJobContacts: any[]): void {
    // Merge and deduplicate by contactId
    const map = new Map<number, any>();

    [...fromCustomers, ...fromJobContacts].forEach(item => {
      const id = Number(item.contactId) || 0;
      if (!id) {
        // fallback: use name hash
        const key = ('n_' + (item.name || '')).toLowerCase();
        map.set(key as any, item);
      } else {
        if (!map.has(id)) {
          map.set(id, item);
        }
      }
    });

    // Convert back to array and sort by name
    const merged = Array.from(map.values()).sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
    this.mergedContacts = merged;
    this.dataloading = false;
  }
}
