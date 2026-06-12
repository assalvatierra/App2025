import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiPaymentGatewayService {

  private url = 'http://localhost:5157';

  constructor(private http: HttpClient) { }

  /**
   * Creates a Stripe checkout session for payment processing
   * @returns Observable with the checkout session response containing URL and session ID
   */
  createCheckoutSession(): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.url}/api/PaymentGateway`, {});
  }
}

