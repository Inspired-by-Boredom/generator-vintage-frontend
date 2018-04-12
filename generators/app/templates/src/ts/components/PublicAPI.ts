/**
 * Website's public API (example).
 * Make some functions and methods accessible in global scope.
 *
 * @module PublicAPI
 */

import Timer from './Timer';

export class PublicAPI {

  protected constructor() {}

  /**
   * Some of 'Timer' module public methods.
   *
   * PublicAPI.timer.init() - initialize timer
   * PublicAPI.timer.stop() - stop timer
   */
  public static get Timer(): {
    init(): any;
    stop(): any;
  } {
    return {
      init: Timer.startTimer,
      stop: Timer.stopTimer
    };
  }
}

/** Expose Public API */
export default ((window as any).PublicAPI = PublicAPI);
