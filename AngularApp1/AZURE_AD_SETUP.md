# Azure AD Authentication Setup for Angular SPA

## Backend Configuration (ASP.NET Core API)

The API has been configured to accept JWT Bearer tokens from Azure AD (Microsoft Entra ID).

### Configuration Details:
- **Tenant ID**: `5af3d8e8-68a9-44a9-803f-41eb21abad0f`
- **Client ID (Application ID)**: `384786e9-f7b8-4634-a95c-9239daf8d57a`
- **Authority**: `https://login.microsoftonline.com/5af3d8e8-68a9-44a9-803f-41eb21abad0f/v2.0`

### API Endpoints:
- **Auth Status**: `GET /api/auth/status` (anonymous - check if authenticated)
- **Verify Token**: `GET /api/auth/verify` (protected - verify JWT token)

---

## Frontend Configuration (Angular)

To enable automatic SSO redirection in your Angular app, follow these steps:

### 1. Install MSAL for Angular

```bash
npm install @azure/msal-browser @azure/msal-angular
```

### 2. Configure MSAL in your Angular app

**Create/Update `src/app/auth-config.ts`:**

```typescript
import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
	clientId: '384786e9-f7b8-4634-a95c-9239daf8d57a',
	authority: 'https://login.microsoftonline.com/5af3d8e8-68a9-44a9-803f-41eb21abad0f',
	redirectUri: window.location.origin, // or 'http://localhost:4200' for dev
	postLogoutRedirectUri: window.location.origin
  },
  cache: {
	cacheLocation: 'sessionStorage',
	storeAuthStateInCookie: false
  },
  system: {
	loggerOptions: {
	  loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
		if (containsPii) return;
		switch (level) {
		  case LogLevel.Error:
			console.error(message);
			break;
		  case LogLevel.Info:
			console.info(message);
			break;
		  case LogLevel.Verbose:
			console.debug(message);
			break;
		  case LogLevel.Warning:
			console.warn(message);
			break;
		}
	  },
	  logLevel: LogLevel.Info
	}
  }
};

export const protectedResources = {
  api: {
	endpoint: 'https://localhost:7xxx/api', // Update with your API URL
	scopes: ['api://384786e9-f7b8-4634-a95c-9239daf8d57a/.default']
  }
};
```

### 3. Update `app.config.ts` or `app.module.ts`

**For Standalone Components (Angular 14+):**

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig, protectedResources } from './auth-config';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
	interactionType: InteractionType.Redirect,
	authRequest: {
	  scopes: protectedResources.api.scopes
	}
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(protectedResources.api.endpoint, protectedResources.api.scopes);

  return {
	interactionType: InteractionType.Redirect,
	protectedResourceMap
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
	provideRouter(routes),
	provideHttpClient(withInterceptorsFromDi()),
	importProvidersFrom(MsalModule),
	{
	  provide: MSAL_INSTANCE,
	  useFactory: MSALInstanceFactory
	},
	{
	  provide: MSAL_GUARD_CONFIG,
	  useFactory: MSALGuardConfigFactory
	},
	{
	  provide: MSAL_INTERCEPTOR_CONFIG,
	  useFactory: MSALInterceptorConfigFactory
	},
	MsalService,
	MsalGuard,
	MsalBroadcastService
  ]
};
```

### 4. Protect Routes with MsalGuard

**In your routes configuration:**

```typescript
import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
	path: 'jobs',
	component: JobsComponent,
	canActivate: [MsalGuard] // This will trigger SSO redirect
  },
  // ... other routes
];
```

### 5. Add MSAL Interceptor to HTTP Calls

The MSAL Interceptor will automatically add the Bearer token to API requests.

**In `app.config.ts`:**

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor } from '@azure/msal-angular';

providers: [
  // ... other providers
  {
	provide: HTTP_INTERCEPTORS,
	useClass: MsalInterceptor,
	multi: true
  }
]
```

### 6. Initialize MSAL in App Component

**Update `app.component.ts`:**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  constructor(
	private authService: MsalService,
	private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
	// Initialize MSAL
	this.authService.instance.initialize().then(() => {
	  this.authService.instance.handleRedirectPromise().then(() => {
		// Check if user is signed in
		const accounts = this.authService.instance.getAllAccounts();
		if (accounts.length > 0) {
		  this.authService.instance.setActiveAccount(accounts[0]);
		}
	  });
	});

	// Subscribe to authentication status changes
	this.msalBroadcastService.msalSubject$
	  .pipe(
		filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
		takeUntil(this._destroying$)
	  )
	  .subscribe((result: EventMessage) => {
		console.log('Login successful', result);
	  });

	this.msalBroadcastService.inProgress$
	  .pipe(
		filter((status: InteractionStatus) => status === InteractionStatus.None),
		takeUntil(this._destroying$)
	  )
	  .subscribe(() => {
		const accounts = this.authService.instance.getAllAccounts();
		if (accounts.length > 0) {
		  this.authService.instance.setActiveAccount(accounts[0]);
		}
	  });
  }

  ngOnDestroy(): void {
	this._destroying$.next();
	this._destroying$.complete();
  }
}
```

### 7. Example: Making Protected API Calls

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  private apiUrl = 'https://localhost:7xxx/api';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
	// MSAL Interceptor will automatically add Bearer token
	return this.http.get(`${this.apiUrl}/jobmains/list`);
  }
}
```

---

## Azure AD App Registration Requirements

Ensure your Azure AD App Registration has:

1. **Platform Configuration**:
   - Platform: Single-page application
   - Redirect URIs: `http://localhost:4200` (dev), `https://your-production-url.com` (prod)

2. **API Permissions**:
   - Microsoft Graph: `User.Read` (default)
   - Your API: `api://384786e9-f7b8-4634-a95c-9239daf8d57a/.default`

3. **Expose an API**:
   - Application ID URI: `api://384786e9-f7b8-4634-a95c-9239daf8d57a`
   - Scope: `.default` (or custom scopes)

4. **Authentication**:
   - Allow public client flows: No
   - Implicit grant: Access tokens ✓, ID tokens ✓ (for hybrid flow support)

---

## Testing

1. **Test Auth Status**:
   ```bash
   curl https://localhost:7xxx/api/auth/status
   ```

2. **Test Protected Endpoint** (should return 401 without token):
   ```bash
   curl https://localhost:7xxx/api/jobmains
   ```

3. **Test with Token** (get token from browser after login):
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" https://localhost:7xxx/api/jobmains
   ```

---

## How It Works

1. User navigates to protected route → **MsalGuard** triggers
2. User redirected to Azure AD login page
3. User authenticates → Azure AD redirects back with authorization code
4. MSAL exchanges code for **access token** (JWT)
5. **MsalInterceptor** adds token to all API requests automatically
6. API validates JWT token and grants access

---

## Troubleshooting

### "401 Unauthorized" even with token
- Check token expiration
- Verify audience (`aud` claim) matches ClientId
- Check issuer (`iss` claim) matches Authority

### CORS errors
- Ensure CORS policy allows Authorization header
- Check allowed origins in backend

### Token validation fails
- Check API logs for JWT validation details
- Verify Authority URL includes `/v2.0` endpoint
- Ensure clock skew isn't too large

### No automatic redirect
- Ensure `MsalGuard` is applied to routes
- Check MSAL initialization in app component
- Verify redirect URIs in Azure AD match exactly
