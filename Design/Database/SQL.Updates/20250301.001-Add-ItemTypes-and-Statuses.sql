
IF NOT EXISTS (select * from dbo.ItemStatusClass) 
INSERT INTO dbo.ItemStatusClass([Name],[Description],Remarks,Code,[SortOrder])
values 
('Sample','Sample','Remarks','SAMPLE',1)
;

select * from dbo.ItemStatusClass;




----------------------
IF NOT EXISTS (select * from dbo.ItemTypeClass) 
INSERT INTO dbo.ItemTypeClass([Name],[Description],Remarks,Code,[SortOrder])
values 
('Sample','Sample','Remarks','SAMPLE',1)
;

select * from dbo.ItemTypeClass;

