/**
 * @module fx
 * @description Functions ported from OOP's side of Exence to the functional side.
 * @requires module:essence
 * @since 1.0
 */
import {isNativeType, getNativeType, getCustomType} from './essence';

//Object.prototype
/**
 * @description Counts how many times a character/property/number <code>c</code> is present in the object.
 * @param {Object} obj Object
 * @param {(string|Bool)} character Character data
 * @returns {number} Number of occurrences of <code>c</code> in the object
 * @public
 * @since 1.0
 * @function
 * @example
 * count('Hello world', 'o'); //2
 * count([4, 2, 0, -4, 1, 2, 3], 0); //1
 */
export let count = (obj, character) => Array.from(obj).filter(x => x === character).length;

/**
 * @description Get all the positions of a character/property/number c.
 * @param {Object} obj Object
 * @param {NumberLike} character Character/property/number
 * @returns {number[]} Array of positions
 * @public
 * @since 1.0
 * @function
 * @example
 * positions('AbcdAbc', 'A'); //[0, 4]
 */
export let positions = (obj, character) => {
  let pos = [];
  //noinspection JSUnresolvedVariable
  for (let item of obj) {
    if (item === character) pos.push(item);
  }
};

/**
 * @description Check if an object is iterable hence if it's a string/array/object.
 * @param {Object} obj Object
 * @returns {boolean} Iterability check result
 * @public
 * @since 1.0
 * @function
 * @example
 * let myStr = 'Hello', myNum = 1.4142, myBool = true, myArr = range(3), myObj = {a: 0, b: 1};
 * isIterable(myStr); //true
 * isIterable(myNum); //false
 * isIterable(myBool); //false
 * isIterable(myArr); //true
 * isIterable(myObj); //true
 */
export let isIterable = (obj) => isNativeType(obj, 'String') || isNativeType(obj, 'Array') || isNativeType(obj, 'Object');

/**
 * @description Self-destruction of the object.<br />
 * Source: {@link https://Google.github.io/styleguide/javascriptguide.xml?showone=delete#delete}
 * @public
 * @since 1.0
 * @function
 */
export let deleteObj = (obj) => {
  obj.property = undefined;
};

/**
 * @summary Equality check.
 * @description Check if obj and the current object are the same
 * @param {Object} thisObj Object
 * @param {*} obj Object to compared to
 * @returns {boolean} Equality check result
 * @public
 * @since 1.0
 * @function
 * @example
 * let a = 'Hello', b = 'hello', c = ['h', 'e', 'l', 'l', 'o'];
 * equals(a, b); //false
 * equals(a.toLowerCase(), b); //true
 * equals(c.join(''), a); //true
 * equals(c, a); //false
 */
export let equals = (thisObj, obj) => thisObj.toString() === obj.toString() || thisObj.toLocaleString() === obj.toLocaleString() || thisObj === obj;

/**
 * @description Multiple replacement.
 * @param {Object} obj Object
 * @param {Array[]} rules Rules containing (RegExp|String)/(RegExp|String) pairs
 * @returns {*} Resulting object
 * @public
 * @since 1.0
 * @function
 * @example
 * 'Hello world !'.multiReplace([[/[A-Za-z]/g, '1'], [/(\s|\!)/, '0']]); //'1111101111100'
 */
export let multiReplace = (obj, rules) => {
  let res = obj.hasOwnProperty('replace') ? obj.replace(rules[0][0], rules[0][1]) : replace(obj, rules[0][0], rules[0][1]);
  for (let i = 1; i < rules.length; i++) res = res.replace(rules[i][0], rules[i][1]);
  return res
};

/**
 * @description Comparison check.
 * @param {Object} thisObj Object
 * @param {*} obj Object to be compared to
 * @returns {number} Comparison check result
 * @public
 * @since 1.0
 * @function
 * @throws {TypeError} Type difference between this and obj
 * @example
 * let a = 2, b = 5;
 * compareTo(a, b) === -1 //a < b
 * compareTo(b, a) === 1 //b > a
 * compareTo(a, a) === 0 //a = a
 */
