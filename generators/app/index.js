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
      `Yeoman modern ${chalk.yellow('vintage-frontend')} generator`
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
        type: 'list',
        name: 'scriptsType',
        message: 'Select scripts language:',
        choices: [{
          name: 'JavaScript (ES7 with some proposals)',
          value: 'js'
        }, {
          name: 'TypeScript',
          value: 'ts'
        }],
        default: 'js'
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
    const scriptsExtension = this.answers.scriptsType;
    const isTS = scriptsExtension === 'ts';
    const props = Object.assign({}, this.answers, {
      _: {
        kebabCase: _.kebabCase,
      },
      ts: isTS,
      scriptsLanguage: scriptsExtension,
    });
    const copy = (input, output = input) =>
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    const template = (input, output = input) =>
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), props);

    // static files
    copy('gitignore', '.gitignore');
    copy('gulpfile.js');
    copy('jsdoc.json');
    copy('rules.jscsrc');
    copy('webpack.config.js');
    if (isTS) copy('tsconfig.json');

    // static files (templates)
    template('vintage-frontend.json_t', 'vintage-frontend.json');
    template('README.md_t', 'README.md');
    template('package.json_t', 'package.json');

    // gulp config
    copy('gulp/config.js');

    // gulp tasks
    copy('gulp/tasks/sprite-svg');
    copy('gulp/tasks/default.js');
    copy('gulp/tasks/docs.js');
    copy('gulp/tasks/livereload.js');
    template('gulp/tasks/scripts.js');
    copy('gulp/tasks/styles.js');
    copy('gulp/tasks/templates.js');

    // copy source directory
    template('src');

    // copy output directory
    template('www');

    // create folders for images, fonts, scripts
    mkdirp.sync(this.destinationPath('www/static/fonts'));
    mkdirp.sync(this.destinationPath('www/static/img'));
    mkdirp.sync(this.destinationPath('www/static/js'));
    mkdirp.sync(this.destinationPath('www/static/css'));
    mkdirp.sync(this.destinationPath(`src/${scriptsExtension}/modules/dep`));
    if (isTS) mkdirp.sync(this.destinationPath('typings'));

    // remove unnecessary
    this.fs.delete(this.destinationPath(`src/${isTS ? 'js' : 'ts'}`));
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
