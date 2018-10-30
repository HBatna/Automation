--==================================================================================================================
-- Admin> Staff (Create Officer)
--==================================================================================================================
print 'Create Staff (SiteId=54 and PermissionGroup=28) - start'

--	Set required values

DECLARE @CreateOfficerParams AS Table(RowId INT Identity(1,1), LastName VARCHAR(100), FirstName VARCHAR(100), Logon VARCHAR(50), SiteId INT, PermissionGroupId INT )

INSERT INTO @CreateOfficerParams (LastName , FirstName , Logon, SiteId, PermissionGroupId)
values('DCS', 'TestStaff01', 'Justice\TestOfficer01', 54, 28),
('DCS', 'TestStaff02', 'Justice\TestOfficer02', 78, 82),
('AutomatedTestOfficer', 'DeleteOfficer', 'JUSTICE\AutomatedTest' , 83, 28)

DECLARE @MinCount INT 
SELECT @MinCount = min(RowId) FROM @CreateOfficerParams
DECLARE @MaxCount INT 
SELECT @MaxCount = max(RowId) FROM @CreateOfficerParams

WHILE @MinCount <= @MaxCount
BEGIN
DECLARE @UpdatedByPId INT = 0
DECLARE @MovedDateTime DATETIME = GETDATE()
DECLARE @EnteredByPId INT = @UpdatedByPId
--Note
DECLARE @NoteId INT = NULL 
--Name
DECLARE @NameId INT
DECLARE @LastName VARCHAR(100) = (Select LastName From @CreateOfficerParams  where  RowId=@MinCount)
DECLARE @FirstName VARCHAR(100) = (Select FirstName From @CreateOfficerParams  where  RowId=@MinCount)
DECLARE @MiddleName VARCHAR(100) = NULL 
DECLARE @Prefix VARCHAR(8) = NULL  
DECLARE @Suffix        VARCHAR(8)	= NULL  
DECLARE @Verified BIT  		= 0  
DECLARE @ForceToTime   BIT			= 0  
DECLARE @Comment    VARCHAR(50)	= NULL
--Officer details
DECLARE @OfficerId INT
DECLARE @PersonId INT
DECLARE @EmployeeNo varchar(6) = null
DECLARE @Logon varchar(50) = (Select Logon From @CreateOfficerParams  where  RowId=@MinCount)
DECLARE @IsActive bit = 1
DECLARE @PositionLId           INT            = NULL 
DECLARE @PhoneId               INT            = NULL  
DECLARE @MobileId              INT            = NULL  
DECLARE @RedirectAlertsToOId   INT            = NULL  
DECLARE @RootNodeUrl           VARCHAR(255)   = NULL  
DECLARE @DefaultDueTasksFilter VARCHAR(255)   = NULL  
DECLARE @DefaultCalendarFilter VARCHAR(255)   = NULL  
DECLARE @OfficerPmsGroupId  INT
--Person
DECLARE @PersonType INT = 1 --Adult
--Site
DECLARE @OfficerSiteId INT
DECLARE @SiteId INT = (Select SiteId From @CreateOfficerParams  where  RowId=@MinCount)
DECLARE @FromDate DateTime = @MovedDateTime
DECLARE @ToDate Datetime = NULL
--Permission Group
DECLARE @PermissionGroupId INT = (Select PermissionGroupId From @CreateOfficerParams  where  RowId=@MinCount)
DECLARE @OfficerStartDate DATETIME = Getdate()
DECLARE @OfficerEndDate DATETIME = NULL 
DECLARE @EmploymentTypeLId INT = 46195
DECLARE @SubstantivePosition BIT = 0
DECLARE @PmsEntryProcessed BIT  = 1
--Preference
DECLARE @OfficerPreferenceId INT

DECLARE @ExistingOfficer INT = NULL
DECLARE @ActiveOfficer INT = NULL

IF EXISTS(SELECT*FROM Officer where Logon=@Logon)
	BEGIN
	SET @ExistingOfficer = (SELECT TOP 1 Id FROM Officer WHERE Logon=@Logon)
	SET @ActiveOfficer = (SELECT TOP 1 Id FROM Officer WHERE Logon=@Logon AND OfficerDeletedDate IS NULL)
	END

IF (@ExistingOfficer IS NULL AND @ActiveOfficer IS NULL)
BEGIN
--Officer Name
   INSERT INTO dbo.AnyName
   (FirstName, 
   MiddleName, 
   LastName, 
   Prefix, 
   Suffix, 
   EnteredByPId, 
   FromTime, 
   Verified, 
   NoteId, 
   SoundLikeLastName, 
   Comment)  
   VALUES
   (@FirstName, 
   @MiddleName, 
   @LastName, 
   @Prefix, 
   @Suffix, 
   @UpdatedByPId, 
   CURRENT_TIMESTAMP, 
   @Verified, 
   @NoteId,   
  dbo.DoubleMetaPhone(@LastName), 
  @Comment)      
   
  SET @NameId = SCOPE_IDENTITY()  

