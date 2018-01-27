'use strict';

const notify = require('gulp-notify');

/**
 * Autoprefixer options (CSS).
 * Used when compiling CSS.
 *
 * @constant
 * @type {Array}
 */
const browsers = ['last 3 versions', 'Android 4.4', 'ie 11', 'ios 8'];

/**
 * Set css-preprocessor files extension.
 *
 * @constant
 * @type {String}
 */
const cssPreprocessorExtension = '{scss,sass}';

/**
 * Webpack configuration.
 * Used when compiling javascript.
 *
 * @constant
 * @type {Object}
 */
const webpackConfig = require('../webpack.config.js');

/**
 * Configure error handling with 'gulp-notify'.
 * Used for error handling during compilation.
 *
 * @constant
 * @type {Object}
 */
const plumberOptions = {
  errorHandler: notify.onError(error => `Error: ${error.message}`)
};

/**
 * Set environment.
 * If environment wasn't set, set it to 'development'.
 *
 * @constant
 * @type {String}
 */
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Variables used for development/production bundles.
 * Depending on the 'NODE_ENV' variable.
 *
 * @constant
 * @type {Object}
 */
const bundle = {
  development : NODE_ENV == 'development',
  production  : NODE_ENV == 'production'
};

/**
 * Configure tasks.
 * Depending on the 'bundle' variable.
 *
 * @constant
 * @type {Object}
 */
const tasks = {
  js   : 'webpack',
  html : bundle.production ? 'pug-compile' : 'pug-watch',
  css  : bundle.production ? 'css-compile' : 'css-watch',
  svg  : bundle.production ? 'svg-compile' : 'svg-watch'
};

/**
 * Export configuration.
 */
module.exports = {
  cssPreprocessorExtension,
  webpackConfig,
  browsers,
  plumberOptions,

  development: bundle.development,
  production: bundle.production,

  tasksArray: [tasks.svg, tasks.js, tasks.css, tasks.html]
};