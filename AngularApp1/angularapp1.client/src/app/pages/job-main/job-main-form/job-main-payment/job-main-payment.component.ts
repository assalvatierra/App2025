import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { ApiJobCustomersService, JobCustomerDto } from '../../../../core/services/api-job-customers.service';
import { ApiEntityContactService } from '../../../../core/services/api-entity-contact.service';
import { ApiService } from '../../../../core/api.service';

// Add more currencies here in the future
const SUPPORTED_CURRENCIES = ['PHP'];

export interface PaymongoPaymentRequest {
  amount: number;
  description: string;
  currency: string;
  receiptEmail: string;
  emailMessage: string;
}

export interface ContactEmailOption {
  email: string;
  label: string; // e.g. "John Doe (Customer: ABC Corp)"
}

@Component({
  selector: 'app-job-main-payment',
  standalone: false,
  templateUrl: './job-main-payment.component.html',
  styleUrl: './job-main-payment.component.css'
})
export class JobMainPaymentComponent implements OnInit, OnDestroy {
  @Input() jobMainId: number = 0;

  currencies: string[] = SUPPORTED_CURRENCIES;
  isGeneratingLink: boolean = false;
  contactEmails: ContactEmailOption[] = [];
  isLoadingEmails: boolean = false;

  // Read-only fields populated after link generation
  paymongoReference: string = '';
  paymongoStatus: string = '';
  paymentLink: string = '';

  paymongoForm: PaymongoPaymentRequest = {
    amount: 0,
    description: '',
    currency: 'PHP',
    receiptEmail: '',
    emailMessage: ''
  };

  private destroy$ = new Subject<void>();

  constructor(
    private apiJobCustomers: ApiJobCustomersService,
    private apiEntityContact: ApiEntityContactService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.jobMainId && this.jobMainId !== 0) {
      this.loadContactEmails();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadContactEmails(): void {
    this.isLoadingEmails = true;
    const emails: ContactEmailOption[] = [];

    // Load job customers then their entity contacts, mirroring the contacts tab logic
    this.apiJobCustomers.getJobCustomersByJobMain(this.jobMainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (jobCustomers: JobCustomerDto[]) => {
          const calls = jobCustomers
            .filter(jc => !!jc.customerId)
            .map(jc => this.apiEntityContact.getEntityContactsByEntityId(jc.customerId as number));

          const collectFromJobContacts = (fromCustomers: ContactEmailOption[]) => {
            const jobContacts$ = (this.apiService as any).getJobContactsByJobMain
              ? (this.apiService as any).getJobContactsByJobMain(this.jobMainId)
              : null;

            if (!jobContacts$) {
              this.contactEmails = fromCustomers;
              this.isLoadingEmails = false;
              return;
            }

            jobContacts$.pipe(takeUntil(this.destroy$)).subscribe({
              next: (jobContacts: any[]) => {
                const fromJob: ContactEmailOption[] = (jobContacts || [])
                  .filter((jc: any) => {
                    const email = (jc.contact?.email1 || jc.contactEmail || '').trim();
                    return !!email;
                  })
                  .map((jc: any) => ({
                    email: jc.contact?.email1 || jc.contactEmail || '',
                    label: `${jc.contact?.name || jc.contactName || ''} (Job Contact)`
                  }));
                this.contactEmails = [...fromCustomers, ...fromJob];
                this.isLoadingEmails = false;
              },
              error: () => {
                this.contactEmails = fromCustomers;
                this.isLoadingEmails = false;
              }
            });
          };

          if (calls.length === 0) {
            collectFromJobContacts([]);
            return;
          }

          forkJoin(calls).pipe(takeUntil(this.destroy$)).subscribe({
            next: (results: any[]) => {
              results.forEach((arr: any[], idx: number) => {
                const cust = jobCustomers.filter(jc => !!jc.customerId)[idx];
                (arr || []).forEach((ec: any) => {
                  const contact = ec.contact || {};
                  const email = (contact.email1 || '').trim();
                  if (email) {
                    emails.push({
                      email,
                      label: `${contact.name || ''} (${cust.customerName || cust.customerId})`
                    });
                  }
                });
              });
              collectFromJobContacts(emails);
            },
            error: () => {
              collectFromJobContacts([]);
            }
          });
        },
        error: () => {
          this.isLoadingEmails = false;
        }
      });
  }

  onSubmitPaymongo(): void {
    console.log('PayMongo payment request:', this.paymongoForm);
    // TODO: wire up to PayMongo API service
  }

  onGeneratePaymentLink(): void {
    this.isGeneratingLink = true;
    this.paymongoReference = '';
    this.paymongoStatus = '';
    this.paymentLink = '';
    console.log('Generating PayMongo payment link:', this.paymongoForm);
    // TODO: wire up to PayMongo payment link API
    // Simulated response until API is connected
    setTimeout(() => {
      this.paymongoReference = 'link_placeholder_ref';
      this.paymongoStatus = 'pending';
      this.paymentLink = 'https://pm.link/placeholder';
      this.isGeneratingLink = false;
    }, 500);
  }
}
