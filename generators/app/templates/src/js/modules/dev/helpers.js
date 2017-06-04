/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */<% if (jquery) { %>

/**
 * Cache body DOM element.
 *
 * @constant
 * @type {jQuery}
 */
export const $body = $('body');

/**
 * Cache document.
 *
 * @constant
 * @type {jQuery}
 */
export const $document = $(document);

/**
 * Cache window.
 *
 * @constant
 * @type {jQuery}
 */
export const $window = $(window);

/**
 * Cache header.
 *
 * @constant
 * @type {jQuery}
 */
export const $header = $('header');

/**
 * Cache footer.
 *
 * @constant
 * @type {jQuery}
 */
export const $footer = $('footer');

/**
 * Elements for cross-browser window scroll.
 *
 * @constant
 * @type {jQuery}
 */
export const $scrolledElements = $('html, body');

/**
 * Window width.
 *
 * @constant
 * @type {Number}
 */
export const winWidth = $window.width();

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = $body.find('main').data('page');

/**
 * Toggle class on specified element on click.
 *
 * @param {jQuery} clickHandler
 * @param {jQuery} element
 * @param {String} [className='active']
 */
export const toggleClass = (clickHandler, element, className = css.active) => {
  clickHandler.on('click tap', () => element.toggleClass(className));
};

/**
 * Check if element is in viewport.
 *
 * @param {jQuery} $element
 * @param {Boolean} [fullyInView = false] - element should be fully in viewport?
 * @param {Number} [offsetTop = 0]
 * @returns {Boolean}
 */
export const isScrolledIntoView = ($element, offsetTop = 0, fullyInView = false) => {
  const pageTop = $window.scrollTop();
  const pageBottom = pageTop + $window.height();
  const elementTop = $element.offset().top;
  const elementBottom = elementTop + $element.height();

  if (fullyInView) return ((pageTop < elementTop) && (pageBottom > elementBottom));

  return (((elementTop + offsetTop) <= pageBottom) && (elementBottom >= pageTop));
};

/**
 * Check specified item to be target of the event.
 *
 * @param {Object} e - Event object.
 * @param {jQuery} item - Item to compare with.
 * @returns {Boolean} - Indicate whether clicked target is the specified item or not.
 */
export const checkClosest = (e, item) => $(e.target).closest(item).length > 0;<% } %><% if (!jquery) { %>

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = document.querySelector('main').dataset.page;<% } %>

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
