/**
 * Example component (delete on prod)
 *
 * @module Timer
 */

class Timer {
  private counter: number = 1;

  private timerInterval?: number = null;

  public constructor() {}

  /**
   * Set current time
   *
   * @this Timer
   */
  public setTimer = (time: number): void => {
    this.counter = time;
  };

  /**
   * Start countdown
   *
   * @this Timer
   */
  public startTimer = (): void => {
    this.timerInterval = setInterval(() => console.log(`Timer: ${this.counter++}`), 1000);
  };

  /**
   * Stop countdown
   *
   * @this Timer
   */
  public stopTimer = (): void => {
    clearInterval(this.timerInterval);
  };
}

export default new Timer();
