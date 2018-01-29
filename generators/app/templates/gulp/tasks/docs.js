'use strict';

const gulp  = require('gulp');
const jsdoc = require('gulp-jsdoc3');

/**
 * Generate docs (JSDoc).
 * Based on comments in '.js' files.
 */
gulp.task('JSDocs', function (cb) {
  gulp
    .src(['read.md_vm', './src/js/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});