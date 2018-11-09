var OfficersCreatePage = function () {
	var self = this;

	self.CreateOfficer = {
		FamilyName: element(by.id("inpLastName")),
		FirstName: element(by.id("inpFirstName")),
		OtherName: element(by.id("inpOtherName")),
		Comment: element(by.id("inpComment")),
		Logon: element(by.id("inpLogOn")),
		Location: element(by.model('search.createParams.OfficerSummary.SiteId')),
		OfficerId: element(by.id("inpOfficerId")),
		PermissionGroup: element(by.model('search.createParams.OfficerPermission.PermissionGroupId')),
		EmploymentType: element(by.model('search.createParams.OfficerPermission.EmploymentTypeLId')),
		StartDate: element(by.id("startDateField")).element(by.tagName('input')),
		EndDate: element(by.id("endDateField")).element(by.tagName('input'))
	};

	self.Buttons = {
		Save: element(by.buttonText('Save')),
		Back: element(by.buttonText('Back')),
		SutstantivePositionYes: element(by.id('inpSubsPositionYes')),
		SutstantivePositionNo: element(by.id('inpSubsPositionNo')),
		StartDateCalendar: element(by.id("startDateField")).element(by.tagName('i')),
		StartDateCalendar: element(by.id("startDateField")).element(by.tagName('button')),
		endDateCalendar: element(by.id("startDateField")).element(by.tagName('i')),
		ActiveSwitch: element(by.model('search.createParams.OfficerSummary.Active'))
	};

		// ActiveOn: element(by.model('search.createParams.OfficerSummary.Active')).element(by.css('span["off"]')),
		// ActiveOff: element(by.model('search.createParams.OfficerSummary.Active')).element(by.css('span["on"]'))
	
	self.LocationOptions = element.all(by.options('location.Id as location.Name for location in search.Sites'));	
	self.DefaultLocationOption = element(by.id("inpLocation")).element(by.css('option[selected="selected"]'));
	self.SelectLocationOption = function (text) {
		return element(by.id("inpLocation")).element(by.xpath('option[.="'+text+'"]')).click();		
	};	
	
	self.PermissionGroupOptions = element.all(by.options('permissiongroup.Id as permissiongroup.Name for permissiongroup in search.PermissionGroups'));
	self.DefaultPermissionGroupOption = element(by.id("inpPermissionGroup")).element(by.css('option[selected="selected"]'));	
	self.SelectPermissionGroupOption = function (value) {
		return element(by.id("inpPermissionGroup")).element(by.css('option[label="' + value + '"]')).click();		
	};		
	
	self.EmploymentTypeOptions = element.all(by.options('employmenttype.Id as employmenttype.Name for employmenttype in search.EmploymentTypes'));
	self.DefaultEmploymentTypeOption = element(by.id("inpEmploymentType")).element(by.css('option[selected="selected"]'));	
	self.SelectEmploymentTypeOption = function (value) {
		return element(by.id("inpEmploymentType")).element(by.css('option[label="' + value + '"]')).click().click();		
	};	
};
module.exports = OfficersCreatePage;