'use strict';

const gulp           = require('gulp');
const pug            = require('gulp-pug');
const prettify       = require('gulp-prettify');
const pugIncludeGlob = require('pug-include-glob');
const plumber        = require('gulp-plumber');
const gulpif         = require('gulp-if');<% if (splitting) { %>
const fs             = require('fs');<% } %>
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
gulp.task('pug-watch', () => {
  gulp.watch('src/template/**/*.pug', ['pug-compile']);
});<% if (splitting) { %>
/**
 * Watch for changes in webpack-chunk-manifest file.
 * Re-compile HTML on change.
 */
gulp.task('chunk-watch', () => {
  gulp.watch('./www/static/webpack-chunk-manifest.json', ['pug-compile']);
});
<% } %>

/**
 * Set default pug options.
 *
 * @constant
 * @type {Object}
 */
const pugOptions = {
  pretty: config.production,
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
function compileHtml(src, dest) {<% if (splitting) { %>
  pugOptions.data.webpackManifest =
    JSON.parse(fs.readFileSync(config.chunkManifestPath, 'utf8'));<% } %>

  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(pug(pugOptions))
    .pipe(gulpif(config.production, prettify()))
    .pipe(gulp.dest(dest));
}