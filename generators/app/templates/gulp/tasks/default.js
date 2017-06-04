'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');
const config      = require('../config');

/**
 * Tasks which being run only during development.
 */
if (config.development) {
  // Start livereload (browsersync) server.
  config.tasksArray.push('livereload');<% if (splitting) { %>
  // Update html when webpack-chunk-manifest changes.
  config.tasksArray.push('chunk-watch');<% } %>
}

/**
 * Default (main) task.
 * Contains all project's tasks.
 */
gulp.task('default', () => {
  config.production ? runSequence(...config.tasksArray) : runSequence(config.tasksArray)
});