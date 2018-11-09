var CourseTemplateSearchPage = function() {
    var self = this;

    self.CourseCategoryLId = element(by.model('search.searchParams.CategoryLId'));
    self.CourseNameLId = element(by.model('search.searchParams.NameLId'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.CancelButton = element(by.buttonText('Cancel'));
    self.CreateButton = element(by.buttonText('Create'));
    self.AllButton = element(by.css('[uib-btn-radio="All"]'));
    self.DraftButton = element(by.css('[uib-btn-radio="DRA"]'));
    self.ActiveButton = element(by.css('[uib-btn-radio="ACT"]'));
    self.SupersededButton = element(by.css('[uib-btn-radio="SUP"]'));

    self.SearchResults = {
        Category: {
            Header: element(by.id('courseCategoryColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Category"); }
        },
        Name: {
            Header: element(by.id('courseNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Name"); }
        },
        VersionName: {
            Header: element(by.id('versionColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('VersionName'); }
        },
        Hours: {
            Header: element(by.id('hoursColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Hours'); }
        },
        Status: {
            Header: element(by.id('statusColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Status'); }
        },
        Count: {
            Header: element(by.id('countColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Count'); }
        }
    };
    //------

    self.GetCourseCategory = function() {
        return element.all(by.options('category.Id as category.Description for category in search.CategoryList')); 
    };

    self.GetSelectedCourseCategory = function() {
        return self.CourseCategoryLId.element(by.css('option:checked')).getText();
    };

    self.GetCourseName = function () {
        return element.all(by.options('name.Id as name.Description for name in search.CourseTemplateNames'));
    };

    self.GetSelectedCourseName = function () {
        return self.CourseNameLId.element(by.css('option:checked')).getText();
    };

    self.SelectCourseName = function (courseName) {
        return self.CourseNameLId.sendKeys(courseName);
    }

    self.SelectCourseCategory = function (courseCategory) {
        return self.CourseCategoryLId.sendKeys(courseCategory);
    }

    //---------------

    self.SearchActiveCourseWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.FindButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchAllCourseWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.AllButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchDraftCourseWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.DraftButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchSupersededCourseWithoutFilter = function () {
        var deferred = protractor.promise.defer();
        self.SupersededButton.click().then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    self.SearchActiveByCourseCategory = function (courseCategory) {
        self.CourseCategoryLId.sendKeys(courseCategory);
        return self.FindButton.click();
    }


    self.SearchDraftByCourseCategory = function (courseCategory) {
        self.CourseCategoryLId.sendKeys(courseCategory);
        return self.DraftButton.click();
    }

    self.SearchAllByCourseCategory = function (courseCategory) {
        self.CourseCategoryLId.sendKeys(courseCategory);
        return self.AllButton.click();
    }

    self.SearchSupersededByCourseCategory = function (courseCategory) {
        self.CourseCategoryLId.sendKeys(courseCategory);
        return self.SupersededButton.click();
    }

    self.SearchActiveByCourseName = function (courseName) {
        self.CourseNameLId.sendKeys(courseName);
        return self.FindButton.click();
    }

    self.SearchDraftByCourseName = function (courseName) {
        self.CourseNameLId.sendKeys(courseName);
        return self.DraftButton.click();
    }

    self.SearchAllByCourseName = function (courseName) {
        self.CourseNameLId.sendKeys(courseName);
        return self.AllButton.click();
    }

    self.SearchSupersededByCourseName = function (courseName) {
        self.CourseNameLId.sendKeys(courseName);
        return self.SupersededButton.click();
    }

    //-------------

    self.GetColumn = function (columnName) {
        return element.all(by.repeater('b in search.CourseTemplateList').column("b." + columnName));
    }
    self.GetCourseLink = function (index) {
        return element.all(by.repeater('b in search.CourseTemplateList')).get(index).element(by.tagName('a'));
    }
    self.GetColumnTextValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            return item.getText().then(function (text) { return text.toLowerCase(); });
        });
    }

}

module.exports = CourseTemplateSearchPage;