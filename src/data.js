/**
 * @module data
 * @description Module filled with data globally usable.
 * @requires module:essence
 * @since 1.0
 */

/* eslint prefer-const: 0 */
/* eslint prefer-const: "off" */

/**
 * @description Character/code key pair.
 * @type {Array}
 * @public
 * @since 1.0
 */
let lastKeyPair = [];
/* eslint prefer-const: 2 */
/* eslint prefer-const: "error" */

/**
 * @description Lorem ipsum dummy text.
 * @type {string}
 * @public
 * @since 1.0
 * @const
 */
const lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,';

/* eslint symbol-description: 0 */
/**
 * @description End of sequence of stream.
 * @type {Symbol}
 * @public
 * @since 1.0
 * @const
 */
const END_OF_SEQUENCE = Symbol();
/* eslint symbol-description: 2 */

/**
 * @description Months names.
 * @type {string[]}
 * @public
 * @since 1.0
 * @const
 */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * @description Day names.
 * @type {string[]}
 * @public
 * @since 1.0
 * @const
 */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * @description 1 day in seconds.
 * @type {number}
 * @public
 * @since 1.0
 * @const
 */
const DAY_IN_SEC = 86400;

/**
 * @description 1 month in days.
 * @type {number}
 * @public
 * @since 1.0
 * @const
 */
const MONTH_IN_DAY = 30.417;

export {
  lastKeyPair,
  lorem,
  END_OF_SEQUENCE,
  MONTHS,
  DAYS,
  DAY_IN_SEC,
  MONTH_IN_DAY,
};