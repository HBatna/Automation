var PhoneNumberSearchPage = function () {
    var self = this;
    self.Phone = element(by.model('search.searchParams.Phone'));
    self.CbisId = element(by.model('search.searchParams.CbisId'));
    self.LastName = element(by.model('search.searchParams.LastName'));
    self.FirstName = element(by.model('search.searchParams.FirstName'));
    self.MiddleName = element(by.model('search.searchParams.MiddleName'));
    self.PhoneTypeLId = element(by.model('search.searchParams.PhoneTypeLId'));
    self.FindButton = element(by.buttonText('Find'));
    self.ClearButton = element(by.buttonText('Clear'));
    self.CancelButton = element(by.buttonText('Cancel'));
    self.AllButton = element(by.css('[uib-btn-radio="false"]'));

    self.Notifications = {
        SearchAlert: {
            GetContainerElement: function () { return element(by.css('div[data-notify="container"]')); },
            GetMessageElement: function () { return this.GetContainerElement().element(by.css('span[data-notify="message"]')); }
        }
    };


    self.SearchResults = {
        Rows: element.all(by.repeater('p in search.PhoneList')),
        Name: {
            Header: element(by.id('nameColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('p.FullName'); }
        },
        Phone: {
            Header: element(by.id('phoneColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('p.Phone'); }
        },
        Status: {
            Header: element(by.id('statusColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('p.Status'); }
        },
        Type: {
            Header: element(by.id('phoneTypeColumnHeader')),
            GetValues: function () { return self.GetColumnTextValues('p.PhoneType'); }
        }
    };

    self.GetPhoneTypes = function () {
        return element.all(by.options('phoneType.Id as phoneType.Description for phoneType in search.PhoneTypes'));
    };

    self.GetSelectedPhonetype = function () {
        return self.PhoneTypeLId.element(by.css('option:checked')).getText();
    };
    self.InputCbisId = function (cbisId) {
        return self.CbisId.sendKeys(cbisId);
    };
    self.InputFamilyName = function (familyName) {
        return self.LastName.sendKeys(familyName);
    };
    self.InputMiddleName = function (middleName) {
        return self.MiddleName.sendKeys(middleName);
    };
    self.InputFirstName = function (firstName) {
        return self.FirstName.sendKeys(firstName);
    };
    self.SearchByPhone = function (phone) {
        self.Phone.sendKeys(phone);
        return self.FindButton.click();
    };

    self.SearchWithoutInput = function () {
        self.Phone.sendKeys();
        return self.FindButton.click();
    };
    self.SearchByCbisId = function (phone, cbisId) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputCbisId(cbisId).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchByFamilyName = function (phone, familyName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputFamilyName(familyName).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchByMiddleName = function (phone, middleName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputMiddleName(middleName).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchByFirstName = function (phone, firstName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputFirstName(firstName).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchAllByPhone = function (phone) {
        self.Phone.sendKeys(phone);
        return self.AllButton.click();
    };
    self.SearchAllByCbisid = function (phone, cbisId) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputCbisId(cbisId).then(function () {
            self.AllButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchAllByFamilyName = function (phone, familyName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputFamilyName(familyName).then(function () {
            self.AllButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchAllByMiddleName = function (phone, middleName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputMiddleName(middleName).then(function () {
            self.AllButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchAllByFirstName = function (phone, firstName) {
        var deferred = protractor.promise.defer();
        self.Phone.sendKeys(phone);
        self.InputFirstName(firstName).then(function () {
            self.AllButton.click().then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    self.SearchByPhoneType = function (phone, phoneType) {
        var deferred = protractor.promise.defer();

        self.Phone.sendKeys(phone);

        self.SelectPhoneType(phoneType).then(function () {
            self.FindButton.click().then(function () {
                deferred.resolve();
            });
        });

        return deferred.promise;
    };
    self.SelectPhoneType = function (phoneType) {
        return self.PhoneTypeLId.sendKeys(phoneType);
    };

    self.GetOffenderLink = function (index) {
        return element.all(by.repeater('p in search.PhoneList')).get(index).element(by.tagName('a'));
    };

    self.GetColumnTextValues = function (columnName) {
        return self.GetColumn(columnName).map(function (item) {
            return item.getText().then(function (text) {
                return text.toLowerCase();
            });
        });
    };

    self.GetColumn = function (columnName) {
        return element.all(by.repeater('p in search.PhoneList').column("p." + columnName));

    };

};

module.exports = PhoneNumberSearchPage;