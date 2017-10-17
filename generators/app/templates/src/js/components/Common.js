/**
 * Website's common scripts.
 *
 * @module Common
 */

export class Common {
  /**
   * Cache data, make preparations and initialize common scripts.
   */
  constructor() {
    // cache data, make preparations etc.
    this.messages = {
      constructor: 'Common: constructing...',
      init: 'Common: initializing...',
      example: 'Common: Example message!'
    };

    console.log(this.messages.constructor);

    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  example() {
    console.log(this.messages.example);
  };

  /**
   * Initialize common scripts.
   */
  init() {
    console.log(this.messages.init);

    this.example();
  }
}

/** Export initialized common scripts by default */
export default new Common();
