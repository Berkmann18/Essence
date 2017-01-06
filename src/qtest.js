/**
 * @module qtest
 * @description QA testing related module.
 * @requires module:essence
 * @since 1.0
 */
import * as essence from './essence';

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
export const EvtLog = event => essence.entries(event).map((key, value) => essence.say(`${key}: ${value}`));

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
 function MyError(message) { //From Mozilla ?
 this.name = 'MyError';
 this.message = message || 'Default Message';
 this.stack = (new Error()).stack
 }
 MyError.prototype = Object.create(Error.prototype);
 MyError.prototype.constructor = MyError;
 */
