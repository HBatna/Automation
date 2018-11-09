var DemandListSearchPage = function () {
    var self = this;
    self.CourseCategoryLId = element(by.model('search.searchParams.CourseCategoryId'));
    self.StatusButtons = element.all(by.model('search.searchParams.Status'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.CourseCategoryPageAlert = element(by.css('[ng-if="searchForm.inpCategory.$invalid && search.submitted"]'));
    self.SearchResults = {
        CourseCategory: {
            GetValues: function () { return self.GetColumnTextValues('o.Category'); }
        },
        CourseName: {
            Header: element(by.id("thCourseName")),
            GetValues: function () { return self.GetColumnTextValues('o.Name'); }
        },
        DemandListAvailable: {
            GetElements: function () { return self.GetColumn("o.DemandListAvailable === true ? 'Yes' : 'No'"); },
            GetValues: function () { return self.GetColumnTextValues("o.DemandListAvailable === true ? 'Yes' : 'No'"); }
        },
        MetroCount: {
            Header: element(by.id("thMetroCount")),
            GetValues: function () {
                return self.GetColumnTextValues('o.MetroCount');
            }
        },
        RegionalCount: {
            Header: element(by.id("thRegionalCount")),
            GetValues: function () {
                return self.GetColumnTextValues('o.RegionalCount');
            }
        },
        TotalCount: {
            Header: element(by.id("thTotalCount")),
            GetValues: function () {
                return self.GetColumnTextValues('o.TotalCount');
            }
        },
        ViewClients: {
            GetElements: function () { return element.all(by.partialLinkText('View Clients')); }
        }
    };
    self.GetCourseCategoryOptions = function () {
        return element.all(by.options('category.Id as category.Description for category in search.CategoryList'));
    };
    self.SelectCourseCategory = function (courseCategory) {
        return self.CourseCategoryLId.sendKeys(courseCategory);
    };
    self.SelectStatus = function (status) {
        return self.StatusButtons.each(function (button, index) {
            button.getText().then(function (text) {
                if (text === status)
                    button.click();
            });
        });
    };
    self.GetSelectedCourtCategory = function () {
        return self.CourseCategoryLId.element(by.css('option:checked'));
    };
    self.GetSelectedCourtCategory = function () {
        return self.CourseCategoryLId.element(by.css('option:checked'));
    };
    self.GetSelectedStatus = function () {
        return element(by.css('label[class^="btn"][class*="btn-primary"]'));
    };
    self.ResetPageClick = function () {
        return self.ClearButton.click();
    };
    self.SearchBy = function (courseCategory, status) {
        var deferred = protractor.promise.defer();
        self.SelectCourseCategory(courseCategory).then(function () {
            self.SelectStatus(status).then(function () {
                self.FindButton.click().then(function () {
                    deferred.resolve();
                });
            });
        });
        return deferred.promise;
    };
    self.GetSearchResults = function () {
        return element.all(by.repeater('o in search.results'));
    };
    self.GetColumn = function (columnName) {
        return element.all(by.repeater('o in search.results').column(columnName));
    };
    self.GetColumnTextValues = function (columnName) {
        var values = self.GetColumn(columnName).map(function (elem) {
            return elem.getText().then(function (text) {
                return text;
            });
        });
        return values;
    };
};
module.exports = DemandListSearchPage;