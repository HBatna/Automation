var DataTableBase = require("../Common/DataTableBase");
var ClinicalInterventionServiceProvidersPage = function () {
	var self = this;

	self.ProvidersInternalindicator = element(by.model('admin.newIndicator'));
	self.EditProvidersInternalindicator = element(by.model('p.editorIndicator'));

	self.GetRows = function () { return element.all(by.repeater('p in admin.model.ServiceProviders')); },
	
	self.InternalIndicatorOptions = function () {
		return element.all(by.options('indicator as indicator.Description for indicator in admin.model.InternalIndicators'));
	};

	self.TextBoxes = {
		EditDescription: element(by.model('p.editorDescription')),
		EditCode: element(by.model('p.editorCode')),
		NewDescription: element(by.model('admin.newDescription')),
		NewCode: element(by.model('admin.newCode'))
	};

	self.Buttons = {
		Add: element(by.buttonText('Add')),
		Edit: element(by.buttonText('Edit')),
		Cancel: element(by.buttonText('Cancel')),
		Save: element(by.buttonText('Save')),
		isActive: element(by.css('button[ng-click="p.editorActive = !p.editorActive"]'))
	};

	self.EditClick = function (index) {
		return element.all(by.repeater('p in admin.model.ServiceProviders')).get(index).element(by.buttonText('Edit')).click();
	};
	self.SaveClick = function (index) {
		return element.all(by.repeater('p in admin.model.ServiceProviders')).get(index).element(by.buttonText('Save')).click();
	};
	self.CancelClick = function (index) {
		return element.all(by.repeater('p in admin.model.ServiceProviders')).get(index).element(by.buttonText('Cancel')).click();
	};

    self.ProvidersList = new DataTableBase("p in admin.model.ServiceProviders");
};
module.exports = ClinicalInterventionServiceProvidersPage;