'use strict';

const _      = require('lodash');
const mkdirp = require('mkdirp');

module.exports = function () {
  const props = this.props;

  props._ = { kebabCase: _.kebabCase };

  // common files
  this.copy('gitignore', '.gitignore');
  this.copy('gulpfile.js');
  this.copy('jsdoc.js');
  this.copy('rules.jscsrc');
  this.copy('yarn.lock');
  this.template('README.md', props);
  this.template('package.json', props);
  this.template('webpack.config.js', props);

  if (props.splitting) {
    this.copy('webpack-chunk-manifest.json', 'www/static/webpack-chunk-manifest.json');
  }

  // gulp configs
  this.copy('gulp/config.js', props);

  // gulp tasks
  this.bulkDirectory('gulp/tasks/sprite-svg', 'gulp/tasks/sprite-svg');
  this.template('gulp/tasks/default.js', props);
  this.copy('gulp/tasks/docs.js');
  this.copy('gulp/tasks/livereload.js');
  this.template('gulp/tasks/scripts.js', props);
  this.copy('gulp/tasks/styles.js');
  this.template('gulp/tasks/templates.js', props);

  // copy directories
  this.directory('www/', 'www/');

  // copy directories
  this.directory('src/', 'src/');
};