-- Insert SysFeature record for Menu Configuration
-- This record controls which menu items are visible in the application
-- UPDATED: Now uses 'name' property for filtering (identifier) and 'label' for display text

-- First, check if the record already exists and delete it if needed
DELETE FROM SysFeature WHERE SysCode = 'MENU_CONFIG';

-- Insert the menu configuration feature
INSERT INTO SysFeature (Name, Description, IsEnabled, Expiry, SysCode, Settings)
VALUES (
  'Menu Configuration',
  'Controls which menu items are visible in the navigation',
  1, -- IsEnabled = true
  '2099-12-31', -- Far future expiry date
  'MENU_CONFIG',
  '{
    "menuItems": [
      {"name": "Jobs Orders", "label": "Jobs Orders", "enabled": true, "route": "Jobs"},
      {"name": "Masterfiles", "label": "Masterfiles", "enabled": true},
      {"name": "Service Items", "label": "Service Items", "enabled": true, "route": "references/serviceitems"},
      {"name": "Entities", "label": "Entities", "enabled": true, "route": "Entities"},
      {"name": "Business Units", "label": "Business Units", "enabled": true, "route": "businessunits"},
      {"name": "Contacts", "label": "Contacts", "enabled": true, "route": "contacts"},
      {"name": "Agent List", "label": "Agent List", "enabled": true, "route": "agents"},
      {"name": "References", "label": "References", "enabled": true},
      {"name": "Countries", "label": "Countries", "enabled": true, "route": "references/countries"},
      {"name": "Cities", "label": "Cities", "enabled": true, "route": "references/cities"},
      {"name": "Item Types", "label": "Item Types", "enabled": true, "route": "references/itemtypes"},
      {"name": "Item Status", "label": "Item Status", "enabled": true, "route": "references/itemstatus"},
      {"name": "Agent Form", "label": "Agent Form", "enabled": true, "route": "/agents/form/0"}
    ]
  }'
);

-- Example: To disable Business Units menu item, update the Settings field:
-- UPDATE SysFeature 
-- SET Settings = JSON_MODIFY(Settings, '$.menuItems[4].enabled', CAST(0 AS bit))
-- WHERE SysCode = 'MENU_CONFIG';

-- Example: To disable by name (more reliable):
-- UPDATE SysFeature 
-- SET Settings = REPLACE(
--   Settings,
--   '"name": "Business Units", "enabled": true',
--   '"name": "Business Units", "enabled": false'
-- )
-- WHERE SysCode = 'MENU_CONFIG';

-- Example: Change display label while keeping filter name:
-- UPDATE SysFeature 
-- SET Settings = REPLACE(
--   Settings,
--   '"name": "Jobs Orders", "label": "Jobs Orders"',
--   '"name": "Jobs Orders", "label": "Sales Orders"'
-- )
-- WHERE SysCode = 'MENU_CONFIG';

SELECT * FROM SysFeature WHERE SysCode = 'MENU_CONFIG';
