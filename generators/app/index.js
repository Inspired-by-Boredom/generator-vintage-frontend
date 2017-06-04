'use strict';

const Generator  = require('yeoman-generator');
const chalk      = require('chalk');
const yosay      = require('yosay');
const prompts    = require('./prompts');
const writeFiles = require('./writing');

/*class VintageFrontend extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const done = this.async();

    this.log(yosay(
      `Vintage Web Production ${chalk.red('vintage-frontend')} generator`
    ));

    this.prompt(prompts, function (props) {
      console.log(props);
      this.props = props;
    }.bind(this)).then(done);
  }

  writing() {
    writeFiles.call(this);
  }

  install() {
    console.log('install...');
    if (this.props.install) {
      this.installDependencies();
    } else {
      this.log(`Run ${chalk.blue('npm install / yarn install')} to install dependencies later`);
    }
  }

  end() {
    this.log(chalk.green('Project is generated. Happy coding!'));
  }
}*/

module.exports = generators.Base.extend({
  constructor: function(){
    generators.Base.apply(this, arguments);
  },

  initializing: function(){
  },
  prompting: function(){
    this.log(yosay('Welcome to ' +
      chalk.yellow('Dynamic NG Code generator') + ' !!'));

    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'ngappname',
      message: 'Angular App Name (ng-app)',
      default: 'app'
    },
      {
        type: 'checkbox',
        name: 'jslibs',
        message: 'Which JS libraries would you like to include?',
        choices: [
          {
            name: 'lodash',
            value: 'lodash',
            checked: true
          },
          {
            name: 'Moment.js',
            value: 'momentjs',
            checked: true
          },
          {
            name: 'Angular-UI Utils',
            value: 'angularuiutils',
            checked: true
          }
        ]
      }], function(answers){
      done();
    }.bind(this));

  },
  configuring: function(){
  },
  writing: {
    gulpfile: function(){
      this.copy('gulpfile.js', 'gulpfile.js');
    },

    packageJSON: function(){
      this.copy('package.json', 'package.json');
    },

    git: function(){
      this.copy('gitignore', '.gitignore');
    },

    appStaticFiles: function(){
      this.copy('_favicon.ico', 'src/favicon.ico');
      this.directory('styles', 'src/styles');
    },

    scripts: function(){
      this.fs.copyTpl(
        this.templatePath('app/_app.js'),
        this.destinationPath('src/app/app.js'),
        {
          ngapp: this.ngappname
        }
      );
      this.fs.copyTpl(
        this.templatePath('app/layout/_shell.controller.js'),
        this.destinationPath('src/app/layout/shell.controller.js'),
        {
          ngapp: this.ngappname
        });
      this.fs.copyTpl(
        this.templatePath('app/home/_home.controller.js'),
        this.destinationPath('src/app/home/home.controller.js'),
        {
          ngapp: this.ngappname
        });
      this.fs.copyTpl(
        this.templatePath('app/about/_about.controller.js'),
        this.destinationPath('src/app/about/about.controller.js'),
        {
          ngapp: this.ngappname
        });
    },

    html: function(){
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('src/index.html'),
        {
          appname: _.startCase(this.appname),
          ngapp: this.ngappname
        }
      );
      this.fs.copy(
        this.templatePath('app/layout/_shell.html'),
        this.destinationPath('src/app/layout/shell.html'));
      this.fs.copy(
        this.templatePath('app/home/_home.html'),
        this.destinationPath('src/app/home/home.html'));
      this.fs.copy(
        this.templatePath('app/about/_about.html'),
        this.destinationPath('src/app/about/about.html'));
    }
  },
  conflicts: function(){
  },
  install: function(){
  },
  end: function(){
  }
});