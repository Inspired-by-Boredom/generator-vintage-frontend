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
    const props  = this.answers;
    const copy = (input, output = input) =>
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    const template = (input, output = input) =>
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), props);

    props._ = { kebabCase: _.kebabCase };

    // static files
    copy('gitignore', '.gitignore');
    copy('gulpfile.js');
    copy('jsdoc.json');
    copy('rules.jscsrc');
    copy('yarn.lock');
    copy('vintage-frontend.json');

    // static files (templates)
    template('read.md_vm', 'README.md');
    template('package.json', 'package.json');
    template('webpack.config.js');
    if (props.splitting) {
      copy('webpack-chunk-manifest.json', 'www/static/webpack-chunk-manifest.json');
    }

    // gulp config
    template('gulp/config.js');

    // gulp tasks
    copy('gulp/tasks/sprite-svg');
    template('gulp/tasks/default.js');
    copy('gulp/tasks/docs.js');
    copy('gulp/tasks/livereload.js');
    template('gulp/tasks/scripts.js');
    copy('gulp/tasks/styles.js');
    template('gulp/tasks/templates.js');

    // copy source directory
    template('src');

    // copy output directory
    template('www');

    // create folders for images, fonts, scripts
    mkdirp.sync(this.destinationPath('www/static/fonts'));
    mkdirp.sync(this.destinationPath('www/static/img'));
    mkdirp.sync(this.destinationPath('www/static/js'));
    mkdirp.sync(this.destinationPath('www/static/css'));
    mkdirp.sync(this.destinationPath('src/js/modules/dep'));

    // remove unnecessary
    if (!props.jquery) {
      this.fs.delete(this.destinationPath('src/js/index.jquery.js'));
    }
    if (!props.splitting) {
      this.fs.delete(this.destinationPath('src/js/components/chunkExample.js'));
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
