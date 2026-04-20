# Component Refactoring: CalendarCell to ServiceRequirementCell

## Overview
The `calendar-cell` component has been refactored and renamed to `service-requirement-cell` to better reflect its purpose and align with domain terminology.

## Changes Made

### 1. Component Renamed
- **Old Name**: `CalendarCellComponent`
- **New Name**: `ServiceRequirementCellComponent`
- **Old Selector**: `app-calendar-cell`
- **New Selector**: `app-service-requirement-cell`

### 2. Interface Renamed
- **Old Name**: `CalendarCellItem`
- **New Name**: `ServiceRequirementCellItem`

### 3. Files Structure

#### Old Structure (Removed):
```
client-calendar/
  └── calendar-cell/
      ├── calendar-cell.component.ts
      ├── calendar-cell.component.html
      ├── calendar-cell.component.css
      └── calendar-cell.component.spec.ts
```

#### New Structure (Created):
```
client-calendar/
  └── service-requirement-cell/
      ├── service-requirement-cell.component.ts
      ├── service-requirement-cell.component.html
      ├── service-requirement-cell.component.css
      └── service-requirement-cell.component.spec.ts
```

### 4. Updated References

#### client-calendar.component.ts
- Updated import statement:
  ```typescript
  // Before
  import { CalendarCellComponent, CalendarCellItem } from './calendar-cell/calendar-cell.component';

  // After
  import { ServiceRequirementCellComponent, ServiceRequirementCellItem } from './service-requirement-cell/service-requirement-cell.component';
  ```

- Updated imports array:
  ```typescript
  // Before
  imports: [..., CalendarCellComponent]

  // After
  imports: [..., ServiceRequirementCellComponent]
  ```

- Updated type references:
  ```typescript
  // Before
  calendarData: Map<string, CalendarCellItem[]> = new Map();
  getCellItems(customer: string, day: Date): CalendarCellItem[]
  const cellItem: CalendarCellItem = {...}

  // After
  calendarData: Map<string, ServiceRequirementCellItem[]> = new Map();
  getCellItems(customer: string, day: Date): ServiceRequirementCellItem[]
  const cellItem: ServiceRequirementCellItem = {...}
  ```

#### client-calendar.component.html
- Updated component selector:
  ```html
  <!-- Before -->
  <app-calendar-cell 
    [items]="getCellItems(customer, day)"
    [customerName]="customer"
    [date]="day"
    [viewMode]="viewMode">
  </app-calendar-cell>

  <!-- After -->
  <app-service-requirement-cell 
    [items]="getCellItems(customer, day)"
    [customerName]="customer"
    [date]="day"
    [viewMode]="viewMode">
  </app-service-requirement-cell>
  ```

### 5. Component Functionality

All functionality remains unchanged:
- ✅ Compact and Expanded view modes
- ✅ Icon-based type indicators
- ✅ Tooltip with full details
- ✅ Color-coded item types
- ✅ Input properties: items, customerName, date, viewMode
- ✅ Methods: getItemTooltip, getItemIcon, getItemIconColor

### 6. Interface Structure

The `ServiceRequirementCellItem` interface maintains the same properties:
```typescript
interface ServiceRequirementCellItem {
  customerId: number;
  customerName: string;
  dateFrom: Date;
  dateTo: Date;
  itemType: string;
  requiredQty: number;
  notes: string;
  jobReference: string;
}
```

## Rationale

The renaming better reflects that this component displays **service requirements** (like vehicles, drivers, equipment) rather than generic calendar cells. This improves:

1. **Code Clarity**: The name clearly indicates what data it displays
2. **Domain Alignment**: Uses business terminology (service requirements)
3. **Maintainability**: Easier for developers to understand the component's purpose
4. **Consistency**: Aligns with the domain model (ServiceRequirementDto)

## Testing

- ✅ Build successful
- ✅ All imports updated
- ✅ Component selector changed
- ✅ Unit tests updated
- ✅ Old files removed

## Migration Impact

This is a **non-breaking change** within the feature module since:
- The component is only used within the client-calendar module
- No external dependencies exist
- The refactoring is complete and isolated

## Date
January 2025
