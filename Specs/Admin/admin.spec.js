var AdminPage = require('../../PageObjects/Admin/AdminPage');
describe("Admin Centre", function () {
    describe('Admin Home Page', function () {
        browser.driver.manage().window().maximize();
        beforeEach(function () {
            adminPage = new AdminPage();
        });

        describe('Admin menu', function () {
            beforeEach(function () {
                browser.get('./Projects.html#/Admin/');
            });

            it('Initialization', function (done) {
                adminPage.Labels.PageTitle.getText().then(function(text) {
                    expect(text.toLowerCase()).toBe('overview');
                });
                expect(adminPage.GetMenu().count()).toEqual(12).then(function() {
                    adminPage.Menu.AdviceRequest.GetElement().getText().then(function(text) {
                        expect(text.toLowerCase()).toBe("advice request");
                        adminPage.Menu.AdviceRequest.GetSubItems().then(function(items) {
                            expect(items).toEqual([
                                {index: 0, text: 'Type Details' }
                            ]);
                        });
                    });
                    adminPage.Menu.Broadcasts.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("broadcasts");
                        adminPage.Menu.Broadcasts.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Create' },
                                { index: 1, text: 'Remove' }
                            ]);
                        });
                    });
                    adminPage.Menu.Caseloads.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("caseloads");
                        adminPage.Menu.Caseloads.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Create' },
                                { index: 1, text: 'Alter' }
                            ]);
                        });
                    });
                    adminPage.Menu.ClinicalInterventions.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("clinical int");
                        adminPage.Menu.ClinicalInterventions.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Lists' },
                                { index: 1, text: 'Service Providers' },
                                { index: 2, text: 'Staff' }
                            ]);
                        });
                    });
                    adminPage.Menu.CommunityWork.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("community work");
                        adminPage.Menu.CommunityWork.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Remove Concurrent' },
                                { index: 1, text: 'Remove Attendance' }
                            ]);
                        });
                    });
                    adminPage.Menu.Documents.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("documents");
                        adminPage.Menu.Documents.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Upload Template' },
                                { index: 1, text: 'Alter' },
                                { index: 2, text: 'Restore' }
                            ]);
                        });
                    });
                    adminPage.Menu.Events.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("events");
                        adminPage.Menu.Events.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Alter' },
                                { index: 1, text: 'Link/Unlink Assignment' },
                                { index: 2, text: 'Update Court Advice Presentation Type' }
                            ]);
                        });
                    });
                    adminPage.Menu.Interfaces.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("interfaces");
                        adminPage.Menu.Interfaces.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Search Received Interface' },
                                { index: 1, text: 'Search Sent' },
                                { index: 2, text: 'Search Send Queue' },
                                { index: 3, text: 'Remove' },
                                { index: 4, text: 'Replay' }
                            ]);
                        });
                    });
                    adminPage.Menu.Offenders.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("offenders");
                        adminPage.Menu.Offenders.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Offender Delete' },
                                { index: 1, text: 'Manage Hidden' },
                                { index: 2, text: 'Merge' }
                            ]);
                        });
                    });
                    adminPage.Menu.Officers.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("officers");
                        adminPage.Menu.Officers.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Create' }
                            ]);
                        });
                    });
                    adminPage.Menu.Orders.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("orders");
                        adminPage.Menu.Orders.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Update End Date' },
                                { index: 1, text: 'Type Details' }
                            ]);
                        });
                    });
                    adminPage.Menu.Permissions.GetElement().getText().then(function (text) {
                        expect(text.toLowerCase()).toBe("permissions");
                        adminPage.Menu.Permissions.GetSubItems().then(function (items) {
                            expect(items).toEqual([
                                { index: 0, text: 'Manage Permission Groups' },
                                { index: 1, text: 'Manage Report Permissions' }
                            ]);
                        });
                    });
                }).finally(done);
            });
        });
    });
});