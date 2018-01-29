'use strict';

const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const mustache       = require('gulp-mustache');
const prettify       = require('gulp-prettify');
const runSequence    = require('run-sequence');
const config         = require('../config');

/**
 * Default HTML task. (production)
 * Compile '.mustache' files to './www/static/template/'.
 */
gulp.task('mustache-compile', () => compileProd('src/template/**/*.mustache', './www/static/template'));

/**
 * Default HTML task. (dev)
 * Compile '.mustache' files to './www/static/template/'.
 */
gulp.task('mustache-dev', () => compileHtml('src/template/pages/*.mustache', './www/'));

/**y
 * Watcher HTML task.
 * Watch for changes in '.mustache' files and compile them.
 */
gulp.task('mustache-watch', () => {
  gulp.watch('src/template/**/*.mustache', () => runSequence('mustache-dev', 'json-dev'));
});


/**
 * Default HTML compilation function.
 * '.mustache' --> '.html'
 * @param {String} src
 * @param {String} dest
 */
const compileHtml = (src, dest) => {
  return gulp.src([src])
  .pipe(plumber())
  .pipe(mustache('./www/static/data/combined.json', {extension: '.html'}, {}))
  .pipe(prettify())
  .pipe(gulp.dest(dest));
}

/**
 * Default HTML compilation function.
 * '.mustache' --> '.html'
 * @param {String} src
 * @param {String} dest
 */
const compileProd = (src, dest) => {
  return gulp.src([src])
  .pipe(plumber())
  .pipe(prettify())
  .pipe(gulp.dest(dest));
}

/** Compile on first run (development) */
if (config.development) compileHtml('src/template/pages/*.mustache', './www/');