export let compareTo = (thisObj, obj) => {
  if (getNativeType(thisObj) != getNativeType(obj)) throw new TypeError(`${thisObj} and ${obj} aren't of the same type, so can't be compared.`);
  if ((getNativeType(thisObj) === 'Object' && getCustomType(thisObj) === getCustomType(obj)) || getNativeType(thisObj) === getNativeType(obj)) {
    return equals(thisObj, obj) ? 0 : (thisObj.toString() < obj.toString() || thisObj.toLocaleString() < obj.toLocaleString()) ? -1 : 1;
  } else throw new TypeError(`${thisObj} and ${obj} aren't of the same custom type, so can't be compared.`);
};

/**
 * @description Check if an object has a property.
 * @param {Object} obj Object
 * @param {string} prop Property
 * @returns {boolean} Containment check result
 * @public
 * @since 1.0
 * @function
 * @example
 * let a = {name: 'A', size: 8}, b = ['1', '4', '9', 'h', 'w', '_'];
 * has(a, 'name'); //true
 * has(a, 'value'); //false
 * has(b, 'w'); //true
 * has(b, ' '); //false
 */
export let has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop); //Better than this[prop] != undefined

/**
 * @description Emptiness check on the object.
 * Source: {@link https://stackoverflow.com/a/679937/5893085|SO}
 * @param {Object} obj Object
 * @return {boolean} Emptiness state
 * @public
 * @since 1.0
 * @function
 * @example
 * let a = {}, b = new Object(), c = {x: 5}, d = '';
 * isEmpty(a); //true
 * isEmpty(b); //true
 * isEmpty(c); //false
 * isEmpty(d); //true
 */
export let isEmpty = (obj) => !(obj.length);

/**
 * @description High level inheritance.
 * @param {Object} obj Object
 * @param {*} parent Parent
 * @this Object
 * @public
 * @since 1.0
 * @function
 */
export let inherits = (obj, parent) => {
  obj.prototype = Object.create(parent.prototype);
  obj.prototype.constructor = obj;
};

/**
 * @description Allows to create methods without directly calling the prototype.
 * @param {Object|Function} obj Object
 * @param {string} name Name of the method
 * @param {Function} fn Function (body of the method)
 * @returns {Object|Function}
 * @public
 * @since 1.0
 * @function
 * @todo Find a stable way to use it without having this=window (note: the ES5 way on {@link https://stackoverflow.com/questions/6868883/augmenting-types-in-javascript} works)
 */
export let method = (obj, name, fn) => {
  obj.prototype[name] = fn.apply(obj);
  return obj;
};

//Function.prototype
/**
 * @description Inheritance.<br />
 * Source: Somewhere
 * @param {Function} fn Function
 * @param {*} parentClassOrObj Parent
 * @returns {Function} this Current function/constructor
 * @public
 * @since 1.0
 * @function
 */
export let inheritsFrom = (fn, parentClassOrObj) => {
  if (parentClassOrObj.constructor === Function) { //Normal Inheritance
    fn.prototype = new parentClassOrObj;
    fn.prototype.constructor = fn;
    fn.prototype.parent = parentClassOrObj.prototype;
  } else { //Pure Virtual Inheritance
    this.prototype = parentClassOrObj;
    this.prototype.constructor = fn;
    this.prototype.parent = parentClassOrObj;
  }
  //noinspection JSValidateTypes
  return fn
};

//Array.prototype
/**
 * @description Remove a character/number/string from the array with(out) affecting the initial array.<br />
 * It will automatically remove undefined and it goes bunckers when trying to remove objects
 * @param {Array} arr Array
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
export let remove = (arr, character, preserveInitial) => {
  if (preserveInitial) {
    return isNativeType(character, 'Array') ? character.map(c => arr.filter(x => x != c || x != undefined)) : arr.filter(x => x != character || x != undefined);
  } else {
    let pos = [...positions(arr, character)];
    for (let i of pos) arr.splice(i, 1);
    return arr;
  }
};