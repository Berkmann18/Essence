/**
 * @module qtest
 * @description QA testing related module.
 * @requires module:essence
 * @since 2.0
 */

/**
 * @description Error handler.
 * @param {string} msg Message
 * @param {URL} [url=file.get...] URL of the source
 * @param {number} line Line/column number where the error occurred
 * @public
 * @since 2.0
 * @todo Add default values
 */
export let handleError = (msg, url, line) => {
    alert("[Essence] An error has occurred at l.${line} of ${url}.\n\nMessage: ${msg}");
};