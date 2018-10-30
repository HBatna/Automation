var DataTableBase = require("../Common/DataTableBase");
var ClinicalInterventionListsPage = function () {
	var self = this;

	self.ClinicalIntLists = element(by.model('admin.selectedCategory'));

	self.SelectCategoryOptions = function () {
		return element.all(by.options('category as category.Description for category in admin.model.Categories'));
	};

	self.TextBoxes = {
		EditDescription: element(by.model('l.editorDescription')),
		EditCode: element(by.model('l.editorCode')),
		NewDescription: element(by.model('admin.newDescription')),
		NewCode: element(by.model('admin.newCode'))
	};

	self.Buttons = {
		Add: element(by.buttonText('Add')),
		Edit: element(by.buttonText('Edit')),
		Cancel: element(by.buttonText('Cancel')),
		Save: element(by.buttonText('Save')),
		isActive: element(by.css('button[ng-click="l.editorActive = !l.editorActive"]'))
	};

	self.EditClick = function (index) {
		return element.all(by.repeater('l in admin.selectedCategory.Children')).get(index).element(by.buttonText('Edit')).click();
	};
	self.SaveClick = function (index) {
		return element.all(by.repeater('l in admin.selectedCategory.Children')).get(index).element(by.buttonText('Save')).click();
	};
	self.CancelClick = function (index) {
		return element.all(by.repeater('l in admin.selectedCategory.Children')).get(index).element(by.buttonText('Cancel')).click();
	};
	
    self.CategoryList = new DataTableBase("l in admin.selectedCategory.Children");
};
module.exports = ClinicalInterventionListsPage;