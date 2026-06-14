import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { ApiJobCustomersService, JobCustomerDto } from '../../../../core/services/api-job-customers.service';
import { ApiEntityContactService } from '../../../../core/services/api-entity-contact.service';
import { ApiService } from '../../../../core/api.service';
import { ApiPaymentExternalService } from '../../../../core/services/api-payment-external.service';
import { PaymentExternal } from '../../../../core/models/payment-external.model';

// Add more currencies here in the future
const SUPPORTED_CURRENCIES = ['PHP'];

export interface PaymongoJsonInfo {
  description: string;
  externalReference: string;
  paymongoStatus: string;
  paymentLink: string;
  receiptEmail: string;
  emailMessage: string;
  checkoutExpiryHours?: string;
  checkoutPasskey?: string;
  expiryDateTime?: string;
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
  isSaving: boolean = false;
  isSendingPaymentLink: boolean = false;
  isUpdatingCheckout: boolean = false;
  contactEmails: ContactEmailOption[] = [];
  isLoadingEmails: boolean = false;

  isLoadingRecords: boolean = false;
  editingId: number | null = null;

  // Feature flags from payment gateway
  supportedFeatures: string[] = [];
  isLoadingFeatures: boolean = false;

  // Form fields
  amount: number = 0;
  currency: string = 'PHP';
  gateway: string = 'Paymongo';
  description: string = '';
  externalReference: string = ''; 
  paymongoStatus: string = '';
  paymentLink: string = '';
  receiptEmail: string = '';
  emailMessage: string = '';
  checkoutExpiryHours: string = '2';
  checkoutPasskey: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private apiJobCustomers: ApiJobCustomersService,
    private apiEntityContact: ApiEntityContactService,
    private apiService: ApiService,
    private apiPaymentExternal: ApiPaymentExternalService
  ) {}

  ngOnInit(): void {
    if (this.jobMainId && this.jobMainId !== 0) {
      this.loadFeatures();
      this.loadContactEmails();
      this.loadPaymentExternals();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeatures(): void {
    this.isLoadingFeatures = true;
    debugger;
    this.apiPaymentExternal.GetFeatures()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (features) => {
          this.supportedFeatures = features as string[];
          this.isLoadingFeatures = false;
        },
        error: () => {
          this.supportedFeatures = [];
          this.isLoadingFeatures = false;
        }
      });
  }

  hasFeature(featureName: string): boolean {
    return this.supportedFeatures.includes(featureName);
  }

  private loadPaymentExternals(): void {
    this.isLoadingRecords = true;
    this.apiPaymentExternal.getPaymentExternalsByJobMain(this.jobMainId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (records) => {
          this.isLoadingRecords = false;
          if (records && records.length > 0) {
            this.populateForm(records[0]);
          }
        },
        error: () => { this.isLoadingRecords = false; }
      });
  }

  private populateForm(record: PaymentExternal): void {
    this.editingId = record.id ?? null;
    this.amount = record.amount;
    this.currency = record.currency;
    this.gateway = record.gateway ?? 'Paymongo';

    const info = this.parseJsonInfo(record.jsonInfo);
    this.description = info.description;
    this.externalReference = info.externalReference;
    this.paymongoStatus = info.paymongoStatus;
    this.paymentLink = info.paymentLink;
    this.receiptEmail = info.receiptEmail;
    this.emailMessage = info.emailMessage;
    this.checkoutExpiryHours = info.checkoutExpiryHours ?? '2';
    this.checkoutPasskey = info.checkoutPasskey ?? '';
  }

  onSave(): void {
    this.isSaving = true;

    const jsonInfo: PaymongoJsonInfo = {
      description: this.description,
      externalReference: this.externalReference,
      paymongoStatus: this.paymongoStatus,
      paymentLink: this.paymentLink,
      receiptEmail: this.receiptEmail,
      emailMessage: this.emailMessage,
      checkoutExpiryHours: this.checkoutExpiryHours,
      checkoutPasskey: this.checkoutPasskey
    };

    const record: PaymentExternal = {
      id: this.editingId ?? undefined,
      gateway: this.gateway,
      amount: this.amount,
      currency: this.currency,
      jsonInfo: JSON.stringify(jsonInfo),
      jobMainId: this.jobMainId,
      ExternalId: this.externalReference
    };

    if (this.editingId) {
      this.apiPaymentExternal.updatePaymentExternal(this.editingId, record)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => { this.isSaving = false; this.loadPaymentExternals(); },
          error: () => { this.isSaving = false; }
        });
    } else {
      this.apiPaymentExternal.addPaymentExternal(record)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (created) => {
            this.editingId = created.id ?? null;
            this.isSaving = false;
            this.loadPaymentExternals();
          },
          error: () => { this.isSaving = false; }
        });
    }
  }

  onGeneratePaymentLink(): void {
    this.isGeneratingLink = true;
    this.externalReference = '';
    this.paymongoStatus = '';
    this.paymentLink = '';

    //call api service generatePaymentUrl
    this.apiPaymentExternal.generatePaymentUrl(this.editingId ?? 0)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (paymentExternal) => {
          const info = this.parseJsonInfo(paymentExternal.jsonInfo);
          this.externalReference = info.externalReference;
          this.paymongoStatus = info.paymongoStatus;
          this.paymentLink = info.paymentLink;
          this.isGeneratingLink = false;
        },
        error: () => {
          this.isGeneratingLink = false;
        }
      });
   
  }


  onSendCheckoutPage(): void {
    if (!this.receiptEmail || !this.paymentLink) return;
    this.isSendingPaymentLink = true;

    if (!this.editingId) {
      this.isSendingPaymentLink = false;
      return;
    }

    // Compute expiry date and time
    const expiryHours = parseInt(this.checkoutExpiryHours, 10) || 0;
    const currentDateTime = new Date();
    const expiryDateTime = new Date(currentDateTime.getTime() + expiryHours * 60 * 60 * 1000);

    const jsonInfo: PaymongoJsonInfo = {
      description: this.description,
      externalReference: this.externalReference,
      paymongoStatus: this.paymongoStatus,
      paymentLink: this.paymentLink,
      receiptEmail: this.receiptEmail,
      emailMessage: this.emailMessage,
      checkoutExpiryHours: this.checkoutExpiryHours,
      checkoutPasskey: this.checkoutPasskey,
      expiryDateTime: expiryDateTime.toISOString()
    };

    const record: PaymentExternal = {
      id: this.editingId,
      gateway: this.gateway,
      amount: this.amount,
      currency: this.currency,
      jsonInfo: JSON.stringify(jsonInfo),
      jobMainId: this.jobMainId,
      ExternalId: this.externalReference
    };

    this.apiPaymentExternal.sendCheckoutPage(this.editingId, record)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSendingPaymentLink = false;
          this.loadPaymentExternals();
        },
        error: () => {
          this.isSendingPaymentLink = false;
        }
      });
  }

  onSendPaymentLink(): void {
    if (!this.receiptEmail || !this.paymentLink) return;
    this.isSendingPaymentLink = true;

    if (!this.editingId) {
      this.isSendingPaymentLink = false;
      return;
    }

    this.apiPaymentExternal.sendPaymentLink(this.editingId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSendingPaymentLink = false;
          this.loadPaymentExternals();
        },
        error: () => {
          this.isSendingPaymentLink = false;
        }
      });
  }

  private parseJsonInfo(jsonInfo: string): PaymongoJsonInfo {
    try {
      return JSON.parse(jsonInfo) as PaymongoJsonInfo;
    } catch {
      return { description: '', externalReference: '', paymongoStatus: '', paymentLink: '', receiptEmail: '', emailMessage: '', checkoutExpiryHours: '2', checkoutPasskey: '' };
    }
  }

  onUpdateCheckoutOptions(): void {
    if (!this.editingId) return;
    this.isUpdatingCheckout = true;

    const jsonInfo: PaymongoJsonInfo = {
      description: this.description,
      externalReference: this.externalReference,
      paymongoStatus: this.paymongoStatus,
      paymentLink: this.paymentLink,
      receiptEmail: this.receiptEmail,
      emailMessage: this.emailMessage,
      checkoutExpiryHours: this.checkoutExpiryHours,
      checkoutPasskey: this.checkoutPasskey
    };

    const record: PaymentExternal = {
      id: this.editingId,
      gateway: this.gateway,
      amount: this.amount,
      currency: this.currency,
      jsonInfo: JSON.stringify(jsonInfo),
      jobMainId: this.jobMainId,
      ExternalId: this.externalReference
    };

    this.apiPaymentExternal.updatePaymentExternal(this.editingId, record)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isUpdatingCheckout = false;
          this.loadPaymentExternals();
        },
        error: () => {
          this.isUpdatingCheckout = false;
        }
      });
  }

  private loadContactEmails(): void {
    this.isLoadingEmails = true;
    const emails: ContactEmailOption[] = [];

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
}
