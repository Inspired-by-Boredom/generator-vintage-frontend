'use strict';

const Generator  = require('yeoman-generator');
const chalk      = require('chalk');
const yosay      = require('yosay');
const prompts    = require('./prompts');
const writeFiles = require('./writing');

class VintageFrontend extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const done = this.async();

    this.log(yosay(
      `Vintage Web Production ${chalk.yellow('vintage-frontend')} generator`
    ));

    this.prompt(prompts, function (props) {
      console.log(props);
      this.props = props;
    }.bind(this)).then(done);
  }

  writing() {
    console.log('writing...');
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
}

module.exports = VintageFrontend;
