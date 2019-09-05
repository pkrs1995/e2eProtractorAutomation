'use strict';
var gulp = require('gulp');

// The protractor task
var protractor = require('gulp-protractor').protractor;

// Start a standalone server
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;

// Download and update the selenium driver
var webdriverUpdate = require('gulp-protractor').webdriver_update_specific;

// Downloads the selenium webdriver - stupid solution to pass extra args like ignore_ssl
gulp.task('webdriver_update', webdriverUpdate({
	browsers: ['ignore_ssl']
}));

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriverStandalone);

gulp.task('default', ['protractor']);

gulp.task('protractor', ['webdriver_update'], function(cb) {
	gulp.src([])
	.pipe(protractor({
		configFile: 'conf.js'
	})).on('error', function(e) {
		console.log('Functional Tests failed with error',e);
        process.exit(1);
	}).on('end', cb);
});
