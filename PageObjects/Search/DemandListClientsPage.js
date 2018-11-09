var DemandListClientsPage = function () {
    var self = this;
    self.Buttons = {
        Launch: element(by.buttonText('Launch')),
        Cancel: element(by.buttonText('Cancel'))
    };
    self.TableResults = {
        Rows: element.all(by.repeater('o in search.results')),
        CbisId: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'OffenderPin\')"')),
            GetColumns: function () { return self.GetColumnElements('o.OffenderPin') },
            GetValues: function () { return self.GetColumnTextValues('o.OffenderPin'); }
        },
        Name: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'ClientName\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.ClientName'); }
        },
        Reason: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'Reason\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.Reason'); }
        },
        AH: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'AfterHours\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.AfterHours'); }
        },
        Gender: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'Gender\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.Gender'); }
        },
        Aboriginality: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'Ethnicity\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.Ethnicity'); }
        },
        SupervisionLevel: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'SupervisionLevel\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.SupervisionLevel'); }
        },
        ARA: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'ARA\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.ARA'); }
        },
        CaseManager: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'CaseManager\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.CaseManager'); }
        },
        ReportingLocation: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'ReportingLocation\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.ReportingLocation'); }
        },
        ReturnCount: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'ReturnCount\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.ReturnCount'); }
        },
        OrderType: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'OrderType\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.OrderType'); }
        },
        MinStartDate: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'MinStartDate\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.MinStartDate'); }
        },
        MaxEndDate: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'MaxEndDate\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.MaxEndDate'); }
        },
        NeedDate: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'NeedDate\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.NeedDate'); }
        },
        OtherDemandList: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'OtherDemandList\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.OtherDemandList'); }
        },
        EnteredBy: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'EnteredBy\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.EnteredBy'); }
        },
        LastReturnedBy: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'LastReturnedBy\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.LastReturnedBy'); }
        },
        LastReturnedDate: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'LastReturnedDate\')"')),
            GetValues: function () { return self.GetColumnTextValues('o.LastReturnedDate'); }
        }
        ,
        LinkedOrders: {
            Header: element(by.css('th[ng-click="search.changeOrder(\'LinkedOrders\')"')),
            GetColumns: function () { return self.GetColumnElements('o.LinkedOrders') },
            GetValues: function () { return self.GetColumnTextValues('o.LinkedOrders'); }
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

module.exports = DemandListClientsPage;