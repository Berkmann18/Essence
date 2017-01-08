/**
 * @module maths
 * @description Mathematics related module.
 * @requires module:essence
 * @since 1.0
 */
import * as essence from './essence';
import * as qtest from './qtest';
import * as dsa from './dsa';
import * as misc from './misc';

//Constants
/**
 * @const {string[]} Numerical/bit operator signs
 * @type {string[]}
 * @public
 * @since 1.0
 */
export const SIGNS = ['+', '-', '*', '/', '%', '>>', '<<', '>>>', '&', '|', '^'];

/**
 * @const {number} Lowest 8-bit character (-2<sup>7</sup>)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_CHAR8
 */
export const MIN_CHAR8 = -128;

/**
 * @const {number} Highest 8-bit integer (2<sup>7</sup>-1)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MIN_CHAR8
 * @see module:maths~MAX_UCHAR8
 */
export const MAX_CHAR8 = 127;

/**
 * @const {number} Highest unsigned 8-bit integer (2<sup>8</sup>-1)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_CHAR8
 */
export const MAX_UCHAR8 = 127;

/**
 * @const {number} Lowest 16-bit integer (-2<sup>15</sup>)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_INT16
 */
export const MIN_INT16 = -32768;

/**
 * @const {number} Highest 16-bit integer (2<sup>15</sup>-1)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MIN_INT16
 */
export const MAX_INT16 = 32767;

/**
 * @const {number} Lowest 32-bit integer (-2<sup>31</sup>)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_INT32
 */
export const MIN_INT32 = -2147483648;

/**
 * @const {number} Highest 32-bit integer (2<sup>31</sup>-1)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MIN_INT32
 * @see module:maths~MAX_UINT16
 */
export const MAX_INT32 = 2147483647;

/**
 * @const {number} Highest unsigned 16-bit integer (2<sup>16</sup>-1)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_INT16
 */
export const MAX_UINT16 = 65535;

/**
 * @const {number} Lowest float (32-bit)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_FLOAT
 */
export const MIN_FLOAT = -3.4e38;

/**
 * @const {number} Highest float (32-bit)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MIN_FLOAT
 */
export const MAX_FLOAT = 3.4e38;

/**
 * @const {number} Lowest double (64-bit)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MAX_DOUBLE
 */
export const MIN_DOUBLE = -1.7e308;

/**
 * @const {number} Highest double (64-bit)
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~MIN_DOUBLE
 */
export const MAX_DOUBLE = 1.7e308;

/**
 * @const {number} Number of decimals a 16-bit number's mantissa have.
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~DECIMALS32
 * @see module:maths~DECIMALS64
 * @see module:maths~DECIMALS128
 */
export const DECIMALS16 = 9;

/**
 * @const {number} Number of decimals a 32-bit number's mantissa have.
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~DECIMALS16
 * @see module:maths~DECIMALS64
 * @see module:maths~DECIMALS128
 */
export const DECIMALS32 = 23;

/**
 * @const {number} Number of decimals a 64-bit number's mantissa have.
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~DECIMALS16
 * @see module:maths~DECIMALS32
 * @see module:maths~DECIMALS128
 */
export const DECIMALS64 = 52;

/**
 * @const {number} Number of decimals a 128-bit number's mantissa have.
 * @type {number}
 * @public
 * @since 1.0
 * @see module:maths~DECIMALS16
 * @see module:maths~DECIMALS32
 * @see module:maths~DECIMALS64
 */
export const DECIMALS128 = 112;

//Sets
/**
 * @description Natural numbers generator.
 * @constructor
 * @protected
 * @since 1.0
 * @const {GeneratorFunction} &natural; generator
 */
export const NaturalNum = function*() {
  //noinspection InfiniteLoopJS
  for (let num = 0; ; num++) yield num;
};

/**
 * @description Natural numbers (&natural; = {0, 1, 2, ..., +&infin;})
 * @type {{next, value}}
 * @module
 * @public
 * @since 1.0
 * @todo Find a way to get N.value to be correctly updated when calling N.next() and make a Number set factory
 */
export const N = (function () {
  let gen = NaturalNum();
  let value = gen.next().value;
  let reset = () => {
    gen = NaturalNum();
    value = gen.next().value;
  };
  let next = () => {
    value = gen.next().value; //Only updates the value in the return block but not this one
    return {
      value,
      done: false
    }
  };

  return {
    next,
    value,
    reset
  };
})();

/**
 * @description Integer generator which start counting from the smallest 32-bit integer.
 * @constructor
 * @protected
 * @since 1.0
 * @const {GeneratorFunction} &integers; generator
 * @see module:maths~MIN_INT32
 */
export const IntegerNum = function*() {
  //noinspection InfiniteLoopJS
  for (let num = MIN_INT32; ; num++) yield num;
};

/**
 * @description Integers (&integers; = {-&infin;, ..., -2, -1, 0, 1, 2, ..., +&infin;})
 * @type {{next, value}}
 * @module
 * @public
 * @since 1.0
 */
export const Z = (function () {
  let gen = IntegerNum();
  let value = gen.next().value;
  let reset = () => {
    gen = IntegerNum();
    value = gen.next().value;
  };
  let next = () => {
    value = gen.next().value;
    return {
      value,
      done: false
    }
  };

  return {
    next,
    value,
    reset
  };
})();


/**
 * @description Rational number generator which start counting from the smallest double possible and goes through every
 * <i>n</i> such that n = {@link #MIN_DOUBLE|MIN_DOUBLE} + k * {@link #DECIMALS64|DECIMALS64} where <i>k</i> is the number
 * of iterations at the current stage.
 * @constructor
 * @protected
 * @since 1.0
 * @const {GeneratorFunction} &#8474; generator
 * @see module:maths~MIN_DOUBLE
 * @see module:maths~DECIMALS64
 */
export const RationalNum = function*() {
  //noinspection InfiniteLoopJS
  for (let num = MIN_DOUBLE; ; num += DECIMALS64) yield num;
};

/**
 * @description Rational numbers (&#8474; = {-&infin;, ..., -1.0[...]01, -1, 0, 1, 1.0[...]01, ..., +&infin;})
 * @type {{next, value}}
 * @module
 * @public
 * @since 1.0
 */
export const Q = (function () {
  let gen = RationalNum();
  let value = gen.next().value;
  let reset = () => {
    gen = RationalNum();
    value = gen.next().value;
  };
  let next = () => {
    value = gen.next().value;
    return {
      value,
      done: false
    }
  };

  return {
    next,
    value,
    reset
  };
})();

//Functions
/**
 * @description E<u>x</u>clusive <u>or</u>.
 * @param {*} a Expression a
 * @param {*} b Expression b
 * @returns {boolean} a xor b
 * @public
 * @since 1.0
 * @function
 */
export let xor = (a, b) => (a && !b) || (!a && b);

/**
 * @description Converts <code>n</code> "times" to an appropriate formulation (if necessary).
 * @param {number} n Number
 * @returns {string} Literal
 * @public
 * @since 1.0
 * @function
 */
export let timesLiteral = (n) => {
  switch (n) {
    case 1:
      return 'once';
    case 2:
      return 'twice';
    default:
      return `${n} times`
  }
};

/**
 * @description Random number generator.
 * @param {number} min Minimum (inclusive)
 * @param {number} max Maximum (inclusive)
 * @param {boolean} [integer=false] Integer or float/double
 * @returns {number} Random number rad&in;[<code>min</code>, <code>max</code>]
 * @since 1.0
 * @function
 */
export let rand = (min, max, integer = false) => {
  return integer ? Math.floor(Math.random() * (max - min + 1) + min) : Math.random() * (max - min + 1) + min;
};

/**
 * @description Random number generator with 0 as the minimum.
 * @param {number} max Maximum (inclusive)
 * @returns {number} Random number rad&in;[0, <code>max</code>]
 * @param {boolean} [integer=false] Integer or float/double
 * @see module:maths~rand
 * @public
 * @since 1.0
 * @function
 */
export let randTo = (max, integer = false) => rand(0, max, integer);

/**
 * @description Random number generator in a specific base.
 * @param {number} min Minimum (inclusive)
 * @param {number} max Maximum (inclusive)
 * @param {number} [base=10] Base
 * @param {boolean} [integer=false] Integer or float/double
 * @returns {NumberLike} Random number rad<sub><code>base</code></sub>&in;[<code>min</code><sub>10</sub>, <code>max</code><sub>10</sub>]
 * @see module:maths~rand
 * @public
 * @since 1.0
 * @function
 */
export let baseRand = (min, max, base = 10, integer = false) => parseFloat(rand(min, max, integer)).toString(base);

/**
 * @description Dynamic random number generator (between two variables).
 * @param {number} var0 Variable #0
 * @param {number} var1 Variable #1
 * @param {boolean} [integer=false] Integer or float/double
 * @returns {number} Random number rad&in;[min(<code>var0</code>, <code>var1</code>), max(<code>var0</code>, <code>var1</code>)]
 * @see module:maths~rand
 * @public
 * @since 1.0
 * @function
 */
export let randVar = (var0, var1, integer = false) => rand(Math.min(var0, var1), Math.max(var0, var1), integer);

