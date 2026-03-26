-- Insert or update the TIMESHEET SysFeature configuration
-- This defines column labels, resource type filters, and job link rules for the Timesheet form.
--
-- Settings JSON structure:
-- {
--   "specialcolumns": [
--     {
--       "columnName": "resourceId",         -- form control name
--       "displayColumnName": "In-charge",   -- label shown in the form
--       "includedTypes": ["PERSONEL", "DRIVER"]  -- ItemType.Code values to include
--     },
--     {
--       "columnName": "resourceId1",
--       "displayColumnName": "Unit",
--       "includedTypes": ["VEHICLE"]
--     }
--   ],
--   "allowMultiJobLink": true   -- false = only one job can be linked per timesheet
-- }

IF NOT EXISTS (SELECT 1 FROM SysFeature WHERE SysCode = 'TIMESHEET')
BEGIN
    INSERT INTO SysFeature (Name, SysCode, IsEnabled, Expiry, Settings)
    VALUES (
        'Timesheet Feature',
        'TIMESHEET',
        1,
        '2099-12-31',
        N'{
  "specialcolumns": [
    {
      "columnName": "resourceId",
      "displayColumnName": "In-charge",
      "includedTypes": ["PERSONEL", "DRIVER"]
    },
    {
      "columnName": "resourceId1",
      "displayColumnName": "Unit",
      "includedTypes": ["VEHICLE"]
    }
  ],
  "allowMultiJobLink": true
}'
    );
END
ELSE
BEGIN
    UPDATE SysFeature
    SET
        Settings = N'{
  "specialcolumns": [
    {
      "columnName": "resourceId",
      "displayColumnName": "In-charge",
      "includedTypes": ["PERSONEL", "DRIVER"]
    },
    {
      "columnName": "resourceId1",
      "displayColumnName": "Unit",
      "includedTypes": ["VEHICLE"]
    }
  ],
  "allowMultiJobLink": true
}',
        IsEnabled = 1
    WHERE SysCode = 'TIMESHEET';
END

SELECT * FROM SysFeature WHERE SysCode = 'TIMESHEET';