'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();

/**
 * Start browsersync server and watch for changes.
 */
gulp.task('livereload', () => {
  // Start server
  browserSync.init({
    server: { baseDir: 'www' },
    reloadDebounce: 4,
    logPrefix: 'Vintage',
    notify: false
  });

  // Initialize watcher
  browserSync
    .watch('./www/**/*.*')
    .on('change', browserSync.reload);
});


