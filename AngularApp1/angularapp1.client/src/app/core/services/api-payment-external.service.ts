import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentExternal } from '../models/payment-external.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPaymentExternalService {

  private baseUrl = environment.apiConfig.uri;

  constructor(private http: HttpClient) { }

  GetPlatformName(): Observable<string> {
    return this.http.get(`${this.baseUrl}/api/PaymentExternal/GetPlatformName`, { responseType: 'text' });
  }

  GetFeatures(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PaymentExternal/GetFeatures`);
  }

  getPaymentExternals(): Observable<PaymentExternal[]> {
    return this.http.get<PaymentExternal[]>(`${this.baseUrl}/api/PaymentExternal`);
  }

  getPaymentExternal(id: number): Observable<PaymentExternal> {
    return this.http.get<PaymentExternal>(`${this.baseUrl}/api/PaymentExternal/${id}`);
  }

  getPaymentExternalsByJobMain(jobMainId: number): Observable<PaymentExternal[]> {
    return this.http.get<PaymentExternal[]>(`${this.baseUrl}/api/PaymentExternal/byJobMain/${jobMainId}`);
  }

  addPaymentExternal(paymentExternal: PaymentExternal): Observable<PaymentExternal> {
    return this.http.post<PaymentExternal>(`${this.baseUrl}/api/PaymentExternal`, paymentExternal);
  }

  updatePaymentExternal(id: number, paymentExternal: PaymentExternal): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/PaymentExternal/${id}`, paymentExternal);
  }

  deletePaymentExternal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/PaymentExternal/${id}`);
  }

  sendPaymentLink(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/PaymentExternal/sendPaymentLink/${id}`, {});
  }

  generatePaymentUrl(paymentExternalId: number): Observable<PaymentExternal> {
    return this.http.get<PaymentExternal>(`${this.baseUrl}/api/PaymentExternal/generatePaymentUrl/${paymentExternalId}`);
  }

  sendCheckoutPage(id: number, paymentExternal: PaymentExternal): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/PaymentExternal/sendCheckoutPage/${id}`, paymentExternal);
  }
}
