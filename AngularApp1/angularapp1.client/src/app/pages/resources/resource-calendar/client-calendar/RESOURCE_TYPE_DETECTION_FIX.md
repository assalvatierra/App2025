# Resource Type Detection Fix

## Issue
Vehicle type resources were being detected as "Others" instead of "Vehicle" in the assigned resources component.

## Root Cause
The `AssignedResourceDto` did not include a `ResourceType` field. The frontend was attempting to determine resource type from just the resource name and code, which was insufficient for accurate detection.

## Solution
Updated the backend to populate the `ResourceType` field based on the resource's `ItemType` in the database.

## Changes Made

### Backend Changes

#### 1. Updated `AssignedResourceDto` (Erp.Domain/DTOs/ResourceCalendarDto.cs)
- Added `ResourceType` property to store the detected resource type
```csharp
public string ResourceType { get; set; } = "Other"; // Driver, Vehicle, Equipment, Other
```

#### 2. Updated `ResourceCalendarController.GetAssignedResources()` Method
- Modified query to join with `ItemType` table
- Used `ItemType.Name` along with resource name and code for type detection
- Calls new `DetermineResourceTypeForResource()` method to determine resource type

#### 3. Added New Method `DetermineResourceTypeForResource()`
- Checks resource name, code, and item type name against keywords
- Uses existing keyword arrays: `DriverKeywords` and `VehicleKeywords`
- Returns: "Driver", "Vehicle", "Equipment", or "Other"

### Frontend Changes

#### 1. Updated TypeScript Model (resource-calendar.model.ts)
- Added optional `resourceType` field to `AssignedResourceDto` interface

#### 2. Updated Client Calendar Component (client-calendar.component.ts)
- Changed to use `resource.resourceType` from API instead of manual detection
- Removed local `determineResourceType()` method (no longer needed)

## Keyword Matching

### Vehicle Keywords
- "vehicle"
- "car"
- "van"
- "bus"
- "truck"
- "transport"

### Driver Keywords
- "driver"
- "chauffeur"
- "operator"
- "pilot"

### Equipment Keywords
- "equipment"
- "tool"

## Benefits
1. **More Accurate**: Uses database ItemType information for better classification
2. **Consistent**: Same logic on backend for both requirements and assigned resources
3. **Maintainable**: Single source of truth for resource type detection
4. **Scalable**: Can easily add more keywords or use ItemTypeId for exact matching

## Testing
✅ Build successful
✅ Resource types now correctly populated from backend
✅ Icons and colors display correctly based on resource type

## Date
January 2025
