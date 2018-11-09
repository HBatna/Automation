var AdminPage = require('../../PageObjects/Admin/AdminPage');
var OfficersCreatePage = require('../../PageObjects/Admin/OfficersCreatePage');
var NotificationService = require('../../PageObjects/NotificationService');

describe("Admin Centre", function () {
	describe('Officers - Create', function () {
		var adminPage;
		var officersCreatePage;
		var notificationService;

		beforeEach(function () {
			browser.driver.manage().window().maximize();
			browser.get('./Cbis/App/Cbis.html#/Admin/Overview/');
			adminPage = new AdminPage();
			notificationService = new NotificationService();
			adminPage.Menu.Officers.GetElement().click().then(function() {
				adminPage.Menu.Officers.SubItems.Create.GetElement().click();
			});
			officersCreatePage = new OfficersCreatePage();
		});	

		it('Initialization', function (done) {
			var defaultLocation = '-- Select Location --';
			var defaultPermissionGroup = '-- Select Permission Group --';
			var defaultEmploymentType = '-- Select Type --';
			adminPage.Labels.PageTitle.getText().then(function (text) {
				expect(text.toLowerCase()).toBe('create officer');
				expect(officersCreatePage.CreateOfficer.FamilyName.isPresent()).toBeTruthy();
				expect(officersCreatePage.CreateOfficer.FamilyName.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.FirstName.isPresent()).toBe(true);
				expect(officersCreatePage.CreateOfficer.FirstName.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.OtherName.isPresent()).toBe(true);
				expect(officersCreatePage.CreateOfficer.OtherName.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.Comment.isPresent()).toBe(true);
				expect(officersCreatePage.CreateOfficer.Comment.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.Logon.isPresent()).toBe(true);
				expect(officersCreatePage.CreateOfficer.Logon.isEnabled()).toBe(true);				
				expect(officersCreatePage.CreateOfficer.Location.isEnabled()).toBe(true);
				expect(officersCreatePage.LocationOptions.count()).toBeGreaterThan(0);
				expect(officersCreatePage.LocationOptions.get(0).getText()).toEqual(defaultLocation);
				expect(officersCreatePage.CreateOfficer.OfficerId.isPresent()).toBe(true);
				expect(officersCreatePage.CreateOfficer.OfficerId.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.PermissionGroup.isEnabled()).toBe(true);
				expect(officersCreatePage.PermissionGroupOptions.count()).toBeGreaterThan(0);
				expect(officersCreatePage.PermissionGroupOptions.get(0).getText()).toEqual(defaultPermissionGroup);
				expect(officersCreatePage.CreateOfficer.EmploymentType.isEnabled()).toBe(true);
				expect(officersCreatePage.EmploymentTypeOptions.count()).toBeGreaterThan(0);
				expect(officersCreatePage.EmploymentTypeOptions.get(0).getText()).toEqual(defaultEmploymentType);
				expect(officersCreatePage.Buttons.SutstantivePositionYes.isPresent()).toBe(true);
				expect(officersCreatePage.Buttons.SutstantivePositionYes.isEnabled()).toBe(true);
				expect(officersCreatePage.Buttons.SutstantivePositionNo.isPresent()).toBe(true);
				expect(officersCreatePage.Buttons.SutstantivePositionNo.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.StartDate.isPresent()).toBeTruthy();
				expect(officersCreatePage.CreateOfficer.StartDate.isEnabled()).toBe(true);
				expect(officersCreatePage.CreateOfficer.EndDate.isPresent()).toBeTruthy();
				expect(officersCreatePage.CreateOfficer.EndDate.isEnabled()).toBe(true);
				expect(officersCreatePage.Buttons.ActiveSwitch.isEnabled()).toBe(true);
				expect(officersCreatePage.Buttons.Save.isPresent()).toBeTruthy();
				expect(officersCreatePage.Buttons.Save.isEnabled()).toBe(true);
				expect(officersCreatePage.Buttons.Back.isPresent()).toBeTruthy();
				expect(officersCreatePage.Buttons.Back.isEnabled()).toBe(true);
				officersCreatePage.CreateOfficer.Logon.getAttribute("value").then(function (text) {
					expect(text).toContain('JUSTICE');				
				});
			}).finally(done);
		});

		it('should go back to previous page', function (done) {
			officersCreatePage.Buttons.Back.click();	
			browser.getCurrentUrl(function(url){
				expect(url).toEqual('./Cbis/App/Cbis.html#/Admin/Overview/');
			});	
		});			
		
		it('should prompt for missing mandatory field entry', function (done) {
		var mandatoryNotificationMessage = 'Please Enter All Mandatory Fields!'	
			officersCreatePage.Buttons.Save.click().then (function (){
				expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(mandatoryNotificationMessage);
			}).finally(done);
		});
		
		it('should prompt for invalid familyName and Logon entries', function (done) {	
			var mandatoryNotificationMessage = 'Please Enter All Mandatory Fields!';
			var invalidLastName = 'ATestlast01'; // Valid: ^([a-zA-Z\s\'\*\-]+)$
			var invalidNameNotificationMessage = 'Name is Invalid!';
			var invalidLogon = '12345'; // valid: ^([a-zA-z\']+)$		
			var invalidLogonNotificationMessage = 'Log On is Invalid! Only Alpha characters';
			officersCreatePage.CreateOfficer.FamilyName.sendKeys(invalidLastName);
			officersCreatePage.CreateOfficer.Logon.sendKeys(invalidLogon);
			officersCreatePage.Buttons.Save.click().then (function (){
				expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(invalidNameNotificationMessage);
				expect(notificationService.GetErrorNotifications().get(1).getText()).toContain(invalidLogonNotificationMessage);
				expect(notificationService.GetErrorNotifications().get(2).getText()).toEqual(mandatoryNotificationMessage);			
			}).finally(done);
		});		
		
		it('should save officer details with all inputs entered/selected', function (done) {
			var lastName = 'testLastNameA', firstName = 'testFirstNameA', otherName = 'AA', comment = 'None';
			var logon = 'testLogonA', officerId = '111101';
			var location = 'Acacia Private Prison';
			var permissionGroup = 'Group A'
			var employmentType = 'Permanent';
			var startDate = '31-Dec-2019', endDate = '31-Dec-2020'
			var message = 'Officer is created sucessfully!'
			officersCreatePage.CreateOfficer.FamilyName.sendKeys(lastName);
			officersCreatePage.CreateOfficer.FirstName.sendKeys(firstName);
			officersCreatePage.CreateOfficer.OtherName.sendKeys(otherName);
			officersCreatePage.CreateOfficer.Comment.sendKeys(comment);
			officersCreatePage.CreateOfficer.Logon.sendKeys(logon);
			officersCreatePage.SelectLocationOption(location);
			officersCreatePage.CreateOfficer.OfficerId.sendKeys(officerId);
			officersCreatePage.SelectPermissionGroupOption(permissionGroup);
			officersCreatePage.SelectEmploymentTypeOption(employmentType);
			officersCreatePage.Buttons.SutstantivePositionNo.click();
			officersCreatePage.CreateOfficer.StartDate.sendKeys(startDate);
			officersCreatePage.CreateOfficer.EndDate.sendKeys(endDate);
			officersCreatePage.Buttons.ActiveSwitch.click();
			officersCreatePage.Buttons.Save.click().then (function (){
				expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);				
			}).finally(done);
		});			
		
		it('should save officer details with only mandatory inputs entered/selected', function (done) {
			var lastName = 'testLastNameB'
			var logon = 'testLogonB'
			var location = 'Albany'
			var permissionGroup = 'Group A1'
			var employmentType = 'Contractor'
			var startDate = '31-Dec-2019'
			var message = 'Officer is created sucessfully!'
			officersCreatePage.CreateOfficer.FamilyName.sendKeys(lastName);
			officersCreatePage.CreateOfficer.Logon.sendKeys(logon);
			officersCreatePage.SelectLocationOption(location);
			officersCreatePage.SelectPermissionGroupOption(permissionGroup);
			officersCreatePage.SelectEmploymentTypeOption(employmentType);
			officersCreatePage.Buttons.SutstantivePositionNo.click();
			officersCreatePage.CreateOfficer.StartDate.sendKeys(startDate);
			officersCreatePage.Buttons.Save.click().then (function (){
				expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);							
			}).finally(done);
		});	
		
		it('should not save officer with duplicate OfficerID', function (done) {
			var lastName = 'testLastNameC'
			var logon = 'testLogonC'
			var location = 'Acacia Private Prison'
			var officerId = '111102'
			var permissionGroup = 'Group A'
			var employmentType = 'Permanent'
			var startDate = '31-Dec-2019'
			var duplicateOfficeIdMessage = 'Employee No \'111102\' is already being used by another Officer';
			officersCreatePage.CreateOfficer.FamilyName.sendKeys(lastName);
			officersCreatePage.CreateOfficer.Logon.sendKeys(logon);
			officersCreatePage.SelectLocationOption(location);
			officersCreatePage.CreateOfficer.OfficerId.sendKeys(officerId);
			officersCreatePage.SelectPermissionGroupOption(permissionGroup);
			officersCreatePage.SelectEmploymentTypeOption(employmentType);
			officersCreatePage.Buttons.SutstantivePositionNo.click();
			officersCreatePage.CreateOfficer.StartDate.sendKeys(startDate);
			officersCreatePage.CreateOfficer.EndDate.sendKeys(endDate);
			officersCreatePage.Buttons.Save.click().then (function (){
				expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(duplicateOfficeIdMessage);							
			}).finally(done);
		});			
	
	});	
});	