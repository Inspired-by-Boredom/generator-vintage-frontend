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
        type    : 'list',
        name    : 'templateEngine',
        message : 'Which template engine do you prefer?',
        default : 'pug',
        choices: [
          {
            name: 'pug',
            value: 'pug',
            checked: true
          },
          {
            name: 'mustache',
            value: 'mustache'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Your project will include jQuery?',
        default: true
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies right now?',
        default: true
      }
    ])
      .then(answers => this.answers = answers);
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
    const props = {
      ...this.answers,
      _: { kebabCase: _.kebabCase },
      isPug: this.answers.templateEngine === 'pug'
    };
    const copy = (input, output = input) =>
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    const template = (input, output = input) =>
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), props);

    // static files
    copy('gitignore',    '.gitignore');
    copy('gulpfile.js',  'gulpfile.js');
    copy('jsdoc.json',   'jsdoc.json');
    copy('rules.jscsrc', 'rules.jscsrc');

    // static files (templates)
    template('README.md_t',             'README.md');
    template('package.json_t',          'package.json');
    template('webpack.config.js_t',     'webpack.config.js');
    template('vintage-frontend.json_t', 'vintage-frontend.json');

    // gulp config
    template('gulp/config.js', 'gulp/config.js');

    // gulp tasks
    copy('gulp/tasks/sprite-svg',    'gulp/tasks/sprite-svg');
    copy('gulp/tasks/default.js',    'gulp/tasks/default.js');
    copy('gulp/tasks/docs.js',       'gulp/tasks/docs.js');
    copy('gulp/tasks/json.js',       'gulp/tasks/json.js');
    copy('gulp/tasks/livereload.js', 'gulp/tasks/livereload.js');
    copy('gulp/tasks/scripts.js',    'gulp/tasks/scripts.js');
    copy('gulp/tasks/styles.js',     'gulp/tasks/styles.js');
    copy(
      `gulp/tasks/templates-${props.templateEngine}.js`,
      `gulp/tasks/templates-${props.templateEngine}.js`
    );

    // copy source directory
    template('src', 'src');

    // copy output directory
    template('www', 'www');

    // create folders for images, fonts, scripts
    mkdirp.sync(this.destinationPath('www/static/fonts'));
    mkdirp.sync(this.destinationPath('www/static/img'));
    mkdirp.sync(this.destinationPath('www/static/js'));
    mkdirp.sync(this.destinationPath('www/static/css'));
    mkdirp.sync(this.destinationPath('src/js/modules/dep'));

    // Template engine
    try {
      template(`src/template/${props.templateEngine}`, 'src/template');
      this.fs.delete(this.destinationPath('src/template/pug'));
      this.fs.delete(this.destinationPath('src/template/mustache'));
    } catch (e) {
      console.error(`Error while creating template directories: ${e.message}`)
    }

    // optional actions
    if (!props.jquery) {
      this.fs.delete(this.destinationPath('src/js/index.jquery.js'));
    }

    if (props.isPug) {
      this.fs.delete(this.destinationPath('gulp/tasks/json.js'));
    }

    if (!props.isPug) {
      mkdirp.sync(this.destinationPath('www/static/data'));
      this.fs.writeJSON(this.destinationPath('www/static/data/combined.json'), {});
    }
  }

  install() {
    if (this.answers.install) {
      this.npmInstall();

    } else {
      this.log(`\nRun ${chalk.yellow('yarn / npm install')} to install dependencies later`);
    }
  }

  end() {
    this.log(chalk.green(`\n\nProject '${this.answers.name}' generated. Happy coding!\n`));
  }
}

module.exports = VintageFrontend;
