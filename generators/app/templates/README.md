# Vintage

Vintage start project<% if (splitting) { %> (with webpack chunks auto generation)<% } %>.

## Overview

* [Installation](#markdown-header-installation)
* [WebStorm configuration](#markdown-header-webstorm-configuration)
* [NPM scripts](#markdown-header-npm-scripts)<% if (splitting) { %>
* [Code splitting](#markdown-header-code-splitting)<% } %>
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
<% if (splitting) { %>

## Code splitting

If your project is going to be large and you want to split index.js file into separate modules, use `webpack-chunks` branch of this repository:
```
git checkout webpack-chunks
```

Then add a new chunk:
```javascript
require.ensure([], require => {
  const loadedChunk = require('path/to/chunk');

  // do stuff with loaded module

}, 'chunkFileName');
```
<% } %>

##### Warning!

You should restart task (e.g. `development`) after adding a new chunk.
[Issue #26](https://github.com/soundcloud/chunk-manifest-webpack-plugin/issues/26)

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
2. Ensure all of your Public API's has both `init` and `destroy` methods.<% if (splitting) { %>
3. Always restart task (e.g. `development`) after adding a new chunk.<% } %>

## Built with

* [Gulp](http://gulpjs.com/)
* [Pug](https://github.com/pugjs/pug)
* [Webpack 2.2](https://webpack.js.org/)
* [Sass](http://sass-lang.com/)
* [Babel](https://babeljs.io/)
* [Browsersync](https://www.browsersync.io/)

## Versioning

Current version is 0.3.1