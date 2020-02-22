-- ****************** SqlDBM: Microsoft SQL Server ******************
-- ******************************************************************

-- ************************************** [users]

CREATE TABLE [users]
(
 [id]       int IDENTITY (1, 1) NOT NULL ,
 [name]     varchar(50) NOT NULL ,
 [lastname] varchar(50) NULL ,
 [phone]    varchar(50) NOT NULL ,
 [birthday] date NOT NULL ,
 [email]    varchar(50) NOT NULL ,
 [token]    varchar(300) NULL ,
 [profile]  varbinary(150) NULL ,
 [password] varchar(20) NOT NULL ,


 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO




EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'UserID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'users', @level2type=N'COLUMN', @level2name=N'id';
GO




-- ************************************** [messages]

CREATE TABLE [messages]
(
 [author]   int NOT NULL ,
 [content]  varchar(150) NOT NULL ,
 [receiver] int NOT NULL ,
 [date]     date NOT NULL ,


 CONSTRAINT [PK_messages] PRIMARY KEY CLUSTERED ([author] ASC),
 CONSTRAINT [FK_33] FOREIGN KEY ([author])  REFERENCES [users]([id]),
 CONSTRAINT [FK_36] FOREIGN KEY ([receiver])  REFERENCES [users]([id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_33] ON [messages] 
 (
  [author] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_36] ON [messages] 
 (
  [receiver] ASC
 )

GO


-- ****************** SqlDBM: Microsoft SQL Server ******************
-- ******************************************************************

-- ************************************** [posts]

CREATE TABLE [posts]
(
 [id]      int IDENTITY (0, 1) NOT NULL ,
 [content] varchar(500) NOT NULL ,
 [imgurl]  varbinary(150) NULL ,
 [userid]  int NOT NULL ,
 [date]    date NOT NULL ,
 [likes]   int NOT NULL,


 CONSTRAINT [PK_posts] PRIMARY KEY CLUSTERED ([id] ASC),
 CONSTRAINT [FK_45] FOREIGN KEY ([userid])  REFERENCES [users]([id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_45] ON [posts] 
 (
  [userid] ASC
 )

GO







-- ************************************** [friends]

CREATE TABLE [friends]
(
 [userid]    int NOT NULL ,
 [friend_id] int NOT NULL ,


 CONSTRAINT [FK_39] FOREIGN KEY ([userid])  REFERENCES [users]([id]),
 CONSTRAINT [FK_42] FOREIGN KEY ([friend_id])  REFERENCES [users]([id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_39] ON [friends] 
 (
  [userid] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_42] ON [friends] 
 (
  [friend_id] ASC
 )

GO












