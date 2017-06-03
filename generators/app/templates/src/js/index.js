'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import initialized-by-default modules/libs */
import './components/common';
import './components/publicAPI';

/** Import page controllers */
import Home from './pages/home';

/** Import utils */
import { currentPage } from './modules/dev/helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Home page */
  case 'home': new Home; break;

  /** No page found */
  default: console.warn('Undefined page');
}
