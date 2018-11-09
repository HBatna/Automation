var AddressSearchPage = function() {
    var self = this;
    self.Address = element(by.model('search.searchParams.Address'));
    self.CountryLId = element(by.model('search.searchParams.CountryLId'));
    self.StateLId = element(by.model('search.searchParams.StateLId'));
    self.CommunityLId = element(by.model('search.searchParams.CommunityLId'));
    self.SuburbOrTownLId = element(by.model('search.searchParams.SuburbOrTownLId'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));

    self.SearchResults = {
        FullName: {
            Header: element(by.id('fullNameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues("FullName"); }
        },
        FullAddress: {
            Header: element(by.id('fullAddressColumnHeader')),
            GetCells: function () { return self.GetColumn('FullAddress'); },
            GetValues: function () { return self.GetColumnTextValues("FullAddress"); }
        },
        AddressType: {
            Header: element(by.id('addressTypeColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('AddressType'); }
        },
        Primary: {
            Header: element(by.id('primaryColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('IsPrimary'); }
        }
    };

    self.GetCountryOptions = function() {
        return element.all(by.options('country.Id as country.Description for country in search.CountryList'));
    };

    self.GetSelectedCountry = function() {
        return self.CountryLId.element(by.css('option:checked')).getText();
    };

    self.GetStateOptions = function() {
        return element.all(by.options('state.Id as state.Description for state in search.StateList'));
    };

    self.GetSelectedState = function() {
        return self.StateLId.element(by.css('option:checked')).getText();
    };

    self.GetCommunityOptions = function() {
        return element.all(by.options('community.Id as community.Description for community in search.CommunityList'));
    };

    self.GetSelectedCommunity = function() {
        return self.CommunityLId.element(by.css('option:checked')).getText();
    };

    self.GetSuburbOptions = function() {
        return self.SuburbOrTownLId.all(by.tagName('option'));
    };

    self.GetSelectedSuburb = function() {
        return self.SuburbOrTownLId.element(by.css('option:checked')).getText();
    };

    self.SelectCountry = function (countrybName) {
        return self.CountryLId.sendKeys(countrybName);
    };

    self.SelectState = function (stateName) {
        return self.StateLId.sendKeys(stateName);
    };

    self.SelectSuburb = function (suburbName) {
        return self.SuburbOrTownLId.sendKeys(suburbName);
    };

    self.SelectCommunity = function (communityName) {
        return self.CommunityLId.sendKeys(communityName);
    }

    self.SearchByAddress = function (address) {
        self.Address.sendKeys(address);
        return self.FindButton.click();
    };

    self.SearchByCommunity = function (communityName) {
        self.SelectCommunity(communityName);
        return self.FindButton.click();
    }

    self.SearchBySuburb = function (address, suburbName) {
        var deferred = protractor.promise.defer();

        self.Address.sendKeys(address);

        self.SelectSuburb(suburbName).then(function() {
            self.FindButton.click().then(function() {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByState= function (address, stateName) {
        var deferred = protractor.promise.defer();

        self.Address.sendKeys(address);

        self.SelectState(stateName).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };

    self.SearchByCountry = function (address, countryName) {
        var deferred = protractor.promise.defer();

        self.Address.sendKeys(address);
        self.SelectCountry(countryName).then(function() {
            self.SelectState("-- Select State --").then(function () {
                self.FindButton.click().then(function () {
                    deferred.resolve();
                });
            });
        });

        return deferred.promise;
    };

    self.GetOffenderLink = function(index) {
        return element.all(by.repeater('b in search.AddressList')).get(index).element(by.tagName('a'));
    }

    self.GetColumnTextValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            return item.getText().then(function(text) { return text.toLowerCase(); });
        });
    }

    self.GetColumn = function(columnName) {
        return element.all(by.repeater('b in search.AddressList').column("b." + columnName));
    }

    
}

module.exports = AddressSearchPage;