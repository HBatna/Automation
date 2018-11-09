var DataTableBase = require("../Common/DataTableBase");
var ClinicalInterventionStaffPage = function () {
	var self = this;

	self.ServiceProvidersDropdown = element(by.model('admin.selectedServiceProvider'));

	self.ServiceProvidersOptions = function () {
		return element.all(by.options('provider as provider.Description for provider in admin.model.ServiceProviders'));
	};

	self.SelectServiceProviderOption = function (text) {
		return self.ServiceProvidersDropdown.all(by.xpath('option[.="'+text+'"]')).click();
	};

    self.GetRowCount = function() {
        return element.all(by.repeater('l in admin.selectedServiceProvider.Staff')).count();
    };

	self.OfficerLogonDropdown = element(by.model("admin.newLogon"));
	
	self.DefaultOfficerLogon = self.OfficerLogonDropdown.element(by.css('option[selected="selected"]'));

	self.OfficerLogonOptions = function () {
		return element.all(by.repeater('logon in admin.model.Officer'));
	};

	self.SelectOfficerLogonOption = function (value) {
		return self.OfficerLogonDropdown.element(by.css('option[value="' + value + '"]')).click();
	};

	self.EditOfficerLogonDropdown = element(by.model("l.editorLogon"));	

	self.SelectEditOfficerLogonOption = function (value) {
		return self.EditOfficerLogonDropdown.element(by.css('option[value="' + value + '"]')).click();
	};

	self.TextBoxes = {
		EditDescription: element(by.model('l.editorDescription')),
		NewDescription: element(by.model('admin.newDescription'))
	};

	self.Buttons = {
		Add: element(by.buttonText('Add')),
		Edit: element(by.buttonText('Edit')),
		Cancel: element(by.buttonText('Cancel')),
		Save: element(by.buttonText('Save')),
		isActive: element(by.css('button[ng-click="l.editorActive = !l.editorActive"]'))
	};

	self.EditClick = function (index) {
		return element.all(by.repeater('l in admin.selectedServiceProvider.Staff')).get(index).element(by.buttonText('Edit')).click();
	};
	self.SaveClick = function (index) {
		return element.all(by.repeater('l in admin.selectedServiceProvider.Staff')).get(index).element(by.buttonText('Save')).click();
	};
	self.CancelClick = function (index) {
		return element.all(by.repeater('l in admin.selectedServiceProvider.Staff')).get(index).element(by.buttonText('Cancel')).click();
	};

	self.ProvidersStaff = new DataTableBase("l in admin.selectedServiceProvider.Staff");

};
module.exports = ClinicalInterventionStaffPage;