/**
 * @description Range random number generator.
 * @param {number} len Length of the range
 * @param {boolean} [if0=false] If 0 is in the range or not (as in 0 being the first element)
 * @returns {number} Random number rad&in;[0||1, <code>len</code>(-1)]
 * @public
 * @since 1.0
 * @function
 */
export let lenRand = (len, if0 = false) => Math.floor(Math.random() * (if0 ? len + 1 : len));

/**
 * @description Generate a random double in [0, 1] with <code>bits</code>-bits of randomness to avoid repetitive patterns when using Math.random() on a large spaces.
 * @param {number} [bits=32] Number of bits used in the randomness
 * @return {number} Random double
 * @public
 * @since 1.0
 * @function
 */
export let random = (bits = 32) => ((Math.pow(2, bits) - Math.pow(2, bits / 2)) * Math.random() + (Math.pow(2, bits / 2 - 1)) * Math.random()) / (Math.pow(2, bits) - 1);

/**
 * @description Random float in [-<code>range</code>/2, <code>range</code>/2].<br />
 * Source: Three.js
 * @param {number} range Range length
 * @returns {number} Random float
 * @public
 * @since 1.0
 * @function
 */
export let randFloatSpread = (range) => range * (.5 - Math.random());

/**
 * @description Generate an array of random numbers.
 * @param {number} [n=10] Number of numbers
 * @param {number} [min=0] Minimum
 * @param {number} [max=100] Maximum
 * @param {boolean} [float=true] Floating point
 * @param {Bool} [base=false] Base
 * @returns {Array} Random number array where &forall;i&in;rad, i&in;[<code>min</code>, <code>max</code>]<sub>(base)</sub>
 * @public
 * @since 1.0
 * @function
 */
export let randNum = (n = 10, min = 0, max = 100, float = true, base = false) => {
  let r = [];
  for (let i = 0; i < n; i++) r[i] = base ? conv(rand(min, max, !float), 10, base) : rand(min, max, !float);
  return r
};

/**
 * @description Generate a nearly sorted array.
 * @param {number} [n=10] Number of elements
 * @param {number} [min=0] Minimum
 * @param {number} [max=100] Maximum
 * @returns {Array} Nearly sorted array
 * @public
 * @since 1.0
 * @function
 */
export let genNearlySortedArr = (n = 10, min = 0, max = 100) => {
  let dict = range(min, 1, max).slice(0, n), res = [], inc = dict.getIncrement(0);
  for (let i = 0; i < dict.length; i++) {
    let r = randTo(inc);
    res.push(dict[i]);
    if (i > 0 && r === 0) [res[i], res[i - 1]] = [res[i - 1], res[i]];
    else if (i > 1 && r === inc) [res[i], res[i - 2]] = [res[i - 2], res[i]];
  }
  return res
};

/**
 * @description Sum squared (<strong>&Sigma;<sup>2</sup></strong>).
 * @param {number[]} arr Array of numbers
 * @param {number} [nbDec=2] Number of decimals
 * @returns {*} Sum squared
 * @public
 * @since 1.0
 * @function
 * @throws {TypeError} Not an array
 */
export let sumPow2 = (arr, nbDec = 2) => {
  if (!essence.isNativeType(arr, 'Array')) throw TypeError('sumPow2 only accept arrays!');
  return arr.map((x) => x * x).sum().toNDec(nbDec)
};

/**
 * @description Base conversion
 * @param {NumberLike} n Number to convert
 * @param {number} [from=2] Initial base
 * @param {number} [to=10] Final base
 * @param {boolean} [float=false] FPR or not
 * @returns {NumberLike} Conversion: n<sub>from</sub>&rArr;rad<sub>to</sub>
 * @since 1.0
 * @func
 */
export let conv = (n, from = 2, to = 10, float = false) => float ? parseFloat(n, from).toString(to) : parseInt(n, from).toString(to);

/**
 * @description Negate a binary number using 2's complement.
 * @param {NumberLike} bin Binary number
 * @param {boolean} [toArr=false] To array
 * @returns {NumberLike[]|NumberLike} Negated binary number
 * @public
 * @since 1.0
 * @function
 */
export let negateBin = (bin, toArr = false) => {
  let n = [];
  for (let digit of bin) n.push(1 - parseInt(digit));
  let res = conv(conv(n.join('')) + 1, 10, 2);
  return toArr ? res.split('') : res;
};

/**
 * @description Floating point binary number to decimal number.
 * @param {string} bin Binary number
 * @returns {number} Decimal number
 * @public
 * @since 1.0
 * @function
 * @throws {Error} Invalid binary number
 */
export let floatingPtBin = (bin) => {
  //%= .05859375 (sign) + .27734375 (exponent) + .6640625 (mantissa)
  /* Lookup table aid
   var start = new Stream(8, 'x*2', 5);
   table(start.data.map(function (x) {
   return [(.05859375 * x), (.27734375 * x), (.6640625 * x), (.05859375 * x) + (.27734375 * x) + (.6640625 * x)];
   }))
   S/E/M              (x2/x??/x??)
   1/4/3 (8bit) -%> .125/.5/.375
   1/6/9 (16bit) -%> .0625/.375/.5625
   1/8/23 (32bit) -%> .03125/.25/.71875
   1/11/52 (64bit) -%> .015625/.171875/.8125
   1/14/112 (128bit) -%> .0078125/.109375/.875
   1/x/y (Nbit) -%> .0484375/.28125/.66875 => .9984375
   var start = new Stream(8, 'x*2', 5);
   table(start.data.map(function (x) {
   return [1, (.3212890625 * x), (.6787109375 * x), (.3212890625 * x) + (.6787109375 * x)];
   }))
   */
  let sign = (bin[0] === 1) ? -1 : 1, exponent = (bin[1] === 1) ? 1 : -1, mantissa, getMantissa = (x, M) => {
    let res = 0;
    for (let i = 0; i < M; i++) res += parseInt(x[i]) * Math.pow(2, -i - 1);
    return res;
  };
  switch (bin.length) {
    case 8:
      exponent *= conv(bin.get(2, 4));
      mantissa = getMantissa(bin.get(5), 3);
      break;
    case 16:
      exponent *= conv(bin.get(2, 6));
      mantissa = getMantissa(bin.get(7), 9);
      break;
    case 32:
      exponent *= conv(bin.get(2, 8));
      mantissa = getMantissa(bin.get(9), 23);
      break;
    case 64:
      exponent *= conv(bin.get(2, 11));
      mantissa = getMantissa(bin.get(12), 52);
      break;
    case 128:
      exponent *= conv(bin.get(2, 14));
      mantissa = getMantissa(bin.get(15), 112);
      break;
    default:
      throw new qtest.InvalidParamError('Invalid binary number');
  }
  return sign * Math.pow(2, exponent) * mantissa;
};

/**
 * @description Minute to decimal
 * @param {number} min Minutes
 * @returns {number} Decimals
 * @see module:maths~dec2min
 * @public
 * @since 1.0
 * @function
 */
export let min2dec = (min) => (50 * min) / 30;

/**
 * @description Decimal to minute.
 * @param {number} dec Decimals
 * @returns {number} Minutes
 * @see module:maths~min2dec
 * @public
 * @since 1.0
 * @function
 */
export let dec2min = (dec) => (30 * dec) / 50;

/**
 * @description Time to second.
 * @param {string} i Time ([hh:]mm:ss.xx[x])
 * @returns {number} Seconds
 * @see module:maths~sec2time
 * @public
 * @since 1.0
 * @function
 */
export let toSec = (i) => {
  if (i == parseFloat(i)) return parseFloat(i); //Seconds stay seconds
  let withH = i.count(':') === 2;
  if (!essence.isNativeType(i, 'String')) i += '';
  if (i.length >= 4 && i.indexOf(':') === 1) return toSec('0' + i); //So times without the leading 0 or simply with a 1-digit first section could be read properly

  let time = i.split(':'), m, s;

  if (withH) {
    let h; //Any parts that need to be extracted
    h = parseInt(time[0]); //The first section: hour
    m = parseInt(time[1]); //The second section: min
    s = parseFloat(time[2]); //The third section: sec
    return h * 3600 + m * 60 + s.toNDec();
  } else {
    m = parseInt(time[0]); //The first section: min
    s = parseFloat(time[1]); //The second section: sec
    return m * 60 + s;
  }
};

/**
 * @description Seconds to time?
 * @param {NumberLike} i Seconds
 * @param {boolean} [withH=false] Include hours
 * @returns {string} Time
 * @see module:maths~toSec
 * @public
 * @since 1.0
 * @function
 */
export let sec2time = (i, withH = false) => {
  let h = 0, m = 0, s = i;
  if (withH) {
    s = (i % 60).toNDigits();
    h = (i >= 3600) ? Math.floor(i / 3600) : 0;
    m = Math.floor((i - s - 3600 * h) / 60);
    m = (m <= 0) ? '00' : m.toNDigits();
    h = (h <= 0) ? '00' : h.toNDigits();
    return h + ':' + m + ':' + s.toNDec().toNDigits(); //Return the result as height:min:start.ms
  } else {
    s = (i % 60).toNDigits();
    m = Math.floor(i / 60).toNDigits();
    return (m <= 0) ? s : m + ':' + s.toNDec().toNDigits(); //Return the result as min:start.ms
  }
};

