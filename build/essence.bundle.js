'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module essence
 * @description Core module of the framework
 * @typedef {(number|string)} NumberLike
 * @typedef {(number|number[])} Nums
 * @typedef {(string|string[])} Str
 * @typedef {(number|boolean)} Bool
 * @typedef {(Array|object|string)} List
 * @typedef {(Array|object)} dict
 * @typedef {(XML|string)} code
 * @typedef {(Node|TreeNode|NTreeNode|Vertex)} Node
 * @since 2.0
 */

//AirBnB suggestion
//usage: has.call(object, key)
//const has = Object.prototype.hasOwnProperty;

//obj.toArray() => Array.from(obj)
/*
 Array.linearise:
 const flat = {};
 [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
 const flatten = memo.concat(item);
 flat[index] = flatten;
 return flatten;
 });
 */

//NodeJS suggestion !a.length instead of a.isEmpty()
/**
 * @description Essence's console logger.
 * @public
 * @since 2.0
 * @function
 */
var say = exports.say = function say(message, type) {
  for (var _len = arguments.length, style = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    style[_key - 2] = arguments[_key];
  }

  var _console, _console2, _console3, _console4, _console5, _console6;

  var styles = {
    header: 'font-weight: bold; display: block',
    info: 'background: #00008f; color: #000',
    error: 'background: #8f0000; color: #000',
    warn: 'background: #f8c808; color: #000',
    succ: 'background: #008f00; color: #000',
    quest: 'background: #0000f8; color: #000'
  };
  switch (type) {
    case 'info':
      (_console = console).info.apply(_console, [message, styles.info].concat(style));
      break;
    case 'error':
      (_console2 = console).error.apply(_console2, [message, styles.error].concat(style));
      break;
    case 'warn':
      (_console3 = console).warn.apply(_console3, [message, styles.warn].concat(style));
      break;
    case 'succ':
      (_console4 = console).log.apply(_console4, [message, styles.succ].concat(style));
      break;
    case 'quest':
      (_console5 = console).log.apply(_console5, [message, styles.quest].concat(style));
      break;
    default:
      (_console6 = console).log.apply(_console6, [message].concat(style));
  }
};
