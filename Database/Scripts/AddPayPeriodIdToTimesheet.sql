-- Add PayPeriodId column to Timesheet table
-- This script adds a nullable foreign key reference to PayPeriod table

USE [A0a0aeDev2025]
GO

-- Add PayPeriodId column to Timesheet table
IF NOT EXISTS (SELECT * FROM sys.columns 
               WHERE object_id = OBJECT_ID(N'[dbo].[Timesheet]') 
               AND name = 'PayPeriodId')
BEGIN
    ALTER TABLE [dbo].[Timesheet]
    ADD [PayPeriodId] INT NULL;

    PRINT 'PayPeriodId column added to Timesheet table successfully.';
END
ELSE
BEGIN
    PRINT 'PayPeriodId column already exists in Timesheet table.';
END
GO

-- Add foreign key constraint to PayPeriod table (optional, uncomment if needed)
/*
IF NOT EXISTS (SELECT * FROM sys.foreign_keys 
               WHERE object_id = OBJECT_ID(N'[dbo].[FK_Timesheet_PayPeriod]') 
               AND parent_object_id = OBJECT_ID(N'[dbo].[Timesheet]'))
BEGIN
    ALTER TABLE [dbo].[Timesheet]  WITH CHECK 
    ADD CONSTRAINT [FK_Timesheet_PayPeriod] 
    FOREIGN KEY([PayPeriodId])
    REFERENCES [dbo].[PayPeriod] ([Id]);

    PRINT 'Foreign key constraint FK_Timesheet_PayPeriod added successfully.';
END
GO
*/

-- Create index on PayPeriodId for better query performance (optional)
/*
IF NOT EXISTS (SELECT * FROM sys.indexes 
               WHERE name='IX_Timesheet_PayPeriodId' 
               AND object_id = OBJECT_ID('dbo.Timesheet'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_Timesheet_PayPeriodId] 
    ON [dbo].[Timesheet] ([PayPeriodId] ASC);

    PRINT 'Index IX_Timesheet_PayPeriodId created successfully.';
END
GO
*/
