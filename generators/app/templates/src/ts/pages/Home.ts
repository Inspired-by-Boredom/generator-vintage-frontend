/**
 * Home page scripts.
 *
 * @module Home
 */

import { Resp } from '../modules/dev/_helpers';

export default class Home {

  readonly message: string = (() => {
    const message: string = 'Home page scripts initialized on';

    if (Resp.isDesk) {
      return `${message} Desktop`;
    } else if (Resp.isTablet) {
      return `${message} Tablet`;
    } else if (Resp.isMobile) {
      return `${message} Mobile`;
    }
  })();

  /**
   * Cache data, make preparations and initialize page scripts.
   */
  public constructor() {
    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  protected example(): void {
    console.log(this.message);
  };

  /**
   * Initialize Home page scripts.
   */
  protected init(): void {
    this.example();
  }
}
