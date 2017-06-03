'use strict';

const Generator  = require('yeoman-generator');
const chalk      = require('chalk');
const yosay      = require('yosay');
const prompts    = require('./prompts');
const writeFiles = require('./writing');

module.exports = class extends Generator {
  prompting() {
    const done = this.async();

    this.log(yosay(
      `Vintage Web Production ${chalk.red('vintage-frontend')} generator`
    ));

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  }

  writing() {
    writeFiles.call(this);
  }

  install() {
    if (this.props.install) {
      this.installDependencies();

    } else {
      this.log(`Run ${chalk.blue('npm install / yarn install')} to install dependencies later`);
    }
  }

  end() {
    this.log(chalk.green('Project is generated. Happy coding!'));
  }
};
