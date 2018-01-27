/**
 * Home page scripts.
 *
 * @module Sample
 */

import { Resp } from '../modules/dev/_helpers';

export default class Sample {
  /**
   * Cache data, make preparations and initialize page scripts.
   */
  constructor() {
    this.message = do {
      const message = 'Home page scripts initialized on';

      if (Resp.isDesk) {
        `${message} Desktop`;
      } else if (Resp.isTablet) {
        `${message} Tablet`;
      } else if (Resp.isMobile) {
        `${message} Mobile`;
      }
    };

    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  example() {
    console.log(this.message);
  };

  /**
   * Initialize Home page scripts.
   */
  init() {
    this.example();
  }
}
