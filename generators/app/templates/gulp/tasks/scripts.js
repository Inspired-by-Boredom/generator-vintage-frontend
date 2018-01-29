'use strict';

const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const Webpack        = require('webpack');
const webpackStream  = require('webpack-stream');
const config         = require('../config');
const webpackConfig  = config.webpackConfig;

/**
 * Only during development.
 */
if (config.development) {
  // Set watcher ('.js' files)
  webpackConfig.watch = true;
  webpackConfig.watchOptions = { aggregateTimeout: 100 };

  // Generate sourcemaps
  webpackConfig.devtool = 'source-map';
}

/**
 * Only on production.
 */
if (config.production) {
  // create '.min' files
  webpackConfig.plugins.push(
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { unsafe: true }
    })
  );
  webpackConfig.output.filename = '[name].min.js';
}

/**
 * Run webpack.
 */
gulp.task('webpack', () => {
  return gulp.src('src/js/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, Webpack))
    .pipe(gulp.dest('www/static'));
});
