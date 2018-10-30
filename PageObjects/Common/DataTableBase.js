var DataTableBase = function (repeaterModel) {
    var self = this;

    self.GetRow = function (columnText) {
        var deferred = protractor.promise.defer();
        var rows = element.all(by.repeater(repeaterModel));
        var matchingRowIndex = -1;

        rows.each(function (row, index) {
            row.all(by.tagName("td")).map(function (cell) {
                return cell.getText();
            }).then(function (loopColumnText) {
                if (JSON.stringify(loopColumnText) === JSON.stringify(columnText)) {
                    matchingRowIndex = index;
                    throw new Error("row matched");
                }
            });
        }).then(function () {
            deferred.resolve(matchingRowIndex);
        }, function (error) {
            if (error.message === "row matched")
                deferred.resolve(matchingRowIndex);
            else
                deferred.reject(error);
        });
        return deferred.promise;
    };
};
module.exports = DataTableBase;