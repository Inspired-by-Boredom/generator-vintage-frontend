'use strict';

const Generator = require('yeoman-generator');
const chalk     = require('chalk');
const mkdirp    = require('mkdirp');
const path      = require('path');
const fs        = require('fs');
const yosay     = require('yosay');
const _         = require('lodash');

class VintageFrontend extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    try {
      this.username = process.env.USER || process.env.USERPROFILE.split(path.sep)[2];
    } catch (e) {
      this.username = '';
    }
  }

  prompting() {
    this.log(yosay(
      `Vintage Web Production ${chalk.yellow('vintage-frontend')} generator`
    ));

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'my-app',
        validate: name => {
          if (!/\w+/.test(name)) {
            return 'Project name should only consist of 0~9, a~z, A~Z, _, .';
          }

          if (!fs.existsSync(this.destinationPath(name))) {
            return true;
          }

          if (fs.statSync(this.destinationPath(name)).isDirectory()) {
            return 'Project already exist';
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: ''
      },
      {
        type: 'input',
        name: 'username',
        message: 'Your name:',
        default: this.username
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your email:',
        default: ''
      },
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Your project will include jQuery?',
        default: true
      },
      {
        type: 'confirm',
        name: 'splitting',
        message: 'Enable code splitting?',
        default: false
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies right now?',
        default: true
      }
    ])
      .then(answers => this.props = this.answers = answers);
  }

  configuring() {
    const done = this.async();

    fs.exists(this.destinationPath(this.answers.name), exists => {
      if (exists && fs.statSync(this.destinationPath(this.answers.name)).isDirectory()) {
        this.log.error(`Directory [${this.answers.name}] exists`);
        process.exit(1);
      }
      this.destinationRoot(path.join(this.destinationRoot(), this.answers.name));
      done();
    });
  }

  writing() {
    const props  = this.props;
    const copy = (input, output) =>
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    const template = (input, output) =>
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), props);

    props._ = { kebabCase: _.kebabCase };

    // static files
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copy(this.templatePath('jsdoc.json'), this.destinationPath('jsdoc.json'));
    this.fs.copy(this.templatePath('rules.jscsrc'), this.destinationPath('rules.jscsrc'));
    this.fs.copy(this.templatePath('yarn.lock'), this.destinationPath('yarn.lock'));

    // templates
    this.fs.copyTpl(this.templatePath('README.md'),
      this.destinationPath('README.md'), props);
    this.fs.copyTpl(this.templatePath('package.json_vm'),
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
    this.fs.copy(this.templatePath('gulp/tasks/sprite-svg'),
      this.destinationPath('gulp/tasks/sprite-svg'));
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
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), props);

    // copy output directory
    this.fs.copyTpl(this.templatePath('www'), this.destinationPath('www'), props);

    // create folders for images, fonts, scripts
    mkdirp.sync(this.destinationPath('www/static/fonts'));
    mkdirp.sync(this.destinationPath('www/static/img'));
    mkdirp.sync(this.destinationPath('www/static/js'));

    // remove unnecessary
    if (!props.jquery) {
      this.fs.delete(this.destinationPath('src/js/index.jquery.js'));
    }
  }

  install() {
    if (this.props.install) {
      this.npmInstall();

    } else {
      this.log(`\nRun ${chalk.yellow('yarn / npm install')} to install dependencies later`);
    }
  }

  end() {
    this.log(chalk.green(`\n\nProject '${props.name}' is generated. Happy coding!\n`));
  }
}

module.exports = VintageFrontend;