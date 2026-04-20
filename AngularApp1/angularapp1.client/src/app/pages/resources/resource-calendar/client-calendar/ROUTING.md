# Client Calendar Routing Configuration

## Route Setup

The Client Calendar component has been configured with the following routing:

### Route Definition
**File**: `src/app/routes.ts`

```typescript
{
  path: 'client-calendar',
  component: ClientCalendarComponent,
  canActivate: [AuthGuard]
}
```

**URL**: `/client-calendar`

**Protection**: Requires authentication via `AuthGuard`

### Navigation Menu
**File**: `src/app/core/navigation/navigation.component.ts`

The menu item has been added under **Resource Planning**:

```typescript
{
  name: 'Resource Planning',
  label: 'Resource Planning',
  icon: 'calendar_month',
  subItems: [
    { 
      name: 'Resource Calendar',
      label: 'Resource Calendar',
      icon: 'event', 
      route: 'resource-calendar'
    },
    { 
      name: 'Client Calendar',
      label: 'Client Calendar',
      icon: 'view_list', 
      route: 'client-calendar'
    }
  ]
}
```

## Access Methods

### 1. Direct URL
Navigate to: `https://yourdomain.com/client-calendar`

### 2. Navigation Menu
1. Click on **Resource Planning** in the sidebar
2. Click on **Client Calendar**

### 3. Programmatic Navigation
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToClientCalendar() {
  this.router.navigate(['/client-calendar']);
}
```

## Authentication
Users must be authenticated to access this route. Unauthenticated users will be redirected to the login page.

## Related Routes
- `/resource-calendar` - Resource Calendar (related component)
- `/resources` - Resources List
- `/timesheets` - Timesheets Management
