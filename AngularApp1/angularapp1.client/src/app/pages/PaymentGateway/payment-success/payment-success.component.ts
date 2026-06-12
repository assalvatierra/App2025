import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  transactionId: string | null = null;
  amount: string | null = null;
  currency: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get query parameters from URL (these will be set by payment gateway callback)
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'] || null;
      this.transactionId = params['transaction_id'] || null;
      this.amount = params['amount'] || null;
      this.currency = params['currency'] || 'USD';
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToOrders(): void {
    // Navigate to orders/transactions page
    // Update this route based on your application structure
    this.router.navigate(['/Jobs']);
  }
}
