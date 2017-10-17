/**
 * Home page scripts.
 *
 * @module Home
 */

import { Resp } from '../modules/dev/_helpers';

export default class Home {
  /**
   * Cache data, make preparations and initialize page scripts.
   */
  constructor() {
    // cache data, make preparations etc.
    this.showOnDesktop = 'Home: Desktop device detected';

    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  example() {
    if (Resp.isDesk) console.log(this.showOnDesktop);
  };

  /**
   * Initialize Home page scripts.
   */
  init() {
    this.example();
  }
}
