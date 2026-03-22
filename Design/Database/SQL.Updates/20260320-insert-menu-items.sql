INSERT INTO dbo.SysFeature (Name, Description, IsEnabled, Expiry, SysCode, Settings)
VALUES (
  'Menu Configuration',
  'Controls which menu items are visible',
  1,
  '2099-12-31',
  'MENU_CONFIG',
  '{
    "menuItems": [
      {"label": "Jobs Orders", "enabled": true, "route": "Jobs"},
      {"label": "Masterfiles", "enabled": true},
      {"label": "Service Items", "enabled": true, "route": "references/serviceitems"},
      {"label": "Entities", "enabled": true, "route": "Entities"},
      {"label": "Business Units", "enabled": false, "route": "businessunits"},
      {"label": "Contacts", "enabled": true, "route": "contacts"},
      {"label": "Agent List", "enabled": true, "route": "agents"},
      {"label": "References", "enabled": true},
      {"label": "Countries", "enabled": true, "route": "references/countries"},
      {"label": "Cities", "enabled": true, "route": "references/cities"},
      {"label": "Item Types", "enabled": true, "route": "references/itemtypes"},
      {"label": "Item Status", "enabled": true, "route": "references/itemstatus"},
      {"label": "Agent Form", "enabled": false, "route": "/agents/form/0"}
    ]
  }'
);