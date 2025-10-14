-- JsonDataConnections definition
CREATE TABLE [JsonDataConnections] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(255) NULL,
    [DisplayName] NVARCHAR(255) NULL,
    [ConnectionString] NVARCHAR(MAX) NULL
);

-- SqlDataConnections definition
CREATE TABLE [SqlDataConnections] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(255) NULL,
    [DisplayName] NVARCHAR(255) NULL,
    [ConnectionString] NVARCHAR(MAX) NULL
);

-- Reports definition
CREATE TABLE [Reports] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(255) NULL,
    [DisplayName] NVARCHAR(255) NULL,
    [LayoutData] VARBINARY(MAX) NULL
);
