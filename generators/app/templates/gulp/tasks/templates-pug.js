'use strict';

const gulp           = require('gulp');
const pug            = require('gulp-pug');
const prettify       = require('gulp-prettify');
const pugIncludeGlob = require('pug-include-glob');
const plumber        = require('gulp-plumber');
const config         = require('../config');

/**
 * Default HTML task.
 * Compile '.pug' files to '.html'.
 */
gulp.task('pug-compile', () => compileHtml('src/template/pages/*.pug', './www/'));

/**
 * Watcher HTML task.
 * Watch for changes in '.pug' files and compile them.
 */
gulp.task('template-watch', () => {
  gulp.watch('src/template/**/*.pug', ['pug-compile']);
});

/**
 * Set default pug options.
 *
 * @constant
 * @type {Object}
 */
const pugOptions = {
  nspaces: 4,
  tabs: true,
  donotencode: true,
  plugins: [ pugIncludeGlob() ],
  data: {
    production: config.production
  }
};

/**
 * Default HTML compilation function.
 *
 * @param {String} src
 * @param {String} dest
 */
function compileHtml(src, dest) {
  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(pug(pugOptions))
    .pipe(prettify())
    .pipe(gulp.dest(dest));
}

/** Compile on first run (development) */
if (config.development) compileHtml('src/template/pages/*.pug', './www/');
