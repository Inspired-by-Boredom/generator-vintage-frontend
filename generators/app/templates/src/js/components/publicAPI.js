/**
 * Website's public API.
 *
 * @module PublicAPI
 */

export class PublicAPI {
  /**
   * Set initial settings (if needed).
   */
  constructor() {
    this.counter = 1;
    this.timerInterval = null;
  }

  /**
   * Timer's public methods.
   *
   * PublicAPI.timer.init()    - initialize timer
   * PublicAPI.timer.set()     - set timer's value
   * PublicAPI.timer.destroy() - destroy (stop) timer
   *
   * @return {{init: Function, destroy: Function}}
   */
  get timer() {
    // initialize timer
    const startTimer = () =>
      this.timerInterval = setInterval(() => console.log(`Timer: ${this.counter++}`), 1000);

    // set timer's value
    const setTime = time => this.counter = time;

    // destroy (stop) timer
    const stopTimer = () => clearInterval(this.timerInterval);

    // timer's API
    return {
      init: startTimer,
      set: setTime,
      destroy: stopTimer
    };
  }
}

/** Expose Public API */
export default window.PublicAPI = new PublicAPI;
