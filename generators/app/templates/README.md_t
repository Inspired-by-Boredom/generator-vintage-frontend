# Vintage

Vintage start project.

## Overview

* [Installation](#markdown-header-installation)
* [WebStorm configuration](#markdown-header-webstorm-configuration)
* [NPM scripts](#markdown-header-npm-scripts)
* [Public API](#markdown-header-public-api)
* [JSDoc](#markdown-header-jsdoc)
* [Notes](#markdown-header-notes)

## Installation

In order to start working with project, you must:

#### Clone repository to your local machine

```
git clone https://bitbucket.org/vintageua/vintage-start-proj.git
```

#### Install dependencies

npm
```
npm i -g jscs && npm i
```

yarn
```
yarn add global jscs && yarn install
```

## WebStorm configuration

Turn off 'Safe write' option
```
Settings | Appearance & Behavior | System Settings | Use "safe write"
```

Change ECMAScript version
```
Settings | Languages & Frameworks | Javascript | Javascript language version: "ECMAScript6"
```

Enable JSCS linter
```
Settings | Languages & Frameworks | Javascript | Code Quality Tools | JSCS | "Enable"
```

## NPM scripts

Start development

```
npm run development
```

Build production bundle (build '.min' files, prettify html)

```
npm run production
```

## Public API

Path: `js/components/publicAPI` (example)

Public API is created for back-end developers.

It should contain methods to attach / initialize / destroy jquery plugins etc.

## JSDoc

Install JSDoc globally

```
npm install jsdoc -g
```

Generate docs

```
npm run-script compileDocs
```

Open docs
```
npm run-script openDocs
```

## Notes

1. Before pushing to Bitbucket repository (or before transferring the project to Back-end department) make sure to run `production` bundle.
2. Ensure all of your Public API's has both `init` and `destroy` methods.

## Built with

* [Gulp](http://gulpjs.com/)
* [Pug](https://github.com/pugjs/pug)
* [Webpack](https://webpack.js.org/)
* [Sass](http://sass-lang.com/)
* [Babel](https://babeljs.io/)