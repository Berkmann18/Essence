<<<<<<< HEAD
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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
	 * @requires data
	 * @since 1.0
	 */
	import * as data from './data';
	import * as ui from './ui';
	import * as misc from './misc';
	import * as maths from './maths';
	import * as dsa from './dsa';
	import * as dom from './dom';
	import * as qtest from './qtest';
	
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
	 * @since 1.0
	 * @function
	 */
	export let say = (message, type, ...style) => {
	  const STYLES = {
	    header: 'font-weight: bold; display: block',
	    headerEnd: 'font-weight: normal; display: inline-block',
	    info: 'background: #00008f; color: #000',
	    error: 'background: #8f0000; color: #000',
	    warn: 'background: #f8c808; color: #000',
	    succ: 'background: #008f00; color: #000',
	    quest: 'background: #0000f8; color: #000',
	  };
	  switch (type) {
	    case 'info':
	      console.info(message, STYLES.info, ...style);
	      break;
	    case 'error':
	      console.error(message, STYLES.error, ...style);
	      break;
	    case 'warn':
	      console.warn(message, STYLES.warn, ...style);
	      break;
	    case 'succ':
	      console.log(message, STYLES.succ, ...style);
	      break;
	    case 'quest':
	      console.log(message, STYLES.quest, ...style);
	      break;
	    case 'fulltime':
	      console.log(`%c${getTimestamp(true)}%c  ${message}`, STYLES.header, STYLES.headerEnd);
	      break;
	    case 'time':
	      console.log(`%c[${getTime(true)}]%c  ${message}`, STYLES.header, STYLES.headerEnd);
	      break;
	    case 'colour':
	      console.log(`%cr%cg%cb%c(%c${ui.clrToArr(message).join(', %c')}%c)`, 'color: #f00', 'color: #0f0', 'color: #00f', 'color: #00f', 'color: #000', 'color: #f00', 'color: #0f0', 'color: #00f', 'color: #00f', 'color: #000');
	      break;
	    default:
	      console.log(message, ...style);
	  }
	};
	
	/**
	 * @description Time taken by the DOM to load via the time taken to window.onload to happen.
	 * @type {number}
	 * @public
	 * @since 1.0
	 */
	let loadTime = 0;
	
	/**
	 * @description Time taken by the browser to draw the UI via the time taken to window.onpageshow to
	 * happen.
	 * @type {number}
	 * @public
	 * @since 1.0
	 */
	let displayTime = 0;
	
	/**
	 * @description Start the first mark of the page-loading timer.
	 * @protected
	 * @since 1.0
	 * @function
	 */
	window.onload = () => loadTime = new Date().getTime();
	
	/**
	 * @description Start the second mark of the page-loading timer.
	 * @protected
	 * @since 1.0
	 * @function
	 */
	window.onpageshow = () => displayTime = new Date().getTime();
	
	/**
	 * @description Get the information about the key pressed
	 * @param {*} keyStroke Keystroke
	 * @param {boolean} [toLowerCase=false] To lower case
	 * @returns {Array} Keystroke information
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let getKey = (keyStroke, toLowerCase) => {
	  let code = document.all ? event.keyCode : keyStroke.which;
	  let char = toLowerCase ? String.fromCharCode(code).toLowerCase() : String.fromCharCode(code);
	  return [char, code]
	};
	
	/**
	 * @description Empty function.
	 * @global
	 * @type {Function}
	 * @public
	 * @since 1.0
	 */
	export const $f = () => {
	};
	
	/**
	 * @description Element selector
	 * @param {string} selector A CSS selector
	 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet
	 * (end.g: a particular selector used by a JS object/function which may not be in the page yet).
	 * @returns {?Element} Element
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let $e = (selector, silence) => {
	  if (silence) {
	    try {
	      return new Element(selector)
	    } catch (e) {
	      say(`%c$e('${selector}')%c isn't there (yet).`, 'warn', 'color: #f00', 'color: #000');
	      return null;
	    }
	  } else return new Element(selector);
	};
	
	/**
	 * @description Element's node
	 * @param {string} selector A CSS selector
	 * @param {boolean} [silence=false] Flag to use when <code>selector</code> doesn't exist yet
	 * (e.g.: a particular selector used by a JS object/function which may not be in the page yet).
	 * @returns {HTMLElement} Element node
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let $n = (selector, silence) => {
	  return (silence && isNon($e(selector, silence))) ? null : $e(selector).node;
	};
	
	/**
	 * @description Get the keys of an object.
	 * @param {*} obj Object
	 * @returns {Array} Keys
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let keys = (obj) => Object.keys(obj);
	
	/**
	 * @description Get the values of an object.
	 * @param {*} obj Object
	 * @returns {Array} Values
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let values = (obj) => Object.values(obj);
	
	/**
	 * @description Get the entries of an object.
	 * @param {*} obj Object
	 * @returns {Array} Entries
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let entries = (obj) => Object.entries(obj);
	
	/**
	 * @description Element
	 * @param {string} selector A CSS selector
	 * @this Element
	 * @returns {Element} Element object
	 * @constructor
	 * @public
	 * @since 1.0
	 * @throws {InvalidParamError} Invalid parameter
	 * @property {HTMLElement} Element.node Node
	 * @property {string} Element.selector Selector
	 * @property {boolean} Element.isNodeList Is the element targeting a node-list or just on node ?
	 * @property {function(boolean, boolean): (NumberLike|XML)} Element.val Get the node's value
	 * @property {function(): number} Element.size Get the node's value's size
	 * @property {function(): boolean} Element.isEmpty Check if the node's value is empty
	 * @property {function(*, boolean, boolean)} Element.write Write something to the node
	 * @property {function(*, boolean, boolean)} Element.before Write something to the node before its value
	 * @property {function(*, boolean, boolean)} Element.after Write something to the node after its value
	 * @property {function(string, ?string)} Element.remove Remove a character/string from the node's value and optionally insert jointers
	 * @property {function(string, string)} Element.setCSS Set a CSS rule or change a CSS property
	 * @property {function(string, string)} Element.setInlineCSS Set a CSS rule or change a CSS property inline to a righty of elements
	 * @property {function(string[])} Element.styles Set multiple CSS rules
	 * @property {function(): string} Element.styles Get All the CSS rules ruling this element
	 * @property {function(string): NumberLike} Element.css Get the value of a CSS property
	 * @property {function(string): boolean} Element.hasClass Check if the node is affiliated to a class
	 * @property {function(string): boolean} Element.hasCSS Check if the node's CSS include a particular rule
	 * @property {function(string)} Element.addClass Affiliate the node to a particular class
	 * @property {function(string)} Element.rmClass Disjoin the node from a particular class
	 * @property {function(string, (Str|Nums), number)} Element.toggleCSS Toggle a CSS property
	 * @property {Function} Element.show Show the node
	 * @property {Function} Element.hide Hide the node
	 * @property {function(string)} Element.on Event handler
	 * @property {function(): string} Element.toString String representation of the element
	 * @property {function(): string} Element.tagName Tag-name of the element
	 * @property {Function} Element.scrollBottom Scroll to the bottom of the node
	 * @property {Function} Element.scrollTop Scroll to the top of the node
	 * @property {Function} Element.scrollLeft Scroll to the left of the node
	 * @property {Function} Element.scrollRight Scroll to the right of the node
	 * @property {function(number, number)} Element.scroll Scroll in any directions
	 * @property {function(string, number)} Element.autoScroll Auto scrolling animation
	 * @property {function(string, *): *} Element.attr Get/set the attribute of the node
	 * @property {function(string)} Element.rmAttr Remove an attribute from the node
	 * @property {Function} Element.invColour Invert the colour and background colour (by negation)
	 * @property {function(): string[]} Element.classes Get an array of classes of the element
	 * @property {function(function(HTMLElement))} Element.multi Execute a callback on all nodes of a $e('*...') element
	 * @property {function(string, Array)} Element.multiElm Execute a method on all elements of a $e('*...') element
	 * @property {function()} Element.delete Self-destruction of the element by self-removal of the DOM
	 * @property {function(String, String, boolean, boolean)} Element.replace Replace a string in the element's value by a new one
	 * @todo All the CSS implementations on $e('*..') must always be wrote in a CSS place and not inline (like now).
	 * Maybe do something with $n(...).scrollIntoView()
	 * @property {function()} Element.moveCSS Move the inline-CSS into the current stylesheet
	 */
	export class Element {
	  constructor(selector) {
	    if (/^([#.*_-`~&]\W*|\S|undefined|null|)$/.test(selector)) throw new qtest.InvalidParamError(`Element cannot accept the selector '${selector}' as its invalid.`); //Reject invalid selectors
	    if (selector[0] === '#') this.node = document.querySelector(selector) || document.getElementById(selector.slice(1, selector.length)); //Id
	    else if (selector[0] === '.') this.node = document.querySelector(selector) || document.getElementByClassName(selector.slice(1, selector.length)); //Class
	    else if (selector[0] === '*') this.node = document.querySelectorAll(selector.slice(1, selector.length)) || document.getElementsByTagName(selector.slice(1, selector.length)); //Node list
	    else this.node = document.querySelector(selector);
	    if (this.node === null) throw new Error(`The node $n('${selector}') doesn't exist !!`);
	    this.selector = selector;
	  }
	
	  isNodeList() {
	    return isNativeType(this.node, 'NodeList');
	  }
	
	  val(getHTML, withTags) {
	    if (this.isNodeList()) {
	      let arr = [];
	      for (let node of this.node) {
	        if (node.value && !getHTML && !withTags) arr.push(node.value);
	        else if (node.innerHTML && getHTML && !withTags) arr.push(node.innerHTML);
	        else if (node.innerText && !getHTML && !withTags) arr.push(node.innerText);
	        else if (node.outerHTML && !getHTML && withTags) arr.push(node.outerHTML);
	        else arr.push(node.value ? node.value : node.innerText);
	      }
	      return arr
	    }
	    if (this.node.value && !getHTML && !withTags) return this.node.value;
	    else if (this.node.innerHTML && getHTML && !withTags) return this.node.innerHTML;
	    else if (this.node.innerText && !getHTML && !withTags) return this.node.innerText;
	    else if (this.node.outerHTML && !getHTML && withTags) return this.node.outerHTML;
	    else return this.node.value ? this.node.value : this.node.innerText
	  };
	
	  get size() {
	    return this.val().length
	  };
	
	  isEmpty() {
	    return isNon(this.val());
	  };
	
	  write(value, parseToHTML, incTags) {
	    if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
	    if (this.isNodeList()) {
	      for (let i in this.node) {
	        if (this.node.has(i)) {
	          if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isNativeType(value, 'Array') ? value[i] : value;
	          else this.node[i].value ? (this.node[i].value = isNativeType(value, 'Array') ? value[i] : value) : (this.node[i].innerText = isNativeType(value, 'Array') ? value[i] : value);
	        }
	      }
	    }
	
	    if (this.node.value && !parseToHTML && !incTags) this.node.value = value;
	    else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = value;
	    else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = value;
	    else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = value;
	    else this.node.value ? this.node.value = value : this.innerText = value;
	  };
	
	  before(value, parseToHTML, incTags) {
	    if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
	    if (this.isNodeList()) {
	      for (let i in this.node) {
	        if (this.node.has(i)) {
	          if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value = isNativeType(value, 'Array') ? value[i] + this.node[i].value : value + this.node[i].value;
	          else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML = isNativeType(value, 'Array') ? value[i] + this.node[i].innerHTML : value + this.node[i].innerHTML;
	          else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText = isNativeType(value, 'Array') ? value[i] + this.node[i].innerText : value + this.node[i].innerText;
	          else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML = isNativeType(value, 'Array') ? value[i] + this.node[i].outerHTML : value + this.node[i].outerHTML;
	          else this.node[i].value
	              ? (this.node[i].value = isNativeType(value, 'Array') ? value[i] + this.node[i].value : value + this.node[i].value)
	              : (this.node[i].innerText = isNativeType(value, 'Array') ? value[i] + this.node[i].innerText : value + this.node[i].innerText);
	        }
	      }
	    }
	
	    if (this.node.value && !parseToHTML && !incTags) this.node.value = value + this.node.value;
	    else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML = value + this.node.innerHTML;
	    else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText = value + this.node.innerText;
	    else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML = value + this.node.outerHTML;
	    else this.node.value ? this.node.value = value + this.node.value : this.innerText = value + this.innerText;
	  };
	
	  after(value, parseToHTML, incTags) {
	    if (typeof this.val(true) === 'undefined') this.node.innerText = '?';
	    if (this.isNodeList()) {
	      for (let i in this.node) {
	        if (this.node.has(i)) {
	          if (this.node[i].value && !parseToHTML && !incTags) this.node[i].value += isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].innerHTML && parseToHTML && !incTags) this.node[i].innerHTML += isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].innerText && !parseToHTML && !incTags) this.node[i].innerText += isNativeType(value, 'Array') ? value[i] : value;
	          else if (this.node[i].outerHTML && !parseToHTML && incTags) this.node[i].outerHTML += isNativeType(value, 'Array') ? value[i] : value;
	          else this.node[i].value ? (this.node[i].value += isNativeType(value, 'Array') ? value[i] : value) : (this.node[i].innerText += isNativeType(value, 'Array') ? value[i] : value);
	        }
	      }
	    }
	
	    if (this.node.value && !parseToHTML && !incTags) this.node.value += value;
	    else if (this.node.innerHTML && parseToHTML && !incTags) this.node.innerHTML += value;
	    else if (this.node.innerText && !parseToHTML && !incTags) this.node.innerText += value;
	    else if (this.node.outerHTML && incTags && !parseToHTML) this.node.outerHTML += value;
	    else this.node.value ? this.node.value += value : this.innerText += value;
	  };
	
	  remove(character, replacement = '') {
	    if (this.isNodeList()) {
	      for (let i = 0; i < this.size(); i++) {
	        if (this.val()[i] === character) this.write(this.val().slice(0, i).concat(this.val().slice(i + 1, this.size())));
	      }
	    }
	    this.write(this.val().split(character).join(replacement));
	  };
	
	  setCSS(prop, val) {
	    if (this.isNodeList()) ui.addCSSRule(/\*\S/.test(this.selector) ? this.selector.get(1) : this.selector, misc.camelCaseTo(prop, 'hyphen') + ': ' + val);
	    else this.node.style[prop] = val;
	  };
	
	  setInlineCSS(prop, vals) {
	    for (let i = 0; i < this.node.length; i++) this.node[i].style[prop] = isNativeType(vals, 'Array') ? vals[i] : vals;
	  };
	
	  set styles(sAndV) { //Style and vals: [style0, val0, style1, val1, ...]
	    for (let i = 0; i < sAndV.length - 1; i += 2) this.setCSS(sAndV[i], sAndV[i + 1]);
	  };
	
	  get styles() {
	    return this.attr('style');
	  };
	
	  css(prop) {
	    return this.isNodeList() ? Array.from(this.node).map(node => node.style[prop]) : this.node.style[prop];
	  };
	
	  hasClass(className) {
	    return this.isNodeList()
	      ? Array.from(this.node).map(node => new RegExp(` ${className} `).test(` ${node[className]} `))
	      : new RegExp(` ${className} `).test(` ${this.node[className]} `);
	  };
	
	  hasCSS(prop) {
	    return this.isNodeList()
	      ? Array.from(this.node).map(node => new RegExp(` ${prop} `).test(` ${node.style[prop]} `))
	      : new RegExp(` ${prop} `).test(` ${this.node.style[prop]} `);
	  };
	
	  addClass(className) {
	    this.isNodeList() ? this.node.map(node => node.className += ' ' + className) : this.node.className += ' ' + className;
	  };
	
	  rmClass(className) {
	    let newClass = ' ' + this.node.className.replace(/[\t\r\n]/g, ' ') + ' ';
	    if (this.isNodeList()) {
	      this.node.map(node => {
	        newClass = ' ' + node.className.replace(/[\t\r\n]/g, ' ') + ' ';
	        if (node.hasClass(className)) {
	          while (newClass.indexOf(' ' + className + ' ') >= 0) newClass = newClass.replace(' ' + className + ' ', ' ');
	          node.className = newClass.replace(/^\s+|\s+$/g, '');
	        }
	      });
	    } else if (this.hasClass(className)) {
	      while (newClass.indexOf(' ' + className + ' ') >= 0) newClass = newClass.replace(' ' + className + ' ', ' ');
	      this.node.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	  };
	
	  toggleCSS(prop, params, stackLayer = 0) {
	    if (this.css(prop) === '' && stackLayer < 1) this.toggleCSS(prop, params, stackLayer + 1);
	    if (prop === 'visibility') {
	      (this.css('visibility') === 'visible') ? this.setCSS('visibility', 'hidden') : this.setCSS('visibility', 'visible');
	    } else if (prop === 'enabled') {
	      (this.css('enabled') === 'enabled') ? this.setCSS('enabled', 'disabled') : this.setCSS('enabled', 'enabled');
	    } else if (prop === 'display') {
	      (this.css('display') === 'block' || this.css('display') === params) ? this.setCSS('display', 'none') : this.setCSS('display', params || 'block');
	    } else if (!isNon(prop) && !isNon(params)) { //For color, bgcolor, opacity, font-size, ...
	      if (isNon(this.css(prop))) this.setCSS(prop, params[0]);
	      for (let i of params) { //Slide through the parameters and go to the next one if the one already set is present
	        if (this.css(prop) === params[i]) {
	          this.setCSS(prop, params[(i + 1) % params.length]);
	          break;
	        }
	      }
	    }
	  };
	
	  show() {
	    this.setCSS('opacity', 1);
	    this.setCSS('display', 'block');
	  };
	
	  hide() {
	    this.setCSS('opacity', 0);
	    this.setCSS('display', 'none');
	  };
	
	  on(event, handler = $f) {
	    let events = ['abort', 'autocomplete', 'autocompleteerror', 'beforeunload', 'blur', 'cancel', 'canplay', 'canplaythrough', 'change', 'click', 'close', 'contextmenu', 'cuechange',
	      'dblclick', 'devicemotion', 'deviceorientation', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error',
	      'focus', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'languagechange', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown',
	      'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'offline', 'online', 'pagehide', 'pageshow', 'pause', 'play', 'playing', 'popstate',
	      'progress', 'ratechange', 'reset', 'resize', 'scroll', 'search', 'seeked', 'seeking', 'select', 'show', 'stalled', 'storage', 'submit', 'suspend', 'timeupdate', 'toggle',
	      'transitionend', 'unload', 'volumechange', 'waiting', 'webkitanimationend', 'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend', 'wheel'];
	    if (events.contains(event.normal())) {
	      this.isNodeList() ? Array.from(this.node).map(node => node.addEventListener(event.normal(), handler)) : this.node.addEventListener(event.normal(), handler);
	    }
	  };
	
	  toString() {
	    return '[object Element]'
	  };
	
	  tagName() {
	    return this.node.tagName.toLowerCase()
	  };
	
	  scrollTop() {
	    this.node.scrollTop = this.node.offsetTop;
	  };
	
	  //noinspection JSUnusedGlobalSymbols
	  scrollBottom() {
	    this.node.scrollTop = this.node.offsetHeight - this.node.offsetTop;
	  };
	
	  scrollLeft() {
	    this.node.scrollLeft = this.node.offsetLeft;
	  };
	
	  //noinspection JSUnusedGlobalSymbols
	  scrollRight() {
	    this.node.scrollLeft = this.node.offsetWidth - this.node.offsetLeft;
	  };
	
	  scroll(x = 0, y = 0) {
	    //noinspection JSAnnotator
	    this.node.scrollLeft += x;
	    this.node.scrollTop += y;
	  };
	
	  //noinspection JSUnusedGlobalSymbols
	  autoScroll(direction = 'd', speed) {
	    let interval = setInterval(() => {
	      switch (direction.toLowerCase()[0]) {
	        case 'l':
	          this.scroll(-1, 0);
	          if (this.node.scrollLeft === this.node.offsetLeft) clearInterval(interval);
	          break;
	        case 'r':
	          this.scroll(1, 0);
	          if (this.node.scrollLeft === this.node.offsetWidth - this.node.offsetLeft) clearInterval(interval);
	          break;
	        case 'u':
	          self.scroll(0, -1);
	          if (self.node.scrollTop === self.node.offsetTop) clearInterval(interval);
	          break;
	        default: //d
	          self.scroll(0, 1);
	          if (self.node.scrollTop === self.node.scrollHeight - self.node.offsetTop) clearInterval(interval);
	      }
	    }, speed || 50);
	  };
	
	  attr(name, value) {
	    if (this.isNodeList()) return this.node.map(node => isNon(value) ? node.getAttribute(name) : node.setAttribute(name, value));
	    else return isNon(value) ? this.node.getAttribute(name) : this.node.setAttribute(name, value);
	  };
	
	  //noinspection JSUnusedGlobalSymbols
	  rmAttr(name) {
	    this.isNodeList() ? this.node.map(node => node.removeAttribute(name)) : this.node.removeAttribute(name);
	  };
	
	  invColour() {
	    //First make sure there's a colour and a background colour specified on the affect element(s)
	    if (isNativeType(this.css('color'), 'Array') || isNativeType(this.css('backgroundColor'), 'Array')) {
	      Array.from(this.node).filter(node => node.style.color === '').map(node => node.style.color = 'inherit');
	      Array.from(this.node).filter(node => node.style.backgroundColor === '').map(node => node.style.backgroundColor = 'inherit');
	    } else {
	      if (this.css('color') === '') this.setCSS('color', 'inherit'); //if the colour wasn't set or is only known to CSS as the default inherited value
	      if (this.css('backgroundColor') === '') this.setCSS('backgroundColor', 'inherit');
	    }
	    ui.negateColour(this.selector, 'color', 'a');
	    ui.negateColour(this.selector, 'backgroundColor', 'a');
	  };
	
	  classes() {
	    return this.node.className.split(' ');
	  };
	
	  multi(callback) {
	    let nodes = Array.from(this.node);
	    for (let node of nodes) callback(node);
	  };
	
	  //noinspection JSUnusedGlobalSymbols
	  multiElm(method, ...args) {
	    let nodes = Array.from(this.node);
	    for (let node of nodes) $e(ui.cssPath(node))[method](...args);
	  };
	
	  delete() {
	    this.write('', false, true); //Or this.node.parentElement.removeChild(this.node);
	  };
	
	  replace(oldVal, newVal, parseToHTML, incTags) {
	    this.write(this.val(parseToHTML, incTags).replace(oldVal, newVal), parseToHTML, incTags);
	  };
	
	  moveCSS() {
	    ui.addCSSRule(this.selector, this.attr('style'));
	    this.rmAttr('style');
	  };
	}
	
	/**
	 * @description Include an external file/resource as a child of the document
	 * @param {string} file Filename
	 * @param {string} [type='link'] Type of the file
	 * @public
	 * @since 1.0
	 * @function
	 * @example
	 * include('script.js'); //It will include the script.js just like include('script.js', 'script');
	 * include('style.css'); //same as include('style.css', 'link') and include('style.css', 'stylesheet');
	 */
	function include(file, type = 'link') {
	  let elm = document.createElement(type);
	  if (type === 'script') elm.src = file;
	  else {
	    elm.href = file;
	    elm.rel = 'stylesheet';
	  }
	  elm.type = (type === 'script') ? 'text/javascript' : 'text/css';
	  document.head.appendChild(elm)
	}
	
	/**
	 * @description Avoid including a file if it's already included
	 * @param {string} file Filename
	 * @param {string} [type='link"' Type of the file
	 * @param {string} [parentPath=''] Parent path
	 * @returns {undefined|boolean} False flag or nothing
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~include
	 */
	export let includeOnce = (file, type = 'link', parentPath = '') => {
	  let rsc = type === 'script' ? dom.gatherScripts(true) : dom.gatherStylesheets(true);
	  if ((parentPath && (rsc.has(parentPath + file) || rsc.contains(parentPath + file)))
	    || rsc.has(file) || rsc.contains(file)) return false;
	  else include(file, type)
	};
	
	/**
	 * @description Removes an external resource
	 * @param {string} file File name
	 * @param {string} [type='link'] Type of the file
	 * @since 1.0
	 * @public
	 * @function
	 * @example
	 * exclude('script.js'); //will remove the reference to the script.js script.
	 */
	export let exclude = (file, type = 'link') => {
	  let elm = document.createElement(type);
	  type === 'script' ? elm.src = file : elm.href = file;
	  elm.type = (type === 'script') ? 'text/javascript' : 'text/css';
	  document.head.removeChild(elm)
	};
	
	/**
	 * @description Counts how many times a character/property/number <code>c</code> is present in the object
	 * @param {(string|Bool)} character Character data
	 * @this Object
	 * @returns {number} Number of occurrences of <code>c</code> in the object
	 * @public
	 * @since 1.0
	 * @method
	 * @example
	 * 'Hello world'.count('o'); //2
	 * [4, 2, 0, -4, 1, 2, 3].count(0); //1
	 * @memberof Object.prototype
	 * @external Object
	 */
	Object.prototype.count = (character) => Array.from(this).filter(x => x === character).length;
	
	/**
	 * @description Get all the positions of a character/property/number c.
	 * @param {NumberLike} character Character/property/number
	 * @this Object
	 * @returns {number[]} Array of positions
	 * @public
	 * @since 1.0
	 * @method
	 * @example
	 * 'AbcdAbc'.positions('A'); //[0, 4]
	 * @memberof Object.prototype
	 * @external Object
	 */
	Object.prototype.positions = (character) => {
	  let pos = [];
	  //noinspection JSUnresolvedVariable
	  for (let item of this) {
	    if (item === character) pos.push(item);
	  }
	};
	
	/**
	 * @description Check if an object is iterable hence if it's a string/array/object.
	 * @this Object
	 * @returns {boolean} Iterability check result
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Object.prototype
	 * @external Object
	 * @example
	 * let myStr = 'Hello', myNum = 1.4142, myBool = true, myArr = range(3), myObj = {a: 0, b: 1};
	 * myStr.isIterable(); //true
	 * myNum.isIterable(); //false
	 * myBool.isIterable(); //false
	 * myArr.isIterable(); //true
	 * myObj.isIterable(); //true
	 */
	Object.prototype.isIterable = () => isNativeType(this, 'String') || isNativeType(this, 'Array') || isNativeType(this, 'Object');
	
	/**
	 * @description Self-destruction of the object.<br />
	 * Source: {@link https://Google.github.io/styleguide/javascriptguide.xml?showone=delete#delete}
	 * @this Object
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Object.prototype
	 * @external Object
	 */
	Object.prototype.delete = () => {
	  this.property = null;
	  delete this;
	};
	
	/**
	 * @summary Equality check.
	 * @description Check if obj and the current object are the same
	 * @param {*} obj Object to compared to
	 * @this Object
	 * @returns {boolean} Equality check result
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Object.prototype
	 * @external Object
	 * @example
	 * let a = 'Hello', b = 'hello', c = ['h', 'e', 'l', 'l', 'o'];
	 * a.equals(b); //false
	 * a.toLowerCase().equals(b); //true
	 * c.join('').equals(a); //true
	 * c.equals(a); //false
	 */
	Object.prototype.equals = (obj) => this.toString() === obj.toString() || this.toLocaleString() === obj.toLocaleString() || this === obj;
	
	/**
	 * @description Multiple replacement.
	 * @param {Array[]} rules Rules containing (RegExp|String)/(RegExp|String) pairs
	 * @this Object
	 * @returns {*} Resulting object
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Object.prototype
	 * @external Object
	 * @example
	 * 'Hello world !'.multiReplace([[/[A-Za-z]/g, '1'], [/(\s|\!)/, '0']]); //'1111101111100'
	 */
	Object.prototype.multiReplace = function (rules) {
	  let res = this.replace(rules[0][0], rules[0][1]);
	  for (let i = 1; i < rules.length; i++) res = res.replace(rules[i][0], rules[i][1]);
	  return res
	};
	
	/**
	 * @description Comparison check.
	 * @param {*} obj Object to be compared to
	 * @this Object
	 * @returns {number} Comparison check result
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {TypeError} Type difference between this and obj
	 * @memberof Object.prototype
	 * @external Object
	 * @example
	 * let a = 2, b = 5;
	 * a.compareTo(b) === -1 //a < b
	 * b.compareTo(a) === 1 //b > a
	 * a.compareTo(a) === 0 //a = a
	 */
	Object.prototype.compareTo = (obj) => {
	  if (getNativeType(this) != getNativeType(obj)) throw new TypeError(`${this} and ${obj} aren't of the same type, so can't be compared.`);
	  if ((getNativeType(this) === 'Object' && getCustomType(this) === getCustomType(obj)) || getNativeType(this) === getNativeType(obj)) {
	    return this.equals(obj) ? 0 : (this.toString() < obj.toString() || this.toLocaleString() < obj.toLocaleString()) ? -1 : 1;
	  } else throw new TypeError(` ${this} and ${obj} aren't of the same custom type, so can't be compared.`);
	};
	
	/**
	 * @description Check if an object has a property
	 * @param {string} prop Property
	 * @returns {boolean} Containment check result
	 * @memberof Object.prototype
	 * @external Object
	 * @public
	 * @since 1.0
	 * @this Object
	 * @method
	 * @example
	 * let a = {name: 'A', size: 8}, b = ['1', '4', '9', 'h', 'w', '_'];
	 * a.has('name'); //true
	 * a.has('value'); //false
	 * b.has('w'); //true
	 * b.has(' '); //false
	 */
	Object.prototype.has = (prop) => Object.prototype.hasOwnProperty.call(this, prop); //Better than this[prop] != undefined
	
	/**
	 * @description Emptiness check on the object.
	 * Source: {@link https://stackoverflow.com/a/679937/5893085|SO}
	 * @return {boolean} Emptiness state
	 * @memberof Object.prototype
	 * @external Object
	 * @this Object
	 * @public
	 * @since 1.0
	 * @method
	 * @example
	 * let a = {}, b = new Object(), c = {x: 5}, d = '';
	 * a.isEmpty(); //true
	 * b.isEmpty(); //true
	 * c.isEmpty(); //false
	 * d.isEmpty(); //true
	 */
	Object.prototype.isEmpty = () => !(this).length;
	
	/**
	 * @description High level inheritance.
	 * @param {*} parent Parent
	 * @memberof Object.prototype
	 * @external Object
	 * @this Object
	 * @public
	 * @since 1.0
	 * @method
	 */
	Object.prototype.inherits = (parent) => {
	  this.prototype = Object.create(parent.prototype);
	  this.prototype.constructor = this;
	};
	
	/**
	 * @description Allows to create methods without directly calling the prototype.
	 * @param {string} name Name of the method
	 * @param {Function} func Function (body of the method)
	 * @returns {Function}
	 * @memberof Function.prototype
	 * @external Function
	 * @this Function
	 * @public
	 * @since 1.0
	 * @method
	 * @deprecated
	 * @todo Find a stable way to use it without having this=window (note: the ES5 way on {@link https://stackoverflow.com/questions/6868883/augmenting-types-in-javascript} works)
	 */
	Function.prototype.method = (name, func) => {
	  this.prototype[name] = func;
	  return this;
	};
	
	/**
	 * @description Inheritance.<br />
	 * Source: Somewhere
	 * @param {*} parentClassOrObj Parent
	 * @returns {Function} this Current function/constructor
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Function.prototype
	 * @external Function
	 */
	Function.prototype.inheritsFrom = (parentClassOrObj) => {
	  if (parentClassOrObj.constructor === Function) { //Normal Inheritance
	    this.prototype = new parentClassOrObj;
	    this.prototype.constructor = this;
	    this.prototype.parent = parentClassOrObj.prototype;
	  } else { //Pure Virtual Inheritance
	    this.prototype = parentClassOrObj;
	    this.prototype.constructor = this;
	    this.prototype.parent = parentClassOrObj;
	  }
	  //noinspection JSValidateTypes
	  return this
	};
	
	/**
	 * @description Check if an array contains a value.
	 * @param {*} value Value
	 * @return {boolean} Containment check result
	 * @this Array
	 * @method
	 * @since 1.0
	 * @memberof Array.prototype
	 * @external Array
	 * @see module:essence~Array.prototype.miss
	 */
	Array.prototype.contains = (value) => this.indexOf(value) > -1;
	
	/**
	 * @description Check if an array doesn't contains a value.
	 * @param {*} value Value
	 * @return {boolean} Non-containment check result
	 * @this Array
	 * @method
	 * @since 1.0
	 * @memberof Array.prototype
	 * @external Array
	 * @see module:essence~Array.prototype.contains
	 */
	Array.prototype.miss = (value) => this.indexOf(value) === -1;
	
	/**
	 * @description Get the first element of the array.
	 * @param {*} [value] New value of the first element
	 * @this Array
	 * @returns {*} First element
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.first = (value) => isNon(value) ? this[0] : this[0] = value;
	
	/**
	 * @description Get the last element of the array.
	 * @param {*} [value] New value of the last element
	 * @this Array
	 * @returns {*} Last element
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.last = (value) => isNon(value) ? this[this.length - 1] : this[this.length - 1] = value;
	
	/**
	 * @description Line of a 2D array.
	 * @param {number} [n=0] Index
	 * @returns {Array} Line
	 * @public
	 * @since 1.0
	 * @this Array
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.line = (n = 0) => {
	  return this.map((i) => {
	    if (n < 0) n = this[i].length - n;
	    return i[n];
	  });
	};
	
	/**
	 * @description Block of a 2D array.
	 * @param {number} [start=0] Starting index
	 * @param {number} [end=this.length-1] Ending index
	 * @returns {Array} Block
	 * @this Array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.block = (start = 0, end = this.length - 1) => this.map((i) => i.get(start, end));
	
	/**
	 * @description Returns the last index of the array.
	 * @this Array
	 * @returns {number} Last index
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.lastIndex = () => this.length - 1;
	
	/**
	 * @description Returns the middle index of the array.
	 * @param {boolean} [under=false] Indicates if we want the value under the virtual value
	 * @this Array
	 * @returns {number} Middle index
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.midIndex = (under) => under ? Math.floor(this.length / 2) - 1 : Math.floor(this.length / 2);
	
	/**
	 * @description Returns the values of the array that are in an even position.
	 * @this Array
	 * @returns {Array} Array of elements
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.even = () => this.filter((item, i) => i % 2 === 0);
	
	/**
	 * @description Returns the values of the array that are in an odd position.
	 * @this Array
	 * @returns {Array} Array of elements
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.odd = () => this.filter((item, i) => i % 2 != 0);
	
	/**
	 * @description Get the maximum value of the array.
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this Array
	 * @returns {*} Maximum value
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.max = (start = 0, end = this.length - 1) => {
	  let max = this[start];
	  if ((!start && !end) || (start === 0 && end >= this.length - 1)) for (let i = 1; i < this.length; i++) max = Math.max(max, this[i]);
	  else if (start && !end) for (let i = start + 1; i < this.length; i++) max = Math.max(max, this[i]);
	  else for (let i = start + 1; i <= end; i++) max = Math.max(max, this[i]);
	  return max
	};
	
	/**
	 * @description Get the maximum value of the array.
	 * @param {number} [start=0] Starting position
	 * @param {number} [n=this.length-1] Number of values
	 * @this Array
	 * @returns {*} Maximum value
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.maxOf = (start = 0, n = this.length - 1) => {
	  let max = this[start];
	  for (let i = start + 1; i <= n; i++) max = Math.max(max, this[i]);
	  return max
	};
	
	/**
	 * @description Get the median value of the array
	 * @param {*} [value] New value of the median cell
	 * @this Array
	 * @returns {*} Median
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.median = (value) => {
	  let arr = this.sort((a, b) => a - b);
	  let half = Math.floor(arr.length / 2);
	  return arr.length % 2 ? (value ? arr[half] = value : arr[half]) : (arr[half - 1] + arr[half]) / 2
	};
	
	/**
	 * @description Get the minimum value of the array.
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this Array
	 * @returns {*} Minimum value
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.min = (start = 0, end = this.length - 1) => {
	  let min = this[start];
	  if ((!start && !end) || (start === 0 && end >= this.length - 1)) for (let i = 1; i < this.length; i++) min = Math.min(min, this[i]);
	  else if (start && !end) for (let i = start + 1; i < this.length; i++) min = Math.min(min, this[i]);
	  else for (let i = start + 1; i <= end; i++) min = Math.min(min, this[i]);
	  return min
	};
	
	/**
	 * @description Get the minimum value of the array.
	 * @param {number} [start=0] Starting position
	 * @param {number} [n=this.length-1] Number of values
	 * @this Array
	 * @returns {*} Minimum value
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.minOf = (start = 0, n = this.length - 1) => {
	  let min = this[start];
	  for (let i = start + 1; i <= n; i++) min = Math.min(min, this[i]);
	  return min
	};
	
	/**
	 * @description Shuffles the array.
	 * @param {number} [n=this.length] Number of shuffles
	 * @this Array
	 * @returns {Array} Shuffled array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.shuffle = (n = this.length) => {
	  /* eslint no-unused-vars: "off" */
	  for (let i of n) [this[maths.randTo(this.length - 1)], this[maths.randTo(this.length - 1)]] = [this[maths.randTo(this.length - 1)], this[maths.randTo(this.length - 1)]];
	  /* eslint no-unused-vars: "error" */
	  return this;
	};
	
	/**
	 * @description Return the length of the longest row.
	 * @this Array
	 * @returns {number} Max length
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.maxLength = () => {
	  let ml = 0;
	  for (let row of this) ml = Math.max(ml, row.length);
	  return ml
	};
	
	/**
	 * @description Return the length of the shortest row.
	 * @this Array
	 * @returns {number} Min length
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.minLength = () => {
	  let ml = this[0].length;
	  for (let row of this) ml = Math.min(ml, row.length);
	  return ml
	};
	
	/**
	 * @description fill() for 2D arrays.
	 * @param {*} character Data
	 * @this Array
	 * @return {Array} The array post-modification
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.Fill2D = (character) => this.fill(new Array(this.length).fill(character));
	
	/**
	 * @description Remove a character/number/string from the array with(out) affecting the initial array.<br />
	 * It will automatically remove undefined and it goes bunckers when trying to remove objects
	 * @param {*} [character] Data to remove
	 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
	 * @this Array
	 * @returns {Array} Array after the operation
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.remove = (character, preserveInitial) => {
	  if (preserveInitial) {
	    return isNativeType(character, 'Array') ? character.map(c => this.filter(x => x != c || x != undefined)) : this.filter(x => x != character || x != undefined);
	  } else {
	    let pos = Copy(this.positions(character));
	    for (let i of pos) this.splice(i, 1);
	    return this;
	  }
	};
	
	/**
	 * @description Debug an array by displaying in the console each of its elements
	 * @this Array
	 * @returns {undefined}
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.debug = () => {
	  say(`%cDebugging the following array:%c ${this}`, 'text-decoration: bold', 'text-decoration: none');
	  this.map((cell, i) => say(`${i}: ${cell}`))
	};
	
	/**
	 * @description Get the number of occurrences of each elements in array as well as the position(s) of each occurrences
	 * @param {boolean} [simplified=false] Simplify the output
	 * @todo Fix the thingy with the occurrences' positions not showing up
	 * @this Array
	 * @returns {Array} Result
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.getOccurrences = (simplified = false) => {
	  let arr = misc.rmDuplicates(this), res = [];
	  for (let cell of arr) res.push(`${cell}: ${this.count(cell)} {${this.positions(cell).toStr(true)}}`);
	  if (simplified) {
	    for (let item of res) item = parseInt(item.replace(/(?:.*?):(\d+)\{(.*?)}/g, '$1'));
	  }
	  return res
	};
	
	/**
	 * @description Replace a character with another.
	 * @param {*} Ci Initial character
	 * @param {*} Cf Final character
	 * @param {boolean} toStr String representation
	 * @this Array
	 * @returns {Array|string} Result
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.replace = function (Ci, Cf, toStr = false) {
	  for (let item of this) {
	    if (item === Ci || (isNativeType(Ci, 'RegExp') && Ci.test(item))) item = Cf;
	  }
	  return toStr ? this.toString() : this;
	};
	
	/**
	 * @description Sum of every elements of the array.
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this Array
	 * @returns {number} Sum
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.sum = (start = 0, end = this.length - 1) => {
	  let s = 0;
	  if ((!start && !end) || (start === 0 && end >= this.length - 1)) for (let num of this) s += num;
	  else if (start && !end) for (let i = start; i < this.length; i++) s += this[i];
	  else for (let i = start; i <= end; i++) s += this[i];
	  return s
	};
	
	/**
	 * @description Product of every elements of the array.
	 * @param {number} [start=0] Staring position
	 * @param {number} [end=this.length-1] Ending position
	 * @this Array
	 * @returns {number} Product
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.prod = (start = 0, end = this.length - 1) => {
	  let p = 0;
	  if ((!start && !end) || (start === 0 && end >= this.length - 1)) for (let num of this) p *= num;
	  else if (start && !end) for (let i = start; i < this.length; i++) p *= this[i];
	  else for (let i = start; i <= end; i++) p *= this[i];
	  return p
	};
	
	/**
	 * @description Sum for 2D arrays.
	 * @param {number[]} [start=[0, 0]] Starting position
	 * @param {number[]} [end=[this.length-1, this[this.length-1].length-1]] Ending positions
	 * @returns {number} Sum
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.sum2d = (start = [0, 0], end = [this.length - 1, this.last().length - 1]) => {
	  let s = 0;
	  if ((!start && !end) || (start.equals([0, 0]) && end >= this.length - 1)) {
	    for (let i of this) {
	      for (let j of this[i]) s += this[i][j];
	    }
	  } else if (start && !end) {
	    for (let i = start[0]; i < this.length; i++) {
	      for (let j = start[1]; j < this[i].length; j++) s += this[i][j];
	    }
	  } else {
	    for (let i = start[0]; i < end[0]; i++) {
	      for (let j = start[1]; j < end[1]; j++) s += this[i][j];
	    }
	  }
	  return s
	};
	
	/**
	 * @description Mean of each elements or a portion of it.
	 * @param {number} [nbDec=2] Number of decimals
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @returns {number} Mean
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.mean = (nbDec = 2, start = 0, end = this.length - 1) => {
	  let sum = this.sum(start, end);
	  return (sum / (this.get(start, end).length)).toNDec(nbDec);
	};
	
	/**
	 * @description Mean of each elements.
	 * @param {number} [nbDec=2] Number of decimals
	 * @param {number} [start=0] Starting position
	 * @param {number} [n=this.length-start-1] Number of values to take into account
	 * @returns {number} Mean of N
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.meanOf = (nbDec = 2, start = 0, n = this.length - start - 1) => {
	  let sum = 0;
	  for (let i = 0; i < n; i++) sum += this[start + i];
	  return (sum / n).toNDec(nbDec);
	};
	
	/**
	 * @description Minimum mean of n of all the means of the values.
	 * @param {number} [n=this.length-1] Number of values for the mean of n
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {*} Minimum Mean of N
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {Error} n should be less than or equal to this.length
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.minMean = (n = this.length - 1, nbDec = 2) => {
	  if (this.length - (n - 1) < 0) throw new Error('You\'re expecting a minimum mean with more values than the are.');
	  let means = [];
	  for (let i = 0; i < n; i++) means.push(this.mean(nbDec, i, i + n - 1));
	  return means.min();
	};
	
	/**
	 * @description Maximum mean of n of all the means of the values.
	 * @param {number} [n=this.length-1] Number of values for the mean of n
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {*} Maximum Mean of N
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {Error} n should be less than or equal to this.length
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.maxMean = (n = this.length - 1, nbDec) => {
	  if (this.length - (n - 1) < 0) throw new Error('You\'re expecting a maximum mean with more values than the are.');
	  let means = [];
	  for (let i = 0; i < n; i++) means.push(this.mean(nbDec, i, n + i - 1));
	  return means.max();
	};
	
	/**
	 * @description Timewise (Speedcubing) average of each times.
	 * @param {number} [nbDec=2] Number of decimals
	 * @param {number} [start=0] Starting positions
	 * @param {number} [end=this.length-1] Ending positions
	 * @returns {number} Average
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.avg = (nbDec = 2, start = 0, end = this.length - 1) => {
	  let sum = this.sum(start, end) - this.max(start, end) - this.min(start, end);
	  return (sum / (this.get(start, end).length - 2)).toNDec(nbDec)
	};
	
	/**
	 * @description Timewise (Speedcubing) average of n times.
	 * @param {number} [nbDec=2] Number of decimals
	 * @param {number} [start=0] Starting positions
	 * @param {number} [n=this.length-start-1] Ending positions
	 * @returns {number} Average Of N
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.avgOf = (nbDec = 2, start = 0, n = this.length - start - 1) => {
	  let sum = 0;
	  for (let i = 0; i < n; i++) {
	    if (this[start + i] != this.maxOf(start, n) || this[start + i] != this.minOf(start, n + 1)) sum += this[start + i];
	  }
	  return (sum / (n - 2)).toNDec(nbDec)
	};
	
	/**
	 * @description Minimum time-wise average of n of all the means of the times.
	 * @param {number} [n=this.length-1] Number of times for the mean of n
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {*} Minimum Average of N
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {Error} n should be less than or equal to this.length
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.minAvg = (n = this.length - 1, nbDec = 2) => {
	  if (this.length - (n - 1) < 0) throw new Error('You\'re expecting a minimum average with more values than the are.');
	  let avgs = [];
	  for (let i = 0; i < n; i++) avgs.push(this.avg(nbDec, i, i + n - 1));
	  return avgs.min();
	};
	
	/**
	 * @description Maximum time-wise average of n of all the means of the times.
	 * @param {number} [n=this.length-1] Number of times for the mean of n
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {*} Maximum Average of N
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {Error} n should be less than or equal to this.length
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.maxAvg = (n = this.length - 1, nbDec = 2) => {
	  if (this.length - (n - 1) < 0) throw new Error('You\'re expecting a maximum average with more values than the are.');
	  let avgs = [];
	  for (let i = 0; i < n; i++) avgs.push(this.avg(nbDec, i, n + i - 1));
	  return avgs.max();
	};
	
	/**
	 * @description Variance.
	 * @this Array
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {number} Variance
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.letiance = (nbDec = 2) => (maths.sumPow2(this, nbDec) / this.length - Math.pow(this.mean(nbDec), 2)).toNDec(nbDec);
	
	/**
	 * @description Standard deviation.
	 * @this Array
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {number} Standard deviation
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.stddev = (nbDec = 2) => Math.sqrt(this.letiance(nbDec)).toNDec(nbDec);
	
	/**
	 * @description Get a random cell of the array.
	 * @param {number} [n] Number of random elements to be returned
	 * @this Array
	 * @returns {*} Random element(s)
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.rand = (n) => {
	  if (n && n > 0) {
	    let res = [];
	    for (let i = 0; i < n; i++) res.push(this.rand());
	    return res
	  } else return this[maths.lenRand(this.length)]
	};
	
	/**
	 * @description Quartile (Q<sub>1</sub>, Q<sub>2</sub>, Q<sub>3</sub>).
	 * @param {number} n Nth quartile
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {*} Nth quartile
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.quartile = (n, nbDec = 2) => this.length % 2 === 0 ? ((this[Math.floor(n * this.length / 4) - 1] + this[Math.floor(n * this.length / 4)]) / 2).toNDec(nbDec) : (this[Math.floor(n * this.length / 4)]).toNDec(nbDec);
	
	/**
	 * @description Quintile (Q<sub>1</sub>, ..., Q<sub>4</sub>)
	 * @param {number} n Nth quintile
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {*} Nth quintile
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.quintile = (n, nbDec = 2) => this.length % 2 === 0 ? ((this[Math.floor(n * this.length / 5) - 1] + this[Math.floor(n * this.length / 5)]) / 2).toNDec(nbDec) : (this[Math.floor(n * this.length / 5)]).toNDec(nbDec);
	
	/**
	 * @description Decile (D<sub>1</sub>, ..., D<sub>9</sub>).
	 * @param {number} n Nth decile
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {*} Nth decile
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.decile = (n, nbDec = 2) => this.length % 2 === 0 ? ((this[Math.floor(n * this.length / 10) - 1] + this[Math.floor(n * this.length / 10)]) / 2).toNDec(nbDec) : (this[Math.floor(n * this.length / 10)]).toNDec(nbDec);
	
	/**
	 * @description Percentile (P<sub>1</sub>, ..., P<sub>99</sub>).
	 * @param {number} n Nth percentile
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {*} Nth percentile
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.percentile = (n, nbDec = 2) => this.length % 2 === 0 ? ((this[Math.floor(n * this.length / 100) - 1] + this[Math.floor(n * this.length / 100)]) / 2).toNDec(nbDec) : (this[Math.floor(n * this.length / 100)]).toNDec(nbDec);
	
	/**
	 * @description Get the average increment between the values of the array.
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {Number} Increment
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.getIncrement = (nbDec = 2) => nbDec == 0 ? parseInt(((this.max() - this.min()) / (this.length - 1))) : ((this.max() - this.min()) / (this.length - 1)).toNDec(nbDec);
	
	/**
	 * @description Increment every elements by n.
	 * @param {number} [n=1] Increment value
	 * @returns {undefined}
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.increment = (n = 1) => {
	  for (let num of this) num += n;
	};
	
	/**
	 * @description Inter Quartile Range.
	 * @param {number} [nbDec=2] Number of decimals
	 * @this Array
	 * @returns {number} IQR
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.iqr = (nbDec = 2) => this.quartile(3, nbDec) - this.quartile(1, nbDec).toNDec(nbDec);
	
	/**
	 * @description Get the sub/full-array.
	 * @param {number} [start=0] Starting position
	 * @param {number} end Ending position
	 * @this Array
	 * @returns {Array} Resulting sub-array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 * @see module:dsa~get
	 */
	Array.prototype.get = (start = 0, end) => dsa.get(this, start, end);
	
	/**
	 * @description Clean the array by removing undesirable items.
	 * @param {boolean} [noDuplic=false] No duplicates
	 * @this Array
	 * @returns {Array} Cleaned array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.clean = (noDuplic = false) => {
	  let arr = this.filter(x => !isNon(x));
	  return noDuplic ? misc.rmDuplicates(arr).remove() : arr; //Take off (or not) duplicates of actual values and double clean it
	};
	
	
	/**
	 * @description Substitute every elements from <code>start</code> to <code>end</code> with from <code>s</code> to
	 * <code>end</code> of the array <code>arr</code>.
	 * @param {Array} arr Array
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this Array
	 * @returns {Array} Modified array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.chg = (arr, start = 0, end = this.length - 1) => {
	  let thisArr = this.get(start, end), otherArr = arr.get(start, end);
	  return thisArr.map((item, i) => otherArr[i])
	};
	
	/**
	 * @description Rotate an array by $deg%90 deg
	 * @param {number} deg Degree of rotation
	 * @todo Finish the section for 4x4+ matrices
	 * @this Array
	 * @returns {Array} Rotated array
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {Error} deg isn't a multiple of 90°
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.rot = (deg) => {
	  if (deg % 90 != 0) throw new Error('The absolute degree of rotation must be either 90° or 180°');
	  if (this.numElm() === 4 && this.length === 2) { //2x2 matrix
	    if (deg === 90) [this[0][0], this[1][0], this[1][1], this[0][1]] = [this[1][0], this[1][1], this[0][1], this[0][0]];
	    else if (deg === -90) [this[0][0], this[0][1], this[1][1], this[1][0]] = [this[0][1], this[1][1], this[1][0], this[0][0]];
	    else if (Math.abs(deg) === 180) [this[0][0], this[1][1], this[0][1], this[1][0]] = [this[1][1], this[0][0], this[1][0], this[0][1]];
	  } else if (this.numElm() === 9 && this.length === 3) { //3x3 matrix
	    if (deg === 90) {
	      [this[0][0], this[2][0], this[2][2], this[0][2]] = [this[2][0], this[2][2], this[0][2], this[0][0]];
	      [this[0][1], this[1][0], this[2][1], this[1][2]] = [this[1][0], this[2][1], this[1][2], this[0][1]];
	    } else if (deg == -90) {
	      [this[0][0], this[0][2], this[2][2], this[2][0]] = [this[0][2], this[2][2], this[2][0], this[0][0]];
	      [this[0][1], this[1][2], this[2][1], this[1][0]] = [this[1][2], this[2][1], this[1][0], this[0][1]];
	    } else if (Math.abs(deg) === 180) {
	      [this[0][0], this[2][2], this[0][2], this[2][0]] = [this[2][2], this[0][0], this[2][0], this[0][2]];
	      [this[0][1], this[2][1], this[1][0], this[1][2]] = [this[2][1], this[0][1], this[1][2], this[1][0]];
	    }
	  } else if (this.numElm() === 16 && this.length === 4) { //4x4 matrix although I'm trying to make this as responsive as I can for 4x4+ matrices
	    if (deg === 90) {
	      let tmp = this[0].get(-1); //Get all but the last element of the first row
	      /**
	       * @todo fix the weird error here and replace 1 by this.length/2 or whatever suits better
	       */
	      for (let j = 0; j < 1/*this.length / 2*/; j++) { //Weird error
	        tmp = this[j].get(-1);
	        for (let i = 0; i < this.maxLength() - 1; i++) {
	          //if (j > 0) Essence.say('#' + i);
	          //if (j > 0) Essence.say(this[j][i] + '<-' +  this[this.length - 1 - i][j]);
	          this[j][i] = this[this.length - 1 - i][j];
	          //if (j > 0) Essence.say(this[this.length - 1 - i][j] + '<-' +  this[this.length - 1 - j][this.length - 1 - i]);
	          this[this.length - 1 - i][j] = this[this.length - 1 - j][this.length - 1 - i];
	          //if (j > 0) Essence.say(this[this.length - 1 - j][this.length - 1 - i] + '<-' +  this[i][this.length - 1 - j]);
	          this[this.length - 1 - j][this.length - 1 - i] = this[i][this.length - 1 - j];
	          //if(j > 0) Essence.say(this[i][this.length - 1 - j] + '<-' +  tmp[i]);
	          this[i][this.length - 1 - j] = tmp[i];
	        }
	      }
	    } else if (deg === -90) {
	      let tmp = [this[0][0], this[0][1]];
	      this[0][0] = this[0].last();
	      this[0].last(this.last().last());
	      this.last().last(this.last()[0]);
	      this.last()[0] = tmp[0];
	      this[0][1] = this[1].last();
	      this[1].last(this.last()[1]);
	      this.last()[1] = this[1][0];
	      this[1][0] = tmp[1];
	    } else if (Math.abs(deg) === 180) {
	      let tmp = [this[0][0], this[0][1], this[0].last(), this[1][0]];
	      this[0][0] = this.last().last();
	      this.last().last(tmp[0]);
	      this[0].last(this.last()[0]);
	      this.last()[0] = tmp.last();
	      this[0][1] = this.last()[1];
	      this.last()[1] = tmp[1];
	      this[1][0] = this[1].last();
	      this[1].last(tmp[3]);
	    }
	  } else throw 'Unsupported matrix. Please wait or contact the developer to add this matrix\' support.';
	  return this
	};
	
	/**
	 * @description Number of elements.
	 * @this Array
	 * @returns {number} Number of elements
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.numElm = () => this.linearise().length;
	
	
	/**
	 * @description Size of the array.
	 * @summary Get the width * height size of the array
	 * @param {boolean} [str=false] String format or not
	 * @this Array
	 * @returns {string|number[]} Size
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.size = (str) => str ? this.length + 'x' + this.maxLength() : [this.length, this.maxLength()];
	
	/**
	 * @description Determinant of the matrix.
	 * @this Array
	 * @returns {number} Determinant
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.det = () => {
	  let d = 0;
	  if (this.numElm() === 4 && this.length === 2) d = this[0][0] * this[1][1] - this[0][1] * this[1][0];
	  else if (this.numElm() === 9 && this.length === 3) {
	    d = this[0][0] * (this[1][1] * this.last().last() - this[1].last() * this.last()[1]) - this[0][1] * (this[1][0] * this.last().last() - this[1].last() * this.last()[0]) + this[0].last() * (this[1][0] * this.last()[1] - this[1][1] * this.last()[0]);
	  } else throw new Error('Unsupported matrix format');
	  return d
	};
	
	/**
	 * @description Translate the array.
	 * @this Array
	 * @returns {Array} Translated array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.translate = function () {
	  if (this.size()[0] === this.size()[1]) { //NxN
	    for (let i = 0; i < Math.round(this.length / 2); i++) {
	      for (let j = 0; i < this[0].length; j++) {
	        if (!(1 === i && 0 === j && this[0].length > 2)) [this[i][j], this[j][i]] = [this[j][i], this[i][j]];
	      }
	    }
	    if (this.size(true) === '4x4') {
	      let elA = this.last()[2], elB = this[2].last();
	      [elB, elA] = [elA, elB];
	    }
	  } else { //NxM
	    let arr = new Array(this.maxLength()).fill([]);
	    for (let i = 0; i < this.maxLength(); i++) arr[i] = this.line(i)
	    return arr;
	  }
	  return this
	};
	
	/**
	 * @description Look for some <code>x</code> in the array.
	 * @param {*} x Element looked for
	 * @returns {number} Position of the element
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.lookFor = (x) => {
	  for (let item of this) {
	    if (item === x || item.equals(x)) return item;
	  }
	  return -1
	};
	
	/**
	 * @description Divide the array into an array with n-sized cells.
	 * @this Array
	 * @param {number} n Size of each chunks
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.divide = (n) => {
	  let res = new Array(Math.round(this.length / n)).fill(''), k = 0;
	  for (let num of res) {
	    for (let j = 0; j < n; j++) num += this[k++];
	  }
	  return res
	};
	
	/**
	 * @description Adjoint of the matrix.
	 * @this Array
	 * @returns {Array} Adjoint matrix
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 * @todo Add the support for 4x4+ matrices
	 */
	Array.prototype.getAdjoint = () => {
	  let m = this.translate(), res = mkArray(this.length, 2, maths.EPS);
	  //+-+
	  //-+-
	  //+-+
	  if (m.numElm() === 4 && m.length === 2) {
	    res[0] = [m[1][1], -m[1][0]];
	    res[1] = [-m[0][1], m[0][1]];
	  } else if (m.numElm() === 9 && m.length === 3) {
	    res[0] = [m[1][1] * m.last().last() - m[1].last() * m.last()[1], -(m[1][0] * m.last().last() - m[1].last() * m.last()[0]), m[1][0] * m.last()[1] - m[1][1] * m.last()[0]];
	    res[1] = [-(m[0][1] * m[1].last() - m[0].last() * m[1][1]), m[0][0] * m.last().last() - m[0].last() * m.last()[0], -(m[0][0] * m.last()[1] - m[0][1] * m.last()[0])];
	    res.last([m[0][1] * m[1].last() - m[0].last() * m[1][1], -(m[0][0] * m[1].last() - m[0].last() * m[1][0]), m[0][0] * m[1][1] - m[0][1] * m[1][0]]);
	  } else throw new Error('Unsupported matrix format');
	  return res
	};
	
	/**
	 * @description Invertibility check.
	 * @this Array
	 * @returns {boolean} Is it invertible ?
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.isInvertible = () => this.det() != 0;
	
	/**
	 * @description Dot product.
	 * @param {number} scalar Scalar
	 * @this Array
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.dotProd = (scalar) => {
	  let res = [];
	  for (let i = 0; i < this.length; i++) {
	    res[i] = [];
	    for (let j = 0; j < this[i].length; j++) res[i][j] = this[i][j] * scalar;
	  }
	  return res
	};
	
	/**
	 * @description Dot addition.
	 * @param {number} scalar Scalar
	 * @this Array
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.dotAdd = (scalar) => {
	  let res = [];
	  for (let i = 0; i < this.length; i++) {
	    res[i] = [];
	    for (let j = 0; j < this[i].length; j++) res[i][j] = scalar + this[i][j];
	  }
	  return res
	};
	
	/**
	 * @description Dot subtraction.
	 * @param {number} scalar Scalar
	 * @param {string} [order='a-b'] Order (a-b: scalar-this[...], b-a: this[...]-a)
	 * @this Array
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.dotSub = (scalar, order = 'a-b') => {
	  let res = [];
	  for (let i = 0; i < this.length; i++) {
	    res[i] = [];
	    for (let j = 0; i < this[i].length; j++) res[i][j] = order === 'a-b' ? scalar - this[i][j] : this[i][j] - scalar;
	  }
	  return res
	};
	
	/**
	 * @description Dot fraction.
	 * @param {number} scalar Scalar
	 * @param {string} [order='a/b'] Order (a/b: scalar/this[...], b/a: this[...]/a)
	 * @this Array
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.dotFrac = (scalar, order = 'a/b') => {
	  let res = [];
	  for (let i = 0; i < this.length; i++) {
	    res[i] = [];
	    for (let j = 0; i < this[j].length; j++) res[i][j] = order === 'a/b' ? scalar / this[i][j] : this[i][j] / scalar;
	  }
	  return res
	};
	
	
	/**
	 * @description Array[]([]) to String.
	 * @param {boolean} [clean=false] Clean output
	 * @this Array
	 * @returns {string} String representation
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.toStr = (clean = false) => {
	  if (is2dArray(this)) {
	    let str = '';
	    for (let i of this) {
	      str += clean ? this[i].join(', ') : this[i].join('');
	    }
	    return str
	  } else return this.join(clean ? ', ' : '')
	};
	
	
	/**
	 * @description Number[] to Number.
	 * @returns {number} Integer representation
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.toInt = () => {
	  let n = 0;
	  for (let i of this) {
	    n += this[i] * Math.pow(10, this.length - i - 1);
	  }
	  return n
	};
	
	/**
	 * @description Invert the matrix.
	 * @this Array
	 * @returns {?Array} Inverse
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.inv = () => this.isInvertible() ? this.dotProd(1 / this.det() * this.getAdjoint()) : null;
	
	/**
	 * @description Mix up the array.
	 * @this Array
	 * @returns {Array} Mixed array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.mix = () => {
	  let randPos = maths.mixedRange(0, 1, this.length - 1, true), res = [];
	  for (let i of this) res[i] = this[randPos[i]];
	  return res
	};
	
	/**
	 * @description Mix the array a little bit.
	 * @this Array
	 * @returns {Array} Mixed array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.littleMix = () => {
	  let res = [], inc;
	  if (is2dArray(this)) {
	    res = Copy(this).linearise();
	    res = res.littleMix().toNcol(this.size()[1]).sanitise(getNativeType(this[0][0])); //Assuming all cells are of the same type
	  } else {
	    inc = this.getIncrement(0);
	    for (let i of this) {
	      let rd = maths.randTo(inc);
	      res.push(this[i]);
	      if (i > 0 && rd === 0) [res[i], res[i - 1]] = [res[i - 1], res[i]];
	      else if (i > 1 && rd === inc) [res[i], res[i - 2]] = [res[i - 2], res[i]];
	    }
	  }
	  return res
	};
	
	/**
	 * @description Unshift that adds element of an array instead of the array itself.
	 * @this Array
	 * @param {Array} arr Array used to prepend
	 * @returns {Array} New array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.prepend = (arr) => {
	  for (let i of arr) this.unshift(arr[i]);
	  return this;
	};
	
	
	/**
	 * @description List of unique elements of the array.
	 * @this Array
	 * @returns {Array} Array of unique elements
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.unique = () => this.filter(x => this.count(x) === 1);
	
	/**
	 * @description N-D array to 1D array.
	 * @param {boolean} [jointer=false] Jointer
	 * @returns {Array} res Resulting 1D array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.to1d = (jointer) => {
	  let res = Copy(this);
	  for (let i of res) res[i] = res[i].join(jointer || '');
	  return res
	};
	
	
	/**
	 * @description 1D array to N-D array.
	 * @param {number} [n=2] Dimension
	 * @this Array
	 * @returns {Array} Resulting N-D array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.toNd = (n = 2) => {
	  let size = maths.nthroot(this.length, n, 0), res = [], k = 0; //Size of the size^n
	  for (let i = 0; i < size; i++) {
	    res[i] = [];
	    for (let j = 0; j < size; j++) res[i][j] = this[k++];
	  }
	  return res;
	};
	
	/**
	 * @description 1D array to N-column array.
	 * @param {number} [n=2] Number of columns
	 * @this Array
	 * @returns {Array} Resulting array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.toNcol = (n = 2) => {
	  let res = [], k = 0;
	  for (let i = 0; i < this.length / n; i++) {
	    res[i] = [];
	    for (let j = 0; j < n; j++) res[i][j] = this[k++];
	  }
	  return res;
	};
	
	/**
	 * @description 1D array to N-row array.
	 * @param {number} [n=2] Number of rows
	 * @this Array
	 * @returns {Array} Resulting array
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.toNrow = (n = 2) => {
	  let res = [], k = 0;
	  for (let i = 0; i < n; i++) {
	    res[i] = [];
	    for (let j = 0; j < this.length / n; j++) res[i][j] = this[k++];
	  }
	  return res;
	};
	
	/**
	 * @description Linear 1D array.
	 * @this Array
	 * @returns {Array} Linearised array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.linearise = () => this.toString().split(',');
	
	/**
	 * @description Ensure that all the elements are of the same length.
	 * @param {NumberLike} [cr=' '] Filler
	 * @returns {Array} Uniformed array
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.uniform = (cr = ' ') => {
	  let res = this, ml = res.maxLength();
	  for (let i of res) {
	    while (res[i].length < ml) isNativeType(res[i], 'Array') ? res[i].push(cr) : res[i] += cr;
	  }
	  return res
	};
	
	/**
	 * @description Zip the array.
	 * @this Array
	 * @returns {Array} Zipped array
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.zip = () => {
	  let res = [], j;
	  for (let i of this) {
	    if (this[i] === this[i + 1]) {
	      j = 1;
	      while (this[i] === this[i + j]) j++;
	      res.push(this[i] + '@' + j);
	      i += j - 1;
	    } else res.push(this[i]);
	  }
	  return res.length < this.length ? res : this; //Make sure that the compressed array isn't longer than the initial one
	};
	
	/**
	 * @description Unzip the array.
	 * @param {boolean} [noPairs=false] Keep pairs or not ?
	 * @this Array
	 * @returns {Array} Unzipped array
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.unzip = (noPairs = false) => {
	  let res = [];
	  for (let i of this) {
	    if (/[\S\s](@)(\d+)/g.test(this[i])) res.push(this[i][0].repeat(this[i][this[i].indexOf('@') + 1]));
	    else res.push(this[i]);
	  }
	  return noPairs ? res.join('').split('') : res;
	};
	
	
	/**
	 * @description Trim the array.
	 * @param {string} side Side
	 * @this Array
	 * @returns {Array} res Trimed array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.trimAll = (side) => {
	  let res = [];
	  side = side ? side[0].toLowerCase() : '';
	  for (let i of this) res[i] = (side === 'l') ? this[i].trimLeft() : ((side === 'r') ? this[i].trimRight() : this[i].trim());
	  return res
	};
	
	/**
	 * @description Sorted state check.
	 * @this Array
	 * @returns {boolean} Sorted or not
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.isSorted = () => {
	  if (this[0] > this[1]) return false;
	  for (let i = 1; i < this.length; i++) {
	    if (this[i] > this[i + 1]) return false
	  }
	  return true
	};
	
	/**
	 * @description Ensure that the element isn't pushed when it's already there.
	 * @this Array
	 * @param {*} obj Object
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.uniquePush = (obj) => {
	  if (isNativeType(obj, 'Array')) {
	    for (let i of obj) {
	      if (this.miss(obj[i])) this.push(obj[i]);
	    }
	  } else this.push(obj);
	};
	
	/**
	 * @description Neighbour check.
	 * @param {Nums} y Row number
	 * @param {Nums} x Column number
	 * @returns {Array} Neighbours
	 * @public
	 * @since 1.0
	 * @method
	 * @throws {RangeError} y|x is too big
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.neighbour = function (y, x) {
	  let n = [], seq;
	  if (isNativeType(y, 'Array')) {
	    x = parseInt(y[1]);
	    y = parseInt(y[0]);
	  } else {
	    y = parseInt(y);
	    x = parseInt(x);
	  }
	  if (y >= this.length) throw new RangeError('The y-coord is out of bounds');
	  if (x >= this.maxLength()) throw new RangeError('The x-coord is out of bounds');
	  if (is2dArray(this)) {
	    seq = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
	    for (let i of seq) {
	      try {
	        if (!isNon(this[y + seq[i][0]][x + seq[i][1]])) n.push(this[y + seq[i][0]][x + seq[i][1]]);
	      } catch (err) {
	        say(`Neighbour check: ${err.message}`, 'error');
	      }
	    }
	  } else {
	    try {
	      n.push(this[y - 1]);
	    } catch (err) {
	      say(`Neighbour check: ${err.message}`, 'error');
	    }
	    try {
	      n.push(this[y + 1]);
	    } catch (err) {
	      say(`Neighbour check: ${err.message}`, 'error');
	    }
	  }
	  return n;
	};
	
	/**
	 * @description Make sure all the cells are of the right type.
	 * @param {string} type Type
	 * @this Array
	 * @returns {Array} Sanitised array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.sanitise = (type) => {
	  for (let row of this) {
	    for (let cell of row) cell = misc.name2Type(type, cell);
	  }
	  return this;
	};
	
	/**
	 * @description Get a portion of the array.
	 * @param {number} [denominator=2] How many parts (half by default)
	 * @param {number} [numerator=1] Position of the part (1st half by default)
	 * @returns {Array} Portion of the array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.portion = (denominator = 2, numerator = 1) => {
	  return (this.length % 2 === 0) ? this.get(numerator * Math.round(this.length) / denominator) : this.get(Math.floor(numerator * Math.floor(this.length) / denominator));
	};
	
	/**
	 * @description Remove the first element <code>n</code> of the array (so not all values equal to n).
	 * @param {*} n Element
	 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
	 * @returns {Array.<*>} Array without that first element n
	 * @see external:Array.remove
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.removeFirst = (n, preserveInitial) => {
	  return preserveInitial ? this.filter((x, i) => x != n || i != this.indexOf(n)) : this.splice(this.indexOf(n), 1);
	};
	
	/**
	 * @description Remove the last element <code>n</code> of the array (so not all values equal to n).
	 * @param {*} n Element
	 * @param {boolean} [preserveInitial] Flag indicating whether the initial array is going to remain unchanged
	 * @return {Array.<*>} Array without that last element n
	 * @see external:Array.remove
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 */
	Array.prototype.removeLast = (n, preserveInitial) => {
	  return preserveInitial ? this.filter((x, i) => x != n || i != this.lastIndexOf(n)) : this.splice(this.lastIndexOf(n), 1);
	};
	
	/**
	 * @description Performs a binary search on the host array.<br />
	 * Source: {@link http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/}
	 * @param {*} searchElement The item to search for within the array.
	 * @return {number} The index of the element which defaults to -1 when not found.
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 * @this Array
	 */
	
	Array.prototype.binaryIndexOf = (searchElement) => {
	  let minIndex = 0, maxIndex = this.length - 1, currentIndex, currentElement, resultIndex;
	
	  while (minIndex <= maxIndex) {
	    resultIndex = currentIndex = (minIndex + maxIndex) >> 1;
	    currentElement = this[currentIndex];
	
	    if (currentElement < searchElement) minIndex = currentIndex + 1;
	    else if (currentElement > searchElement) maxIndex = currentIndex - 1;
	    else return currentIndex;
	  }
	
	  return ~maxIndex;
	};
	
	
	/**
	 * @description Place an item at the right place (to not mess up the order).
	 * @param {*} n Term to place
	 * @returns {Array} Modified array
	 * @this Array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 * @example
	 * var arr = [0, 1, 2, 4];
	 * arr.place(3); //arr = [0, 1, 2, 3, 4]
	 */
	Array.prototype.place = (n) => this.splice(Math.abs(this.binaryIndexOf(n)), 0, n);
	
	/**
	 * @description Place items of an array at the right places (to not mess up the order).
	 * @param {Array} arr Array containing the terms to place
	 * @returns {Array} Modified array
	 * @this Array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Array.prototype
	 * @external Array
	 * @example
	 * var arr = [0, 1, 2, 4, 8];
	 * arr.multiPlace([3, 5, 6, 7, 9]); //arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	 */
	Array.prototype.multiPlace = (arr) => {
	  for (let i of arr) this.place(arr[i]);
	  return this;
	};
	
	/**
	 * @description Check if the string contains a character.
	 * @inheritdoc
	 * @param {*} val Character
	 * @returns {boolean} Containment check result
	 * @this String
	 * @public
	 * @method
	 * @since 1.0
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.contains = Array.prototype.contains;
	
	/**
	 * @description Check if the string doesn't contains a character.
	 * @inheritdoc
	 * @param {*} val Character
	 * @returns {boolean} Containment check result
	 * @this String
	 * @public
	 * @method
	 * @since 1.0
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.miss = Array.prototype.miss;
	
	/**
	 * @description Get the last element of the string.
	 * @inheritdoc
	 * @param {*} [nval] New value of the last element
	 * @this String
	 * @returns {*} Last element
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.last = (nval) => this.split('').last(nval);
	
	/**
	 * @description Splice for strings.
	 * @param {number} index Index of the splice
	 * @param {number} count Number of elements of counted elements
	 * @param {NumberLike} [add=''] Added numbers/characters
	 * @returns {string} Spliced string
	 * @this String
	 * @public
	 * @since 1.0
	 * @public
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.splice = (index, count, add = '') => {
	  if (index < 0) {
	    index = this.length + index;
	    if (index < 0) index = 0;
	  }
	  return this.slice(0, index) + (add) + this.slice(index + count);
	};
	
	/**
	 * @description Remove the character <code>c</code> from the string.
	 * @param {string} character Character
	 * @this String
	 * @returns {string} Resulting string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.remove = (character) => {
	  let str = this;
	  if (isNativeType(character, 'Array')) {
	    for (let i of character) str = str.remove(i);
	    return str;
	  } else {
	    let v = str.split(character).map((x) => x === character ? undefined : x).join('');
	    return v.has(undefined) ? str.remove() : v
	  }
	};
	
	/**
	 * @description A FP fix that preserve for Number like strings.
	 * @param {NumberLike} [n=2] Number of decimals
	 * @this String
	 * @returns {string} Floating point number
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.toNDec = (n = 2) => Number(this).toFixed(n);
	
	/**
	 * @description to N digits.
	 * @param {number} [n=2] Number of digits
	 * @this String
	 * @returns {String} Resulting string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.toNDigits = (n = 2) => {
	  let i = this;
	  if (parseFloat(i) < Math.pow(10, n - 1)) {
	    while (i.split('.')[0].length < n) i = '0' + i;
	  }
	  return i
	};
	
	/**
	 * @description Mix the string/
	 * @param {string} separator Separation character
	 * @param {string} jointer Joining character
	 * @this String
	 * @returns {string} Mixed string
	 * @memberof String.prototype
	 * @external String
	 * @public
	 * @since 1.0
	 */
	String.prototype.mix = (separator = '', jointer = separator) => {
	  let randPos = maths.mixedRange(0, 1, this.length - 1), iStr = this.split(separator), fStr = [];
	  for (let i = 0; i < this.length; i++) fStr[i] = iStr[randPos[i]];
	  return fStr.join(jointer)
	};
	
	/**
	 * @description Divide the string into n-sized chunks.
	 * @this String
	 * @param {number} n Number of chunks
	 * @returns {string[]} Divided string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.divide = (n) => {
	  let res = new Array(Math.round(this.length / n)).fill(''), k = 0;
	  for (let character = 0; character < res.length; character++) {
	    for (let j = 0; j < n; j++) character += this[k++];
	  }
	  return res
	};
	
	/**
	 * @description Capitalize the first letter(s).
	 * @param {boolean} [whole=false] Every words or just the first one
	 * @this String
	 * @returns {string} String
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.capitalize = (whole = false) => {
	  let res = this.toString(); //Because it will return the String object rather than the actual string
	  if (whole) {
	    let str = res.split(' ');
	    for (let character of str) character = character.capitalize();
	    return str.join(' ')
	  } else return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	
	/**
	 * @description Ascii sum.
	 * @this String
	 * @returns {number} Ascii sum
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.sum = () => {
	  let sum = 0;
	  for (let i = 0; i < this.length; i++) sum += this.charCodeAt(i);
	  return sum
	};
	
	/**
	 * @description Ascii product.
	 * @this String
	 * @returns {number} Ascii product
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.prod = () => {
	  let prod = 1;
	  for (let i = 0; i < this.length; i++) prod *= this.charCodeAt(i);
	  return prod
	};
	
	/**
	 * @description Ascii mean.
	 * @this String
	 * @returns {number} Mean
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.mean = () => this.map(character => character.charCodeAt(0)).mean(2);
	
	/**
	 * @description Normalise the string.
	 * @this String
	 * @returns {string} Normalised string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.normal = () => this.toLowerCase().remove();
	
	/**
	 * @description Get the occurrences of each characters as well as their positions.
	 * @type {Array.getOccurrences|*}
	 * @returns {undefined}
	 * @public
	 * @since 1.0
	 * @method
	 * @see external:Array.prototype.getOccurrences
	 * @inheritdoc
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.getOccurrences = Array.prototype.getOccurrences;
	
	/**
	 * @description Get a portion of the string.
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this String
	 * @returns {string} Resulting string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 * @see module:dsa~get
	 */
	String.prototype.get = (start = 0, end) => dsa.get(this, start, end);
	
	/**
	 * @description Zip/compress the string.
	 * @this String
	 * @returns {string} Zipped string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.zip = () => {
	  let res = '', j;
	  for (let i = 0; i < this.length; i++) {
	    if (this[i] === this[i + 1]) {
	      j = 1;
	      while (this[i] === this[i + j]) j++;
	      res += this[i] + '@' + j;
	      i += j - 1;
	    } else res += this[i];
	  }
	  return res.length < this.length ? res : this; //Make sure that the compression doesn't end up making the string longer
	};
	
	/**
	 * @description Unzip the string.<br />
	 * Decompress the string (when being compressed using String.zip()) with(out) pairs.
	 * @param {boolean} [noPairs=false] Pairs or not ?
	 * @this String
	 * @returns {string} Unzipped string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.unzip = (noPairs) => {
	  let res = '';
	  for (let i = 0; i < this.length; i++) {
	    if (/[\S\s](\@)(\d+)/g.test(this[i])) res += this[i][0].repeat(this[i][this[i].indexOf('@') + 1]);
	    else res += this[i];
	  }
	  return noPairs ? res.split('').join('') : res;
	};
	
	/**
	 * @description Chunk the string into substrings of words.
	 * @param {number} [start=0] Starting position
	 * @param {number} [end=this.length-1] Ending position
	 * @this String
	 * @returns {string} Chunked string
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.chunk = (start = 0, end) => this.split(' ').get(start, end).join(' ');
	
	/**
	 * @description Return the chunk that is the same at the beginning of both string.
	 * @param {string} str String
	 * @this String
	 * @returns {string} Same string
	 * @method
	 * @public
	 * @since 1.0
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.sameFirst = (str) => {
	  let sf = '', pos = -1;
	  while (pos <= Math.min(this.length, str.length)) {
	    pos++;
	    if (this[pos] === str[pos]) sf += this[pos];
	    else break;
	  }
	  return sf;
	};
	
	/**
	 * @description Return the chunk that is the same at the end of both string.
	 * @param {string} str String
	 * @this String
	 * @returns {string} Same string
	 * @method
	 * @public
	 * @since 1.0
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.sameLast = (str) => {
	  let sl = '', pos = 1, minLen = Math.min(this.length, str.length);
	  while (pos <= minLen) {
	    if (this[this.length - pos] === str[str.length - pos]) sl = this[this.length - pos] + sl;
	    else break;
	    pos++;
	  }
	  return sl;
	};
	
	/**
	 * @description String equivalent of Array.map.
	 * @param {Function} cb Callback function
	 * @param {string} [sep=''] Seperator/jointor
	 * @return {string} Mapped string
	 * @memberof String.prototype
	 * @public
	 * @since 1.0
	 * @method
	 * @external String
	 * @this String
	 */
	String.prototype.map = (cb, sep = '') => this.split(sep).map(cb).join(sep);
	
	/**
	 * @description Reverse a string/
	 * @memberOf String.prototype
	 * @param {string} [splitter=''] Splitting/joining string
	 * @return {string} Reversed string
	 * @method
	 * @public
	 * @since 1.0
	 * @external String
	 * @this String
	 */
	String.prototype.reverse = (splitter = '') => this.split(splitter).reverse().join(splitter);
	
	/**
	 * @description Minify a string/code.
	 * @param {boolean} [noComment=false] Remove HTML/CSS like comments
	 * @param {boolean} [noSpace=false] Remove spaces
	 * @method
	 * @public
	 * @since 1.0
	 * @external String
	 * @return {string} Minified version of the string/code
	 */
	String.prototype.minify = (noComment = false, noSpace = false) => {
	  let min = noSpace ? this.trim().replace(/(\t|\n|\s)/gm, '') : this.trim().replace(/(\t|\n|\s{2,})/gm, '');
	  return noComment ? min.replace(/(<!--(.*?)-->|\/\*+(.*?)\*+\/)/gm, '') : min;
	};
	
	/**
	 * @description Get a portion of the string.
	 * @inheritdoc
	 * @param {number} [denominator=2] How many parts (halfs by default)
	 * @param {number} [numerator=1] Position of the part (1st half by default)
	 * @returns {String} Portion of the string
	 * @this String
	 * @method
	 * @public
	 * @since 1.0
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.portion = (denominator = 2, numerator = 1) => this.split('').portion(denominator, numerator).join('');
	
	/**
	 * @description Counts how many times a word is present in the string.
	 * @param {String} word Word to be counted
	 * @param {String} [separation=' '] Separation character
	 * @this String
	 * @returns {number} Number of occurrences of the word in the string
	 * @public
	 * @since 1.0
	 * @method
	 * @inheritdoc
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.countWord = (word, separation = ' ') => this.split(separation).count(word);
	
	/**
	 * @description Check if the word is a character.
	 * @this String
	 * @returns {boolean} Is it a character ?
	 * @public
	 * @since 1.0
	 * @method
	 * @inheritdoc
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.isChar = () => typeof this === 'string' && /^[A-Za-z0-9]$/.test(this);
	
	/**
	 * @description Turn characters into words.<br />
	 * Inspired by {@link http://www.2ality.com/2015/03/es6-generators.html}
	 * @this String
	 * @returns {string[]} Tokens
	 * @public
	 * @since 1.0
	 * @method
	 * @inheritdoc
	 * @memberof String.prototype
	 * @external String
	 */
	String.prototype.tokenize = () => {
	  let tokenizer = function*() {
	    let iterator = this[Symbol.iterator]();
	    let ch;
	    do {
	      ch = dsa.getNextItem(iterator);
	      if (ch.isChar()) {
	        let word = '';
	        do {
	          word += ch;
	          ch = dsa.getNextItem(iterator);
	        } while (ch.isChar());
	        yield word;
	      }
	      //Ignore all other characters
	    } while (ch !== data.END_OF_SEQUENCE);
	  };
	  return [...tokenizer()];
	};
	
	/**
	 * @description Length of the number.
	 * @this Number
	 * @returns {Nums} Length
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.length = () => {
	  if (String(this).has('.')) return [parseInt(String(this).split('.')[0].length), parseInt(String(this).split('.')[1].length)];
	  let len = 0, x = this;
	  while (Math.floor(x) != 0) {
	    x /= 10;
	    len++;
	    console.log(x);
	  }
	  return len
	};
	
	/**
	 * @description A FP fixing that preserve the number format.<br />
	 * A bit like .toFixed(n) and .toPrecision(n) but returning a double instead of a string
	 * @param {number} [n=2] Number of decimals
	 * @this Number
	 * @returns {number} Floating point number
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.toNDec = (n = 2) => {
	  let pow10s = Math.pow(10, n);
	  return Math.round(pow10s * this) / pow10s
	};
	
	/**
	 * @description Keep a fixed amount of unit digits.
	 * @param {number} [n=2] Number of digits
	 * @returns {string} New number
	 * @protected
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.toNDigits = (n = 2) => this.toString().toNDigits(n); //It won't work on other types than strings.
	
	
	/**
	 * @description Sign of the number.
	 * @param {boolean} str Symbols string representation ?
	 * @returns {NumberLike} Sign
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.sign = (str) => str ? (this < 0 ? '-' : (this > 0 ? '+' : '')) : (this < 0 ? -1 : (this > 0 ? 1 : 0));
	
	
	/**
	 * @description Prime check.
	 * @param {number} n Number to check in relation
	 * @returns {boolean} Prime check result
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.isPrime = (n) => {
	  for (let i = 2; i < n; i++) {
	    if (maths.primeCheck(i, n)) return false
	  }
	  return true
	};
	
	/**
	 * @description Clean the number.
	 * @param {number} [nbDec=2] Number of decimals
	 * @returns {*} Cleaned number
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.clean = (nbDec = 2) => {
	  if (this > 0 && this[0] == '+') return nbDec ? this.slice(1, this.length).toNDec(nbDec) : this.slice(1, this.length);
	  else if (this == '-') return this + 1;
	  else if (this == '+') return 1;
	  else return nbDec ? this.toNDec(nbDec) : this
	};
	
	/**
	 * @description Number to Number[].
	 * @returns {number[]} Number array
	 * @public
	 * @since 1.0
	 * @method
	 * @memberof Number.prototype
	 * @external Number
	 */
	Number.prototype.toArr = () => {
	  let arr = new Array(this.length()), i = 0, n = this;
	  while (n > 0) {
	    arr[i] = n % 10;
	    i++;
	    n /= 10;
	  }
	  return arr
	};
	
	/**
	 * @description Type check. It only works for native types (treats custom ones as objects)
	 * @param {*} obj Object
	 * @param {string} type Type
	 * @returns {boolean} Type check result
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~isCustomType
	 * @see module:essence~getNativeType
	 */
	export let isNativeType = (obj, type) => getNativeType(obj, true) === `[object ${type}]`;
	
	/**
	 * @description Type check.
	 * @param {*} obj Object
	 * @param {string} type Type
	 * @returns {boolean} Type check result
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~isCustomType
	 * @see module:essence~isNativeType
	 * @see module:essence~getType
	 */
	export let isType = (obj, type) => getType(obj) === type;
	
	/**
	 * @description Custom type check.
	 * @param {*} obj Object
	 * @param {string} type Type
	 * @returns {boolean} Custom type check result
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~isNativeType
	 * @see module:essence~getCustomType
	 */
	export let isCustomType = (obj, type) => getCustomType(obj) === type;
	
	/**
	 * @description Native type getter.
	 * @param {*} obj Object
	 * @param {boolean} [preserve=false] Preserve the [object type] format
	 * @returns {string} Type
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~isNativeType
	 * @see module:essence~getCustomType
	 */
	export let getNativeType = (obj, preserve = false) => {
	  let type = Object.prototype.toString.call(obj);
	  return preserve ? type : type.split(' ')[1].slice(0, type.split(' ')[1].length - 1)
	};
	
	/**
	 * @description Custom type getter that can pick up some native types.
	 * @param {*} obj Object
	 * @param {boolean} [preserve=false] Preserve the format of strings like [object Element]
	 * @returns {string} Custom type
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~isCustomType
	 * @see module:essence~getNativeType
	 */
	export let getCustomType = (obj, preserve = false) => { //Same as getNativeType but for custom types which won't work for native types
	  let type = obj.toLocaleString();
	  if (type.indexOf('[') === 0) return preserve ? type : type.split(' ')[1].slice(0, type.split(' ')[1].length - 1); //[object Type]
	  else return type.split('(')[0].trim()
	};
	
	/**
	 * @description Type getter.
	 * @param {*} obj Object
	 * @returns {string} Custom type
	 * @public
	 * @since 1.0
	 * @function
	 * @see module:essence~getCustomType
	 * @see module:essence~getType
	 * @see module:essence~isType
	 */
	export let getType = (obj) => {
	  let type = getNativeType(obj);
	  if (type != 'Object') return type;
	  let ctype = getCustomType(obj);
	  return /^[A-Z][A-Za-z]+$/.test(ctype) ? ctype : type;
	};
	
	/**
	 * @summary 2D array check.
	 * @description Check if an array has 2 dimensions (NxM matrix)
	 * @param {Array} arr Object
	 * @returns {boolean} 2D array check result
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let is2dArray = (arr) => {
	  if (isNativeType(arr, 'Array')) {
	    for (let row of arr) {
	      if (isNativeType(row, 'Array')) return true
	    }
	  } else return false
	};
	
	/**
	 * @description Check if an array is singly-typed (one type of element present throughout the entire array).
	 * @param {array} arr Array
	 * @param {string} type Native/custom type
	 * @returns {boolean} Single-type check result
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let isTypedArray = (arr, type) => arr.every(item => isType(item, type));
	
	/**
	 * @description Get the type of the array.
	 * @param {array} arr Array
	 * @returns {string} Array type
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let getArrayType = (arr) => {
	  let types = arr.map(item => getType(item)), type = misc.rmDuplicates(types);
	  return type.length > 1 ? 'Any' : type[0];
	};
	
	/**
	 * @description Check if <code>val</code> is nothing/empty.
	 * @param {*} val Value
	 * @returns {boolean} Voidness/emptyness result
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let isNon = (val) => (val === false || val === undefined || val === null || val === '' || val.equals([]) || val.equals({}));
	
	
	/**
	 * @description Check if a variable/object exist or not.
	 * @param {*} obj Object/variable to check
	 * @return {boolean} Existence result
	 * @public
	 * @since 1.0
	 * @func
	 * @example
	 * let a = undefined, b, c = null;
	 * exist(a); //true because: a in window === true
	 * exist(b); //true because: b in window === true
	 * exist(c); //true because: (typeof c !== 'undefined' && c !== undefined) === true
	 * exist(d); //false
	 */
	export let exist = (obj) => {
	  /* eslint no-shadow-restricted-names: "off" */
	  let undefined, t;
	  try {
	    //noinspection JSUnusedAssignment
	    t = typeof obj !== 'undefined' || obj !== undefined || obj in window;
	    /* eslint no-shadow-restricted-names: "error" */
	  } catch (e) {
	    t = false;
	  }
	  return t;
	};
	
	/**
	 * @description Returns a copy of an element in order to do mutation-safe operations with it.
	 * @param {*} obj Element
	 * @returns {*} Copy of <code>el</code>
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let Copy = (obj) => {
	  if (isNativeType(obj, 'String') || isNativeType(obj, 'Number') || isNativeType(obj, 'Boolean')) return obj; //As they are immutable types
	  else if (isNativeType(obj, 'Array')) return [...obj];
	  else {
	    let clone = {};
	    for (let i in obj) {
	      if (obj.has(i)) clone[i] = obj[i];
	    }
	    return clone;
	  }
	};
	
	/**
	 * @description Get the time (in the format: hh:mm:ss[.xxx]).
	 * @param {boolean} [ms=false] Include milliseconds
	 * @returns {string} Time
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let getTime = (ms = false) => {
	  let d = new Date();
	  return ms
	    ? d.getHours().toNDigits() + ':' + d.getMinutes().toNDigits() + ':' + d.getSeconds().toNDigits() + '.' + d.getMilliseconds().toNDigits()
	    : d.getHours().toNDigits() + ':' + d.getMinutes().toNDigits() + ':' + d.getSeconds().toNDigits()
	};
	
	/**
	 * @description Get the date.
	 * @param {boolean} [short=false] Shortness (end.g: 26May2016 instead of 26/05/2016
	 * @returns {string} Date
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let getDate = (short = false) => {
	  let m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], d = new Date();
	  return short ? d.getDate().toNDigits() + m[d.getMonth()] + d.getUTCFullYear() : d.toLocaleDateString();
	};
	
	/**
	 * @description Get the timestamp.
	 * @param {boolean} [readable=false] Readable (dd/MM/yyyy hh:mm:ss.xxx) or not (ddMMM-hh-mm-ss)
	 * @returns {string} Timestamp
	 * @public
	 * @since 1.0
	 * @see module:essence~getDate
	 * @see module:essence~getTime
	 * @function
	 */
	export let getTimestamp = (readable = false) => {
	  return readable ? getDate() + ' ' + getTime(true) : getDate(true) + '-' + getTime().replace(/:/g, '-')
	};
	
	/**
	 * @description Date to textual format.
	 * @param {Date} d Date
	 * @returns {string} Textual format (in dd/mm/yyyy)
	 * @see module:essence~txt2date
	 * @function
	 * @public
	 * @since 1.0
	 * @throws {Error} d isn't a Date
	 */
	export let date2txt = (d) => {
	  if (!isNativeType(d, 'Date')) throw new TypeError(`${d} is not a Date object`);
	  return d.getDate().toNDigits() + '/' + (d.getMonth() + 1).toNDigits() + '/' + d.getFullYear();
	};
	
	/**
	 * @description Textual date (in dd/mm/yyyy) to Date.
	 * @param {string} txt Textual date
	 * @returns {Date} Date
	 * @see module:essence~date2txt
	 * @function
	 * @public
	 * @since 1.0
	 */
	export let txt2date = (txt) => {
	  let p = txt.split('/');
	  return new Date(p[2], p[1] - 1, p[0]);
	};
	
	/**
	 * @description Display the date and at time at a particular place
	 * @param {string} [id] ID of the element to be used
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let dateTime = (id) => {
	  let date = new Date();
	  let year = date.getFullYear(), month = date.getMonth();
	  let months = data.MONTHS;
	  let d = date.getDate(), day = date.getDay(), h = date.getHours();
	  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	  let tt = '', GMT = date.getTimezoneOffset(), m, s;
	  if (h < 10) h = '0' + h;
	  m = date.getMinutes();
	  if (h > 12) {
	    h -= 12;
	    tt = 'PM';
	  } else tt = 'AM';
	  if (m < 10) m = '0' + m;
	  s = date.getSeconds();
	  if (s < 10) s = '0' + s;
	  GMT = 'GMT' + ((GMT >= 0) ? '+' : '-') + GMT;
	  let result = `We're ${days[day]} ${d} ${months[month]} ${year} and it's ${h}:${m}:${s} ${tt} ${GMT}`;
	  $e(id ? `#${id}` : 'body').write(result);
	  setTimeout(`dateTime("${id}")`, 1e3);
	};
	
	/**
	 * @description Kinch's week day finder.
	 * @param {string} d Date
	 * @author Daniel "Kinch" Sheppard
	 * @returns {string} Week day
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let dayOfWeek = (d) => {
	  let day = parseInt(d.split('/')[0]), m = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5], days = data.DAYS;
	  let y = parseInt(d.split('/').last()) % 100 + Math.floor(d.split('/').last() / 4), c = Math.floor(d.split('/').last() / 100 % 4), cCode;
	  if (c === 0) cCode = 6;
	  else if (c === 1) cCode = 4;
	  else if (c === 2) cCode = 2;
	  else cCode = 0;
	  return days[(day + m[parseInt(d.split('/')[1]) - 1] + y + cCode) % 7]
	};
	
	/**
	 * @description Date to number.
	 * @param {string} [d=getDate()] Date
	 * @returns {number} Number
	 * @see module:essence~num2date
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let date2num = (d = getDate()) => {
	  let p = d.split('/');
	  return parseFloat(parseFloat(`${p[2]}.${p[1]}`).toNDec() + '0' + p[0]);
	};
	
	/**
	 * @description Number to date.
	 * @param {number} n Number
	 * @returns {string} Date
	 * @see module:essence~date2num
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let num2date = (n) => {
	  let p = n.toString().split('.');
	  return `${p[1].get(3)}/${p[1].get(-3)}/${p[0]}`;
	};
	
	/**
	 * @description Date difference calculator.<br />
	 * Source: {@link http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html}
	 * @param {Date|number} [from=new Date()] Starting date
	 * @param {Date|number} to Ending date
	 * @param {string} [part='d'] Part
	 * @param {boolean} [round=false] Rounding flag
	 * @returns {number} Difference
	 * @function
	 * @public
	 * @since 1.0
	 */
	export let dateDiff = (from = new Date(), to, part = 'd', round = false) => {
	  let divideBy = { //In ms
	    y: 959230512e3, //Years
	    m: 2628028800.0000005, //Months
	    w: 6048e5, //Weeks
	    d: 864e5, //Days
	    h: 36e5, //Hours
	    min: 6e4, //Minutes
	    s: 1e3, //Seconds
	    ms: 1 //Milliseconds
	  };
	  return round ? Math.round((to - from) / divideBy[part]) : (to - from) / divideBy[part];
	};
	
	/**
	 * @description Date (days/weeks/months/years) to seconds.
	 * @param {number} [d=0] Days
	 * @param {number} [w=0] Weeks
	 * @param {number} [m=0] Months
	 * @param {number} [y=0] Years
	 * @returns {number} Seconds
	 * @function
	 * @public
	 * @since 1.0
	 * @see module:essence~s2date
	 * @see module:data~DAY_IN_SEC
	 * @see module:data~MONTH_IN_DAY
	 */
	export let date2s = (d = 0, w = 0, m = 0, y = 0) => {
	  return d * data.DAY_IN_SEC + w * 7 * data.DAY_IN_SEC + m * data.MONTH_IN_DAY * data.DAY_IN_SEC + y * 365 * data.MONTH_IN_DAY * data.DAY_IN_SEC;
	};
	
	/**
	 * @description Seconds to days/weeks/months/years
	 * @param {number} s Seconds
	 * @param {string} [what='d'] Option
	 * @returns {number} Result
	 * @function
	 * @public
	 * @since 1.0
	 * @see module:essence~date2s
	 * @see module:data~DAY_IN_SEC
	 * @see module:data~MONTH_IN_DAY
	 */
	export let s2date = (s, what = 'd') => {
	  switch (what.toLowerCase()[0]) {
	    case 'w':
	      return s / (7 * data.DAY_IN_SEC); //Weeks
	    case 'm':
	      return s / (data.MONTH_IN_DAY * data.DAY_IN_SEC); //Months
	    case 'y':
	      return s / (365 * data.MONTH_IN_DAY * data.DAY_IN_SEC); //Years
	    default:
	      return s / data.DAY_IN_SEC; //Days
	  }
	};
	
	/**
	 * @description Generate a string.
	 * @param {number} len Length
	 * @param {Object} filter Filter (specific character, no uppercase/lowercase, cumulative/no (sensitive) repeat)
	 * {
	 *  name: 'specificChar/noUpperCase/noLowerCase/cumulativeRepeat/cumulativeSensitiveRepeat/noRepeat',
	 *  character: *
	 * }
	 * @param {number} [stackLayer=0] Stack layer
	 * @returns {string} Generated string
	 * @since 1.0
	 * @func
	 */
	export let genStr = (len, filter, stackLayer = 0) => {
	  let str = '', az = misc.asciiTable('a-z'), AZ = misc.asciiTable('A-Z'), zero9 = maths.range(9), commonChar = ['&', '~', '"', '#', '\'', '{', '[', '(', '-', '|', '`', '_', '\\', '^', '@', ')', ']', '+', '=', '}', '%', '*', '?', ',', ';', '.', '/', ':', '!', ' '],
	    charlist;
	  charlist = az.concat(AZ, zero9, commonChar);
	  let c = '', i = 0;
	  while (str.length < len) {
	    c = charlist.rand();
	    if (filter.name === 'specificChar') {
	      //noinspection JSUnresolvedVariable
	      while (c === filter.character) c = charlist.rand();
	    } else if (filter.name === 'noUpperCase') {
	      c = c.toLowerCase();
	    } else if (filter.name === 'noLowerCase') {
	      c = c.toUpperCase();
	    } else if (filter.name === 'cumulativeRepeat') {
	      while (c == str[i - 1]) c = charlist.rand();
	    } else if (filter.name === 'cumulativeSensitiveRepeat') {
	      while (c === str[i - 1]) c = charlist.rand();
	    } else if (filter.name === 'noRepeat') {
	      charlist.remove();
	      c = charlist.rand();
	    }
	    str += c;
	    i++;
	  }
	  if (str.length < len) str += charlist.rand();
	  else if (str.length > len) str = str.slice(0, len + 1);
	  if (str === '' && stackLayer < 3) genStr(len, filter);
	  return str
	};
	
	/**
	 * @description Make a <code>len</code><sup><code>dim</code></sup> array.<br />
	 * Similar to Arr.fill(new Array(...).fill(...))
	 * @param {number} len Length
	 * @param {number} dim Dimension
	 * @param {*} [fill=false] Content to be used to fill
	 * @returns {Array} Array
	 * @since 1.0
	 * @func
	 * @throws {Error} Invalid/unsupported dimension
	 */
	export let mkArray = (len, dim, fill = false) => {
	  let arr = [];
	  if (dim === 1) {
	    if (!fill) arr = new Array(len);
	    else {
	      for (let i = 0; i < len; i++) arr[i] = fill;
	    }
	  } else if (dim === 2) {
	    if (!fill) {
	      arr = new Array(len);
	      for (let i = 0; i < len; i++) arr[i] = new Array(len);
	    } else {
	      for (let i = 0; i < len; i++) {
	        arr[i] = new Array(len);
	        for (let j = 0; j < len; j++) arr[i][j] = fill;
	      }
	    }
	  } else if (dim === 3) {
	    if (!fill) {
	      arr = new Array(len);
	      for (let i = 0; i < len; i++) {
	        arr[i] = new Array(len);
	        for (let j = 0; j < len; j++) arr[i][j] = new Array(len);
	      }
	    } else {
	      for (let i = 0; i < len; i++) {
	        arr[i] = new Array(len);
	        for (let j = 0; j < len; j++) {
	          arr[i][j] = new Array(len);
	          for (let k = 0; k < len; k++) arr[i][j][k] = fill;
	        }
	      }
	    }
	  } else if (dim === 4) {
	    if (!fill) {
	      arr = new Array(len);
	      for (let i = 0; i < len; i++) {
	        arr[i] = new Array(len);
	        for (let j = 0; j < len; j++) {
	          arr[i][j] = new Array(len);
	          for (let k = 0; k < len; k++) arr[i][j][k] = new Array(len);
	        }
	      }
	    } else {
	      for (let i = 0; i < len; i++) {
	        arr[i] = new Array(len);
	        for (let j = 0; j < len; j++) {
	          arr[i][j] = new Array(len);
	          for (let k = 0; k < len; k++) {
	            arr[i][j][k] = new Array(len);
	            for (let l = 0; l < len; l++) arr[i][j][k][l] = fill;
	          }
	        }
	      }
	    }
	  } else throw new Error('Unvalid dimension. Only 1D-4D arrays can be made.');
	  return arr;
	};
	
	
	/**
	 * @description Make sure that $a and $b are of the same lengths and fill the empty spaces with $cr
	 * @param {string|Array} a Element a
	 * @param {string|Array} b Element b
	 * @param {string} [cr=' '] Filling character
	 * @returns {Array} Resized elements
	 * @public
	 * @since 1.0
	 * @function
	 * @throws {Error} a and b must be iterable
	 */
	export let toSameLength = (a, b, cr = ' ') => {
	  if (!a.isIterable() || !b.isIterable()) throw new Error('invalid length equality operation on non-iterable objects');
	  if (a.length > b.length) {
	    let typeB = isNativeType(b, 'String');
	    /* eslint no-undef: "off" */
	    for (let i = b.length; i < a.length; i++) typeB ? b += cr : b.push(cr);
	  } else if (a.length < b.length) {
	    let typeA = isNativeType(a, 'String');
	    for (let i = a.length; i < b.length; i++) typeA ? a += cr : a.push(cr);
	  }
	  /* eslint no-undef: "error" */
	  return [a, b]
	};
	
	
	/**
	 * @description Look for an element in a matrix
	 * @param {*} x Element to look for
	 * @param {Array} mtx Matrix
	 * @param {boolean} [toCoord=false] Coordinate representation
	 * @returns {Nums} Position
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let lookfor = (x, mtx, toCoord = false) => {
	  for (let i = 0; i < mtx.length; i++) {
	    for (let j = 0; j < mtx[i].length; j++) {
	      if (mtx[i][j] === x || mtx[i][j].equals(x)) return toCoord ? [j, i] : [i, j]; //i is the row number and j the column which oppose j being the x-coord and i the y-coord
	    }
	  }
	  return -1
	};
	
	
	/**
	 * @description Same as keys() but returns an HTML table
	 * @param {*} map Map
	 * @param {boolean} [propOnly=false] Properties only
	 * @returns {string} HTML table
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let keyTable = (map, propOnly = false) => { //Same as above but in the form of the HTML table
	  let header = map.has('name') ? map.name : (map.has('title') ? map.title : '');
	  let table = `<table cellspacing=0><caption>KeyTable <i>${header}</i></caption><tr><th>Key</th><th>Value</th></tr>`;
	  for (let key in map) {
	    if (((propOnly && map.has(key)) || !propOnly)) table += `<tr><td>${key}</td><td>${map[key]}</td></tr>`;
	  }
	  return table + '</table>'
	};
	
	/**
	 * @description Character to hexadecimal.
	 * @param {string} c Character
	 * @returns {string} Hexadecimal code
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let char2hex = (c) => maths.conv(c.charCodeAt(0), 10, 16);
	
	/**
	 * @description Hexadecimal to character.
	 * @param {NumberLike} h Hexadecimal code
	 * @returns {string} Character
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let hex2char = (h) => String.fromCharCode(maths.conv(h, 16));
	
	/**
	 * @description Character to binary.
	 * @param {string} c Character
	 * @returns {string} Binary code
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let char2bin = (c) => maths.conv(c.charCodeAt(0), 10, 2);
	
	
	/**
	 * @description Binary to character.
	 * @param {NumberLike} b Binary code
	 * @returns {string} Character
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let bin2char = (b) => String.fromCharCode(maths.conv(b, 2));
	
	/**
	 * @description Text to number converter.
	 * @param {string} txt Text
	 * @param {number} [base=10] Base
	 * @returns {string} Converted text
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let txt2num = (txt, base = 10) => {
	  let res = '';
	  for (let i = 0; i < txt.length; i++) res += maths.conv(txt.charCodeAt(i), 10, base) + ' ';
	  return res.trimRight();
	};
	
	/**
	 * @description Number to text.
	 * @param {NumberLike} num Number
	 * @param {number} [base=10] Base
	 * @returns {string} Converted number
	 * @since 1.0
	 * @func
	 */
	export let num2txt = (num, base = 10) => {
	  let res = '';
	  for (let i = 0; i < num.split(' ').length; i++) res += String.fromCharCode(maths.conv(num.split(' ')[i], base));
	  return res;
	};
	
	
	/**
	 * @description Time how long a callback took
	 * @param {Function} cb Callback
	 * @param {*} [params] Parameters
	 * @param {string} [format='ms'] Format of the result (ms/s/min/d/...)
	 * @returns {number} Time
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let time = (cb, format, ...params) => {
	  let t1 = new Date().getTime();
	  cb(...params);
	  let t2 = new Date().getTime();
	  return format ? dateDiff(t1, t2, format) : t2 - t1;
	};
	
	/**
	 * @description Pause the JS execution for a bit and place the callback (if specified) at the end of the execution queue (parsed by the browser which also includes the UI).
	 * A neat wait of keeping the code passed in the parameter to be executed in order of execution (instead of being pushed at the end of the execution queue), is to pass a command/instruction instead of a function (with that command/instructions).
	 * @param {Function} [cb=$f] Callback
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let wait = (cb = $f) => setTimeout(cb, 0);
	
	/**
	 * @description Time how long an asynchronous callback took.
	 * @param {Function} cb Callback
	 * @param {*} [params] Parameters
	 * @param {string} [format='ms'] Format of the result (ms/s/min/d/...)
	 * @returns {number} Time
	 * @public
	 * @since 1.0
	 * @function
	 */
	export let asyncTime = (cb, params, format) => {
	  let t1 = new Date().getTime();
	  let action = cb(...params);
	  let promise = new Promise((resolve, reject) => {
	    action ? resolve(true) : reject('The action couldn\'t be completed');
	  });
	  promise.then(() => {
	    let t2 = new Date().getTime();
	    return format ? dateDiff(t1, t2, format) : t2 - t1;
	  }, (err) => say(err, 'error'));
	};


/***/ }
/******/ ]);
//# sourceMappingURL=essence.bundle.js.map
=======
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
 * @since 1.0
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
 * @since 1.0
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
>>>>>>> develop
