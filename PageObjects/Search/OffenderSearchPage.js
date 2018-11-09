var OffenderSearchPage = function () {
    var self = this;

    self.Notifications = {
        SearchAlert: {
            GetContainerElement: function () { return element(by.css('div[data-notify="container"]')); },
            GetMessageElement: function () { return this.GetContainerElement().element(by.css('span[data-notify="message"]')); }
        }
    };
    self.TextBoxes = {
        CbisId: element(by.id('inpCbisId')),
        TomsId: element(by.id('inpTomsId')),
        IcmsId: element(by.id('inpIcmsId')),
        WapsSid: element(by.id('inpWapsSid')),
        FerCaseNo: element(by.id('inpFerCaseNo')),
        LastName: element(by.id('inpLastName')),
        FirstName: element(by.id('inpFirstName')),
        OtherName: element(by.id('inpOtherName'))
    };
    self.Buttons = {
        Find: element(by.buttonText('Find')),
        Clear: element(by.buttonText('Clear')),
        Cancel: element(by.buttonText('Cancel')),
        Create: element(by.buttonText('Create')),
        PreviousPage: element(by.buttonText('<< Previous')),
        NextPage: element(by.buttonText('Next >>'))
    };
    self.Labels = {
        ResultCount: element(by.css('label[ng-hide="search.isResultsEmpty()"]')),
        NoResults: element(by.css('tr[ng-show="search.hasSearched && !search.isSearching && search.isResultsEmpty()"]')).element(by.css('label'))
    };
    self.SearchResults = {
        Rows: element.all(by.repeater('o in search.results')),
        Name: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'FullName\')"]')),
            GetColumns: function () { return self.GetColumnElements('search.formatOffenderName(o)') },
            GetValues: function () { return self.GetColumnTextValues('search.formatOffenderName(o)'); }
        },
        Dob: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'DOB\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.DOB'); }
        },
        Alias: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'IsAlias\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.IsAlias'); }
        },
        CbisId: {            
            Header: element(by.css('th[ng-click="search.changeOrder(\'PIN\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.PIN'); }
        },
        TomsId: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'TOMSId\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.TOMSId'); }
        },
        Deceased: {
            GetElements: function () { return element.all(by.repeater('o in search.results')).all(by.css('span[ng-show="o.Deceased"]')); }
        },
        Gender: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'Gender\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.Gender'); }
        },
        Active: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'Active\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.Active'); }
        },
        CaseManager: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'CaseManager\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.CaseManager'); }
        },
        Branch: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'BranchName\')"]')),
            GetValues: function () { return self.GetColumnTextValues('o.BranchName'); }
        }
    };
    self.GetColumnElements = function (columnName) {
        return element.all(by.repeater('o in search.results').column(columnName));
    };
    self.GetColumnTextValues = function (columnName) {
        var values = self.GetColumnElements(columnName).map(function (elem) {
            return elem.getText().then(function (text) {
                return text;
            });
        });
        return values;
    };
}

module.exports = OffenderSearchPage;