/**
 * @description Calculate the difference between two times.
 * @param {String} [start=getTime(true)] Starting time
 * @param {String} end Ending time
 * @public
 * @since 1.0
 * @function
 * @returns {string}
 */
export let timeDiff = (start = essence.getTime(true), end) => {
  let withH = end.count(':') === 2;
  if (xor(start.count(':') === 2, end.count(':') === 2)) throw new qtest.InvalidParamError('Both times needs to be in the same format');
  return sec2time(toSec(end) - toSec(start), withH);
};

/**
 * @description Convert a mark (out of <code>initTotal</code>) to an other (out of <code>endTotal</code>).
 * @param {number} mark Mark
 * @param {number} initTotal Initial total
 * @param {number} [endTotal=100] Final total
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Converted mark: <code>mark</code>/<code>initTotal</code> &rArr; rad/<code>endTotal</code>
 * @public
 * @since 1.0
 * @function
 */
export let markConv = (mark, initTotal, endTotal = 100, nbDec = 2) => (mark / initTotal * endTotal).toNDec(nbDec);

/**
 * @description Nth-root calculator
 * @param {number} x Number
 * @param {number} n Root
 * @param {number} [nbDec=20] Number of decimals
 * @returns {number} Nth-root
 * @public
 * @since 1.0
 * @function
 */
export let nthroot = (x, n, nbDec = 20) => {
  let r = getClosestRoot(x, n), accuracySteps = 60;
  for (let i = 0; i < accuracySteps; i++) r += (x - Math.pow(r, n)) / (Math.pow(r + 1, n) - Math.pow(r, n));
  return r.toNDec(nbDec)
};

/**
 * @description Logarithm (log<sub><code>y</code></sub>(<code>x</code>)).
 * @param {number} x Number
 * @param {number} [y=10] Base
 * @returns {number} Result
 * @see module:maths~ln
 * @since 1.0
 * @public
 * @function
 */
export let log = (x, y = 10) => Math.log(x) / Math.log(y);

/**
 * @description Neperian Logarithm.
 * @param {number} x Number
 * @returns {number} Neperian logarithm
 * @see module:maths~log
 * @public
 * @since 1.0
 * @function
 */
export let ln = (x) => log(x, Math.E);

/**
 * @description Greatest Common Divisor.
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {number} GCD
 * @public
 * @since 1.0
 * @function
 */
export let gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);

/**
 * @description Least Common Multiplier
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {number} LCM
 * @public
 * @since 1.0
 * @function
 */
export let gcd = (a, b) => b ? gcd(b, a % b): Math.abs(a);

/**
* @description Least Common Multiplier
* @param {number} a Number a
* @param {number} b Number b
* @returns {number} LCM
* @public
* @since 1.0
* @function
*/
export let lcm = (a, b) => {
  let multiple = a;
  range(a, 1, b).forEach((n) => multiple = (multiple * n) / gcd(multiple, n));
  return multiple;
};

/**
 * @description Binomial distribution X~Bin(<code>n</code>, <code>p</code>).
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Binomial distribution P(x=<code>r</code>)
 * @public
 * @since 1.0
 * @function
 */
export let Bin = (n, p, r) => C(n, r) * Math.pow(p, r) * Math.pow(1 - p, n - r);

/**
 * @description Cumulative binomial distribution (P(X<r)?).
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Cumulative binomial distribution
 * @see module:maths~Bin
 * @public
 * @since 1.0
 * @function
 */
export let BinCumul = (n, p, r) => {
  let res = [];
  for (let i = 0; i < r; i++) res.push(Bin(n, p, r));
  return res.sum();
};

/**
 * @description Cumulative binomial distribution (P(X&le;rad)).<br />
 * Adapted from {@link http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function|this thread}
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Cumulative binomial distribution
 * @see module:maths~Bin
 * @public
 * @since 1.0
 * @function
 */
export let BinCumulLT = (n, p, r) => {
  let x = 1 - p, a = n - r, b = r + 1, c = a + b - 1, res = 0;
  for (let i = a; i < c + 1; i++) res += factorial(c) / (factorial(i) * factorial(c - i)) * Math.pow(x, i) * Math.pow((1 - x), c - i);
  return res;
};

/**
 * @description Normal distribution Z~N(0, 1).<br />
 * P(z < x) where Z~N(0, 1) (or P(z>-x) if x is positive) === normalcdf(x)<br />
 * Source: somewhere
 * @summary normalcdf(x)
 * @param {number} x Number
 * @returns {number} Normal distribution P(z<-abs(<code>x</code>))
 * @see module:maths~StdNorm
 * @public
 * @since 1.0
 * @function
 */
export let Norm = (x) => {
  //To be honest, I don't wth those numbers means
  let t = 1 / (1 + .2316419 * Math.abs(x));
  let d = .3989423 * Math.exp(-x * x / 2);
  return (d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))).toNDec(4)
};

/**
 * @description Standard normal distribution Z~N(<code>m</code>, <code>sd</code>).
 * @param {number} m Mean
 * @param {number} sd Standard deviation
 * @param {number} x Number
 * @returns {number} Standard normal distribution P(Z<(x-m)/sd)
 * @see module:maths~Norm
 * @public
 * @since 1.0
 * @function
 */
export let StdNorm = (m, sd, x) => Norm((x - m) / sd);

/**
 * @description Inverse of Norm(rad)=<code>x</code> (Inverse Normal CDF).
 * @param {number} x Normal distribution
 * @return {number} result of <code>x</code>=Norm(rad)
 * @function
 * @public
 * @since 1.0
 */
export let InvNorm = (x) => {
  //To be honest, I don't wth those numbers means
  let a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637], b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833], c = [.3374754822726147, .9761690190917186, .1607979714918209, .0276438810333863, .0038405729373609, .0003951896511919, .0000321767881768, .0000002888167364, .0000003960315187], y = x - .5, absY = Math.abs(y), sqY = y * y, res;

  //Beasley-Springer function
  if (absY < .42) res = y * (((a[3] * sqY + a[2]) * sqY + a[1]) * sqY + a[0]) / ((((b[3] * sqY + b[2]) * sqY + b[1]) * sqY + b[0]) * sqY + 1);
  else { //Moro function
    res = Math.log(-Math.log(y > 0 ? 1 - x : x));
    res = c[0] + res * (c[1] + res * (c[2] + res * (c[3] + res * (c[4] + res * (c[5] + res * (c[6] + res * (c[7] + res * c[8])))))));
    if (y < 0) res = -res;
  }
  return res;
};

/**
 * @description Poisson distribution X~Po(<code>l</code>, <code>x</code>).
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {number} Poisson distribution
 * @public
 * @since 1.0
 * @function
 */
export let Po = (l, x) => (Math.exp(-l) * Math.pow(l, x)) / factorial(x).toNDec(4);

/**
 * @description Cumultative poisson distribution.
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {number} Cumulative poisson distribution
 * @see module:maths~PoCumul
 * @todo To revisit
 * @public
 * @since 1.0
 * @function
 */
export let PoCumul = (l, x) => Po(l, x) * l;

/**
 * @description factorial x!
 * @param {number} x Number
 * @returns {number} x!
 * @public
 * @since 1.0
 * @function
 */
export let factorial = (x) => (x <= 1) ? x : x * factorial(x - 1);

/**
 * @description Combination/choose (&complement;).
 * @param {number} n Total
 * @param {number} r Number
 * @returns {number} n&complement;rad
 * @see module:maths~factorial
 * @public
 * @since 1.0
 * @function
 */
export let C = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

/**
 * @description Binomial to Normal distribution.
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @param {string} sign Sign used in the expression
 * @returns {?number} Normal distribution
 * @see module:maths~Bin
 * @see module:maths~Norm
 * @since 1.0
 * @function
 */
export let Bin2Norm = (n, p, r, sign) => {
  if (n * p > 5 && n * (1 - p) > 5) {
    r += (sign === '>=' || sign === 'hte') ? -.5 : .5; //Continuity correction
    return StdNorm(n * p, Math.sqrt(n * p * (1 - p)), r)
  } else return null;
};

/**
 * @description Binomial to Poisson distribution.
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {?number} Poisson distribution
 * @see module:maths~Bin
 * @see module:maths~Po
 * @public
 * @since 1.0
 * @function
 */
export let Bin2Po = (n, p, r) => (n > 50 && p < .1) ? Po(n * p, r) : null;

/**.
 * @description Poisson to Normal distribution
 * @param {number} l Lambda
 * @param {number} x Number
 * @returns {?number} Normal distribution
 * @see module:maths~Po
 * @see module:maths~Norm
 * @public
 * @since 1.0
 * @function
 */
export let Po2Norm = (l, x) => (l > 10) ? StdNorm(l, Math.sqrt(x), x) : null;

/**
 * @description Gaussian Error.<br />
 * Source: {@link http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function}
 * @param {number} z Number
 * @returns {number} Gaussian error
 * @public
 * @since 1.0
 * @function
 */
export let erf = (z) => {
  //To be honest, I don't wth those numbers means
  let t = 1 / (1 + .5 * Math.abs(z)), res;
  res = 1 - t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (.37409196 + t * (.09678418 + t * (-.18628806 + t * (.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-.82215223 + t * (.17087277))))))))));
  return z > 0 ? res : -res;
};

