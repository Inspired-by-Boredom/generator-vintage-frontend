'use strict';

const Generator  = require('yeoman-generator');
const chalk      = require('chalk');

class VintageFrontend extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const yosay   = require('yosay');
    const prompts = require('./prompts');

    this.log(yosay(
      `Vintage Web Production ${chalk.yellow('vintage-frontend')} generator`
    ));

    return this
      .prompt(prompts)
      .then(answers => this.props = answers);
  }

  writing() {
    const _      = require('lodash');
    const mkdirp = require('mkdirp');
    const props  = this.props;

    props._ = { kebabCase: _.kebabCase };

    // static files
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('gitignore'));
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copy(this.templatePath('jsdoc.json'), this.destinationPath('jsdoc.json'));
    this.fs.copy(this.templatePath('rules.jscsrc'), this.destinationPath('rules.jscsrc'));
    this.fs.copy(this.templatePath('yarn.lock'), this.destinationPath('yarn.lock'));

    // templates
    this.fs.copyTpl(this.templatePath('README.md'),
      this.destinationPath('README.md'), props);
    this.fs.copyTpl(this.templatePath('package.json'),
      this.destinationPath('package.json'), props);
    this.fs.copyTpl(this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), props);
    if (props.splitting) {
      this.fs.copy(this.templatePath('webpack-chunk-manifest.json'),
        this.destinationPath('www/static/webpack-chunk-manifest.json'));
    }

    // gulp config
    this.fs.copyTpl(this.templatePath('gulp/config.js'),
      this.destinationPath('gulp/config.js'), props);

    // gulp tasks
    this.fs.copy(this.templatePath('gulp/tasks/sprite-svg/_svg.scss'),
      this.destinationPath('gulp/tasks/sprite-svg/_svg.scss'));
    this.fs.copy(this.templatePath('gulp/tasks/sprite-svg/sprite-svg.js'),
      this.destinationPath('gulp/tasks/sprite-svg/sprite-svg.js'));
    this.fs.copyTpl(this.templatePath('gulp/tasks/default.js'),
      this.destinationPath('gulp/tasks/default.js'), props);
    this.fs.copy(this.templatePath('gulp/tasks/docs.js'),
      this.destinationPath('gulp/tasks/docs.js'));
    this.fs.copy(this.templatePath('gulp/tasks/livereload.js'),
      this.destinationPath('gulp/tasks/livereload.js'));
    this.fs.copyTpl(this.templatePath('gulp/tasks/scripts.js'),
      this.destinationPath('gulp/tasks/scripts.js'), props);
    this.fs.copy(this.templatePath('gulp/tasks/styles.js'),
      this.destinationPath('gulp/tasks/styles.js'));
    this.fs.copyTpl(this.templatePath('gulp/tasks/templates.js'),
      this.destinationPath('gulp/tasks/templates.js'), props);

    // copy source directory
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    // copy output directory
    this.fs.copy(this.templatePath('www'), this.destinationPath('www'));
  }

  install() {
    if (this.props.install) {
      this.installDependencies();
    } else {
      this.log(`Run ${chalk.blue('yarn / npm install')} to install dependencies later`);
    }
  }

  end() {
    this.log(chalk.green('\nProject is generated. Happy coding!'));
  }
}

module.exports = VintageFrontend;