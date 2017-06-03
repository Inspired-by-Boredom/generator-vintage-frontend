/**
 * Home page scripts.
 *
 * @module Home
 */

/** Import utils */
import { Resp } from 'js/modules/dev/helpers';

export default class Home {
  /**
   * Cache data, make preparations and initialize page scripts.
   */
  constructor() {
    // Cache data, make preparations etc.
    this.showOnDesktop = 'HOME: Desktop device detected';

    // Initialize page scripts
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
