exports.config = {
    framework: 'jasmine2',
    seleniumAddress:'http://myProjectSuits:8088/wd/hub',
    capabilities: {
    	'browserName': 'chrome'
    },
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },
    baseUrl:'http://MyProject/',
    specs: ['./**/*.spec.js'],
    onPrepare: function () {
        var jasmineReporters = require('../protractor/node_modules/jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());

        beforeAll(function () {
            var customMatchers = require('./customMatchers');
            jasmine.addMatchers(customMatchers);
        });
    }
};