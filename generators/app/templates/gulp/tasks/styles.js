'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const gulpif       = require('gulp-if');
const autoprefixer = require('autoprefixer');
const mqpacker     = require('css-mqpacker');
const config       = require('../config');

/**
 * Default CSS task.
 * Compile css-preprocessor files to '.css'.
 */
gulp.task('css-compile', () => {
  compileCss(`src/styles/index.${config.cssPreprocessorExtension}`, './www/static/css/');
});

/**
 * Watcher CSS task.
 * Watch for changes in css-preprocessor files and compile them.
 */
gulp.task('css-watch', () => {
  gulp.watch(`src/styles/**/*.${config.cssPreprocessorExtension}`, ['css-compile']);
});

/**
 * Set plugins for 'gulp-postcss'.
 *
 * @type {Array}
 */
const processors = [
  autoprefixer({
    browsers: config.browsers,
    cascade: false
  }),
  mqpacker({
    sort: sortMediaQueries
  })
];

/**
 * Default CSS compilation function.
 *
 * @param {String} src
 * @param {String} dest
 */
function compileCss(src, dest) {
  gulp
    .src(src)
    .pipe(plumber(config.plumberOptions))
    .pipe(gulpif(config.development, sourcemaps.init()))
    .pipe(sass({
      outputStyle: config.production ? 'compressed' : 'expanded',
      precision: 5
    }))
    .pipe(postcss(processors))
    .pipe(gulpif(config.production, rename({
      suffix: '',
      extname: '.css'
    })))
    .pipe(gulpif(config.development, sourcemaps.write()))
    .pipe(gulp.dest(dest));
}

/**
 * Detect 'max-width' media query.
 *
 * @param {String} mq
 * @return {boolean}
 */
function isMax(mq) {
  return /max-width/.test(mq);
}

/**
 * Detect 'min-width' media query.
 *
 * @param {String} mq
 * @return {boolean}
 */
function isMin(mq) {
  return /min-width/.test(mq);
}

/**
 * Sort media queries (max/min width).
 *
 * @param {String} a
 * @param {String} b
 * @return {Number}
 */
function sortMediaQueries(a, b) {
  const A = a.replace(/\D/g, '');
  const B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}

/** Compile on first run (development) */
if (config.development)
  compileCss(`src/styles/index.${config.cssPreprocessorExtension}`, './www/static/css/');
