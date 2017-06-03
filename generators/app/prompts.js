'use strict';

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name:',
    default: 'app'
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
