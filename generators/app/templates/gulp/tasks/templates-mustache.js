'use strict';

const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const mustache    = require('gulp-mustache');
const prettify    = require('gulp-prettify');
const gulpif      = require('gulp-if');
const runSequence = require('run-sequence');
const config      = require('../config');

/**
 * @constant
 * @type {Array<String>}
 */
const mustachePaths = config.development
  ? ['src/template/pages/*.mustache', './www/']
  : ['src/template/**/*.mustache', './www/template'];

/**
 * Default HTML task.
 * Compile '.mustache' files to './www/static/template/'.
 */
gulp.task('template-compile', () => compileHtml(...mustachePaths));

/**y
 * Watcher HTML task.
 * Watch for changes in '.mustache' files and compile them.
 */
gulp.task('template-watch', () => {
  gulp.watch('src/template/**/*.mustache', () => runSequence('template-compile', 'json-compile'));
});

/**
 * Default HTML compilation function.
 * '.mustache' --> '.html'
 *
 * @param {String} src
 * @param {String} dest
 */
const compileHtml = (src, dest) => {
  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(gulpif(config.development, mustache('./www/static/data/combined.json', { extension: '.html' }, {})))
    .pipe(prettify())
    .pipe(gulp.dest(dest));
};

/** Compile on first run (development) */
if (config.development) compileHtml(...mustachePaths);

