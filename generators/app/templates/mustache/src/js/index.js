'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import initialized-by-default modules/libs */
import './components/Common';
import './components/PublicAPI';

/** Import page controllers */
import Home from './pages/Sample';

import { currentPage } from './modules/dev/_helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Sample page */
  case 'sample': new Home; break;

  /** No page found */
  default: console.warn('Undefined page');
}