/**
 * @description Normal estimate.<br />
 * Source: {@link http://stackoverflow.com/questions/1095650/how-can-i-efficiently-calculate-the-binomial-cumulative-distribution-function}
 * @param {number} n Total number of attempts
 * @param {number} p Success probability
 * @param {number} r Number of attempts
 * @returns {number} Normal estimate
 * @see module:maths~erf
 * @public
 * @since 1.0
 * @function
 */
export let NormEstimate = (n, p, r) => {
  let u = n * p, o;
  o = Math.pow(u * (1 - p), .5);
  return .5 * (1 + erf((r - u) / (o * Math.pow(2, .5))));
};

/**
 * @description Clamp values to keep them within a range [<code>a</code>; <code>b</code>].
 * @param {number} x Number
 * @param {number} a Lowest bound
 * @param {number} b Highest bound
 * @returns {number} Clamped number
 * @public
 * @since 1.0
 * @see module:maths~revClamp
 * @function
 */
export let clamp = (x, a, b) => (x < a) ? a : ((x > b) ? b : x);

/**
 * @description Clamp values to keep them within a range ]-Inf; a]&Union;[b; Inf[.
 * @param {number} x Number
 * @param {number} a Lowest inner bound
 * @param {number} b Highest inner bound
 * @returns {number} Clamped number
 * @public
 * @since 1.0
 * @see module:maths~clamp
 * @function
 */
export let revClamp = (x, a, b) => (a <= x && x <= b) ? getClosest(x, [a, b]) : x;

/**
 * @description Clamp values to keep them within the range [a; Inf[.
 * @param {number} x Number
 * @param {number} a Lowest bound
 * @returns {number} Clamped value
 * @see module:maths~clamp
 * @see module:maths~clampTop
 * @public
 * @since 1.0
 * @function
 */
export let clampBottom = (x, a) => (x < a) ? a : x;

/**
 * @description Clamped values to keep them within the range ]-Inf; b].
 * @param {number} x Number
 * @param {number} b Highest bound
 * @returns {number} Clamped valued
 * @see module:maths~clamp
 * @public
 * @since 1.0
 * @function
 */
export let clampTop = (x, b) => (x > b) ? b : x;

/**
 * @description Keeps an ascii code in the alphabetical range in the ascii table.
 * @param {number} code Ascii code
 * @returns {number} Clamped code
 * @public
 * @since 1.0
 * @function
 */
export let abcClamp = (code) => code === 32 ? 32 : revClamp(clamp(code, 65, 122), 90, 97);

/**
 * @description Linear mapping from range [<code>a1</code>; <code>a2</code>] to range [<code>b1</code>; <code>b2</code>].
 * @param {number} x Number
 * @param {number} a1 Lowest initial bound
 * @param {number} a2 Highest initial bound
 * @param {number} b1 Lowest final bound
 * @param {number} b2 Highest final bound
 * @returns {number} Mapped value
 * @public
 * @since 1.0
 * @function
 */
export let mapLinear = (x, a1, a2, b1, b2) => b1 + (x - a1) * (b2 - b1) / (a2 - a1);

/**
 * @description Degree to radiant.
 * @param {number} deg Degrees (°)
 * @returns {number} Radiant (rad)
 * @see module:maths~rad2deg
 * @public
 * @since 1.0
 * @function
 */
export let deg2rad = (deg) => deg * Math.PI / 180;

/**
 * @description Radiant to degree.
 * @param {number} rad Radiant (rad)
 * @returns {number} Degree (°)
 * @see module:maths~deg2rad
 * @public
 * @since 1.0
 * @function
 */
export let rad2deg = (rad) => rad * 180 / Math.PI;

/**
 * @description Check if <code>x</code> is a prime number.
 * @param {number} x Number
 * @return {boolean} Primeness
 * @public
 * @since 1.0
 * @function
 * @see module:maths~primeN
 */
export let isPrime = (x) => primeN(range(1, 1, x)).contains(x);

/**
 * @description Return the prime numbers of <code>arr</code> where non prime numbers that doesn't have divisors in the array are considered prime numbers.
 * @param {number[]} arr Array
 * @returns {Array} Prime numbers
 * @see module:maths~primeCheck
 * @public
 * @since 1.0
 * @function
 */
export let primeN = (arr) => {
  let res = dsa.QuickSort(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0 && arr[i] != 2) res[i] = 'x';
    for (let j = 0; j < i; j++) {
      if (primeCheck(res[j], res[i])) res[i] = 'x';
    }
  }
  return res.remove('x')
};

/**
 * @description Primeness check of <code>a</code> toward <code>b</code>.
 * @param {number} a Number a
 * @param {number} b Number b
 * @returns {boolean} Primeness
 * @see module:maths~primeN
 * @public
 * @since 1.0
 * @function
 */
export let primeCheck = (a, b) => (a > 1 && b > 1 && b % a === 0 && b != a);

/**
 * @description Get the closest whole <code>n</code>th-root of <code>x</code>.
 * @param {number} x Number
 * @param {number} [n=2] Nth-root
 * @returns {number} Closest root
 * @public
 * @since 1.0
 * @function
 */
export let getClosestRoot = (x, n = 2) => {
  let estimate = 0, err = 0;

  if ((x / 2 * x / 2) / 2 - 2 <= x) estimate = x / 2;
  else if (x / 3 * x / 3 <= x) estimate = x / 3;
  else estimate = x / 4;
  if (Math.pow(estimate, n) === x) return estimate;

  for (let p = 1; p <= n; p++) {
    for (let i = 1; i < x; i++) {
      if (Math.pow(i, p) === x || Math.pow(i, p - 1) * i === x) err = i;
      else if (Math.pow(i, p) > x || Math.pow(i, p - 1) * i > x) err = i - .5;
    }
  }
  if (Math.pow(err, n) <= x) return err;
  else err = (Math.pow(n, -2) + x / Math.pow(n, 4) - x / Math.pow(n, 5) + Math.pow(x, n) / (Math.pow(n, Math.pow(n, 3) + 3)) + x / Math.pow(n, 2)) / 2;
  if (Math.pow(err, n) > x) err = (err + estimate) / 2;
  let res = [estimate, err, (x / err + err) / 2, (err + estimate) / 2];
  let resMap = res.map((x) => Math.pow(x, n)), correction = .9956973041;
  return res[resMap.lookFor(getClosest(x, resMap))] * correction;
};

/**
 * @description Simple interest.
 * @param {number} po Balance
 * @param {number} i Interest
 * @param {number} [t=1] Time (in years)
 * @returns {number} Resulting balance
 * @see module:maths~compoundInterest
 * @public
 * @since 1.0
 * @function
 */
export let simpleInterest = (po, i, t = 1) => po * (1 + i * t);

/**
 * @description Compound interest.
 * @param {number} po Balance
 * @param {number} i Interest
 * @param {number} [t=1] Time (in years)
 * @param {number} n Time divisions
 * @returns {number} Resulting balance
 * @see module:maths~simpleInterest
 * @public
 * @since 1.0
 * @function
 */
export let compoundInterest = (po, i, t = 1, n) => n > 1 ? po * Math.pow(1 + i / n, t * n) : po * Math.pow(1 + i, t);

/**
 * @description Everything but not 0.
 * @param {number} x Number
 * @returns {!number} Non-null number
 * @see module:maths~EPS
 * @public
 * @since 1.0
 * @function
 */
export let non0 = (x) => (x === 0) ? Number.EPSILON : x;

/**
 * @description Fraction form of n.<br />
 * Source: somewhere
 * @param {number} n Number
 * @param {number} prec Precision
 * @param {boolean} [roundUp=false] Round up
 * @returns {string} Fraction
 * @public
 * @since 1.0
 * @function
 */
export let toFrac = (n, prec, roundUp = false) => {
  let s = n.toString();
  if (s.miss('.')) return s;

  let i = n | 0 || '', dps = s.substring(s.indexOf('.'));
  if (!prec) prec = Math.pow(10, dps.length - 1);
  let num = roundUp ? (dps * prec) | 1 : Math.round(dps * prec), den = prec, g = gcd(num, den);

  if (den / g === 1) return String(i + (num / g));
  if (i) i += ' and ';
  return i + String(num / g) + '/' + (den / g)
};

/**
 * @description Makes a number more readable.
 * @param {number} n Number
 * @param {number} [nDec=3] Number of decimals
 * @param {boolean} [frFormat=false] French format
 * @returns {string} Clear number
 * @public
 * @since 1.0
 * @function
 */
export let clearNum = (n, nDec, frFormat = false) => frFormat ? new Intl.NumberFormat('fr-FR').format(n) : new Intl.NumberFormat().format(n);

/**
 * @description Get the increment value from <code>a</code> to <code>b</code>.
 * @param {number} a Minimum
 * @param {number} b Maximum
 * @param {number} [nbDec=2] Number of decimals
 * @returns {number} Step
 * @see external:Array.getIncrement
 * @public
 * @since 1.0
 * @function
 */
export let getStep = (a, b, nbDec = 2) => [a, b].getIncrement(nbDec);

/**
 * @description Quadratic equation solver.
 * @param {number} a Constant a
 * @param {number} b Constant b
 * @param {number} c Constant c
 * @param {number} [nDec=2] Number of decimals
 * @returns {number|NumberLike[]} Solutions
 * @public
 * @since 1.0
 * @function
 */
