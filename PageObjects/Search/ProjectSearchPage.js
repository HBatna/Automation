var ProjectSearchPage = function () {
    var self = this;
    self.ProjectName = element(by.model('search.searchParams.ProjectName'));
    self.ProjectId = element(by.model('search.searchParams.ProjectID'));
    self.Suburb = element(by.model('search.searchParams.Suburb'));
    self.ProjectBranchId = element(by.model('search.searchParams.ProjectBranchId'));
    self.StatusCode = element(by.model('search.searchParams.StatusCode'));
    self.FindButton = element(by.buttonText('Find'));
    self.InactiveButton = element(by.css('[uib-btn-radio="Inactive"]'));
    self.BothButton = element(by.css('[uib-btn-radio="Both"]'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.ProjectNameAlert = element(by.css('[ng-if="searchForm.inpProjectName.$invalid"]'));
    self.ProjectIDAlert = element(by.css('[ng-if="searchForm.inpProjectID.$invalid"]'));
    self.SuburbAlert = element(by.css('[ng-if="searchForm.inpSuburb.$invalid"]'));

    self.SearchResults = {
        Name: {
            Header: element(by.id('projectNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Name"); }
        },
        AgencyProjectId: {
            Header: element(by.id('agencyProjectIdColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("AgencyProjectId"); }
        },
        AgencyName: {
            Header: element(by.id('AgencyNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('AgencyName'); }
        },
        LocationName: {
            Header: element(by.id('LocationNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('LocationName'); }
        },
        ReqCSATCard: {
            Header: element(by.id('ReqCSATCardColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('ReqCSATCard'); }
        },
        SpecialReq: {
            Header: element(by.id('SpecialReqColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('SpecialReq'); }
        },
        Active: {
            Header: element(by.id('ActiveColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Active'); }
        }
    };

    self.GetProjectBranch = function () {
        return element.all(by.options('projectbranch.Id as projectbranch.Name for projectbranch in search.ProjectBranches'));
    };

    self.GetSelectedProjectBranch = function () {
        return self.ProjectBranchId.element(by.css('option:checked')).getText();
    }
    //-------------

    self.SelectProjectBranch = function (branchName) {
        return self.ProjectBranchId.sendKeys(branchName);
    }

    //------------------

    self.SearchActiveProjectsWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.FindButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchInActiveProjectsWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.InactiveButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchBothProjectsWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.BothButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchByProjectName = function(projectName) {
        self.ProjectName.sendKeys(projectName);
        return self.FindButton.click();
    }

    self.SearchInactiveByProjectName = function (projectName) {
        self.ProjectName.sendKeys(projectName);
        return self.InactiveButton.click();
    }

    self.SearchBothByProjectName = function (projectName) {
        self.ProjectName.sendKeys(projectName);
        return self.BothButton.click();
    }

    self.SearchByProjectId = function (projectId) {
        self.ProjectId.sendKeys(projectId);
        return self.FindButton.click();
    }

    self.SearchInactiveByProjectId = function (projectId) {
        self.ProjectId.sendKeys(projectId);
        return self.InactiveButton.click();
    }

    self.SearchBothByProjectId = function (projectId) {
        self.ProjectId.sendKeys(projectId);
        return self.BothButton.click();
    }

    self.SearchBySuburb = function (suburb) {
        self.Suburb.sendKeys(suburb);
        return self.FindButton.click();
    }

    self.SearchInactiveBySuburb = function (suburb) {
        self.Suburb.sendKeys(suburb);
        return self.InactiveButton.click();
    }

    self.SearchBothBySuburb = function (suburb) {
        self.Suburb.sendKeys(suburb);
        return self.BothButton.click();
    }

    self.SearchByProjectBranch = function (projectBranch) {
        var deferred = protractor.promise.defer();
        self.SelectProjectBranch(projectBranch).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    self.SearchInactiveByProjectBranch = function (projectBranch) {
        var deferred = protractor.promise.defer();
        self.SelectProjectBranch(projectBranch).then(function () {
            self.InactiveButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    self.SearchBothByProjectBranch = function (projectBranch) {
        var deferred = protractor.promise.defer();
        self.SelectProjectBranch(projectBranch).then(function () {
            self.BothButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }


    //----------------
    self.GetColumn = function (columnName) {
        return element.all(by.repeater('b in search.ProjectList').column("b." + columnName));
    }
    self.GetProjectLink = function (index) {
        return element.all(by.repeater('b in search.ProjectList')).get(index).element(by.tagName('a'));
    }
    self.GetColumnTextValues = function(columnName) {
        return self.GetColumn(columnName).map(function (item) {
            return item.getText().then(function (text) { return text.toLowerCase(); });
        });
    }
}

module.exports = ProjectSearchPage;