/**
 * @module ui
 * @description User Interface related module.
 * @requires module:essence
 * @requires files
 * @requires dom
 */

import * as essence from './essence'
import * as file from './files'
import * as dom from './dom'

/**
 * @description Apply Essence's CSS to the page.
 * @param {boolean} [noMinification=false] Don't import the minified stylesheet
 */
export let applyCSS = (noMinification=false) => {
  essence.includeOnce(file.getExtPath(file.getDirectoryPath(dom.gatherScripts()[dom.gatherScripts()['essence.min.js'] ? 'essence.min.js': 'essence.js']))
    + (noMinification ? 'essence.css': 'essence.min.css'), 'link', file.getDirectoryPath());

};