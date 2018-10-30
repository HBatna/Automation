var AdminPage = require('../../PageObjects/Admin/AdminPage');
var ClinicalInterventionListsPage = require('../../PageObjects/Admin/ClinicalInterventionListsPage');
var NotificationService = require('../../PageObjects/NotificationService');

describe("Admin Centre", function () {
	describe('ClinicalIntervention: Lists', function () {
		var adminPage;
		var ListsPage;
		var notificationService;

		beforeEach(function () {
			browser.driver.manage().window().maximize();
			browser.get('./Projects.html#/Admin/');
			adminPage = new AdminPage();
			notificationService = new NotificationService();
			adminPage.Menu.ClinicalInterventions.GetElement().click().then(function () {
				adminPage.Menu.ClinicalInterventions.SubItems.Lists.GetElement().click();
			});
			ListsPage = new ClinicalInterventionListsPage();
		});

		var message = 'Clinical Lookup saved to database!';
		var errorMessage = 'Lookup could not be updated!';
		var defaultSelectListType = '--Select Category--';
		var selectCategory = 'Categories For Course Template Types';

		var addDescription = 'Add-Template';
		var addCode = 'A';
		var editDescription = 'Edit-Template';
		var editCode = 'E';        
		var dupDescription = 'Dup-Template';
		var dupCode = 'D';
		var updateDescription = 'Update-Template';
		var updateCode = 'U';
		var updatedDescription = 'Updated-Template';
		var updatedCode = 'Ued';

		it('Initialization', function (done) {
			adminPage.Labels.PageTitle.getText().then(function (text) {
				expect(text.toLowerCase()).toBe('clinical interventions - manage lists');
				expect(ListsPage.ClinicalIntLists.isDisplayed()).toBeTruthy();
				expect(ListsPage.ClinicalIntLists.isPresent()).toBe(true);
				expect(ListsPage.ClinicalIntLists.isEnabled()).toBeTruthy();
				expect(ListsPage.SelectCategoryOptions().count()).toBeGreaterThan(1);
				expect(ListsPage.SelectCategoryOptions().get(0).getText()).toEqual(defaultSelectListType);
			}).finally(done);
		});
		
		it('should display ListTypes for a Category', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
				expect(ListsPage.TextBoxes.NewDescription.isDisplayed()).toBeTruthy();
				expect(ListsPage.TextBoxes.NewDescription.isEnabled()).toBeTruthy();
				expect(ListsPage.TextBoxes.NewDescription.getText()).toEqual('');
				expect(ListsPage.TextBoxes.NewCode.isDisplayed()).toBeTruthy();
				expect(ListsPage.TextBoxes.NewCode.isEnabled()).toBeTruthy();
				expect(ListsPage.TextBoxes.NewCode.getText()).toEqual('');
				expect(ListsPage.Buttons.Add.isPresent()).toBe(true);
				expect(ListsPage.Buttons.Add.isEnabled()).toBeTruthy();
			}).finally(done);
		});
		
		it('should clear ListTypes when default Category selected', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
				expect(ListsPage.SelectCategoryOptions().count()).toBeGreaterThan(1);
				ListsPage.ClinicalIntLists.sendKeys(defaultSelectListType).then(function () {
					ListsPage.CategoryList.GetRow(['', '', '', '']).then(function (index) {
						expect(index).toEqual(-1);
					});						
				});
			}).finally(done);
		});		

		it('should add new ListType to a Category', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
				ListsPage.TextBoxes.NewDescription.sendKeys(addDescription);
				ListsPage.TextBoxes.NewCode.sendKeys(addCode);
				ListsPage.Buttons.Add.click().then(function () {
					expect(notificationService.GetSuccessNotifications().count()).toEqual(1);
					expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
					ListsPage.CategoryList.GetRow([addDescription, addCode, 'Yes', 'Edit']).then(function (index) {
						expect(index).toBeGreaterThan(-1);
					});
				});
			}).finally(done);
		});

		it('should not add as duplicate ListType', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
			// RowExists:[Dup-Template, D, No]
				ListsPage.TextBoxes.NewDescription.sendKeys(dupDescription);
				ListsPage.TextBoxes.NewCode.sendKeys('Dup');
				ListsPage.Buttons.Add.click().then(function () {
					expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
					ListsPage.CategoryList.GetRow([dupDescription, 'Dup', 'Yes', 'Edit']).then(function (index) {
						expect(index).toEqual(-1);
						ListsPage.CategoryList.GetRow([dupDescription, dupCode, 'No', 'Edit']).then(function (index) {
							expect(index).toBeGreaterThan(-1);
						});
					});
				});
			}).finally(done);
		});

		it('should edit and save changes to ListType', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
			// RowExists:[Update-Template, U, Yes]
				ListsPage.CategoryList.GetRow([updateDescription, updateCode, 'Yes', 'Edit']).then(function (index) {
					ListsPage.EditClick(index).then(function () {
						expect(ListsPage.Buttons.Save.isPresent()).toBe(true);
						expect(ListsPage.Buttons.Save.isEnabled()).toBeTruthy();
						ListsPage.TextBoxes.EditDescription.clear();
						ListsPage.TextBoxes.EditDescription.sendKeys(updatedDescription);
						ListsPage.TextBoxes.EditCode.clear();
						ListsPage.TextBoxes.EditCode.sendKeys(updatedCode);
						ListsPage.Buttons.isActive.click();
						ListsPage.SaveClick(index).then(function () {
							expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
							ListsPage.CategoryList.GetRow([updatedDescription, updatedCode, 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
								ListsPage.CategoryList.GetRow([updateDescription, updateCode, 'Yes', 'Edit']).then(function (index) {
									expect(index).toEqual(-1);
								});
							});
						});
					});
				});
			}).finally(done);
		});

		it('should not save as duplicate ListType', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
			// RowExists:[Dup-Template, D, No]; [Edit-Template, E, No]
				ListsPage.CategoryList.GetRow([editDescription, editCode, 'No', 'Edit']).then(function (index) {
					ListsPage.EditClick(index).then(function () {
						ListsPage.TextBoxes.EditDescription.clear();
						ListsPage.TextBoxes.EditDescription.sendKeys(dupDescription);
						ListsPage.TextBoxes.EditCode.clear();
						ListsPage.SaveClick(index).then(function () {
							expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
							ListsPage.CategoryList.GetRow ([dupDescription, '', 'No', 'Edit']).then(function (index) {
								expect(index).toEqual(-1);
								ListsPage.CategoryList.GetRow([editDescription, editCode, 'No', 'Edit']).then(function (index) {
									expect(index).toBeGreaterThan(-1);
									ListsPage.CategoryList.GetRow([dupDescription, dupCode, 'No', 'Edit']).then(function (index) {
										expect(index).toBeGreaterThan(-1);
									});
								});
							});
						});
					});
				});
			}).finally(done);
		});

		it('should edit and cancel changes to ListType', function (done) {
			ListsPage.ClinicalIntLists.sendKeys(selectCategory).then(function () {
			// RowExists:[Edit-Template, E, No]
				ListsPage.CategoryList.GetRow([editDescription, editCode, 'No', 'Edit']).then(function (index) {
					ListsPage.EditClick(index).then(function () {
						expect(ListsPage.Buttons.Cancel.isPresent()).toBe(true);
						expect(ListsPage.Buttons.Cancel.isEnabled()).toBeTruthy();
						ListsPage.TextBoxes.EditDescription.clear();
						ListsPage.TextBoxes.EditDescription.sendKeys('No Change');
						ListsPage.TextBoxes.EditCode.clear();
						ListsPage.TextBoxes.EditCode.sendKeys('No');
						ListsPage.CancelClick(index).then(function () {
							ListsPage.CategoryList.GetRow([editDescription, editCode, 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
								ListsPage.CategoryList.GetRow(['No change', 'No', 'No', 'Edit']).then(function (index) {
									expect(index).toEqual(-1);
								});
							});
						});
					});
				});
			}).finally(done);
		});
	});
});