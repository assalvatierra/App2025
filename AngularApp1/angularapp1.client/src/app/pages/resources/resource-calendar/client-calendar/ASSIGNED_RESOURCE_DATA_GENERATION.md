# Assigned Resource Calendar Data Generation

## Overview
Added methods to the `client-calendar` component to generate and manage assigned resource cell data, enabling the display of assigned resources alongside service requirements in the calendar.

## New Properties

### `assignedResourceData`
```typescript
assignedResourceData: Map<string, AssignedResourceCellItem[]> = new Map();
```
- Stores assigned resources indexed by customer and date
- Uses same key format as `calendarData`: `"CustomerName|YYYY-MM-DD"`

## New Methods

### 1. `populateAssignedResourceData()`
**Purpose**: Populates the calendar with assigned resource data from job services.

**Process**:
1. Clears existing assigned resource data
2. Iterates through all job services in the data source
3. For each service with assigned resources:
   - Validates customer name and resource assignments exist
   - Gets service date range
   - Creates `AssignedResourceCellItem` for each resource
   - Maps resources to each day in the service period
   - Stores items in `assignedResourceData` map by customer-date key

**Key Features**:
- Skips services without customer name or assigned resources
- Handles date validation (skips if dateStart or dateEnd missing)
- Creates one entry per resource per day in the date range
- Determines resource type automatically

**Called By**:
- `loadJobServices()` - when data loads
- `applyDateFilter()` - when date range changes

### 2. `determineResourceType(resourceName, resourceCode?)`
**Purpose**: Intelligently determines the resource type based on name and code.

**Logic**:
```typescript
Driver   → Contains: "driver", "drv"
Vehicle  → Contains: "vehicle", "truck", "car", "veh"
Equipment → Contains: "equipment", "tool", "eqp"
Other    → Default for unmatched resources
```

**Example**:
```typescript
determineResourceType("John Doe", "DRV-001")      → "Driver"
determineResourceType("Delivery Truck", "VEH-05") → "Vehicle"
determineResourceType("Forklift", "EQP-10")       → "Equipment"
```

### 3. `getAssignedResources(customer, day)`
**Purpose**: Retrieves all assigned resources for a specific customer on a specific date.

**Returns**: `AssignedResourceCellItem[]`
- Array of assigned resources for that cell
- Empty array if no resources found

**Usage**:
```typescript
const resources = this.getAssignedResources('ABC Corp', new Date('2025-01-15'));
```

### 4. `hasAssignedResources(customer, day)`
**Purpose**: Checks if a cell has any assigned resources.

**Returns**: `boolean`
- `true` if resources exist
- `false` if no resources assigned

**Usage**:
```typescript
const hasResources = this.hasAssignedResources('ABC Corp', new Date('2025-01-15'));
```

## Data Flow

### 1. Initial Load
```
loadJobServices()
    ↓
Fetch jobs from API
    ↓
flattenJobServices()
    ↓
populateCalendarData()           (Service Requirements)
populateAssignedResourceData()   (Assigned Resources)
    ↓
Calendar displays both types of data
```

### 2. Date Filter Change
```
applyDateFilter()
    ↓
generateCalendarDays()
    ↓
populateCalendarData()           (Recalculate requirements)
populateAssignedResourceData()   (Recalculate resources)
    ↓
Calendar refreshes with new date range
```

## AssignedResourceCellItem Structure

```typescript
interface AssignedResourceCellItem {
  jobServiceResourceId: number;    // Unique assignment ID
  resourceId: number;               // Resource ID
  resourceName: string;             // e.g., "John Doe", "Truck-01"
  resourceCode?: string;            // e.g., "DRV-001", "VEH-123"
  resourceType: string;             // "Driver", "Vehicle", "Equipment", "Other"
  customerName: string;             // Customer for this assignment
  jobReference: string;             // Job reference number
  dateFrom: Date;                   // Service start date
  dateTo: Date;                     // Service end date
  notes?: string;                   // Service particulars/notes
}
```

## Example Data Mapping

### Source Data (AssignedResourceDto)
```typescript
{
  jobServiceResourceId: 1,
  resourceId: 100,
  resourceName: "John Doe",
  resourceCode: "DRV-001"
}
```

