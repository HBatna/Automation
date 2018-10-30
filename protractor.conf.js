exports.config = {
    framework: 'jasmine2',
    seleniumAddress:'http://My.Ip.0.0:PORT/wd/hub',
    capabilities: {
    	'browserName': 'chrome'
    },
    allScriptsTimeout: 240000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 240000
    },
    specs: ['./**/*.spec.js'],
    baseUrl:'http://MyProject/',
    onPrepare: function() {
        beforeAll(function() {
            var customMatchers = require('./customMatchers');
            jasmine.addMatchers(customMatchers);
        });
    }
};