/**
 * Example component
 *
 * @module Timer
 */

export class Timer {
  /**
   * @private
   * @type {Number}
   */
  _counter = 1;

  /**
   * @private
   * @type {Null|Number}
   */
  _timerInterval = null;

  /**
   * Start countdown
   *
   * @public
   * @this Timer
   */
  startTimer = () => {
    this._timerInterval = setInterval(() => console.log(`Timer: ${this._counter++}`), 1000);
  };

  /**
   * Set current time
   *
   * @public
   * @this Timer
   * @param {Number} time
   */
  setTimer = (time) => {
    this._counter = time;
  };

  /**
   * Stop countdown
   *
   * @public
   * @this Timer
   */
  stopTimer = () => {
    clearInterval(this._timerInterval);
  };
}

export default new Timer();
