# Client Calendar Component

## Overview
The Client Calendar component displays a list of job services in a grid/table format. It provides a comprehensive view of all job services with filtering and sorting capabilities.

## Location
`AngularApp1/angularapp1.client/src/app/pages/resources/resource-calendar/client-calendar/`

## Route
The component is accessible via the route: `/client-calendar`

The route is protected by `AuthGuard`, requiring authentication to access.

## Navigation
The component can be accessed from the application menu:
- **Resource Planning** > **Client Calendar**

## Features
- **Grid Display**: Shows job services in a Material table with sorting and pagination
- **Search/Filter**: Real-time search across all columns
- **Sorting**: Click column headers to sort data
- **Pagination**: Configurable page sizes (10, 25, 50, 100 items per page)
- **Responsive Design**: Table adapts to different screen sizes
- **Resource Assignment Tracking**: Visual indicators and detailed information about resource assignments
  - Green check icon: Resources are assigned
  - Orange warning icon: No resources assigned
  - Hover over icons for detailed counts
  - View all assigned resource names and codes

## Displayed Columns
1. **Job Reference**: The job identifier
2. **Customer**: Customer name associated with the job
3. **Service**: Service item name
4. **Start Date**: Service start date
5. **End Date**: Service end date
6. **Particulars**: Additional details about the service
7. **Requirements**: Service requirements with quantities

## Usage

### Import the Component
```typescript
import { ClientCalendarComponent } from './pages/resources/resource-calendar/client-calendar/client-calendar.component';
```

### Use in Template
```html
<app-client-calendar></app-client-calendar>
```

## Data Source
The component fetches data from the `ApiResourceCalendarService.getJobsCalendar()` method, which retrieves job services for the current month by default.

## Dependencies
- Angular Material Table (`MatTableModule`)
- Angular Material Paginator (`MatPaginatorModule`)
- Angular Material Sort (`MatSortModule`)
- Angular Material Card (`MatCardModule`)
- Angular Material Form Field (`MatFormFieldModule`)
- Angular Material Input (`MatInputModule`)
- Angular Material Icons (`MatIconModule`)
- Angular Material Progress Spinner (`MatProgressSpinnerModule`)
- Angular Material Tooltip (`MatTooltipModule`)

## Future Enhancements
This component is designed as a foundation. Planned enhancements include:
- Calendar view integration
- Date range filtering
- Status filtering
- Export functionality
- Drill-down to job details
- Resource allocation view

## Files
- `client-calendar.component.ts` - Component logic
- `client-calendar.component.html` - Component template
- `client-calendar.component.css` - Component styles
- `client-calendar.component.spec.ts` - Unit tests
