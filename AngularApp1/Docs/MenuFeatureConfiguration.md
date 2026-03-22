# Menu Feature Configuration

## Overview
This feature allows dynamic filtering of menu items based on configuration stored in the `SysFeature` table. Menu visibility can be controlled without code changes by updating the database.

## How It Works

### 1. Database Configuration
The menu configuration is stored in the `SysFeature` table with `SysCode = 'MENU_CONFIG'`.

**Fields:**
- `Name`: "Menu Configuration"
- `SysCode`: "MENU_CONFIG" (unique identifier)
- `IsEnabled`: Controls if the feature is active
- `Expiry`: Date when the feature expires
- `Settings`: JSON string containing menu item configurations

### 2. Settings JSON Structure

```json
{
  "menuItems": [
    {
      "label": "Menu Item Name",
      "enabled": true|false,
      "route": "optional/route/path"
    }
  ]
}
```

**Properties:**
- `label`: Must match exactly with the menu item label in `navigation.component.ts`
- `enabled`: `true` to show, `false` to hide
- `route`: (Optional) The route path for reference

### 3. Implementation Flow

1. **App Component (`app.component.ts`)**
   - On initialization, fetches the SysFeature record with `SysCode = 'MENU_CONFIG'`
   - Parses the JSON settings
   - Creates a Map of menu labels to their enabled status
   - Passes this filter to the Navigation Component via `menuFilter` input

2. **Navigation Component (`navigation.component.ts`)**
   - Receives the `menuFilter` Map
   - Filters menu items based on the enabled flags
   - Also filters sub-items within parent menus
   - Updates the displayed menu items

## Usage Examples

### Initial Setup
Run the SQL script to create the configuration:
```bash
SQL\InsertMenuConfigFeature.sql
```

### Enable/Disable Menu Items

#### Disable a specific menu item
```sql
UPDATE SysFeature 
SET Settings = JSON_MODIFY(
  Settings, 
  '$.menuItems[?(@.label == "Business Units")].enabled', 
  CAST(0 AS bit)
)
WHERE SysCode = 'MENU_CONFIG';
```

#### Disable entire menu section
```sql
UPDATE SysFeature 
SET Settings = JSON_MODIFY(
  Settings, 
  '$.menuItems[?(@.label == "References")].enabled', 
  CAST(0 AS bit)
)
WHERE SysCode = 'MENU_CONFIG';
```

#### Temporarily disable the feature
```sql
UPDATE SysFeature 
SET IsEnabled = 0
WHERE SysCode = 'MENU_CONFIG';
```

### Menu Item Labels (Must Match Exactly)

**Top-Level Menus:**
- "Jobs Orders"
- "Masterfiles"
- "References"
- "Agent Form"

**Masterfiles Sub-Items:**
- "Service Items"
- "Entities"
- "Business Units"
- "Contacts"
- "Agent List"

**References Sub-Items:**
- "Countries"
- "Cities"
- "Item Types"
- "Item Status"

## Testing

1. **Default Behavior (No Configuration)**
   - If `SysFeature` record doesn't exist, all menu items will be shown
   - If `IsEnabled = false`, all menu items will be shown

2. **With Configuration**
   - Only menu items with `"enabled": true` will be displayed
   - If a parent menu has `"enabled": false`, the entire menu section is hidden
   - Sub-items are filtered independently

3. **Error Handling**
   - If JSON parsing fails, error is logged and all items are shown
   - If API call fails, error is logged and all items are shown

## Example Scenarios

### Hide Business Units and Agent Form
```json
{
  "menuItems": [
    {"label": "Jobs Orders", "enabled": true},
    {"label": "Masterfiles", "enabled": true},
    {"label": "Service Items", "enabled": true},
    {"label": "Entities", "enabled": true},
    {"label": "Business Units", "enabled": false},
    {"label": "Contacts", "enabled": true},
    {"label": "Agent List", "enabled": true},
    {"label": "References", "enabled": true},
    {"label": "Countries", "enabled": true},
    {"label": "Cities", "enabled": true},
    {"label": "Item Types", "enabled": true},
    {"label": "Item Status", "enabled": true},
    {"label": "Agent Form", "enabled": false}
  ]
}
```

### Show Only Jobs and References
```json
{
  "menuItems": [
    {"label": "Jobs Orders", "enabled": true},
    {"label": "Masterfiles", "enabled": false},
    {"label": "References", "enabled": true},
    {"label": "Countries", "enabled": true},
    {"label": "Cities", "enabled": true},
    {"label": "Item Types", "enabled": true},
    {"label": "Item Status", "enabled": true},
    {"label": "Agent Form", "enabled": false}
  ]
}
```

## Future Enhancements

1. **Role-Based Menus**: Create different `SysFeature` records with different `SysCode` values for different user roles
2. **Permission-Based**: Add permission fields to check user permissions
3. **Dynamic Routes**: Store route configurations in the database
4. **Menu Ordering**: Add sequence numbers to control menu order
5. **Menu Icons**: Store icon names in the configuration

## Troubleshooting

### Menu items not filtering
1. Check if `SysFeature` record exists with `SysCode = 'MENU_CONFIG'`
2. Verify `IsEnabled = 1`
3. Check that `Expiry` date is in the future
4. Ensure menu item labels in JSON match exactly (case-sensitive)
5. Check browser console for errors

### API errors
1. Verify API endpoint is accessible: `/api/SysFeatures/BySysCode/MENU_CONFIG`
2. Check database connection
3. Verify CORS settings if running on different ports

### JSON parsing errors
1. Validate JSON syntax using online JSON validator
2. Check for special characters that need escaping
3. Ensure boolean values are `true/false` not `"true"/"false"`
