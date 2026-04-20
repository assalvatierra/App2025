# Resource Assignment Implementation

## Overview
This document describes the implementation of resource assignment tracking for job services in the Client Calendar component using the `JobServiceResource` table.

## Changes Made

### 1. Backend Changes (C# / .NET)

#### DTO Updates (`Erp.Domain/DTOs/ResourceCalendarDto.cs`)
Added new DTOs to support resource assignment information:

```csharp
public class JobServiceCalendarDto
{
    // ... existing properties
    public List<AssignedResourceDto> AssignedResources { get; set; } = new();
    public bool HasResourcesAssigned { get; set; }
}

public class AssignedResourceDto
{
    public int JobServiceResourceId { get; set; }
    public int ResourceId { get; set; }
    public string ResourceName { get; set; } = string.Empty;
    public string? ResourceCode { get; set; }
}
```

#### Controller Updates (`ResourceCalendarController.cs`)

**New Method: `GetAssignedResources`**
```csharp
private async Task<Dictionary<int, List<AssignedResourceDto>>> GetAssignedResources(List<int> jobServiceIds)
```
- Queries the `JobServiceResource` table
- Joins with the `Resource` table to get resource details
- Returns a dictionary mapping JobServiceId to list of assigned resources

**Updated Method: `BuildJobServiceCalendar`**
- Now accepts an additional parameter: `assignedResources`
- Populates the `AssignedResources` collection
- Sets the `HasResourcesAssigned` flag based on whether resources exist

**Updated Method: `GetJobsCalendar`**
- Calls `GetAssignedResources` to fetch resource assignment data
- Passes the data to `BuildJobServiceCalendar`

### 2. Frontend Changes (TypeScript / Angular)

#### Model Updates (`resource-calendar.model.ts`)
Added new interfaces:

```typescript
export interface JobServiceCalendarDto {
  // ... existing properties
  assignedResources: AssignedResourceDto[];
  hasResourcesAssigned: boolean;
}

export interface AssignedResourceDto {
  jobServiceResourceId: number;
  resourceId: number;
  resourceName: string;
  resourceCode?: string;
}
```

#### Component Updates (`client-calendar.component.ts`)

**New Display Columns:**
- `resourceStatus`: Visual icon indicator
- `assignedResources`: List of assigned resource names

**New Methods:**
- `getAssignedResourcesText(assignedResources)`: Formats assigned resources as comma-separated text
- `getResourceStatusIcon(service)`: Returns appropriate icon (check_circle or warning)
- `getResourceStatusColor(service)`: Returns color (primary for assigned, warn for unassigned)
- `getResourceStatusText(service)`: Returns tooltip text with resource count

#### Template Updates (`client-calendar.component.html`)

**New Columns:**
1. **Status Column**: Displays a Material icon
   - Green check (✓) when resources are assigned
   - Orange warning (⚠) when no resources assigned
   - Tooltip shows resource count

2. **Assigned Resources Column**: Shows resource names
   - Displays as comma-separated list: "Resource 1 (CODE), Resource 2 (CODE)"
   - Red italics for "None" when no resources
   - Tooltip shows full list

#### Style Updates (`client-calendar.component.css`)

```css
.no-resources {
  color: #f44336;
  font-style: italic;
}

mat-icon[color="warn"] {
  color: #ff9800;
}

mat-icon[color="primary"] {
  color: #4caf50;
}
```

## Database Schema

The implementation uses the existing `JobServiceResource` table:

```sql
JobServiceResource
├── Id (PK)
├── JobServiceId (FK -> JobService)
└── ResourceId (FK -> Resource)
```

## Data Flow

```
1. User navigates to /client-calendar
2. Component calls ApiResourceCalendarService.getJobsCalendar()
3. API queries:
   - JobService (base data)
   - JobServiceResource (resource assignments)
   - Resource (resource details)
4. Data is aggregated and returned as JobCalendarDto
5. Component flattens and displays in grid
6. Visual indicators show assignment status
```

## Usage Example

### Check if a Job Service has Resources Assigned

```typescript
if (service.hasResourcesAssigned) {
  console.log(`${service.assignedResources.length} resources assigned`);
  service.assignedResources.forEach(res => {
    console.log(`- ${res.resourceName} (${res.resourceCode})`);
  });
} else {
  console.log('No resources assigned to this job service');
}
```

## Visual Indicators

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| Assigned | check_circle | Green | One or more resources assigned |
| Not Assigned | warning | Orange | No resources assigned |

## Benefits

1. **Quick Visual Identification**: Instantly see which job services need resource assignment
2. **Detailed Information**: View all assigned resources with names and codes
3. **Better Planning**: Identify gaps in resource allocation
4. **Data Integrity**: Uses existing JobServiceResource relationships
5. **Performance**: Efficient batch queries to avoid N+1 problems

## Testing

To test the resource assignment feature:

1. Create a job service without resources
   - Should show orange warning icon
   - "Assigned Resources" should show "None" in red

2. Assign resources to a job service via JobServiceResource
   - Should show green check icon
   - "Assigned Resources" should list resource names

3. Hover over status icon
   - Should show tooltip with resource count

4. Filter/search the grid
   - Resource information should be included in search results