--Person
 INSERT Person 
  (EnteredByPId,  
  FromTime,  
  NameId,  
  PersonType)  
  VALUES 
  (@UpdatedByPId, 
  GETDATE(), 
  @NameId, 
  @PersonType)    

 SET @PersonId = SCOPE_IDENTITY()  


--Add Officer
 INSERT INTO dbo.Officer 
 (PersonId, 
 Logon, 
 PositionLId, 
 PhoneId, 
 MobileId, 
 UpdatedByPId, 
 EmployeeNo, 
 UpdatedAt, 
 IsActive, 
 OfficerPmsGroupId, 
 OfficerDeletedDate)  
  VALUES 
  (@PersonId, 
  @Logon, 
  @PositionLId, 
  @PhoneId, 
  @MobileId, 
  @UpdatedByPId, 
  @EmployeeNo, 
  GETDATE(), 
  @IsActive, 
  @OfficerPmsGroupId, 
  NULL)  
  
   SET @OfficerId = SCOPE_IDENTITY()  
  
  INSERT INTO OfficerTrace 
  (OfficerId, 
  LastLogonTime, 
  LastLogonIP, 
  HostName)  
  VALUES
  (@OfficerId, 
  NULL, 
  NULL, 
  NULL)  

--Officer Site 
  INSERT INTO OfficerSite    
   (OfficerId, 
   SiteId,
   FromDate, 
   ToDate, 
   EnteredByPId)  
  VALUES    
   (@OfficerId, 
   @SiteId, 
   @FromDate, 
   @ToDate, 
   @EnteredByPId)  
  
  SET @OfficerSiteId = SCOPE_IDENTITY()  

  UPDATE Officer SET OfficerSiteId = @OfficerSiteId  
   WHERE Id = @OfficerId 

--Officer Permission Group
 INSERT INTO OfficerPmsGroup  
 (OfficerId, 
 PermissionGroupId, 
 OfficerStartDate, 
 OfficerEndDate, 
 EmploymentTypeLId, 
 SubstantivePosition, 
 EnteredByPId, 
 EnteredDateTime, 
 PmsEntryProcessed, 
 Active)  
 VALUES   
 (@OfficerId, 
 @PermissionGroupId, 
 @OfficerStartDate, 
 @OfficerEndDate, 
 @EmploymentTypeLId, 
 @SubstantivePosition, 
 @EnteredByPId, 
 GETDATE(), 
 @PmsEntryProcessed, 
 1)  

 SET @OfficerPmsGroupId = SCOPE_IDENTITY() 

 UPDATE Officer SET OfficerPmsGroupId = @OfficerPmsGroupId  
   WHERE Id = @OfficerId 

--Officer preference 
 INSERT INTO OfficerPreferences  
  (OfficerId, 
  RedirectAlertsToOId, 
  DefaultDueTasksFilter, 
  DefaultCalendarFilter, 
  RootNodeUrl, 
  EnteredByPId, 
  FromDate)  
 VALUES   
  (@OfficerId, 
  @RedirectAlertsToOId, 
  @DefaultDueTasksFilter, 
  @DefaultCalendarFilter, 
  @RootNodeUrl, 
  @EnteredByPId, 
  GETDATE())  
  
 SET @OfficerPreferenceId = SCOPE_IDENTITY()

 UPDATE Officer SET OfficerPreferencesId = @OfficerPreferenceId  
   WHERE Id = @OfficerId

print 'Create Staff - end'
END

ELSE IF(@ExistingOfficer IS NOT NULL AND @ActiveOfficer IS NULL )
BEGIN
print 'Remove Officer - Use Existing Officer'
UPDATE Officer SET OfficerDeletedDate=NULL WHERE Id=@ExistingOfficer
END

ELSE IF(@ExistingOfficer IS NOT NULL AND @ActiveOfficer IS NOT NULL)
BEGIN
print 'Officer with the Logon is already active to Delete - End'
END

SET @MinCount = @MinCount + 1
END


--==================================================================================================================
-- Admin Staff
--==================================================================================================================
print 'Admin Staff - start'

DELETE FROM ClinicalLookup WHERE ClinicalLookupTypeId = '3' AND ParentId = '491' AND DESCRIPTION LIKE '%Test%';
INSERT INTO ClinicalLookup (Description, ForeignKeyCode, ClinicalLookupTypeId, IsActive, ParentId) 
VALUES ('A-DCSTestStaff03', 'DCSTestStaffLogon03', '3', '0', '491'),
		('A-DCSTestStaff04', 'DCSTestStaffLogon04', '3', '1', '491'),
		('A-DCSTestStaff06', 'DCSTestStaffLogon06', '3', '0', '491');

DELETE FROM ClinicalLookup WHERE ClinicalLookupTypeId = '3' AND ParentId ='813' AND Description LIKE '%-CH-Staff';
INSERT INTO ClinicalLookup (ClinicalLookupTypeId, Description, IsActive, ParentId) 
VALUES ('3', 'Dup-CH-Staff', '0', '813'),
		('3', 'Update-CH-Staff', '1', '813'),
		('3', 'Edit-CH-Staff', '0', '813');

print 'Admin Staff - end'
GO