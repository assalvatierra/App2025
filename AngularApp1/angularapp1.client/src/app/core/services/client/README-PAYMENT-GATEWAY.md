# Payment Gateway Integration - Client API Service

## Overview
This document describes the integration between the Angular client and the backend Payment Gateway API for Stripe checkout sessions.

## Files Created/Modified

### New Files
1. **`api-payment-gateway.service.ts`** - Client API service in `/core/services/client/`
2. **`api-payment-gateway.service.spec.ts`** - Unit tests for the service

### Modified Files
1. **`PaymentGatewayController.cs`** - Updated to return JSON response instead of 303 redirect
2. **`client-job-main-form.component.ts`** - Added payment processing logic
3. **`client-job-main-form.component.html`** - Added click handler and loading states to payment button

## Implementation Details

### API Service (`api-payment-gateway.service.ts`)

#### Interface
```typescript
export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}
```

#### Method
```typescript
createCheckoutSession(): Observable<CheckoutSessionResponse>
```
- **Endpoint**: `POST /api/PaymentGateway`
- **Returns**: Observable with checkout session URL and session ID
- **Usage**: Called when user clicks "Proceed to Payment"

### Backend Controller Updates

The `PaymentGatewayController.CreateCheckoutSession()` now:
- Returns proper JSON response: `{ url: string, sessionId: string }`
- Includes `session_id` query parameter in success URL for tracking
- Includes `CancelUrl` for handling payment cancellation

```csharp
return Ok(new { url = session.Url, sessionId = session.Id });
```

### Component Integration

#### Component Properties
- `processingPayment: boolean` - Loading state for payment button
- Added `ApiPaymentGatewayService` to constructor injection

#### Method
```typescript
onProceedToPayment(): void
```
- Calls the payment gateway service
- Shows loading spinner during API call
- Redirects to Stripe Checkout on success
- Displays error message on failure

#### UI Updates
The "Proceed to Payment" button now:
- Shows loading spinner when processing
- Changes text to "Processing..." during API call
- Disables during loading or when data is loading
- Redirects to Stripe Checkout page on success

## User Flow

1. User views job order details on the client form
2. User clicks "Proceed to Payment" button
3. Button shows loading state ("Processing...")
4. Angular calls `createCheckoutSession()` API
5. Backend creates Stripe checkout session
6. Backend returns `{ url, sessionId }` in JSON
7. Angular redirects browser to Stripe checkout URL (`response.url`)
8. User completes payment on Stripe
9. Stripe redirects back to success page: `/payment/success?session_id={CHECKOUT_SESSION_ID}`

## Configuration

### Backend Configuration
Update the `domain` variable in `PaymentGatewayController.cs` to match your environment:
- Development: `https://localhost:51099`
- Production: Your production domain

### Stripe Configuration
Replace `{{PRICE_ID}}` in the controller with your actual Stripe Price ID:
```csharp
Price = "price_1234567890abcdef", // Your Stripe Price ID
```

## Error Handling

### Frontend
- Network errors are caught and displayed to the user
- Console logging for debugging
- User-friendly error messages
- Button re-enabled after error

### Backend
- Stripe API errors bubble up as HTTP errors
- Should be handled by the calling code

## Testing

### Manual Testing
1. Navigate to job order page: `/client/job/{recordGuid}`
2. Click "Proceed to Payment"
3. Should redirect to Stripe checkout page
4. Complete test payment
5. Should redirect back to `/payment/success`

### Unit Tests
Run the service spec file:
```bash
ng test --include='**/api-payment-gateway.service.spec.ts'
```

## Future Enhancements

- [ ] Pass job order details (amount, description) to checkout session
- [ ] Store payment session ID in database before redirect
- [ ] Add payment cancellation handling
- [ ] Implement webhook for payment confirmation
- [ ] Add retry logic for failed API calls
- [ ] Add analytics tracking for payment initiation
- [ ] Support multiple payment methods
- [ ] Add payment history/receipt downloading

## Notes

- The service is provided at root level (`providedIn: 'root'`)
- Uses singleton pattern for better performance
- All HTTP calls are Observable-based for proper async handling
- Window.location.href is used for full page redirect to Stripe (required)
