
var AgencySearchPage = function () {
    var self = this;
    self.Name = element(by.model('search.searchParams.Name'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.CreateButton = element(by.buttonText('Create'));
    self.SearchResults = {
        Name: {
            Header: element(by.id('nameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("Name"); }
        },
        Id: {
            Header: element(by.id('agencyIdColumnHeader')),
            GetCells: function () { return self.GetColumn('Id'); },
            GetValues: function () { return self.GetColumnTextValues("Id"); }
        },
        Suburb: {
            Header: element(by.id('suburbColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Suburb'); }
        },
        Active: {
            Header: element(by.id('activeColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('Active'); }
        }
    };

    self.SearchByName = function (name) {
        self.Name.sendKeys(name);
        return self.FindButton.click();
    };

    self.GetAgencyNames = function () {
        return element.all(by.repeater('a in search.AgencyList').column('a.Name'));
    }
    self.GetAgencyLink = function (index) {
        return element.all(by.repeater('a in search.AgencyList')).get(index).element(by.tagName('a'));
    }
    self.GetColumnTextValues = function (columnName) {
        var deferred = protractor.promise.defer();

        var values = [];
        self.GetColumn(columnName).each(function (agency) {
                agency.getText().then(function (actual) {
                    values.push(actual.toUpperCase());
                });
            }
        ).then(function () {
            deferred.resolve(values);
        });

        return deferred.promise;
    }
    self.GetColumn = function (columnName) {
        return element.all(by.repeater('a in search.AgencyList').column("a." + columnName));
    }
}

module.exports = AgencySearchPage;