-- ResourceEntity Troubleshooting SQL Script
-- Run this to diagnose issues with the ResourceEntity table

-- ==================================================
-- STEP 1: Verify Table Exists
-- ==================================================
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'ResourceEntity')
BEGIN
    PRINT '? ResourceEntity table exists'
END
ELSE
BEGIN
    PRINT '? ResourceEntity table DOES NOT exist!'
    PRINT 'You need to create the table or run migrations'
END

-- ==================================================
-- STEP 2: Check Table Schema
-- ==================================================
PRINT ''
PRINT '=== ResourceEntity Schema ==='
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    IS_NULLABLE,
    CASE 
        WHEN CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX'
        ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS VARCHAR)
    END AS MAX_LENGTH,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'ResourceEntity'
ORDER BY ORDINAL_POSITION;

-- ==================================================
-- STEP 3: Check Foreign Key Constraints
-- ==================================================
PRINT ''
PRINT '=== Foreign Key Constraints ==='
SELECT 
    fk.name AS ForeignKeyName,
    OBJECT_NAME(fk.parent_object_id) AS TableName,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName,
    OBJECT_NAME(fk.referenced_object_id) AS ReferencedTable,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferencedColumn
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fc 
    ON fk.object_id = fc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'ResourceEntity';

-- ==================================================
-- STEP 4: Check for Existing Data
-- ==================================================
PRINT ''
PRINT '=== Existing ResourceEntity Records ==='
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'ResourceEntity')
BEGIN
    SELECT COUNT(*) AS TotalRecords FROM ResourceEntity;
    SELECT COUNT(*) AS ActiveRecords FROM ResourceEntity WHERE IsActive = 1 AND IsArchived = 0;
    
    -- Show sample records
    SELECT TOP 10 
        Id, 
        ResourceId, 
        EntityId, 
        Notes, 
        IsPrimary, 
        IsActive, 
        IsArchived 
    FROM ResourceEntity 
    ORDER BY Id DESC;
END

-- ==================================================
-- STEP 5: Verify Referenced Tables Exist
-- ==================================================
PRINT ''
PRINT '=== Referenced Tables Check ==='

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Resource')
BEGIN
    SELECT COUNT(*) AS ResourceCount FROM Resource;
    PRINT '? Resource table exists'
END
ELSE
BEGIN
    PRINT '? Resource table DOES NOT exist!'
END

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Entity')
BEGIN
    SELECT COUNT(*) AS EntityCount FROM Entity;
    PRINT '? Entity table exists'
END
ELSE
BEGIN
    PRINT '? Entity table DOES NOT exist!'
END

-- ==================================================
-- STEP 6: Check for Orphaned Records
-- ==================================================
PRINT ''
PRINT '=== Orphaned Records Check ==='

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'ResourceEntity')
   AND EXISTS (SELECT * FROM sys.tables WHERE name = 'Resource')
BEGIN
    -- ResourceEntity with invalid ResourceId
    SELECT COUNT(*) AS InvalidResourceIds
    FROM ResourceEntity re
    LEFT JOIN Resource r ON re.ResourceId = r.Id
    WHERE re.ResourceId IS NOT NULL AND r.Id IS NULL;
END

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'ResourceEntity')
   AND EXISTS (SELECT * FROM sys.tables WHERE name = 'Entity')
BEGIN
    -- ResourceEntity with invalid EntityId
    SELECT COUNT(*) AS InvalidEntityIds
    FROM ResourceEntity re
    LEFT JOIN Entity e ON re.EntityId = e.Id
    WHERE re.EntityId IS NOT NULL AND e.Id IS NULL;
END

-- ==================================================
-- STEP 7: Check for Duplicate Combinations
-- ==================================================
PRINT ''
PRINT '=== Duplicate Check ==='

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'ResourceEntity')
BEGIN
    SELECT 
        ResourceId, 
        EntityId, 
        COUNT(*) AS DuplicateCount
    FROM ResourceEntity
    WHERE IsArchived = 0
    GROUP BY ResourceId, EntityId
    HAVING COUNT(*) > 1;
    
    IF @@ROWCOUNT = 0
        PRINT '? No duplicate resource-entity combinations found'
    ELSE
        PRINT '? Duplicate combinations exist!'
END

-- ==================================================
-- STEP 8: Sample Test Data
-- ==================================================
PRINT ''
PRINT '=== Sample Data for Testing ==='

-- Get a valid ResourceId
DECLARE @TestResourceId INT = NULL;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Resource')
BEGIN
    SELECT TOP 1 @TestResourceId = Id FROM Resource ORDER BY Id;
    PRINT 'Sample ResourceId: ' + CAST(@TestResourceId AS VARCHAR);
END

-- Get a valid EntityId
DECLARE @TestEntityId INT = NULL;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Entity')
BEGIN
    SELECT TOP 1 @TestEntityId = Id FROM Entity ORDER BY Id;
    PRINT 'Sample EntityId: ' + CAST(@TestEntityId AS VARCHAR);
END

-- ==================================================
-- STEP 9: Test Insert Statement
-- ==================================================
PRINT ''
PRINT '=== Test Insert Statement ==='
PRINT 'Run this to test if insert works:'
PRINT ''

IF @TestResourceId IS NOT NULL AND @TestEntityId IS NOT NULL
BEGIN
    PRINT 'BEGIN TRANSACTION;'
    PRINT ''
    PRINT 'INSERT INTO ResourceEntity (ResourceId, EntityId, Notes, SortOrder, IsPrimary, CreatedOn, CreatedBy, LastEditOn, LastEditBy, IsArchived, IsActive)'
    PRINT 'VALUES (' + CAST(@TestResourceId AS VARCHAR) + ', ' + CAST(@TestEntityId AS VARCHAR) + ', ''Test Note'', 0, 0, GETDATE(), ''System'', GETDATE(), ''System'', 0, 1);'
    PRINT ''
    PRINT '-- Check if it worked:'
    PRINT 'SELECT * FROM ResourceEntity WHERE Id = SCOPE_IDENTITY();'
    PRINT ''
    PRINT 'ROLLBACK TRANSACTION; -- Remove this line to keep the test record'
END
ELSE
BEGIN
    PRINT '-- Cannot generate test statement: Missing Resource or Entity records'
END

-- ==================================================
-- STEP 10: Cleanup Test Data (Optional)
-- ==================================================
PRINT ''
PRINT '=== Cleanup Test Records (Optional) ==='
PRINT '-- Uncomment and run if you need to clean up test data:'
PRINT '-- DELETE FROM ResourceEntity WHERE Notes = ''Test Note'' AND CreatedBy = ''System'';'
