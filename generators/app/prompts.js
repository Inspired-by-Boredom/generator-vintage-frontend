'use strict';

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name:',
    default: 'my-app',
    validate: name => {
      if (!/\w+/.test(name)) {
        return 'Project name should only consist of 0~9, a~z, A~Z, _, .';
      }

      const fs = require('fs');
      if (!fs.existsSync(this.destinationPath(name))) {
        return true;
      }
      if (require('fs').statSync(this.destinationPath(name)).isDirectory()) {
        return 'Project already exist';
      }

      return true;
    }
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
    default: false
  }
];
