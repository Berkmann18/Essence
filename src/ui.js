/**
 * @module ui
 * @description User Interface related module.
 * @requires module:essence
 * @requires files
 * @requires dom
 */

import {includeOnce} from './essence'
import {getExtPath, getDirectoryPath} from './files'
import {gatherScripts} from './dom'

/**
 * @description Apply Essence's CSS to the page.
 * @param {boolean} [noMinification=false] Don't import the minified stylesheet
 */
export let applyCSS = (noMinification=false) => {
  includeOnce(getExtPath(getDirectoryPath(gatherScripts()[gatherScripts()['essence.min.js'] ? 'essence.min.js': 'essence.js']))
    + (noMinification ? 'essence.css': 'essence.min.css'), 'link', getDirectoryPath());

};