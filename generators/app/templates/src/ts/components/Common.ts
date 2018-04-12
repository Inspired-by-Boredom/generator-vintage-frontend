/**
 * Website's common scripts (example).
 *
 * @module Common
 */

class Common {

  readonly messages: {
    constructor: string;
    init: string;
    example: string;
  } = {
    constructor: 'Common.js: constructor()...',
    init: 'Common.js: init()...',
    example: 'Common.js: example()...'
  };

  /**
   * Cache data, make preparations and initialize common scripts.
   */
  public constructor() {
    console.log(this.messages.constructor);

    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  protected example(): void {
    console.log(this.messages.example);
  };

  /**
   * Initialize common scripts.
   */
  protected init(): void {
    console.log(this.messages.init);

    this.example();
  }
}

/** Export initialized common scripts by default */
export default new Common();
