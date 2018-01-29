/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = document.querySelector('main').dataset.page;

/**
 * Match media device indicator.
 */
export class Resp {
  /**
   * Get window's current width.
   *
   * @get
   * @static
   * @return {Number}
   */
  static get currWidth() {
    return window.innerWidth;
  }

  /**
   * Detect touch events.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTouch() {
    return 'ontouchstart' in window;
  }

  /**
   * Detect desktop device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isDesk() {
    return window.matchMedia(`(min-width: 1280px)`).matches;
  }

  /**
   * Detect tablet device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTablet() {
    return window.matchMedia(`(min-width: 768px) and (max-width: 1279px)`).matches;
  }

  /**
   * Detect mobile device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isMobile() {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
}

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */
export const css = {
  active: 'active'
};

/**
 * Generate string of random letters.
 *
 * @param {Number} length
 */
export const randomString = (length = 10) => Math.random().toString(36).substr(2, length > 10 ? length : 10);

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
export const debounce = (func, context, wait, immediate) => {
  let timeout;

  return () => {
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * Throttle function.
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const throttle = (fn, threshold = 250, scope) => {
  let last, deferTimer;

  return function () {
    const context = scope || this;
    const now = +new Date;
    const args = arguments;

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
