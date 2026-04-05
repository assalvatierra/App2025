-- ============================================
-- Insert Payment Configuration Feature
-- ============================================
-- This script creates a SysFeature record for Payment form configuration
-- It defines two modes: RECEIPT and RELEASE with different item types

-- Check if the record already exists
IF NOT EXISTS (SELECT 1 FROM SysFeature WHERE SysCode = 'PAYMENT_CONFIG')
BEGIN
    INSERT INTO SysFeature (Name, Description, IsEnabled, Expiry, SysCode, Settings)
    VALUES (
        'Payment Configuration',
        'Configuration for Payment form modes (Receipt/Release) and associated item types',
        1, -- IsEnabled = true
        '2099-12-31', -- Expiry date far in the future
        'PAYMENT_CONFIG',
        '{
  "Modes": [
    {
      "Mode": "RECEIPT",
      "DisplayMode": "Receipt",
      "includedTypes": ["COLLECT"]
    },
    {
      "Mode": "RELEASE",
      "DisplayMode": "Release",
      "includedTypes": ["OPEX", "JOBEX", "GENEX"]
    }
  ]
}'
    );

    PRINT 'Payment configuration feature created successfully.';
END
ELSE
BEGIN
    PRINT 'Payment configuration feature already exists.';
    
    -- Optionally update the existing record
    UPDATE SysFeature
    SET 
        Name = 'Payment Configuration',
        Description = 'Configuration for Payment form modes (Receipt/Release) and associated item types',
        IsEnabled = 1,
        Expiry = '2099-12-31',
        Settings = '{
  "Modes": [
    {
      "Mode": "RECEIPT",
      "DisplayMode": "Receipt",
      "includedTypes": ["COLLECT"]
    },
    {
      "Mode": "RELEASE",
      "DisplayMode": "Release",
      "includedTypes": ["OPEX", "JOBEX", "GENEX"]
    }
  ]
}'
    WHERE SysCode = 'PAYMENT_CONFIG';
    
    PRINT 'Payment configuration feature updated.';
END

GO

-- Verify the configuration
SELECT 
    Id,
    Name,
    SysCode,
    IsEnabled,
    Expiry,
    Settings
FROM SysFeature
WHERE SysCode = 'PAYMENT_CONFIG';

GO
