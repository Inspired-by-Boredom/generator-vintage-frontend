'use strict';

const gulp        = require('gulp');
const consolidate = require('gulp-consolidate');
const cheerio     = require('gulp-cheerio');
const plumber     = require('gulp-plumber');
const svgmin      = require('gulp-svgmin');
const svgStore    = require('gulp-svgstore');
const rename      = require('gulp-rename');
const through2    = require('through2');
const runSequence = require('run-sequence');
const config      = require('../../config');

/**
 * Default SVG task.
 * Generate svg-sprite based on files in the 'src/svg' folder.
 */
gulp.task('svg-compile', function() {
  return gulp
    .src('src/svg/*.svg')
    .pipe(plumber(config.plumberOptions))
    .pipe(svgmin({
      plugins: [{
        removeDesc: true
      }, {
        cleanupIDs: true
      }, {
        mergePaths: false
      }]
    }))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(through2.obj(function(file, encoding, cb) {
      const $ = file.cheerio;
      const data = $('svg > symbol').map(function() {
        const $this  = $(this);
        const size   = $this.attr('viewBox').split(' ').splice(2);
        const name   = $this.attr('id');
        const ratio  = size[0] / size[1]; // symbol width / symbol height
        const fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
        const stroke = $this.find('[stroke]').attr('stroke');

          return {
            name,
            ratio: +ratio.toFixed(2),
            stroke: stroke || 'initial',
            fill: fill || 'currentColor'
          };
      }).get();

      this.push(file);

      gulp
        .src(__dirname + `/_svg.scss`)
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(gulp.dest('src/styles/partials'));

      gulp
        .src(__dirname + '/svg')
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(gulp.dest('src/template/partials/svg'));

      cb();
    }))
    .pipe(cheerio({
      run: function($) {
        $('[fill]:not([fill="currentColor"])').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename({ basename: '_sprite' }))
    .pipe(gulp.dest('src/template/partials'));
});

/**
 * Watcher SVG task.
 * Watch for changes in '.svg' files of the 'src/svg' folder.
 * Compile SVG and HTML on change.
 */
gulp.task('svg-watch', function() {
  gulp.watch('src/svg/*.svg', () => runSequence('svg-compile', 'template-compile'));
});
