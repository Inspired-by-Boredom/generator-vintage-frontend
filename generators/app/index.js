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
        name    : 'templateList',
        message : 'Which template engine will your project use?',
        default : 'pug',
        choices: [{
            name: "pug",
            value: "pug",
            checked: true
          },
          {
            name: "mustache",
            value: "mustache"
        }]
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
    const props  = this.answers;
    const copy = (input, output = input) =>
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    const template = (input, output = input) =>
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), props);

    props._ = { kebabCase: _.kebabCase };

    // gulp template tasks
    const choosedTemplate = props.templateList;
    this.log('template is will be: ' + props.templateList);
 
    // pug config template
    const pugTemplate = () => {
      // static files
      copy('pug/gitignore', '.gitignore');
      copy('pug/gulpfile.js', 'gulpfile.js');
      copy('pug/jsdoc.json', 'jsdoc.json');
      copy('pug/rules.jscsrc', 'rules.jscsrc');
      copy('pug/vintage-frontend.json', 'vintage-frontend.json');

      // static files (templates)
      template('pug/README.md_t', 'README.md');
      template('pug/package.json_t', 'package.json');
      template('pug/webpack.config.js_t', 'webpack.config.js');

      // gulp config
      template('pug/gulp/config.js', 'gulp/config.js');

      // gulp tasks
      copy('pug/gulp/tasks/sprite-svg',       'gulp/tasks/sprite-svg');
      template('pug/gulp/tasks/default.js',   'gulp/tasks/default.js');
      copy('pug/gulp/tasks/docs.js',          'gulp/tasks/docs.js');
      copy('pug/gulp/tasks/livereload.js',    'gulp/tasks/livereload.js');
      template('pug/gulp/tasks/scripts.js',   'gulp/tasks/scripts.js');
      copy('pug/gulp/tasks/styles.js',        'gulp/tasks/styles.js');
      template('pug/gulp/tasks/templates.js', 'gulp/tasks/templates.js');

      // copy source directory
      template('pug/src', 'src');

      // copy output directory
      template('pug/www', 'www');

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
    }

    // mustache config template
    const mustacheTemplate = () => {
      // static files
      copy('mustache/gitignore', '.gitignore');
      copy('mustache/gulpfile.js', 'gulpfile.js');
      copy('mustache/jsdoc.json', 'jsdoc.json');
      copy('mustache/rules.jscsrc', 'rules.jscsrc');
      copy('mustache/vintage-frontend.json', 'vintage-frontend.json');

      // static files (templates)
      template('mustache/README.md_t', 'README.md');
      template('mustache/package.json_t', 'package.json');
      template('mustache/webpack.config.js_t', 'webpack.config.js');

      // gulp config
      template('mustache/gulp/config.js', 'gulp/config.js');

      // gulp tasks
      copy('mustache/gulp/tasks/sprite-svg',       'gulp/tasks/sprite-svg');
      template('mustache/gulp/tasks/default.js',   'gulp/tasks/default.js');
      copy('mustache/gulp/tasks/docs.js',          'gulp/tasks/docs.js');
      copy('mustache/gulp/tasks/livereload.js',    'gulp/tasks/livereload.js');
      template('mustache/gulp/tasks/scripts.js',   'gulp/tasks/scripts.js');
      copy('mustache/gulp/tasks/styles.js',        'gulp/tasks/styles.js');
      template('mustache/gulp/tasks/mustache.js',  'gulp/tasks/templates.js');
      template('mustache/gulp/tasks/json.js',      'gulp/tasks/json.js');
      // copy source directory
      template('mustache/src', 'src');

      // copy output directory
      template('mustache/www', 'www');

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
    }

    // run config according to template 
    if(choosedTemplate === 'pug') {
      pugTemplate();
    }
    else {
      mustacheTemplate();
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
