var CourseInstanceSearchPage = function () {
    var self = this;
    self.CategoryLId = element(by.model('search.searchParams.CategoryLId'));
    self.NameLId = element(by.model('search.searchParams.NameLId'));
    self.VenueLId = element(by.model('search.searchParams.VenueLId'));
    self.DeliveryTypeLId = element(by.model('search.searchParams.DeliveryTypeLId'));
    self.ProgramUnitLId = element(by.model('search.searchParams.ProgramUnitLId'));
    self.StatusLId = element(by.model('search.searchParams.StatusLId'));
    self.AfterHours = element(by.model('search.searchParams.AfterHours'));
    self.AlertsOnly = element(by.model('search.searchParams.AlertsOnly'));
    self.DateSearchType = element(by.model('search.searchParams.DateSearchType'));
    self.StartDate = element(by.id('inpStartDate')).element(by.tagName('input'));
    self.EndDate = element(by.id('inpEndDate')).element(by.tagName('input'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));

    self.ColumnHeaders = {
        Category: element(by.id('categoryColumnHeader')),
        Name: element(by.id('nameColumnHeader')),
        StartDate: element(by.id('startDateColumnHeader')),
        EndDate: element(by.id('endDateColumnHeader')),
        ScheduleAlert: element(by.id('scheduleAlertColumnHeader')),
        OutcomeAlert: element(by.id('outcomeAlertColumnHeader')),
        AttendanceAlert: element(by.id('attendanceAlertColumnHeader')),
        AbsenceAlert: element(by.id('absenceAlertColumnHeader')),
        DeliveryType: element(by.id('deliveryTypeColumnHeader')),
        Venue: element(by.id('venueColumnHeader')),
        ProgramUnit: element(by.id('programUnitColumnHeader')),
        Version: element(by.id('versionColumnHeader')),
        Status: element(by.id('statusColumnHeader')),
        Facilitator1: element(by.id('facilitator1ColumnHeader')),
        Facilitator2: element(by.id('facilitator2ColumnHeader')),
        ScheduledHours: element(by.id('scheduledHoursColumnHeader')),
        ActualHours: element(by.id('actualHoursColumnHeader'))
    };

    self.SearchResults = {
        Category: {
            Header: element(by.id('categoryColumnHeader')),

            GetValues: function () { return self.GetColumnTextValues("Category"); }
        },
        Name: {
            Header: element(by.id('nameColumnHeader')),
            GetCells: function () { return self.GetColumn('Name'); },
            GetValues: function () { return self.GetColumnTextValues("Name"); }
        },
        StartDate: {
            Header: element(by.id('startDateColumnHeader')),
            GetValues: function () { return self.GetColumnDateValues('StartDate'); }
        },
        EndDate: {
            Header: element(by.id('endDateColumnHeader')),
            GetValues: function () { return self.GetColumnDateValues('EndDate'); }
        },
        ScheduleAlert: {
            Header: element(by.id('scheduleAlertColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("ScheduleAlertCount"); }
        },
        OutcomeAlert: {
            Header: element(by.id('outcomeAlertColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("OutcomeAlertCount"); }
        },
        AttendanceAlert: {
            Header: element(by.id('attendanceAlertColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('AttendanceAlertCount'); }
        },
        AbsenceAlert: {
            Header: element(by.id('absenceAlertColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('AbsenceAlertCount'); }
        },
        DeliveryType: {
            Header: element(by.id('deliveryTypeColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("DeliveryType"); }
        },
        Venue: {
            Header: element(by.id('venueColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Venue"); }
        },
        ProgramUnit: {
            Header: element(by.id('programUnitColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ProgramUnitName'); }
        },
        Version: {
            Header: element(by.id('versionColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Version'); }
        },
        Status: {
            Header: element(by.id('statusColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Status"); }
        },
        Facilitator1: {
            Header: element(by.id('facilitator1ColumnHeader')),
            GetValues: function () { return self.GetColumnTextWithSpaceValues("Facilitator1"); }
        },
        Facilitator2: {
            Header: element(by.id('facilitator2ColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Facilitator2"); }
        },
        ScheduledHours: {
            Header: element(by.id('scheduledHoursColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ScheduledHours'); }
        },
        ActualHours: {
            Header: element(by.id('actualHoursColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ActualHours'); }
        },
        AfterHours: {
            Header: element(by.id('afterHoursColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('AfterHours'); }
        },
        ClientCount: {
            Header: element(by.id('clientCountColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ClientCount'); }
        },
        ClientName: {
            Header: element(by.id('clientNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ClientName'); }
        }
    };


    self.GetCategoryOptions = function () {
        return element.all(by.options('category.Id as category.Description for category in search.CategoryList'));
    };

    self.GetSelectedCategory = function () {
        return self.CategoryLId.element(by.css('option:checked')).getText();
    };

    self.GetNameOptions = function () {
        return element.all(by.options('name.Id as name.Description for name in search.CourseInstanceNames'));
    };

    self.GetSelectedName = function () {
        return self.NameLId.element(by.css('option:checked')).getText();
    };

    self.GetVenueOptions = function () {
        return element.all(by.options('venue.Id as venue.Description for venue in search.VenueList'));
    };

    self.GetSelectedVenue = function () {
        return self.VenueLId.element(by.css('option:checked')).getText();
    };

    self.GetDeliveryTypeOptions = function () {
        return element.all(by.options('deliveryType.Id as deliveryType.Description for deliveryType in search.DeliveryTypeList'));
    };

    self.GetSelectedDeliveryType = function () {
        return self.DeliveryTypeLId.element(by.css('option:checked')).getText();
    };

    self.GetProgramUnitOptions = function () {
        return element.all(by.options('programUnit.Id as programUnit.Description for programUnit in search.ProgramUnitList'));
    };

    self.GetSelectedProgramUnit = function () {
        return self.ProgramUnitLId.element(by.css('option:checked')).getText();
    };

    self.GetCourseInstanceStatusOptions = function () {
        return element.all(by.options('courseInstanceStatus.Id as courseInstanceStatus.Description for courseInstanceStatus in search.CourseInstanceStatusList'));
    };

    self.GetSelectedCourseInstanceStatus = function () {
        return self.StatusLId.element(by.css('option:checked')).getText();
    };

    self.GetAfterHoursOptions = function () {
        return element.all(by.options('afterHours.id as afterHours.value for afterHours in search.afterHoursSelectList'));
    };

    self.GetSelectedAfterHours = function () {
        return self.AfterHours.element(by.css('option:checked')).getText();
    };


    self.GetAlertsOnlyOptions = function () {
        return element.all(by.options('alert.id as alert.value for alert in search.alertSelectList'));
    };

    self.GetSelectedAlertsOnly = function () {
        return self.AlertsOnly.element(by.css('option:checked')).getText();
    };

    self.GetDateSearchTypeOptions = function () {
        return element.all(by.options('dateSearchType.id as dateSearchType.value for dateSearchType in search.dateSearchTypeSelectList'));
    };

    self.GetSelectedDateSearchType = function () {
        return self.DateSearchType.element(by.css('option:checked')).getText();
    };

    self.SelectCategory = function (category) {
        return self.CategoryLId.sendKeys(category);
    };

    self.SelectName = function (name) {
        return self.NameLId.sendKeys(name);
    };

    self.SelectVenue = function (venue) {
        return self.VenueLId.sendKeys(venue);
    };

    self.SelectProgramUnit = function (programUnit) {
        return self.ProgramUnitLId.sendKeys(programUnit);
    }

    self.SelectDeliveryType = function (deliveryType) {
        return self.DeliveryTypeLId.sendKeys(deliveryType);
    }

    self.SelectCourseInstanceStatus = function (courseInstanceStatus) {
        return self.StatusLId.sendKeys(courseInstanceStatus);
    }

    self.SelectAfterHoursChoice = function (afterHoursChoice) {
        return self.AfterHours.sendKeys(afterHoursChoice);
    }

    self.SelectAlertChoice = function (alertChoice) {
        return self.AlertsOnly.sendKeys(alertChoice);
    }

    self.SelectDateSearchType = function (dateSearchType) {
        return self.DateSearchType.sendKeys(dateSearchType);
    }


    self.SetStartDate = function (startDate) {
        return self.StartDate.sendKeys(startDate);
    }




    self.SearchByCategory = function (category) {
        self.CategoryLId.sendKeys(category);
        return self.FindButton.click();
    };

    self.SearchByName = function (name) {
        self.NameLId.sendKeys(name);
        return self.FindButton.click();
    }


    self.SearchByCategory = function (category, startDate) {
        var deferred = protractor.promise.defer();

        self.CategoryLId.sendKeys(category);
        self.StartDate.sendKeys(startDate);
        self.SelectCategory(category).then(function () {
            self.SelectName("-- Select Name --").then(function () {
                self.FindButton.click().then(function () {
                    deferred.resolve();
                });
            });
        });

        return deferred.promise;
    };

    self.SearchByName = function (name, startDate) {
        var deferred = protractor.promise.defer();

        self.NameLId.sendKeys(name);
        self.StartDate.sendKeys(startDate);
        self.SelectName(name).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };


    self.SearchByVenue = function (venue, startDate) {
        var deferred = protractor.promise.defer();

        self.VenueLId.sendKeys(venue);
        self.StartDate.sendKeys(startDate);
        self.SelectVenue(venue).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByDeliveryType = function (deliveryType, startDate) {
        var deferred = protractor.promise.defer();

        self.DeliveryTypeLId.sendKeys(deliveryType);
        self.StartDate.sendKeys(startDate);
        self.SelectDeliveryType(deliveryType).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByProgramUnit = function (programUnit, startDate) {
        var deferred = protractor.promise.defer();

        self.ProgramUnitLId.sendKeys(programUnit);
        self.StartDate.sendKeys(startDate);
        self.SelectProgramUnit(programUnit).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByCourseInstanceStatus = function (courseInstanceStatus, startDate) {
        var deferred = protractor.promise.defer();

        self.StatusLId.sendKeys(courseInstanceStatus);
        self.StartDate.sendKeys(startDate);
        self.SelectCourseInstanceStatus(courseInstanceStatus).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };


    self.SearchByAfterHoursChoice = function (afterHoursChoice, startDate) {
        var deferred = protractor.promise.defer();

        self.AfterHours.sendKeys(afterHoursChoice);
        self.StartDate.sendKeys(startDate);
        self.SelectAfterHoursChoice(afterHoursChoice).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByAlertChoice = function (alertChoice, startDate) {
        var deferred = protractor.promise.defer();

        self.AlertsOnly.sendKeys(alertChoice);
        self.StartDate.sendKeys(startDate);
        self.SelectAlertChoice(alertChoice).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };


    self.SearchByDateSearchType = function (dateSearchType, startDate) {
        var deferred = protractor.promise.defer();

        self.DateSearchType.sendKeys(dateSearchType);
        self.StartDate.sendKeys(startDate);
        self.SelectDateSearchType(dateSearchType).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.GetCourseInstanceLink = function (index) {
        return element.all(by.repeater('b in search.CourseInstanceList')).get(index).element(by.tagName('a'));
    }

    self.GetCategory = function () {
        return self.GetColumnTextValues('Category');
    }

    self.GetName = function () {
        return self.GetColumnTextValues("Name");
    }

    self.GetStartDate = function () {
        return self.GetColumnTextValues('StartDate');
    }

    self.GetEndDate = function () {
        return self.GetColumnTextValues('EndDate');
    }

    self.GetScheduleAlert = function () {
        return self.GetColumnTextValues('ScheduleAlert');
    }

    self.GetOutcomeAlert = function () {
        return self.GetColumnTextValues('OutcomeAlert');
    }

    self.GetAttendanceAlert = function () {
        return self.GetColumnTextValues('AttendanceAlert');
    }

    self.GetAbsenceAlert = function () {
        return self.GetColumnTextValues('AbsenceAlert');
    }

    self.GetDeliveryType = function () {
        return self.GetColumnTextValues('DeliveryType');
    }

    self.GetVenue = function () {
        return self.GetColumnTextValues('Venue');
    }

    self.GetProgramUnit = function () {
        return self.GetColumnTextValues('ProgramUnit');
    }

    self.GetVersion = function () {
        return self.GetColumnTextValues('Version');
    }

    self.GetStatus = function () {
        return self.GetColumnTextValues('Status');
    }

    self.GetFacilitator1 = function () {
        return self.GetColumnTextValues('Facilitator1');
    }

    self.GetFacilitator2 = function () {
        return self.GetColumnTextValues('Facilitator2');
    }

    self.GetScheduledHours = function () {
        return self.GetColumnTextValues('ScheduledHours');
    }

    self.GetActualHours = function () {
        return self.GetColumnTextValues('ActualHours');
    }

    self.GetColumnTextValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) { return item.getText(); });
    }

    self.GetColumnTextWithSpaceValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            var deferred = protractor.promise.defer();

            item.getText().then(function (text) {
                var result = (text != null) ? text : '';
                deferred.resolve(result);
            });

            return deferred.promise;
        });
    }

    self.GetColumnDateValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            var deferred = protractor.promise.defer();

            item.getText().then(function (text) {
                var result = (text.toUpperCase() == "EDIT") ? '01-Jan-0001 12:00 AM' : text;
                deferred.resolve(result);
            });

            return deferred.promise;
        });
    }

    self.GetColumnIntValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            var deferred = protractor.promise.defer();

            item.getText().then(function (text) {
                var result = int.parse(text);
                deferred.resolve(result);
            });

            return deferred.promise;
        });
    }

    self.GetColumn = function (columnName) {
        return element.all(by.repeater("b in search.CourseInstanceList").column("b." + columnName));
    }

    self.GetCourseInstances = function () {
        return element.all(by.repeater('b in search.CourseInstanceList').column('b.Category'));
    }
}

module.exports = CourseInstanceSearchPage;