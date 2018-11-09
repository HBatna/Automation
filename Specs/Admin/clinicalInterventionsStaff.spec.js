var AdminPage = require('../../PageObjects/Admin/AdminPage');
var ClinicalInterventionsStaffPage = require('../../PageObjects/Admin/ClinicalInterventionsStaffPage');
var NotificationService = require('../../PageObjects/NotificationService');

describe("Admin Centre", function () {
	describe('ClinicalIntervention: Staff', function () {
		var adminPage;
		var staffPage;
		var notificationService;
        var defaultProvider = '--Select Provider--';

		beforeAll(function () {
			browser.driver.manage().window().maximize();
			browser.get('./Cbis/App/Cbis.html#/Admin/Overview/');
			adminPage = new AdminPage();
			notificationService = new NotificationService();
			adminPage.Menu.ClinicalInterventions.GetElement().click().then(function () {
				adminPage.Menu.ClinicalInterventions.SubItems.Staff.GetElement().click();
			});
			staffPage = new ClinicalInterventionsStaffPage();
		});

		it('Initialization', function (done) {
			adminPage.Labels.PageTitle.getText().then(function (text) {
				expect(text.toLowerCase()).toBe('clinical interventions - manage staff');
                expect(staffPage.ServiceProvidersDropdown.isPresent()).toBe(true);
				expect(staffPage.ServiceProvidersDropdown.isDisplayed()).toBe(true);
				expect(staffPage.ServiceProvidersDropdown.isEnabled()).toBe(true);
				expect(staffPage.ServiceProvidersOptions().count()).toBeGreaterThan(1);
				expect(staffPage.ServiceProvidersOptions().get(0).getText()).toEqual(defaultProvider);
			}).finally(done);
		});

        it('should clear staff list on selecting default provider', function() {
            staffPage.SelectServiceProviderOption('DCS').then(function () {
                expect(staffPage.GetRowCount()).toBeGreaterThan(0);
                staffPage.SelectServiceProviderOption(defaultProvider).then(function () {
                    expect(staffPage.GetRowCount()).toEqual(0);
                });
            });
        });

		describe('service Provider - DCS)', function () {
			var selectDCSProvider = 'DCS';
			beforeEach(function () {
				browser.refresh();
				staffPage.SelectServiceProviderOption(selectDCSProvider);
			});

			var message = 'Service Provider Staff saved to database!';
			var errorMessage = 'Service Provider Staff could not be updated!';
			var defaultOfficer = '--Select Officer--';
			var addStaff1 = 'A-DCSTestStaff01';
			var addStaff2 = 'A-DCSTestStaff02';
			var addLogon2 = 'TestStaffLogon02';
			var dupName = 'A-DCSTestStaff03';
			var dupLogon = 'DCSTestStaffLogon03';
			var updateName = 'A-DCSTestStaff04';
			var updateLogon = 'DCSTestStaffLogon04';
			var updatedName = 'A-DCSTestStaff05';
			var updatedLogon = 'TestStaffLogon05';
			var editName = 'A-DCSTestStaff06';
			var editLogon = 'DCSTestStaffLogon06';

			it('should display StaffList for DCS-ServiceProvider', function () {
				expect(staffPage.GetRowCount()).toBeGreaterThan(0);
				expect(staffPage.TextBoxes.NewDescription.isEnabled()).toBe(true);
				expect(staffPage.OfficerLogonDropdown.isPresent()).toBe(true);
				expect(staffPage.OfficerLogonDropdown.isEnabled()).toBe(true);
				expect(staffPage.DefaultOfficerLogon.getText()).toBe(defaultOfficer);
				expect(staffPage.OfficerLogonOptions().count()).toBeGreaterThan(0);
				expect(staffPage.Buttons.isActive.isPresent()).toBe(false);
				expect(staffPage.Buttons.Add.isEnabled()).toBe(true);
			});

			it('should add new DCS staff without OfficerLogon selected', function (done) {
                staffPage.GetRowCount().then(function(rowCountBefore) {
                    staffPage.TextBoxes.NewDescription.sendKeys(addStaff1);
                    staffPage.Buttons.Add.click().then(function () {
                        expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
                        staffPage.GetRowCount().then(function(rowCountAfter) {
                            expect(rowCountAfter).toEqual(rowCountBefore + 1);
                            staffPage.ProvidersStaff.GetRow([addStaff1, '', 'Yes', 'Edit']).then(function(index) {
                                expect(index).toBeGreaterThan(-1);
                            });
                        });
                    });
				}).finally(done);
			});

			it('should add new DCS staff with OfficerLogon selected', function (done) {
                staffPage.GetRowCount().then(function(rowCountBefore) {
                    staffPage.TextBoxes.NewDescription.sendKeys(addStaff2);
                    staffPage.SelectOfficerLogonOption(addLogon2);
                    staffPage.Buttons.Add.click().then(function () {
                        expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
                        staffPage.GetRowCount().then(function(rowCountAfter) {
                            expect(rowCountAfter).toEqual(rowCountBefore+1);

                            staffPage.ProvidersStaff.GetRow([addStaff2, addLogon2, 'Yes', 'Edit']).then(function (index) {
                                expect(index).toBeGreaterThan(-1);
                            });
                        });
                    });
				}).finally(done);
			});

			it('should not add as duplicate DCS staff Name', function (done) {
                // RowExists:[A-DCSTestStaff03, DCSTestStaffLogon03, No]
				staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.TextBoxes.NewDescription.sendKeys(dupName);
					staffPage.Buttons.Add.click().then(function () {
                        expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
                        staffPage.GetRowCount().then(function(rowCountAfter) {
                            expect(rowCountAfter).toEqual(rowCountBefore);

                            staffPage.ProvidersStaff.GetRow([dupName, dupLogon, 'No', 'Edit']).then(function (index) {
                                expect(index).toBeGreaterThan(-1);
                            });
                        });
					});
                }).finally(done);
			});

			it('should edit and save changes to a DCS staff record', function (done) {
                // RowExists:[A-DCSTestStaff04, DCSTestStaffLogon04, Yes] 
                staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.ProvidersStaff.GetRow([updateName, updateLogon, 'Yes', 'Edit']).then(function (index) {
						staffPage.EditClick(index).then(function () {
							expect(staffPage.Buttons.Save.isEnabled()).toBe(true);
							staffPage.TextBoxes.EditDescription.clear();
							staffPage.TextBoxes.EditDescription.sendKeys(updatedName);
							staffPage.SelectEditOfficerLogonOption(updatedLogon);
							staffPage.Buttons.isActive.click();
							staffPage.SaveClick(index).then(function () {
								expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);

                                staffPage.GetRowCount().then(function(rowCountAfter) {
                                    expect(rowCountBefore).toEqual(rowCountAfter);

                                    staffPage.ProvidersStaff.GetRow([updatedName, updatedLogon, 'No', 'Edit']).then(function(index) {
                                        expect(index).toBeGreaterThan(-1);
                                    });
                                });
							});
						});
					});
				}).finally(done);
			});

			it('should not edit save as duplicate Staff', function (done) {
                // RowExists:[A-DCSTestStaff03, DCSTestStaffLogon03, No], [A-DCSTestStaff06, DCSTestStaffLogon06, No];
				staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.ProvidersStaff.GetRow([editName, editLogon, 'No', 'Edit']).then(function (index) {
						staffPage.EditClick(index).then(function () {
							staffPage.TextBoxes.EditDescription.clear();
							staffPage.TextBoxes.EditDescription.sendKeys(dupName);
							staffPage.SaveClick(index).then(function () {
								expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);

                                staffPage.GetRowCount().then(function(rowCountAfter) {
                                    expect(rowCountBefore).toEqual(rowCountAfter);

                                    browser.refresh();
                                    staffPage.SelectServiceProviderOption(selectDCSProvider).then(function() {
                                        staffPage.ProvidersStaff.GetRow([editName, editLogon, 'No', 'Edit']).then(function(index) {
                                            expect(index).toBeGreaterThan(-1);

                                            staffPage.ProvidersStaff.GetRow([dupName, dupLogon, 'No', 'Edit']).then(function(index) {
                                                expect(index).toBeGreaterThan(-1);
                                            });
                                        });
                                    });
                                });
							});
						});
					});
				}).finally(done);
			});

			it('should edit and cancel changes to a Staff record', function (done) {
                // RowExists:[A-DCSTestStaff06, DCSTestStaffLogon06, No]
				staffPage.ProvidersStaff.GetRow([editName, editLogon, 'No', 'Edit']).then(function (index) {
					staffPage.EditClick(index).then(function () {
						expect(staffPage.Buttons.Cancel.isEnabled()).toBe(true);
						staffPage.TextBoxes.EditDescription.clear();
						staffPage.TextBoxes.EditDescription.sendKeys('No Change');
						staffPage.EditOfficerLogonDropdown.sendKeys(defaultOfficer);
						staffPage.Buttons.isActive.click();
						staffPage.CancelClick(index).then(function () {
							expect(notificationService.GetSuccessNotifications().count()).toEqual(0);
							staffPage.ProvidersStaff.GetRow([editName, editLogon, 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
							});
						});
					});
				}).finally(done);
			});
		});

		describe('service Provider - Non DCS', function () {
			var selectNonDCSProvider = 'Cyrenian House';

			beforeEach(function () {
				browser.refresh();
				staffPage.SelectServiceProviderOption(selectNonDCSProvider);
			});

			var message = 'Service Provider Staff saved to database!';
			var errorMessage = 'Service Provider Staff could not be updated!';
			var addDescription = 'Add-CH-Staff';
			var editDescription = 'Edit-CH-Staff';
			var dupDescription = 'Dup-CH-Staff';
			var updateDescription = 'Update-CH-Staff';
			var updatedDescription = 'Updated-CH-Staff';

			it('should display StaffList for selected Non DCS-ServiceProvider', function () {
				expect(staffPage.GetRowCount()).toBeGreaterThan(-1);
				expect(staffPage.TextBoxes.NewDescription.isEnabled()).toBe(true);
				expect(staffPage.OfficerLogonDropdown.isPresent()).toBe(false);
				expect(staffPage.Buttons.isActive.isPresent()).toBe(false);
				expect(staffPage.Buttons.Add.isEnabled()).toBe(true);
			});

			it('should add new Staff', function () {
                staffPage.GetRowCount().then(function(rowCountBefore) {
                    staffPage.TextBoxes.NewDescription.sendKeys(addDescription);
                    staffPage.Buttons.Add.click().then(function () {
                        expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);

                        staffPage.GetRowCount().then(function(rowCountAfter) {
                            expect(rowCountAfter).toEqual(rowCountBefore + 1);

                            staffPage.ProvidersStaff.GetRow([addDescription, '', 'Yes', 'Edit']).then(function(index) {
                                expect(index).toBeGreaterThan(-1);
                            });
                        });
                    });
                });
			});

			it('should not add as duplicate Staff Name ', function (done) {
                // RowExists:[Dup-CH-Staff, No]
				staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.TextBoxes.NewDescription.sendKeys(dupDescription);
					staffPage.Buttons.Add.click().then(function () {
						expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
                        staffPage.GetRowCount().then(function(rowCountAfter) {
                            expect(rowCountBefore).toEqual(rowCountAfter);
                            staffPage.ProvidersStaff.GetRow([dupDescription, '', 'No', 'Edit']).then(function (index) {
                                expect(index).toBeGreaterThan(-1);
                            });
                        });
					});
				}).finally(done);
			});

			it('should edit and save changes to a Staff record', function (done) {
                // RowExists:[Update-CH-Staff, '', 'Yes']
				staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.ProvidersStaff.GetRow([updateDescription, '', 'Yes', 'Edit']).then(function (index) {
						staffPage.EditClick(index).then(function () {
							expect(staffPage.Buttons.Save.isPresent()).toBe(true);
							expect(staffPage.Buttons.Save.isEnabled()).toBe(true);
							staffPage.TextBoxes.EditDescription.clear();
							staffPage.TextBoxes.EditDescription.sendKeys(updatedDescription);
							staffPage.Buttons.isActive.click();
							staffPage.SaveClick(index).then(function () {
								expect(notificationService.GetSuccessNotifications().get(0).getText()).toEqual(message);
                                staffPage.GetRowCount().then(function(rowCountAfter) {
                                    expect(rowCountAfter).toEqual(rowCountBefore);

                                    staffPage.ProvidersStaff.GetRow([updatedDescription, '', 'No', 'Edit']).then(function (index) {
                                        expect(index).toBeGreaterThan(-1);
                                    });
								});
							});
						});
					});
				}).finally(done);
			});

			it('should not edit save as duplicate Staff', function (done) {
                // RowExists:[Dup-CH-Staff, No], [Edit-CH-Staff, No];
				staffPage.GetRowCount().then(function(rowCountBefore) {
					staffPage.ProvidersStaff.GetRow([editDescription, '', 'No', 'Edit']).then(function (index) {
						staffPage.EditClick(index).then(function () {
							staffPage.TextBoxes.EditDescription.clear();
							staffPage.TextBoxes.EditDescription.sendKeys(dupDescription);
							staffPage.Buttons.isActive.click();
							staffPage.SaveClick(index).then(function () {
								expect(notificationService.GetErrorNotifications().get(0).getText()).toEqual(errorMessage);
                                staffPage.GetRowCount().then(function(rowCountAfter) {
                                    expect(rowCountAfter).toEqual(rowCountBefore);

                                    browser.refresh();
                                    staffPage.SelectServiceProviderOption(selectNonDCSProvider).then(function () {
                                        staffPage.ProvidersStaff.GetRow([editDescription, '', 'No', 'Edit']).then(function (index) {
                                            expect(index).toBeGreaterThan(-1);
                                            staffPage.ProvidersStaff.GetRow([dupDescription, '', 'No', 'Edit']).then(function (index) {
                                                expect(index).toBeGreaterThan(-1);
                                            });
                                        });
                                    });
                                });
							});
						});
					});
				}).finally(done);
			});

			it('should edit and cancel changes to a Staff record', function (done) {
                // RowExists:[Edit-CH-Staff, No]
				staffPage.ProvidersStaff.GetRow([editDescription, '', 'No', 'Edit']).then(function (index) {
					staffPage.EditClick(index).then(function () {
						expect(staffPage.Buttons.Cancel.isPresent()).toBe(true);
						expect(staffPage.Buttons.Cancel.isEnabled()).toBe(true);
						staffPage.TextBoxes.EditDescription.clear();
						staffPage.TextBoxes.EditDescription.sendKeys('No Change');
						staffPage.Buttons.isActive.click();
						staffPage.CancelClick(index).then(function () {
							expect(notificationService.GetSuccessNotifications().count()).toEqual(0);
							staffPage.ProvidersStaff.GetRow([editDescription, '', 'No', 'Edit']).then(function (index) {
								expect(index).toBeGreaterThan(-1);
							});
						});
					});
				}).finally(done);
			});
		});
	});
});