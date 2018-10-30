var ascIntSort = function(a, b) {
    return a - b;
};
var dscIntSort = function (a, b) {
    return b - a;
};
var ascDateSort = function (a, b) {
    if (isNaN(Date.parse(a)))
        return -1;
    if (isNaN(Date.parse(b)))
        return 1;
    return Date.parse(a) - Date.parse(b);
};
var dscDateSort = function (a, b) {
    if (isNaN(Date.parse(b)))
        return -1;
    if (isNaN(Date.parse(a)))
        return 1;
    return Date.parse(b) - Date.parse(a);
};
var customMatchers = {
    toBeSorted: function (util) {
        return {
            compare: function (actual,comparer) {
                var expected = actual.slice().sort(comparer);
                return {
                    pass: util.equals(actual, expected)
                }
            }
        };
    },
    toBeReverseSorted: function (util) {
        return {
            compare: function (actual) {
                var expected = actual.slice().sort().reverse();
                return {
                    pass: util.equals(actual, expected)
                }
            }
        };
    },
    toBeSortedInt: function (util) {
        return {
            compare: function (actual) {
                var expected = actual.slice().sort(ascIntSort);
                return {
                    pass: util.equals(actual, expected)
                }
            }
        };
    },
    toBeReverseSortedInt: function (util) {
        return {
            compare: function (actual) {
                var expected = actual.slice().sort(ascIntSort).reverse(dscIntSort);
                return {
                    pass: util.equals(actual, expected)
                }
            }
        };
    },
    toBeSortedDate: function (util) {
        return {
            compare: function (actual) {
                var expected = actual.slice().sort(ascDateSort);
                return {
                    pass: util.equals(actual, expected)
                };
            }
        };
    },
    toBeReverseSortedDate: function (util) {
        return {
            compare: function (actual) {
                var expected = actual.slice().sort(ascDateSort).reverse(dscDateSort);
                return {
                    pass: util.equals(actual, expected)
                };
            }
        };
    }
};
module.exports = customMatchers;