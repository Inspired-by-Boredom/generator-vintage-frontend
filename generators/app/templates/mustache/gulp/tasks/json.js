'use strict';

const gulp           = require('gulp');
const merge          = require('gulp-merge-json');
const plumber        = require('gulp-plumber');
const runSequence    = require('run-sequence');
const config         = require('../config');

/**
 * Default HTML task. (production)
 * Compile '.json' files to 'www/static/data/'.
 */
gulp.task('json-compile', () => copyJSON('src/template/data/**/*.json', './www/static/data/'));

/**
 * Default HTML task. (dev)
 * Compile '.json' files to 'www/static/data/'.
 */
gulp.task('json-dev', () => compileJSON('src/template/data/**/*.json', './www/static/data/'));


/**
 * Watcher HTML task.
 * Watch for changes in '.json' files and compile them.
 */
gulp.task('json-watch', () => {
  gulp.watch('src/template/data/**/*.json', () => runSequence('json-dev', 'mustache-dev'));
});

const compileJSON = (src, dest) => {
  return gulp.src([src])
    .pipe(plumber())
    .pipe(merge())
    .pipe(gulp.dest(dest));
}

const copyJSON = (src, dest) => {
  return gulp.src([src])
    .pipe(plumber())
    .pipe(gulp.dest(dest));
}

/** Compile on first run (development) */
if (config.development) {compileJSON('src/template/data/**/*.json', './www/static/data/')};



