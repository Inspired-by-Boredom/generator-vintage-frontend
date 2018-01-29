'use strict';

const gulp        = require('gulp');
const merge       = require('gulp-merge-json');
const plumber     = require('gulp-plumber');
const gulpif      = require('gulp-if');
const runSequence = require('run-sequence');
const config      = require('../config');

/**
 * Default task for compiling and merging JSON data.
 * Compile '.json' files to 'www/static/data/'.
 */
gulp.task('json-compile', () => compileJSON('src/template/data/**/*.json', './www/static/data/'));

/**
 * Watcher JSON task.
 * Watch for changes in '.json' files and compile them.
 */
gulp.task('json-watch', () => {
  gulp.watch('src/template/data/**/*.json', () => runSequence('json-compile', 'template-compile'));
});

/**
 * Default JSON merge and copy function.
 *
 * @param {String} src
 * @param {String} dest
 */
const compileJSON = (src, dest) => {
  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(gulpif(config.development, merge()))
    .pipe(gulp.dest(dest));
};

/** Compile on first run (development) */
if (config.development) compileJSON('src/template/data/**/*.json', './www/static/data/');
