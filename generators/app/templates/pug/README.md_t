# Vintage

Vintage start project.

## Overview

* [Installation](#markdown-header-installation)
* [WebStorm configuration](#markdown-header-webstorm-configuration)
* [NPM scripts](#markdown-header-npm-scripts)
* [File structure](#file-structure)
* [JS structure explanation](#js-structure-explanation)
* [Public API](#markdown-header-public-api)
* [Common scripts](#common-scripts)
* [JSDoc](#markdown-header-jsdoc)
* [Notes](#markdown-header-notes)

## Installation

In order to start working with project, you must:

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

## File structure

```
|-- vintage-start-project
    |-- gulp
    |   |-- config.js
    |   |-- tasks
    |-- src
    |   |-- js
    |   |-- styles
    |   |-- svg
    |   |-- template
    |-- www
    |   |-- static
    |   |   |-- js
    |   |   |-- css
    |   |   |-- favicon.ico
    |-- .gitignore
    |-- gulpfile.js
    |-- jsdoc.json
    |-- package.json
    |-- README.md
    |-- rules.jscsrc
    |-- vintage-frontend.json
    |-- webpack.config.js
```

### JS

Main JS entry point: `src/js/index.js`
Will be compiled to: `www/static/js/index.js`

### SCSS

Main SCSS entry point: `src/styles/index.scss`
Will be compiled to: `www/static/css/index.css`

### HTML

Pages directory: `src/template/pages`
Will be compiled to: `www/`

### SVG

Put your SVG-icons to: `src/svg`
Vintage-workflow will create sprite and inject it into the HTML layout (on each page)

## JS structure explanation

```
|-- js
    |-- components
    |-- modules
    |   |-- dep
    |   |-- dev
    |-- pages
    index.js
    index.jquery.js
```

### `components`

`PublicAPI.js`, `Common.js` and other components (`Header.js` or `Footer.js` etc.).
Components from this directory should be used only by `pages` and `index`.

### `modules/dep`

Libs and modules that could not be installed via 'npm install'

### `modules/dev`

User-written modules. They shouldn't import anything (except packages from `node_modules` and other modules).

### `pages`

Scripts for each page (will be evaluated only on corresponding page).

## Public API

Path: `js/components/publicAPI` (example)

Public API is created for back-end developers.

It should contain methods to attach / initialize / destroy jquery plugins etc.

If there is no need in API, simply delete `publicAPI.js` file and it's `import`.

## Common scripts

Path: `js/components/common` (example)

Common scripts should always be executed, regardless of active 'data-page'.

If there is no need in them, simply delete `common.js` file and it's `import`.

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

1. Each page should have corresponding `data-page` attribute (e.g. `<main data-page="home" />`.
2. Before pushing to Bitbucket repository (or before transferring the project to Back-end department) make sure to run `production` bundle.
3. Ensure all of your Public API's has both `init` and `destroy` methods.
4. In case of Public API or Common scripts are not-in-use - make sure to delete those files.

## Built with

* [Gulp](http://gulpjs.com/)
* [Pug](https://github.com/pugjs/pug)
* [Webpack](https://webpack.js.org/)
* [Sass](http://sass-lang.com/)
* [Babel](https://babeljs.io/)