-- Insert or update the TIMESHEET SysFeature configuration
-- This defines column labels and resource type filters for the Timesheet form dropdowns.
--
-- Settings JSON structure:
-- {
--   "columns": [
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
--   ]
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
  "columns": [
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
  ]
}'
    );
END
ELSE
BEGIN
    UPDATE SysFeature
    SET
        Settings = N'{
  "columns": [
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
  ]
}',
        IsEnabled = 1
    WHERE SysCode = 'TIMESHEET';
END

SELECT * FROM SysFeature WHERE SysCode = 'TIMESHEET';