export let quadraticSolver = (a, b, c, nDec) => {
  let d = Math.sqrt(b) - 4 * a * c;
  return d === 0 ? (-b / (2 * a)).toNDec(nDec) : [((-b - Math.sqrt(Math.abs(d))) / (2 * a) + (d < 0 ? 'i' : 0)).toNDec(nDec), (-b + Math.sqrt(Math.abs(d))) / (2 * a) + (d < 0 ? 'i' : 0).toNDec(nDec)]
};

/**
 * @description Solve equations with a given formula and the result (end.g: x + y + x = res) and the range [<code>a</code>, <code>b</code>]
 * @param {string} formula Formula
 * @param {Array} res Result(start)
 * @param {number} low=-100 Lowest bound
 * @param {number} high=200 Highest bound
 * @returns {Array} Results
 * @public
 * @since 1.0
 * @function
 */
export let eqSolver = (formula, res, low = -100, high = 200) => {
  let results = essence.mkArray(low > 0 ? high - low : high - low + 1, 2, 1);
  //Translation from text to commands or to a computer readable string for eval()
  //Str.replace(/([A-z]|[0-9])\x29$/m, 'm') for end )
  //Str.replace(/^\x28([A-z]|[0-9])/m, 'm') for start (
  if (formula.search(/\^[0-9]/g) > 0) { //Look for a ^n
    /* if (formula.charAt(formula.search(/\^[0-9]/g)-1) == ')') {
     formula = formula.replace(/^\(/m, 'Math.pow(');
     formula = formula.replace(/\)\^[0-9]/g, [A-z] + );
     } else {
     formula = formula.replace(/^\(/m, 'Math.pow(');
     formula = formula.replace(/\^[0-9]/g, [A-z] + );
     } */
    /* proposed by Jhonatan Sneider Salguero Villa
     [(]. * ?[)] (very simplistic, what is inside might not be a math expression)
     \d + \.\d+ (float)
     \d+ (int)
     [a-z]+ (variable)
     */
    let exp = '([(]. * ?[)]|\\d + \\.\\d + |\\d + |[a-z] + )';
    let re = new RegExp(exp + '\\^' + exp);
    formula = formula.replace(re, 'Math.pow($1, $2)');
  } else if (formula.search(/e\^/g) > 0) { //Look for a end^
    let re = new RegExp('end\\^([(]. * ?[)]|\\d + \\.\\d + |\\d + |[a-z] + )');
    formula = formula.replace(re, 'Math.exp($1)');
  }
  essence.say(`Formula now converted to %c${formula}`, 'info', 'color: #00f');
  //Brute force using any values within [a, b]
  for (let x = low; x <= high; x++) {
    for (let y = low; y <= high; y++) results[x][y] = `(${x}, ${y}) ${eval(formula)}`;
  }
  return results.filter((n) => {
    if (n.split(') ')[1] === res) return n.split(') ')[0] + ')'
  }); //Filter out the values which doesn't match the result and returns only (x, y)
};

/**
 * @description Manual equation solver.
 * @param {string} eq Equation
 * @param {number} max Upper limit
 * @param {number} dim Dimension (1: x, 2: x/y, 3: x/y/z)
 * @param {number} r Result of one of the sides
 * @returns {Array} Result(start)
 * @public
 * @since 1.0
 * @function
 */
export let manuEqSolver = (eq, max, dim, r) => {
  let res = essence.mkArray(max + 1, dim, 1), p = [];
  for (let x = 0; x < res.length; x++) {
    if (dim === 2) {
      for (let y = 0; y < res.length; y++) {
        res[x][y] = eval(eq);
        if (res[x][y] === r) p.push(`x=${x}`, `y=${y}`);
      }
    } else if (dim === 3) {
      for (let y = 0; y < res.length; y++) {
        for (let z = 0; z < res.length; z++) {
          res[x][y][z] = eval(eq);
          if (res[x][y][z] === r) p.push(`x=${x}`, `y=${y}`, `z=${z}`);
        }
      }
    } else {
      res[x] = eval(eq);
      if (res[x] === r) p.push(`x=${x}`);
    }
  }
  return p
};

/**
 * @description Remove the text from the string to keep the numbers.
 * @param {string} x String
 * @returns {number} Number
 * @public
 * @since 1.0
 * @function
 */
export let getNumFromStr = (x) => essence.isNon(x) ? NaN : parseFloat(x.replace(/[A-Za-z_ ]+/g, ''));

/**
 * @description Get the numbers from a string or an array.<br />
 * Source: {@link http://www.2ality.com/2015/03/es6-generators.html}
 * @param {string|Array} words String/array
 * @public
 * @since 1.0
 * @type {GeneratorFunction}
 * @example
 * [...extractNumbers(tokenize('Are you 5"9 ?'))]; //[5, 9]
 */
export let extractNum = function*(words) {
  for (let word of words) {
    if (/^[0-9]+$/.test(word)) yield Number(word);
  }
};

/**
 * @description <code>x</code> unit to <code>y</code> px.<br />
 * Reference/help: {@link http://www.endmemo.com/sconvert/centiMetrepixel.php}
 * @param {string} x Number with a unit
 * @returns {number} Pixels
 * @see module:maths~fromPixel
 * @public
 * @since 1.0
 * @function
 */
export let toPixel = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'em':
      m = 16;
      break;
    case 'km':
      m = 3779527.5593333;
      break;
    case 'hm':
      m = 377952.75593333;
      break;
    case 'm':
      m = 3779.5275593333;
      break;
    case 'dm':
      m = 377.95275593333;
      break;
    case 'cm':
      m = 37.795275593333;
      break;
    case 'mm':
      m = 3.7795275593333;
      break;
    case 'ɥm':
      m = 0.0037795275593333;
      break;
    case 'nm':
      m = 3.7795275593333e-6;
      break;
    case 'ex':
      m = 7.156;
      break;
    case 'in':
      m = 96;
      break;
    case 'pt':
      m = 1.3333333333333;
      break;
    case 'pc':
      m = 16;
      break;
    case 'ft':
      m = 1152;
      break;
    case 'twip':
      m = 15;
      break;
    case 'mi':
      m = 6082636.631643;
      break;
    case 'yd':
      m = 3456.043540706;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X px to y unit.
 * @param {number} x Pixels
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toPixel
 * @public
 * @since 1.0
 * @function
 */
export let fromPixel = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'em':
      m = 1 / 16;
      break;
    case 'km':
      m = 1 / 3779527.5593333;
      break;
    case 'hm':
      m = 1 / 377952.75593333;
      break;
    case 'm':
      m = 1 / 3779.5275593333;
      break;
    case 'dm':
      m = 1 / 377.95275593333;
      break;
    case 'cm':
      m = 1 / 37.795275593333;
      break;
    case 'mm':
      m = 1 / 3.7795275593333;
      break;
    case 'ɥm':
      m = 1 / .0037795275593333;
      break;
    case 'nm':
      m = 1 / 3.7795275593333e-6;
      break;
    case 'ex':
      m = 1 / 7.156;
      break;
    case 'in':
      m = 1 / 96;
      break;
    case 'pt':
      m = 1 / 1.3333333333333;
      break;
    case 'pc':
      m = 1 / 16;
      break;
    case 'ft':
      m = 1 / 1152;
      break;
    case 'twip':
      m = 1 / 15;
      break;
    case 'mi':
      m = 1 / 6082636.631643;
      break;
    case 'yd':
      m = 1 / 3456.043540706;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Length converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromPixel
 * @see module:maths~toPixel
 * @public
 * @since 1.0
 * @function
 */
export let convLength = (x, unit) => fromPixel(toPixel(x), unit);

/**
 * @description X size to y bits.
 * @param {string} x Number with a size unit
 * @returns {number} Bits
 * @see module:maths~fromBit
 * @public
 * @since 1.0
 * @function
 */
export let toBit = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'Kb':
      m = 1e-3;
      break;
    case 'Mb':
      m = 1e-6;
      break;
    case 'Gb':
      m = 1e-9;
      break;
    case 'Tb':
      m = 1e-12;
      break;
    case 'Pb':
      m = 1e-15;
      break;
    case 'Eb':
      m = 1e-18;
      break;
    case 'Zb':
      m = 1e-21;
      break;
    case 'Yb':
      m = 1e-24;
      break;
    case 'o':
      m = 8;
      break;
    case 'Ko':
      m = 8e-3;
      break;
    case 'Mo':
      m = 8e-6;
      break;
    case 'Go':
      m = 8e-9;
      break;
    case 'To':
      m = 8e-12;
      break;
    case 'Po':
      m = 8e-15;
      break;
    case 'Eo':
      m = 8e-18;
      break;
    case 'Zo':
      m = 8e-21;
      break;
    case 'Yo':
      m = 8e-24;
      break;
    case 'Kio':
      m = 8 * Math.pow(2, -10);
      break;
    case 'Mio':
      m = 8 * Math.pow(2, -20);
      break;
    case 'Gio':
      m = 8 * Math.pow(2, -30);
      break;
    case 'Tio':
      m = 8 * Math.pow(2, -40);
      break;
    case 'Pio':
      m = 8 * Math.pow(2, -50);
      break;
    case 'Eio':
      m = 8 * Math.pow(2, -60);
      break;
    case 'Zio':
      m = 8 * Math.pow(2, -70);
      break;
    case 'Yio':
      m = 8 * Math.pow(2, -80);
      break;
    case 'Kib':
      m = Math.pow(2, -10);
      break;
    case 'Mib':
      m = Math.pow(2, -20);
      break;
    case 'Gib':
      m = Math.pow(2, -30);
      break;
    case 'Tib':
      m = Math.pow(2, -40);
      break;
    case 'Pib':
      m = Math.pow(2, -50);
      break;
    case 'Eib':
      m = Math.pow(2, -60);
      break;
    case 'Zib':
      m = Math.pow(2, -70);
      break;
    case 'Yib':
      m = Math.pow(2, -80);
      break;
    default:
      m = 1;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X bit to y unit.
 * @param {number} x Bits
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toBit
 * @public
 * @since 1.0
 * @function
 */