### Mapped to Cell Item
```typescript
{
  jobServiceResourceId: 1,
  resourceId: 100,
  resourceName: "John Doe",
  resourceCode: "DRV-001",
  resourceType: "Driver",          // ← Determined automatically
  customerName: "ABC Corp",         // ← From job
  jobReference: "JOB-2025-001",    // ← From job
  dateFrom: new Date('2025-01-15'), // ← From service
  dateTo: new Date('2025-01-20'),   // ← From service
  notes: "Delivery service"         // ← From service particulars
}
```

## Key Differences: Requirements vs Resources

| Aspect | Service Requirements | Assigned Resources |
|--------|---------------------|-------------------|
| **Data Source** | `service.requirements` | `service.assignedResources` |
| **Storage** | `calendarData` Map | `assignedResourceData` Map |
| **Item Type** | `ServiceRequirementCellItem` | `AssignedResourceCellItem` |
| **Key Property** | `itemType` + `requiredQty` | `resourceName` + `resourceCode` |
| **Type Determination** | From DTO | Calculated by `determineResourceType()` |
| **Purpose** | What's needed | Who's assigned |

## Usage in Template

```html
<!-- Service Requirements Cell -->
<app-service-requirement-cell 
  [items]="getCellItems(customer, day)"
  [customerName]="customer"
  [date]="day"
  [viewMode]="viewMode">
</app-service-requirement-cell>

<!-- Assigned Resources Cell -->
<app-assigned-resource-cell 
  [resources]="getAssignedResources(customer, day)"
  [customerName]="customer"
  [date]="day"
  [viewMode]="viewMode">
</app-assigned-resource-cell>
```

## Resource Type Detection Logic

The `determineResourceType()` method uses keyword matching:

### Driver Detection
- Keywords: "driver", "drv"
- Examples: "John Driver", "DRV-001", "Driver John"

### Vehicle Detection
- Keywords: "vehicle", "truck", "car", "veh"
- Examples: "Delivery Truck", "VEH-123", "Company Car"

### Equipment Detection
- Keywords: "equipment", "tool", "eqp"
- Examples: "Forklift", "EQP-045", "Power Tool"

### Fallback
- If no keywords match → "Other"
- Examples: "Conference Room", "Meeting Space"

## Performance Considerations

### Efficiency
- Single pass through data for each populate operation
- Map-based lookup: O(1) retrieval by customer-date key
- Only processes services with assigned resources

### Memory
- One `AssignedResourceCellItem` per resource per day
- Example: 5 resources × 7 days = 35 items stored
- Cleared and repopulated on data refresh

## Error Handling

### Validation Checks
1. ✅ Skips services without customer name
2. ✅ Skips services without assigned resources
3. ✅ Skips services with invalid dates (null/undefined)
4. ✅ Safe navigation: `get(key) || []` returns empty array

### Edge Cases
- Empty resource name → Uses provided name
- Missing resource code → Optional, works without it
- Unknown type → Defaults to "Other"

## Testing Scenarios

### Test Case 1: Single Resource Assignment
```typescript
Service: JOB-001, Customer: ABC Corp, Dates: Jan 15-17
Resources: [Driver-001]

Result: 
- 3 cells populated (Jan 15, 16, 17)
- Each contains same driver data
```

### Test Case 2: Multiple Resources
```typescript
Service: JOB-002, Customer: XYZ Inc, Dates: Jan 20-22
Resources: [Driver-001, Vehicle-005]

Result:
- 6 cells populated (2 resources × 3 days)
- Each day shows both driver and vehicle
```

### Test Case 3: No Resources
```typescript
Service: JOB-003, Customer: DEF Ltd, Dates: Jan 25-27
Resources: []

Result:
- 0 cells populated
- hasAssignedResources() returns false
```

## Integration Points

### Backend Dependencies
- Requires `AssignedResourceDto[]` from API
- Expects `jobServiceResourceId`, `resourceId`, `resourceName`
- Optional: `resourceCode`

### Frontend Components
- `AssignedResourceCellComponent` displays the data
- `client-calendar.component.html` uses getter methods
- View mode (compact/expanded) affects display

## Future Enhancements

Potential improvements:
- [ ] Resource availability checking
- [ ] Conflict detection (double-booking)
- [ ] Resource utilization percentage
- [ ] Filter by resource type
- [ ] Sort resources by type/name
- [ ] Group resources by type in cell

## Created
January 2025

## Related Files
- `client-calendar.component.ts` - Main component
- `assigned-resource-cell.component.ts` - Display component
- `service-requirement-cell.component.ts` - Requirements display
- `resource-calendar.model.ts` - Data models
