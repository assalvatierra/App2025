import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentDataService } from './payment-service/payment-data.service';
import { Payment } from '../../core/models/payment.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  imports: [CommonModule, PaymentListComponent, PaymentFormComponent],
  providers: [PaymentDataService]
})
export class PaymentsComponent implements OnInit, OnDestroy {

  public currentView: 'list' | 'form' = 'list';
  public payments: Payment[] = [];
  public selectedPayment: Payment | null = null;
  public selectedMode: string | null = null;
  public defaultFilterMode: string | null = null;
  public dataloading: boolean = true;

  private destroy$ = new Subject<void>();
  private isNavigatingAway = false;

  constructor(
    private paymentDataService: PaymentDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to query parameter changes (will fire on initial load AND subsequent changes)
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const newMode = params['mode'] || null;
        
        // Check if mode is changing AND form is open
        if (newMode !== this.defaultFilterMode && 
            this.currentView === 'form' && 
            !this.isNavigatingAway) {
          
          const previousMode = this.defaultFilterMode;
          
          // Show confirmation dialog
          const confirmMessage = this.buildConfirmationMessage(previousMode, newMode);
          
          if (!confirm(confirmMessage)) {
            // User cancelled - prevent navigation
            this.preventNavigation(previousMode);
            return;
          } else {
            // User confirmed - close form and proceed
            this.closeFormAndProceed(newMode);
          }
        } else {
          // Normal mode change (form not open)
          if (newMode !== this.defaultFilterMode) {
            this.defaultFilterMode = newMode;
            console.log('Mode changed from navigation:', this.defaultFilterMode);
          }
        }
      });

    this.paymentDataService.loadPayments();

    this.paymentDataService.payments$.subscribe(data => {
      this.payments = data;
    });

    this.paymentDataService.loading$.subscribe(loading => {
      this.dataloading = loading;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildConfirmationMessage(fromMode: string | null, toMode: string | null): string {
    const fromDisplay = this.getModeDisplayName(fromMode);
    const toDisplay = this.getModeDisplayName(toMode);
    
    return `You are switching from ${fromDisplay} to ${toDisplay}.\n\n` +
           `The current form will be closed.\n` +
           `Any unsaved changes will be lost.\n\n` +
           `Do you want to continue?`;
  }

  private getModeDisplayName(mode: string | null): string {
    if (!mode) return 'All Payments';
    
    switch (mode) {
      case 'RECEIPT':
        return 'Collection';
      case 'RELEASE':
        return 'Payments';
      default:
        return mode;
    }
  }

  private preventNavigation(previousMode: string | null): void {
    this.isNavigatingAway = true;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: previousMode },
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then(() => {
      this.isNavigatingAway = false;
      console.log('Navigation cancelled, staying on:', previousMode);
    });
  }

  private closeFormAndProceed(newMode: string | null): void {
    // Close the form
    this.currentView = 'list';
    this.selectedPayment = null;
    this.selectedMode = null;
    
    // Update the mode - this will trigger change detection in child component
    // Force a new reference to ensure ngOnChanges fires
    const previousMode = this.defaultFilterMode;
    this.defaultFilterMode = newMode;
    
    console.log('Form closed, mode changed from', previousMode, 'to:', newMode);
  }

  onAddRecord(mode: string | null = null): void {
    this.selectedPayment = null;
    this.selectedMode = mode;
    this.currentView = 'form';
  }

  onEditRecord(paymentId: number): void {
    this.paymentDataService.loadPayment(paymentId).subscribe({
      next: (payment) => {
        this.selectedPayment = payment;
        this.currentView = 'form';
      },
      error: (error) => {
        console.error('Error loading payment for edit:', error);
        alert(`Failed to load payment: ${error.message}`);
      }
    });
  }

  onDeleteRecord(paymentId: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentDataService.deletePayment(paymentId).subscribe(() => {
        this.paymentDataService.loadPayments();
      });
    }
  }

  onSaveRecord(payment: Payment): void {
    if (payment.id) {
      // Update existing
      this.paymentDataService.updatePayment(payment.id, payment).subscribe({
        next: () => {
          this.paymentDataService.loadPayments();
          this.paymentDataService.loadPayment(payment.id!).subscribe({
            next: (updated) => {
              this.selectedPayment = updated;
              this.currentView = 'form';
            },
            error: (err) => console.error('Error reloading payment:', err)
          });
        },
        error: (error) => {
          console.error('Error updating payment:', error);
          alert(`Failed to update payment: ${error.message}`);
        }
      });
    } else {
      // Create new
      this.paymentDataService.addPayment(payment).subscribe({
        next: (newPayment) => {
          this.paymentDataService.loadPayments();
          if (newPayment.id) {
            this.paymentDataService.loadPayment(newPayment.id).subscribe({
              next: (complete) => {
                this.selectedPayment = complete;
                this.currentView = 'form';
              },
              error: () => {
                this.selectedPayment = newPayment;
                this.currentView = 'form';
              }
            });
          } else {
            this.selectedPayment = newPayment;
            this.currentView = 'form';
          }
        },
        error: (error) => {
          console.error('Error adding payment:', error);
          alert(`Failed to add payment: ${error.message}`);
        }
      });
    }
  }

  onCancelForm(): void {
    this.selectedPayment = null;
    this.selectedMode = null;
    this.currentView = 'list';
  }
}