export let fromBit = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'Kb':
      m = 1e3;
      break;
    case 'Mb':
      m = 1e6;
      break;
    case 'Gb':
      m = 1e9;
      break;
    case 'Tb':
      m = 1e12;
      break;
    case 'Pb':
      m = 1e15;
      break;
    case 'Eb':
      m = 1e18;
      break;
    case 'Zb':
      m = 1e21;
      break;
    case 'Yb':
      m = 1e24;
      break;
    case 'o':
      m = 1 / 8;
      break;
    case 'Ko':
      m = 1e3 / 8;
      break;
    case 'Mo':
      m = 1e6 / 8;
      break;
    case 'Go':
      m = 1e9 / 8;
      break;
    case 'To':
      m = 1e12 / 8;
      break;
    case 'Po':
      m = 1e15 / 8;
      break;
    case 'Eo':
      m = 1e18 / 8;
      break;
    case 'Zo':
      m = 1e21 / 8;
      break;
    case 'Yo':
      m = 1e24 / 8;
      break;
    case 'Kio':
      m = Math.pow(2, 10) / 8;
      break;
    case 'Mio':
      m = Math.pow(2, 20) / 8;
      break;
    case 'Gio':
      m = Math.pow(2, 30) / 8;
      break;
    case 'Tio':
      m = Math.pow(2, 40) / 8;
      break;
    case 'Pio':
      m = Math.pow(2, 50) / 8;
      break;
    case 'Eio':
      m = Math.pow(2, 60) / 8;
      break;
    case 'Zio':
      m = Math.pow(2, 70) / 8;
      break;
    case 'Yio':
      m = Math.pow(2, 80) / 8;
      break;
    case 'Kib':
      m = Math.pow(2, 10);
      break;
    case 'Mib':
      m = Math.pow(2, 20);
      break;
    case 'Gib':
      m = Math.pow(2, 30);
      break;
    case 'Tib':
      m = Math.pow(2, 40);
      break;
    case 'Pib':
      m = Math.pow(2, 50);
      break;
    case 'Eib':
      m = Math.pow(2, 60);
      break;
    case 'Zib':
      m = Math.pow(2, 70);
      break;
    case 'Yib':
      m = Math.pow(2, 80);
      break;
    default:
      m = 1;
  }
  return x * m + unit
};

/**
 * @description Size converter.
 * @param {string} x Size with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromBit
 * @see module:maths~toBit
 * @public
 * @since 1.0
 * @function
 */
