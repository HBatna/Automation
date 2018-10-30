var AdminPage = require('../../PageObjects/Admin/AdminPage');
var ClinicalInterventionServiceProvidersPage = require('../../PageObjects/Admin/ClinicalInterventionServiceProvidersPage');
var NotificationService = require('../../PageObjects/NotificationService');

describe("Admin Centre", function () {
	describe('ClinicalIntervention: ServiceProviders', function () {
		var adminPage;
		var serviceProvidersPage;
		var notificationService;

		beforeEach(function () {
			browser.driver.manage().window().maximize();
			browser.get('./Projects.html#/Admin/');
			adminPage = new AdminPage();
			notificationService = new NotificationService();
			adminPage.Menu.ClinicalInterventions.GetElement().click().then(function() {
				adminPage.Menu.ClinicalInterventions.SubItems.ServiceProviders.GetElement().click();
			});
			serviceProvidersPage = new ClinicalInterventionServiceProvidersPage();
		});

		var message = 'Service Provider saved to database!'
		var errorMessage = 'Service Provider could not be updated!'
		var defaultInternalIndicator = '--Select Category--';

		var addDescription = 'Add-ServiceProvider';
		var addCode = 'A';
		var editDescription = 'Edit-ServiceProvider';
		var editCode = 'E';        
		var dupDescription = 'Dup-ServiceProvider';
		var dupCode = 'D';
		var updateDescription = 'Update-ServiceProvider';
		var updateCode = 'U';
		var updatedDescription = 'Updated-ServiceProvider';
		var updatedCode = 'Ued';

		it('Initialization', function (done) {
			adminPage.Labels.PageTitle.getText().then(function (text) {
				expect(text.toLowerCase()).toBe('clinical interventions - manage service providers');
				expect(serviceProvidersPage.TextBoxes.NewDescription.isDisplayed()).toBeTruthy();
				expect(serviceProvidersPage.TextBoxes.NewDescription.isEnabled()).toBeTruthy();
				expect(serviceProvidersPage.TextBoxes.NewDescription.getText()).toEqual('');
				expect(serviceProvidersPage.TextBoxes.NewCode.isDisplayed()).toBeTruthy();
				expect(serviceProvidersPage.TextBoxes.NewCode.isEnabled()).toBeTruthy();
				expect(serviceProvidersPage.TextBoxes.NewCode.getText()).toEqual('');
				expect(serviceProvidersPage.GetRows().count()).toBeGreaterThan(0);
				expect(serviceProvidersPage.InternalIndicatorOptions().count()).toEqual(3);
				expect(serviceProvidersPage.InternalIndicatorOptions().get(0).getText()).toEqual(defaultInternalIndicator);
				expect(serviceProvidersPage.Buttons.Add.isDisplayed()).toBe(true);
				expect(serviceProvidersPage.Buttons.Add.isEnabled()).toBeTruthy();
			}).finally(done);
		});

		it('should add new external ServiceProvider', function (done) {
			serviceProvidersPage.TextBoxes.NewDescription.sendKeys(addDescription);
			serviceProvidersPage.TextBoxes.NewCode.sendKeys(addCode);
			serviceProvidersPage.ProvidersInternalindicator.sendKeys('External');
			serviceProvidersPage.Buttons.Add.click().then (function(){
				serviceProvidersPage.ProvidersList.GetRow([addDescription, addCode, 'External', 'Yes', 'Edit']).then(function (index) {
					expect(index).toBeGreaterThan(-1);
					expect(notificationService.GetSuccessNotifications().count()).toEqual(1);
					expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
				});
			}).finally(done);
		});

		it('should not add duplicate ServiceProvider', function (done) {
		// RowExists[Dup-ServiceProvider, D, External, No]
			serviceProvidersPage.TextBoxes.NewDescription.sendKeys(dupDescription);
			serviceProvidersPage.TextBoxes.NewCode.sendKeys('Dd');
			serviceProvidersPage.ProvidersInternalindicator.sendKeys('External');
			serviceProvidersPage.Buttons.Add.click().then (function(){
				expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
				serviceProvidersPage.ProvidersList.GetRow([dupDescription, 'Dd', 'External', 'Yes', 'Edit']).then(function (index) {
					expect(index).toEqual(-1);
					serviceProvidersPage.ProvidersList.GetRow([dupDescription, dupCode, 'External', 'No', 'Edit']).then(function (index) {
						expect(index).toBeGreaterThan(-1);
					});
				});
			}).finally(done);
		});

		it('should add duplicate ServiceProvider as different InternalIndicator', function (done) {
		// RowExists[Dup-ServiceProvider, D, External]
			serviceProvidersPage.TextBoxes.NewDescription.sendKeys(dupDescription);
			serviceProvidersPage.ProvidersInternalindicator.sendKeys('Internal');
			serviceProvidersPage.Buttons.Add.click().then (function(){
				expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
				serviceProvidersPage.ProvidersList.GetRow([dupDescription, '', 'Internal', 'Yes', 'Edit']).then(function (index) {
					expect(index).toBeGreaterThan(-1);
					serviceProvidersPage.ProvidersList.GetRow([dupDescription, dupCode, 'External', 'No', 'Edit']).then(function (index) {
						expect(index).toBeGreaterThan(-1);
					});
				});
			}).finally(done);
		});

		it('should edit and save changes to a Provider', function (done) {
		// RowExists[Update-ServiceProvider, U, External, Yes]
			serviceProvidersPage.ProvidersList.GetRow([updateDescription, updateCode, 'External', 'Yes', 'Edit']).then(function (index){
				serviceProvidersPage.EditClick(index).then(function() {
					expect(serviceProvidersPage.Buttons.Save.isPresent()).toBe(true);
					expect(serviceProvidersPage.Buttons.Save.isEnabled()).toBeTruthy();
					serviceProvidersPage.TextBoxes.EditDescription.clear();
					serviceProvidersPage.TextBoxes.EditDescription.sendKeys(updatedDescription);
					serviceProvidersPage.TextBoxes.EditCode.clear();
					serviceProvidersPage.TextBoxes.EditCode.sendKeys(updatedCode);
					serviceProvidersPage.EditProvidersInternalindicator.sendKeys('Internal');
					serviceProvidersPage.Buttons.isActive.click();
					serviceProvidersPage.SaveClick(index).then (function(){
						expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
						browser.refresh();
						serviceProvidersPage.ProvidersList.GetRow([updatedDescription, updatedCode, 'Internal', 'No', 'Edit']).then(function (index) {
							expect(index).toBeGreaterThan(-1);
							serviceProvidersPage.ProvidersList.GetRow([updateDescription, updateCode, 'External', 'Yes', 'Edit']).then(function (index) {
								expect(index).toEqual(-1);
							});
						});
					});
				});
			}).finally(done);
		});

		it('should not save as duplicate ServiceProvider', function (done) {
		// RowExists[Dup-ServiceProvider, D, External, No]; [Edit-ServiceProvider, E, Internal, No]
			serviceProvidersPage.ProvidersList.GetRow([editDescription, editCode, 'Internal', 'No', 'Edit']).then(function (index){
				serviceProvidersPage.EditClick(index).then(function() {
					serviceProvidersPage.TextBoxes.EditDescription.clear();
					serviceProvidersPage.TextBoxes.EditDescription.sendKeys(dupDescription);
					serviceProvidersPage.EditProvidersInternalindicator.sendKeys('External');
					serviceProvidersPage.SaveClick(index).then (function(){
						expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
						browser.refresh();
						serviceProvidersPage.ProvidersList.GetRow([dupDescription, editCode, 'Internal', 'No', 'Edit']).then(function (index) {
							expect(index).toEqual(-1);
							serviceProvidersPage.ProvidersList.GetRow([editDescription, editCode, 'Internal', 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
								serviceProvidersPage.ProvidersList.GetRow([dupDescription, dupCode, 'External', 'No', 'Edit']).then(function (index) {
									expect(index).toBeGreaterThan(-1);	
								});
							});									
						});
					});
				});
			}).finally(done);
		});

		it('should edit and cancel changes to a Provider', function (done) {
		// RowExists[Edit-ServiceProvider, E, Internal, No]
			serviceProvidersPage.ProvidersList.GetRow([editDescription, editCode, 'Internal', 'No', 'Edit']).then(function (index){
				serviceProvidersPage.EditClick(index).then(function() {
					expect(serviceProvidersPage.Buttons.Cancel.isPresent()).toBe(true);
					expect(serviceProvidersPage.Buttons.Cancel.isEnabled()).toBeTruthy();
					serviceProvidersPage.TextBoxes.EditDescription.clear();
					serviceProvidersPage.TextBoxes.EditDescription.sendKeys('No change');
					serviceProvidersPage.TextBoxes.EditCode.clear();
					serviceProvidersPage.EditProvidersInternalindicator.sendKeys('External');
					serviceProvidersPage.CancelClick(index).then (function(){
						serviceProvidersPage.ProvidersList.GetRow(['No change', '', 'External', 'No', 'Edit']).then(function (index) {
							expect(index).toEqual(-1);
							serviceProvidersPage.ProvidersList.GetRow([editDescription, editCode, 'Internal', 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
							});
						});
					});
				});
			}).finally(done);
		});
	});
});