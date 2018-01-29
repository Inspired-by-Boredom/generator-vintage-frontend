/**
 * Website's public API (example).
 * Make some functions and methods accessible in global scope.
 *
 * @module PublicAPI
 */

import Timer from './Timer';

export class PublicAPI {
  /**
   * Some of 'Timer' module public methods.
   *
   * PublicAPI.timer.init() - initialize timer
   * PublicAPI.timer.stop() - stop timer
   *
   * @return {{init: Function, stop: Function}}
   */
  static get Timer() {
    return {
      init: ::Timer.startTimer,
      stop: ::Timer.stopTimer
    };
  }
}

/** Expose Public API */
export default window.PublicAPI = PublicAPI;
