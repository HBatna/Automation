var OfficerSearchPage = function() {
    var self = this;
    self.SiteId = element(by.model('search.searchParams.SiteId'));
    self.PermissionGroupId = element(by.model('search.searchParams.PermissionGroupId'));
    self.LastName = element(by.model('search.searchParams.LastName'));
    self.FirstName = element(by.model('search.searchParams.FirstName'));
    self.MiddleName = element(by.model('search.searchParams.MiddleName'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.CancelButton = element(by.buttonText('Cancel'));
    self.CreateButton = element(by.buttonText('Create'));
    self.InactiveButton = element(by.buttonText('Inactive'));
    self.BothButton = element(by.buttonText('Both'));

    self.SearchResults = {
        FullName: {
            Header: element(by.id('fullNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("FullName"); }
        },
        EmployeeNo: {
            Header: element(by.id('employeeNoColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("EmployeeNo"); }
        },
        PermissionGroupName: {
            Header: element(by.id('permissionGroupNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('PermissionGroupName'); }
        },
        LocationName: {
            Header: element(by.id('locationNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('LocationName'); }
        },
        Active: {
            Header: element(by.id('isActiveColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Active'); }
        },
        LastLogon: {
            Header: element(by.id('lastLogonColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('LastLogon'); }
        }
    };

    //----------

    self.GetBranch = function() {
        return element.all(by.options('branch.Id as branch.Name for branch in search.Sites'));
    }

    self.GetSelectedBranch = function() {
        return self.SiteId.element(by.css('option:checked')).getText();
    }

    self.GetPermissionGroup = function () {
        return element.all(by.options('permissiongroup.Id as permissiongroup.Name for permissiongroup in search.PermissionGroups'));
    }

    self.GetSelectedPermissionGroup = function () {
        return self.PermissionGroupId.element(by.css('option:checked')).getText();
    }

    //---------

    self.SearchOfficersWithoutfilter = function() {
        var deferred = protractor.promise.defer();
        self.FindButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }
    self.SearchOfficersByFirstName = function (firstName) {
        self.FirstName.sendKeys(firstName);
        return self.FindButton.click();
    }

    self.SearchOfficersByOtherName = function (otherName) {
        self.FirstName.sendKeys(otherName);
        return self.FindButton.click();
    }

    self.SearchOfficersByBranch = function (branch) {
        self.SiteId.sendKeys(branch);
        return self.FindButton.click();
    }

    self.SearchOfficersByPermissionGroup = function (pg) {
        self.PermissionGroupId.sendKeys(pg);
        return self.FindButton.click();
    }

    self.SearchOfficersByLastName = function (lastName) {
        self.LastName.sendKeys(lastName);
        return self.FindButton.click();
    }

    //-----------

    self.GetColumn = function (columnName) {
        return element.all(by.repeater('b in search.SearchList').column("b." + columnName));
    }
    self.DropDownButton = function (index) {
        return element.all(by.repeater('b in search.SearchList')).get(index).element(by.css('[uib-dropdown-toggle]'));
    }
    self.GetOfficerLink = function () {
        return element.all(by.repeater('b in search.SearchList')).get(0).element(by.css('[ng-click="search.getOfficerOverview(b.Id)"]'));
    }
    self.DeleteOfficerLink = function() {
        return element(by.css('[ng-click="$parent.search.deleteOfficer($parent.b.Id)"]'));
    }
    self.GetColumnTextValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            return item.getText().then(function (text) { return text.toLowerCase(); });
        });
    }
}
module.exports = OfficerSearchPage;