export let convSize = (x, unit) => fromBit(toBit(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> m<sup>2</sup>.
 * @param {string} x Number with a unit
 * @returns {number} m<sup>2</sup>
 * @see module:maths~fromSqMetre
 * @public
 * @since 1.0
 * @function
 */
export let toSqMetre = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'ha':
      m = 1e4;
      break;
    case 'a':
      m = 100;
      break;
    case 'km^2':
      m = 1e6;
      break;
    case 'dm^2':
      m = .01;
      break;
    case 'cm^2':
      m = 1e-4;
      break;
    case 'mm^2':
      m = 1e-6;
      break;
    case 'mi^2':
      m = 2589988.11;
      break;
    case 'acre':
      m = 4046856422;
      break;
    case 'yd^2':
      m = .83612736;
      break;
    case 'ft^2':
      m = .09290304;
      break;
    case 'in^2':
      m = 6.4516e-4;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X m<sup>2</sup> to y unit.
 * @param {number} x m<sup>2</sup>
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toSqMetre
 * @public
 * @since 1.0
 * @function
 */
export let fromSqMetre = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'ha':
      m = 1e-4;
      break;
    case 'a':
      m = .01;
      break;
    case 'km^2':
      m = 1e-6;
      break;
    case 'dm^2':
      m = 100;
      break;
    case 'cm^2':
      m = 1e4;
      break;
    case 'mm^2':
      m = 1e6;
      break;
    case 'mi^2':
      m = 1 / 2589988.11;
      break;
    case 'acre':
      m = 1 / 4046856422;
      break;
    case 'yd^2':
      m = 1 / .83612736;
      break;
    case 'ft^2':
      m = 1 / .09290304;
      break;
    case 'in^2':
      m = 1 / 6.4516e-4;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Area converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromSqMetre
 * @see module:maths~toSqMetre
 * @public
 * @since 1.0
 * @function
 */
export let convArea = (x, unit) => fromPixel(toPixel(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> px.
 * @param {string} x Number with a unit
 * @returns {number} L/km
 * @see module:maths~fromLpkm
 * @public
 * @since 1.0
 * @function
 */
export let toLpkm = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'mipgalUK': //Miles/Gallon (UK)
      m = 2.352392798;
      break;
    case 'mipgal':
      m = 2.352392798;
      break;
    case 'mipgalUS': //Miles/Gallon (US)
      m = 2.825364894;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X L/km to y unit.
 * @param {number} x L/km
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toLpkm
 * @since 1.0
 * @function
 */
export let fromLpkm = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'mipgalUK': //Miles/Gallon (UK)
      m = 1 / 2.352392798;
      break;
    case 'mipgal':
      m = 1 / 2.352392798;
      break;
    case 'mipgalUS': //Miles/Gallon (US)
      m = 1 / 2.825364894;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Fuel/mileage converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromLpkm
 * @see module:maths~toLpkm
 * @public
 * @since 1.0
 * @function
 */
export let convFuel = (x, unit) => fromLpkm(toLpkm(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> px.
 * @param {string} x Number with a unit
 * @returns {number} W
 * @see module:maths~fromW
 * @public
 * @since 1.0
 * @function
 */
export let toW = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'btuph': //Btu/height
      m = .2930710703;
      break;
    case 'hp':
      m = 735.4990028;
      break;
    case 'kW':
      m = 1e3;
      break;
    case 'tonpref': //Ton of refrigeration (ton/ref)
      m = 3516.852842;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X W to y unit.
 * @param {number} x W
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toW
 * @public
 * @since 1.0
 * @function
 */
export let fromW = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'btuph': //Btu/height
      m = 1 / .2930710703;
      break;
    case 'hp':
      m = 1 / 735.4990028;
      break;
    case 'kW':
      m = 1e-3;
      break;
    case 'tonpref': //Ton of refrigeration (ton/ref)
      m = 1 / 3516.852842;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Power converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromW
 * @see module:maths~toW
 * @public
 * @since 1.0
 * @function
 */
export let convPower = (x, unit) => fromW(toW(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> bar.
 * @param {string} x Number with a unit
 * @returns {number} bar
 * @see module:maths~fromBar
 * @public
 * @since 1.0
 * @function
 */
export let toBar = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'atm':
      m = 1.01325;
      break;
    case 'mbar':
      m = 1e-3;
      break;
    case 'inHg': //Inch Mercury
      m = .03386388158;
      break;
    case 'mmHg': //MilliMetre Mercury
      m = 0.001333223684;
      break;
    case 'MPa': //Mega Pascal
      m = 10;
      break;
    case 'KPa':
      m = .01;
      break;
    case 'Pa': //Pascal (N/m^2)
      m = 1e-5;
      break;
    case 'psf': //Pound/foot^2
      m = 4.788025898e-4;
      break;
    case 'psi': //Pound/in^2
      m = .06894757293;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X bar to y unit.
 * @param {number} x bar
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toBar
 * @public
 * @since 1.0
 * @function
 */
export let fromBar = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'atm':
      m = 1 / 1.01325;
      break;
    case 'mbar':
      m = 1e3;
      break;
    case 'inHg': //Inch Mercury
      m = 1 / .03386388158;
      break;
    case 'mmHg': //MilliMetre Mercury
      m = 1 / 0.001333223684;
      break;
    case 'MPa': //Mega Pascal
      m = .1;
      break;
    case 'KPa':
      m = 100;
      break;
    case 'Pa': //Pascal (N/m^2)
      m = 1e5;
      break;
    case 'psf': //Pound/foot^2
      m = 2088.5434233296623;
      break;
    case 'psi': //Pound/in^2
      m = 1 / .06894757293;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Pressure converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromBar
 * @see module:maths~toBar
 * @public
 * @since 1.0
 * @function
 */
export let convPressure = (x, unit) => fromBar(toBar(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> mps.
 * @param {string} x Number with a unit
 * @returns {number} M/s
 * @see module:maths~fromMps
 * @public
 * @since 1.0
 * @function
 */
export let toMps = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'kmph': //km/height
      m = .277777778;
      break;
    case 'mph': //miles/height
      m = .44704;
      break;
    case 'ftpmin': //Feet per minute (ft/min)
      m = .00508;
      break;
    case 'ftps': //Feet per second
      m = .3048;
      break;
    case 'knot':
      m = .5144444444;
      break;
    case 'c(v)': //Light speed (celerity)
      m = 299792458;
      break;
    case 'Mach(a)': //Sound speed
      m = 343.2;
      break;
    case 'Mach(width)': //Sound speed
      m = 1484;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X m/s to y unit
 * @param {number} x bar
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toMps
 * @public
 * @since 1.0
 * @function
 */
export let fromMps = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'kmph': //km/height
      m = 1 / .277777778;
      break;
    case 'mph': //miles/height
      m = 1 / .44704;
      break;
    case 'ftpmin': //Feet per minute (ft/min)
      m = 1 / .00508;
      break;
    case 'ftps': //Feet per second
      m = 1 / .3048;
      break;
    case 'knot':
      m = 1 / .5144444444;
      break;
    case 'c(v)': //Light speed (celerity)
      m = 1 / 299792458;
      break;
    case 'Mach(a)': //Sound speed
      m = 1 / 343.2;
      break;
    case 'Mach(w)': //Sound speed
      m = 1 / 1484;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Speed converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromMps
 * @see module:maths~toMps
 * @public
 * @since 1.0
 * @function
 */
export let convSpeed = (x, unit) => fromMps(toMps(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> °C.
 * @param {string} x Number with a unit
 * @returns {number} °C
 * @see module:maths~fromCelsius
 * @public
 * @since 1.0
 * @function
 */
export let toCelsius = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case '°F': //Fahrenheit
      m = -17.22222222;
      break;
    case 'K': //Kelvin
      m = -272.15;
      break;
    case '°Ra': //Rankine
      m = -272.5944444;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X °C to y unit.
 * @param {number} x °C
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toCelsius
 * @public
 * @since 1.0
 * @function
 */
export let fromCelsius = (x, unit) => {
  let m = 1;
  switch (unit) {
    case '°F': //Fahrenheit
      m = 1 / -17.22222222;
      break;
    case 'K': //Kelvin
      m = 1 / -272.15;
      break;
    case '°Ra': //Rankine
      m = 1 / -272.5944444;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Temperature converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromCelsius
 * @see module:maths~toCelsius
 * @public
 * @since 1.0
 * @function
 */
export let convTemperature = (x, unit) => fromCelsius(toCelsius(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> m<sup>3</sup>.
 * @param {string} x Number with a unit
 * @returns {number} m<sup>3</sup>3
 * @see module:Maths~fromCbMetre
 * @public
 * @since 1.0
 * @function
 */
export let toCbMetre = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'L': //Litre
      m = 1e-3;
      break;
    case 'dm^3': //Cubic decimetre
      m = 1e-3;
      break;
    case 'dL': //decilitre
      m = 1e-4;
      break;
    case 'cL': //centilitre
      m = 1e-5;
      break;
    case 'mL': //millilitre
      m = 1e-6;
      break;
    case 'cm^3': //Cubic centimetre
      m = 1e-6;
      break;
    case 'mm^3': //Cubic millimetre
      m = 1e-9;
      break;
    case 'tblspn': //Tablespoon
      m = 1.5e-5;
      break;
    case 'tspn': //Teaspoon
      m = 5e-6;
      break;
    case 'yd^3': //Cubic yard
      m = .764554858;
      break;
    case 'ft^3': //Cubic foot
      m = .02831684659;
      break;
    case 'in^3': //Cubic inch
      m = 1.6387064e-5;
      break;
    case 'bushel': //US bushel
      m = .03523907017;
      break;
    case 'barrel': //UK barrel
      m = .16365924;
      break;
    case 'gal': //UK gallon
      m = 4.54609e-3;
      break;
    case 'fl oz': //UK fluid ounce
      m = 2.84130625e-5;
      break;
    case 'pint': //UK pint
      m = 5.6826125e-4;
      break;
    case 'quart': //UK quart
      m = 1.1365225e-3;
      break;
    case 'cup': //US cup
      m = 2.365882365e-4;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X m<sup>3</sup> to y unit
 * @param {number} x m<sup>3</sup>
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toCbMetre
 * @public
 * @since 1.0
 * @function
 */
export let fromCbMetre = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'L': //Litre
      m = 1e3;
      break;
    case 'dm^3': //Cubic decimetre
      m = 1e3;
      break;
    case 'dL': //decilitre
      m = 1e4;
      break;
    case 'cL': //centilitre
      m = 1e5;
      break;
    case 'mL': //millilitre
      m = 1e6;
      break;
    case 'cm^3': //Cubic centimetre
      m = 1e6;
      break;
    case 'mm^3': //Cubic millimetre
      m = 1e9;
      break;
    case 'tblspn': //Tablespoon
      m = 1 / 1.5e-5;
      break;
    case 'tspn': //Teaspoon
      m = 1 / 5e-6;
      break;
    case 'yd^3': //Cubic yard
      m = 1 / .764554858;
      break;
    case 'ft^3': //Cubic foot
      m = 1 / .02831684659;
      break;
    case 'in^3': //Cubic inch
      m = 1 / 1.6387064e-5;
      break;
    case 'bushel': //US bushel
      m = 1 / .03523907017;
      break;
    case 'barrel': //UK barrel
      m = 1 / .16365924;
      break;
    case 'gal': //UK gallon
      m = 1 / 4.54609e-3;
      break;
    case 'fl oz': //UK fluid ounce
      m = 1 / 2.84130625e-5;
      break;
    case 'pint': //UK pint
      m = 1 / 5.6826125e-4;
      break;
    case 'quart': //UK quart
      m = 1 / 1.1365225e-3;
      break;
    case 'cup': //US cup
      m = 1 / 2.365882365e-4;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Volume converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromCbMetre
 * @see module:maths~toCbMetre
 * @public
 * @since 1.0
 * @function
 */
export let convVolume = (x, unit) => fromCbMetre(toCbMetre(x), unit);

/**
 * @description <code>x</code> unit to <code>y</code> g.
 * @param {string} x Number with a unit
 * @returns {number} g
 * @see module:maths~fromGram
 * @public
 * @since 1.0
 * @function
 */
export let toGram = (x) => {
  let m = 1;
  switch (x.substring(String(getNumFromStr(x)).length, x.length).remove()) {
    case 'kg':
      m = 1e3;
      break;
    case 'mg':
      m = 1e-3;
      break;
    case 'lb': //Pound
      m = 453.59237;
      break;
    case 'oz': //Ounce
      m = 28.34952312;
      break;
    case 'ton': //Metric ton
      m = 1e6;
      break;
    case 'st': //Stone
      m = 6350.29318;
      break;
    default:
      break;
  }
  return getNumFromStr(x) * m
};

/**
 * @description X g to y unit<;
 * @param {number} x g
 * @param {string} unit Unit
 * @returns {string} Conversion
 * @see module:maths~toGram
 * @public
 * @since 1.0
 * @function
 */
export let fromGram = (x, unit) => {
  let m = 1;
  switch (unit) {
    case 'kg':
      m = 1e-3;
      break;
    case 'mg':
      m = 1e3;
      break;
    case 'lb': //Pound
      m = 1 / 453.59237;
      break;
    case 'oz': //Ounce
      m = 1 / 28.34952312;
      break;
    case 'ton': //Metric ton
      m = 1e-6;
      break;
    case 'st': //Stone
      m = 1 / 6350.29318;
      break;
    default:
      break;
  }
  return x * m + unit
};

/**
 * @description Weight converter.
 * @param {string} x Number with unit
 * @param {string} unit Final unit
 * @returns {string} <code>x</code> &rArr; <code>y</code> <code>unit</code>
 * @see module:maths~fromGram
 * @see module:maths~toGram
 * @public
 * @since 1.0
 * @function
 */
export let convWeight = (x, unit) => fromGram(toGram(x), unit);

/**
 * @description Matlab min:inc:max range.
 * @param {number} [min=0] Minimum/increment (if <code>max</code> isn't specified)/maximum (if <code>inc</code> is also not specified)
 * @param {number} [inc=1] Increment/maximum (if <code>max</code> isn't specified)
 * @param {number} [max] Maximum
 * @param {Bool} [nbDec=2] Number of decimals
 * @returns {number[]} Range
 * @see module:maths~range2base
 * @public
 * @since 1.0
 * @function
 */
export let range = (min = 0, inc = 1, max, nbDec = 2) => {
  let val = [];
  if (!inc && !max && max != 0) [max, min] = [min, 0];
  if (inc && !max && max != 0) [max, inc, min] = [inc, min, 0];
  if (inc > 0) { //Ascending order
    for (let i = min; i <= max; i += inc) val.push(Number(i).toNDec(nbDec));
  } else { //Descending order
    for (let i = min; i >= max; i -= inc) val.push(Number(i).toNDec(nbDec));
  }
  return val
};

/**
 * @description Same as range() but to the base <code>b</code>.
 * @param {number} [min=0] Minimum
 * @param {number} [inc=1] Increment
 * @param {number} [max] Maximum
 * @param {number} [base=2] Base
 * @returns {Array} Range
 * @see module:maths~range
 * @public
 * @since 1.0
 * @function
 */
export let range2base = (min = 0, inc = 1, max, base = 2) => {
  let val = [];
  if (inc > 0) {
    for (let i = min; i <= max; i += inc) val.push(conv(i, 10, base));
  } else {
    for (let i = min; i >= max; i += inc) val.push(conv(i, 10, base));
  }
  return val
};

/**
 * @description Like Array.rand() but with optionally unique values and using a Fisher Yates-like approach
 * @param {number} [min=0] Minimum
 * @param {number} [inc=1] Increment
 * @param {number} [max] Maximum
 * @param {boolean} [noRepeat=false] No repeated numbers
 * @returns {Nums} Mixed range
 * @public
 * @since 1.0
 * @function
 */
export let mixedRange = (min = 0, inc = 1, max, noRepeat = false) => {
  let r = range(min, inc, max);
  return noRepeat ? r.shuffle() : r.rand();
};

/**
 * @description Fisher-Yates shuffle.<br />
 * Inspired by {@link https://Github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/shuffle.js}
 * @param {(string|array)} list List to shuffle
 * @returns {(string|array)} Shuffled array
 * @public
 * @since 1.0
 * @function
 */
export let fisherYatesShuffle = (list) => {
  let len = list.length;
  while (len > 0) {
    let randPos = (Math.random() * len--) | 0;
    if (list.has(len)) [list[len], list[randPos]] = [list[randPos], list[len]];
  }
  return list
};

/**
 * @description Vector product.
 * @param {object} v1 Vector #1
 * @param {object} v2 Vector #2
 * @returns {string} Vector product
 * @see module:math~scalarProd
 * @public
 * @since 1.0
 * @function
 */
export let vectorProd = (v1, v2) => {
  //let x = [['i', 'j', 'k'], [v1.x, v1.y, v1.z], [v2.x, v2.y, v2.z]];
  let prod = [v1.y * v2.z - v1.z * v2.y, v1.x * v2.z - v1.z * v2.x, v1.x * v2.y - v1.y * v2.x];
  return `${prod[0]}i ${prod[1]}j ${prod[2]}k`;
};

/**
 * @description Scalar/dot product.
 * @param {object} v1 Vector #1
 * @param {object} v2 Vector #2
 * @returns {number} Scalar product
 * @see module:maths~vectorProd
 * @public
 * @since 1.0
 * @function
 */
export let scalarProd = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

/**
 * @description Convert a vector to a point.
 * @param {object} v Vector
 * @returns {Pt} Point
 * @see module:ui~Pt
 * @public
 * @since 1.0
 * @function
 */
export let vector2Point = (v) => new dsa.Pt(v.x, v.y, v.z);

/**
 * @description Convert a vector to a point form (R = xi + yj + zk&rarr;(x, y, z)).
 * @param {object} r Vector
 * @returns {string} Point form
 * @see module:maths~vector2Point
 * @public
 * @since 1.0
 * @function
 */
export let vector2PointForm = (r) => {
  let i = r.split('i'), j = i[1].split('j');
  return `(${i[0].clean()}, ${(j[0].slice(1, j[0].length)).clean()}, ${(j[1].split('k')[0]).clean()})`;
};

/**
 * @description Union (&Union;).<br />
 * It will give a single array with unique values of all the elemenets of all arrays.
 * @param {Array[]} arrays Array of arrays to unit
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a<sub>0</sub> &Union; a<sub>1</sub> ... &Union; a<sub>n</sub>
 * @public
 * @since 1.0
 * @function
 */
export let union = (arrays, toSort = false) => toSort ? misc.rmDuplicates(arrays[0].concat(...arrays.get(1))).sort() : misc.rmDuplicates(arrays[0].concat(...arrays.get(1)));

/**
 * @description Intersection (&Intersection;).<br />
 * It will give all the common elements among the arrays.
 * @param {Array[]} arrays Array of arrays to intersect together
 * @param {boolean} [toSort=false] Sort the elements
 * @returns {Array} a<sub>0</sub> &Intersection; a<sub>1</sub> ... &Intersection; a<sub>n</sub>
 * @public
 * @since 1.0
 * @function
 */
export let intersection = (arrays, toSort = false) => {
  let first = misc.rmDuplicates(arrays[0]), rest = arrays.get(1).map(arr => misc.rmDuplicates(arr));
  let inter = first.filter(item => rest.some(arr => arr.contains(item)));
  return toSort ? inter.sort() : inter;
  //essence.say(`variables: ${vars.toStr(true)}`, 'info');
  rows = binaryCases(vars.length);
  for (let row of rows) {
    let cexp = exp;
    for (let j = 0; j < vars.length; j++) cexp = cexp.multiReplace([[vars[j], row[j]]]);
    //essence.say(`current exp: ${cexp}`, 'info');
    res.push(eval(cexp));
  }
  return [vars, rows, res];
};

/**
 * @description Get the DNF form of an expression.
 * @param {string} exp Expression
 * @returns {string} DNF
 * @since 1.0
 * @public
 * @todo Work on it
 * @function
 */
export let getDNF = (exp) => {
  let tt = truthTable(exp), dnf = '';
  //Code to be added here
  return dnf;
};

/**
 * @description Get the CNF form of an expression.
 * @param {string} exp Expression
 * @returns {string} CNF
 * @since 1.0
 * @public
 * @todo Work on it
 * @function
 */
export let getCNF = (exp) => {
  let tt = truthTable(exp), cnf = '';
  //Code to be added here
  return cnf;
};

/**
 * @description Confidence interval with stats known for times.
 * @param {number} avg Average/mean
 * @param {number} n Number of times
 * @param {number} sd Standard Deviation
 * @return {number[]} Confidence interval
 * @public
 * @since 1.0
 * @function
 */
export let timeCI = (avg, n, sd) => [avg + InvNorm(n / 200) * sd / Math.sqrt(n), avg - InvNorm(n / 200) * sd / Math.sqrt(n)];

/**
 * @description Sample mean of a population/array (<span style="text-decoration: overline">x</span>).
 * @param {number[]} arr Population
 * @return {number} Sample mean <span style='text-decoration: overline'>x</span>
 * @public
 * @since 1.0
 * @function
 */
export let sampleMean = (arr) => Math.sqrt(sumPow2(arr) / arr.length - arr.mean());

/**
 * @description Confidence interval with stats known.
 * @param {Nums} avg Sample average/mean or population (array of numbers)
 * @param {number} [c=.95] Confidence (eg.: 95%)
 * @param {number} [n] Number of data
 * @param {number} [sd] Standard Deviation
 * @return {number[]} Confidence interval
 * @todo Make <code>sd</code> optional after having a t-Distribution table calculator
 * @public
 * @since 1.0
 * @function
 * @example
 * //If the first paraMetre is a number (hence the sample mean), than the rest of the paraMetres are necessary
 * var ci = confidenceInterval(6.34, .75, 5, .74);
 * //Otherwise if the first paraMetre is an array (of numbers), than the rest of the paraMetres are useless (except the second one)
 * ci = confidenceInterval([5.7, 6.63, 6.57, 7.7, 7.51], .75);
 */
export let confidenceInterval = (avg, c = .95, n, sd) => {
  let z = InvNorm(c); //sd ? InvNorm(c) : TDistrib((1 - c) / 2, n - 1);
  if (essence.isType(avg, 'Array')) {
    sd = avg.stddev();
    n = avg.length;
    avg = sampleMean(avg);
  }
  return [avg - z * sd / Math.sqrt(n), avg + z * sd / Math.sqrt(n)];
};

/**
 * @description Fibonacci sequence.
 * @param {number} x Number
 * @return {*} Fibonacci sequence to <code>x</code>
 * @public
 * @function
 * @since 1.0
 */
export let Fibonacci = (x) => (x <= 1) ? x : Fibonacci(x - 1) + Fibonacci(x - 2);

/**
 * @description Calculate expressions in RPN (Reverse Polish Notation).
 * @param {string} exp Expression
 * @return {number} Result
 * @public
 * @since 1.0
 * @function
 * @example
 * revPolishCalc('1 4 + 2 *'); //equivalent to (1 + 4) * 2 = 10
 */
export let revPolishCalc = (exp) => {
  let values = new dsa.Stack(), chars = exp.split(' '), res = 0, nbOfNums = 0;

  if (chars.length === 1) return parseFloat(chars[0]);
  else if (chars.length === 2) throw new qtest.InvalidExpressionError('Unsufficient amount of values!');

  for (let char of chars) {
    if (isNaN(char)) {
      if (SIGNS.contains(char)) { //The current is a sign
        let num0 = values.pop(), num1 = values.pop();
        res = eval(num1 + char + num0);
        values.push(res);
        nbOfNums = 0;
      } else throw new qtest.InvalidExpressionError(`WTF is the ${char} character doing here?`);
    } else { //Number
      values.push(parseFloat(char));
      if (nbOfNums <= 2) nbOfNums++;
      else throw new qtest.InvalidExpressionError('Too many numbers without operations!');
    }
  }
  return res;
};