/**
 * Website's common scripts.
 *
 * @module Common
 */

export class Common {
  /**
   * Cache data etc.
   */
  constructor() {
    this.messages = {
      constructor: 'COMMON: constructing...',
      init: 'COMMON: initializing...',
      test: 'COMMON: Test message!'
    };

    console.log(this.messages.constructor);
  }

  /**
   * Test method.
   */
  test() {
    console.log(this.messages.test);
  };

  /**
   * Initialize Main page scripts.
   */
  init() {
    console.log(this.messages.init);

    this.test();
  }
}

/** Export initialized common scripts by default */
export default new Common().init();
