# Assigned Resource Cell Component

## Overview
The `app-assigned-resource-cell` component displays assigned resources (drivers, vehicles, equipment) in calendar cells with support for compact and expanded view modes.

## Component Details

### Selector
`app-assigned-resource-cell`

### Inputs
- `resources: AssignedResourceCellItem[]` - Array of assigned resources to display
- `customerName: string` - Customer name for context
- `date: Date` - The date for this cell
- `viewMode: 'compact' | 'expanded'` - Display mode

### Interface: AssignedResourceCellItem
```typescript
interface AssignedResourceCellItem {
  jobServiceResourceId: number;
  resourceId: number;
  resourceName: string;
  resourceCode?: string;
  resourceType: string;
  customerName: string;
  jobReference: string;
  dateFrom: Date;
  dateTo: Date;
  notes?: string;
}
```

## Features

### View Modes

#### Compact Mode
- **Icon + Initials**: Shows resource type icon with name initials
- **Space-efficient**: Horizontal pill layout
- **Quick identification**: Color-coded by type
- **Tooltip on hover**: Full details appear on mouse hover

#### Expanded Mode
- **Full details**: Shows complete resource information
- **Card layout**: Vertical stack with left border
- **Information displayed**:
  - Resource name with icon
  - Resource code (if available)
  - Resource type
  - Job reference
  - Notes (via tooltip)

### Visual Design

#### Icons by Resource Type
- 👤 **Driver/Person**: `person` icon (Green #4caf50)
- 🚚 **Vehicle/Truck**: `local_shipping` icon (Blue #2196f3)
- 🔧 **Equipment/Tool**: `construction` icon (Orange #ff9800)
- ⚙️ **Other**: `engineering` icon (Purple #673ab7)

#### Color Scheme
- **Border color**: Green (#4caf50) for all resources
- **Icon colors**: Type-specific (as listed above)
- **Background**: White with shadow
- **Hover effects**: Elevated shadow and slight lift

### Methods

#### `getResourceTooltip(resource)`
Generates detailed tooltip text including:
- Customer name
- Job reference
- Resource name
- Resource code
- Resource type
- Date range
- Notes (if available)

#### `getResourceIcon(resourceType)`
Returns appropriate Material icon based on resource type:
- Vehicle types → `local_shipping`
- Driver/Person → `person`
- Equipment → `construction`
- Default → `engineering`

#### `getResourceIconColor(resourceType)`
Returns color code based on resource type for visual categorization.

#### `getResourceInitials(resourceName)`
Extracts initials from resource name:
- Two-word names: First letter of each word (e.g., "John Doe" → "JD")
- Single-word names: First two letters (e.g., "Vehicle" → "VE")
- Empty names: Returns "?"

## Usage Example

### In Template
```html
<app-assigned-resource-cell 
  [resources]="getAssignedResources(customer, day)"
  [customerName]="customer"
  [date]="day"
  [viewMode]="viewMode">
</app-assigned-resource-cell>
```

### Data Preparation
```typescript
// Map AssignedResourceDto to AssignedResourceCellItem
const cellItems: AssignedResourceCellItem[] = assignedResources.map(resource => ({
  jobServiceResourceId: resource.jobServiceResourceId,
  resourceId: resource.resourceId,
  resourceName: resource.resourceName,
  resourceCode: resource.resourceCode,
  resourceType: determineResourceType(resource),
  customerName: job.customerName,
  jobReference: job.jobReference,
  dateFrom: service.dateStart,
  dateTo: service.dateEnd,
  notes: service.particulars
}));
```

## Styling

### Compact View
- Rounded pills (border-radius: 12px)
- Horizontal flex layout
- Gap: 4px between items
- Padding: 4px 8px

### Expanded View
- Vertical card layout
- Left border: 3px solid green
- Gap: 8px between cards
- Padding: 8px

### Hover States
- Box shadow elevation
- Subtle transform (translateY -1px)
- Smooth transitions (0.2s ease)

## Comparison with Service Requirement Cell

| Feature | Service Requirement Cell | Assigned Resource Cell |
|---------|-------------------------|------------------------|
| **Purpose** | Display required resources | Display assigned resources |
| **Border Color** | Blue (#2196f3) | Green (#4caf50) |
| **Compact Display** | Icon + Quantity | Icon + Initials |
| **Focus** | What's needed | Who's assigned |
| **Key Info** | Item type, qty, job ref | Resource name, code, type |

## Integration Points

### Parent Component Requirements
1. Import `AssignedResourceCellComponent`
2. Provide method to get assigned resources by customer/date
3. Pass view mode from toggle
4. Optionally map data from `AssignedResourceDto` to `AssignedResourceCellItem`

### CSS Dependencies
- Material Icons
- Material Tooltip

## Testing

The component includes comprehensive unit tests:
- ✅ Component creation
- ✅ Resource display in expanded mode
- ✅ Empty state handling
- ✅ Tooltip generation
- ✅ Initials extraction
- ✅ Icon selection logic

## Best Practices

1. **Data Mapping**: Transform server DTOs to component interface
2. **Error Handling**: Check for null/undefined resource properties
3. **Performance**: Use trackBy in *ngFor for resource lists
4. **Accessibility**: Ensure tooltips provide meaningful information
5. **Consistency**: Match view mode with service requirement cells

## Future Enhancements

Potential improvements:
- [ ] Click handler for resource details
- [ ] Status indicators (available, busy, unavailable)
- [ ] Resource availability percentage
- [ ] Drag-and-drop for reassignment
- [ ] Resource filtering by type
- [ ] Resource utilization metrics

## Created
January 2025
