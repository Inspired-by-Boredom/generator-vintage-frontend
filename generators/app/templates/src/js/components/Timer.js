/**
 * Example component (delete on prod)
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
   * Start countdown
   *
   * @public
   * @this Timer
   */
  startTimer = () => {
    this._timerInterval = setInterval(() => console.log(`Timer: ${this._counter++}`), 1000);
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
