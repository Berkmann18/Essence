/**
 * @module qtest
 * @description QA testing related module.
 * @requires module:essence
 * @since 1.0
 */
import {entries, say, isType, Copy, time} from './essence';
import {stripPath, getFilename} from './files';
import {nthroot} from './maths';

/**
 * @description Error handler.
 * @param {string} msg Message
 * @param {URL} [url=file.get...] URL of the source
 * @param {number} line Line/column number where the error occurred
 * @public
 * @since 1.0
 * @todo Add default values
 */
export const handleError = (msg, url, line) => console.log(`[Essence] An error has occurred at l.${line} of ${url}.\n\nMessage: ${msg}`);

/**
 * @description Event console log.
 * @param {Event} event Event
 * @public
 * @since 1.0
 * @function
 */
export const EvtLog = event => entries(event).map((key, value) => say(`${key}: ${value}`));

/*
Types
 - EvalError: instance representing an error that occurs regarding the global function eval()
 - InternalError: instance representing an error that occurs when an internal error in the JS
 engine is thrown.
 E.g. "too much recursion"
 - RangeError: instance representing an error that occurs when a numeric variable or parameter is
 outside of its valid
 range
 - ReferenceError: instance representing an error that occurs when de-referencing an invalid
 reference
 - SyntaxError: instance representing a syntax error that occurs while parsing code in eval()
 - TypeError: instance representing an error that occurs when a variable or parameter is not of a
 valid type
 - URIError: instance representing an error that occurs when encodeURI() or decodeURI() are passed
 invalid parameters
 */

/**
 * @description Invalid parameter error.
 * @param {string} [msg='The parameter used at <code>lineNum</code> is invalid']  Message
 * @param {string} [fname=location.href] Filename
 * @param {number} [lineNum=getLineNum()] Line number
 * @class
 * @returns {InvalidParamError} Parameter error
 * @extends {TypeError}
 * @this {InvalidParamError}
 * @public
 * @since 1.0
 * @throws {TypeError}
 */
export class InvalidParamError extends TypeError {
  constructor(msg='The parameter is invalid !', fname=location.href, lineNum=getLineNum()) {
    let error = TypeError.call(this, msg);
    this.name = 'InvalidParamError';
    this.message = error.message;
    this.stack = error.stack;
    this.fileName = fname;
    this.lineNumber = lineNum;
  }
}

/**
 * @description Invalid expression error
 * @param {string} [msg='The expression is invalid !']  Message
 * @param {string} [fname=location.href] Filename
 * @param {number} [lineNum=getLineNum()] Line number
 * @class
 * @returns {InvalidExpressionError} Error
 * @extends {Error}
 * @this {InvalidExpressionError}
 * @public
 * @since 1.0
 * @throws {Error}
 */
export class InvalidExpressionError extends Error {
  constructor(msg='The parameter is invalid !', fname=location.href, lineNum=getLineNum()) {
    let error = Error.call(this, msg);
    this.name = 'InvalidExpressionError';
    this.message = error.message;
    this.stack = error.stack;
    this.fileName = fname;
    this.lineNumber = lineNum;
  }
}

/**
 * @description Get the caller's trace's location.
 * @returns {string} Trace location
 * @since 1.0
 * @function
 * @throws {Error}
 */
export let getTrace = () => {
  let err = () => {
    try {
      //noinspection ExceptionCaughtLocallyJS
      throw Error('')
    } catch(e) {
      return e;
    }
    //return new Error("");
  };
  let fn = stripPath(err().stack.split('\n').last());
  return fn.split(' ').last();
};

/**
 * @description Get the caller's trace's line number and column number.
 * @param {boolean} [noCols=false] Remove the column number
 * @returns {string} Line number (with the column number)
 * @public
 * @since 1.0
 * @function
 */
export let getLineNum = (noCols) => {
  return noCols ? getTrace().split(':')[1] : getTrace().get(getTrace().indexOf(':') + 1).remove();
};

/**
 * @description Test an error
 * @param {Error} err Error
 * @public
 * @since 1.0
 * @function
 * @throws {Error}
 */
export let testErr = (err) => {
  try {
    //noinspection ExceptionCaughtLocallyJS
    throw err;
  } catch (e) {
    say(`%cTested error%c:\n${e.stack}`, 'error', 'text-decoration: underline; color: #000;", "text-decoration: none; color: #000;');
  }
};

/**
 * @description Error testing for beginners.<br />
 * Source: {@link https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/12705609_1071795346206130_3757520485028328706_n.jpg?oh=cb99a4624d9732414b787f7eb8437c73&oe=57383223}
 * @param {Function} fx Function
 * @param {*} [param] Parameter
 * @returns {undefined}
 * @public
 * @since 1.0
 * @function
 */
export let noobTest = (fx, param) => {
  try {
    fx(param);
  } catch(e) {
    location.href = 'http://stackoverflow.com/search?q=[js]+' + e.message;
  }
};

/**
 * @description Test a function/expression
 * @param {function(*)|string} fx Function/expression
 * @param {*} [args] Arguments
 * @public
 * @since 1.0
 * @function
 */
export let test = (fx, ...args) => {
  try {
    isType(fx, 'String') ? eval(fx) : fx(...args);
  } catch (e) {
    handleError(`${e}\n`, getFilename(true), getLineNum(true));
  }
};

/**
 * @description Unit test object.
 * @type {{total: number, bad: number, failRate: number, coverage: number, test: UnitTest.test, reset: UnitTest.reset, multiTest: UnitTest.multiTest, report: UnitTest.report}}
 * @public
 * @since 1.0
 * @this UnitTest
 * @global
 * @property {number} UnitTest.total Total number of tests done
 * @property {number} UnitTest.bad Total number of failed tests
 * @property {number} UnitTest.failRate Failure rate
 * @property {number} UnitTest.coverage Coverage
 * @property {function(*, *, string, boolean)} UnitTest.test Assertion tester
 * @property {function(*, *, string, boolean)} UnitTest.testFalse Reversed assertion tester
 * @property {Function} UnitTest.reset Reset
 * @property {function(Array[], boolean)} UnitTest.multiTest Multi assertion tester
 * @property {Function} UnitTest.report Report loger
 * @property {Array[]} UnitTest.libTests Intern tests to EssenceJS
 */
export let UnitTest = {
  total: 0,
  fail: 0,
  failRate: 0,
  coverage: 0,
  test(then, expected, description='Test #f', noisy=false) {
    this.total++;
    let actual = Copy(then), timeSpent, passed; //to avoid random changes while calling the same function/method with the same parameter(start)
    timeSpent = time(() => passed = actual.equals(expected));
    if (!passed) {
      this.fail++;
      console.log(`%c[Unit]%c ${description}${this.fail}: Expected "%c${expected}%c" but was "%c${actual}%c"\t(${timeSpent}ms)`, 'color: #c0c', 'color: #000', 'color: #0f0', 'color: #000', 'color: #f00', 'color: #000');
    } else if (noisy && passed) console.log(`%c[Unit]%c The expectation on ${expected} was satisfied !\t(${timeSpent}ms)`, 'color: #c0c', 'color: #000');
  },
  testFalse(then, expected, cmt='Test #f', noisy=false) {
    this.total++;
    let actual = Copy(then), timeSpent, passed;
    timeSpent = time(() => passed = actual.equals(expected));
    if (passed) {
      this.fail++;
      console.log(`%c[Unit]%c ${cmt}: Didn't expected %c${expected}%c" to be "%c${actual}%c"\t(${timeSpent}ms)`, 'color: #c0c', 'color: #000', 'color: #0f0', 'color: #000', 'color: #f00', 'color: #000');
    } else if (noisy && !passed) console.log(`%c[Unit]%c The anti-expectation on ${expected} was satisfied !\t(${timeSpent}ms)`, 'color: #c0c', 'color: #000');
  },
  reset() {
    this.total = 0;
    this.fail = 0;
    this.failRate = 0;
    this.coverage = 0;
  },
  multiTest(pairs, noisy=false) {
    this.reset();
    console.group('%c[Unit]%c Multi test', 'color: #c0c', 'color: #000');
    console.time('Unit test');
    for (let t of pairs) this.test(t[0], t[1], (t.length === 3) ? t[2] : false, noisy);
    console.timeEnd('Unit test');
    this.report();
    console.groupEnd();
  },
  report() {
    this.failRate = markConv(this.fail, this.total);
    console.info(`%c[Unit]%c Pass/Fail: %c${this.total - this.fail}%c/%c${this.fail}%c (${this.failRate}% fail); on ${BrowserDetect.info()} at ${getLineNum()}`, 'color: #c0c', 'color: #000', 'color: #0f0', 'color: #000', 'color: #f00', 'color: #000');
  },
  basicTests() {
    this.reset();
    console.log('%c[Unit]%c Basic tests', 'color: #c0c', 'color: #000');
    this.multiTest([
      [eval(1.0 + 2.0), 3.0], //Rounding
      ['Hello World'.split(' '), [['H', 'end', 'l', 'l', 'o'].join(''), ['W', 'o', 'r', 'l', 'd'].join('')]], //Diving and joining
      [nthroot(5, 2, 4), Math.pow(5, 1/2).toNDec(4)]
    ]);
  },
  libTests: [],
  assert(exp, description) {
    console.assert(exp, description);
  }
};