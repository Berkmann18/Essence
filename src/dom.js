/**
 * @module dom
 * @description Document-Object Model related module.
 * @requires module:essence
 * @since 1.0
 */
import {$n, $e, isNon} from './essence';
import * as files from './files';

/**
 * @description Add CSS code into the page.
 * @param {string} css CSS rules
 * @todo Compare to addCSSRules to see which one is better
 * @public
 * @since 1.0
 * @function
 */
export const addCSS = (css) => {
  if ($n('style#essenceCSS', true) === null) {
    const style = document.createElement('style');
    style.innerText = css;
    style.type = 'text/css';
    style.id = 'essenceCSS';
    $n('head').appendChild(style);
  } else $e('style#essenceCSS').after(css);
};

/**
 * @description Add JS code into the page.
 * @param {string} js JS instructions
 * @public
 * @since 1.0
 * @function
 */
export const addJS = (js) => {
  if ($n('script#essenceJS', true) === null) {
    const script = document.createElement('script');
    script.innerText = js;
    script.type = 'text/javascript';
    script.id = 'essenceJS';
    $n('head').appendChild(script);
  } else $e('script#essenceJS').after(js);
};

/**
 * @description Empty the document and place a basic structure.
 * @param {string} [title=document.title] Title of the document
 * @param {string} [author='anonymous'] Author of the document
 * @public
 * @since 1.0
 * @function
 */
export const emptyDoc = (title = document.title, author = 'anonymous') => {
  $e('html').write(`<html>
    <head>
      <title>${title}</title>
      <meta charset="UTF-8" />
      <meta name="author" content="${author}" />
    </head>
    <body></body>
  </html>`, true);
};

/**
 * @description Print onto something
 * @param {*} text Data to be printed
 * @param {boolean} [isHTML=false] Has to be formatted as an HTML code or not
 * @param {string} [place='body'] Place to print <code>text</code>
 * @see module:dom~println
 * @public
 * @since 1.0
 * @function
 */
export let print = (text, isHTML=false, place='body') => {
  $e(place).isEmpty() ? $e(place).write(text, isHTML) : $e(place).after(text, isHTML);
};

/**
 * @description Print-line onto something
 * @param {*} text Data to be printed
 * @param {string} [place='body'] Place to print <code>text</code>
 * @see module:dom~print
 * @public
 * @since 1.0
 * @function
 */
export let println = (text, place='body') => {
  $e(place).isEmpty() ? $e(place).write(`${text}<br />`, true) : $e(place).after(`${text}<br />`, true);
};

/**
 * @description Temporarily add meta-data to the page
 * @param {string} name Name
 * @param {NumberLike} content Content
 * @param {boolean} [httpe=false] HTTP Equiv specified ?
 * @see module:dom~getMetaData
 * @public
 * @since 1.0
 * @function
 */
export let addMetaData = (name, content, httpe=false) => {
  let el = document.createElement('meta');
  httpe ? el.httpEquiv = name : el.name = name;
  el.content = content;
  document.head.appendChild(el)
};

/**
 * @description Get the meta-data of the current page
 * @returns {string[][]} Name and content results
 * @see module:dom~addMetaData
 * @public
 * @since 1.0
 * @function
 */
export let getMetaData = () => {
  let md = $n('*meta'), resN = [], resC = [];
  for (let meta of md) {
    resN.push(meta.name || meta.httpEquiv || meta.title);
    resC.push(meta.content || meta.value);
  }
  return [resN, resC]
};

/**
 * @description Current context menu handler
 * @type {Function}
 * @see module:dom~noRightClick
 * @private
 */
let currentContextMenu = null;

/**
 * @description Disable right clicks
 * @param {boolean} [restore=false] Restore the right click
 * @public
 * @since 1.0
 * @function
 * @see module:dom~currentContextMenu
 */
export let noRightClick = (restore=false) => {
  if (restore) document.oncontextmenu = currentContextMenu;
  else {
    currentContextMenu = document.oncontextmenu;
    document.oncontextmenu = () => false;
  }
};

/**
 * @description Redirect to somewhere.
 * @param {string} to Place to be redirected to
 * @param {string} divId Id of the element to be used to inform the user about what's going on
 * @param {number} [dt=3e3] Time delay (in ms)
 * @public
 * @since 1.0
 * @function
 */
export let redirect = (to, divId, dt=3e3) => { //Redirect to #to in #dt ms
  let s = Math.floor(dt / 1e3); //Convert from ms to start
  //Write the Redirecting message to the screen
  $e(`#${divId}`).write(`<h2> Redirecting to <ins>${to}</ins> ...<br />in <span id="timeleft">${s}</span>start</h2>`, true);
  s--;
  $e('#timeleft').write(s);
  setTimeout(`location=${to};`, dt); //Set the timeout for the redirection
};

/**
 * @description Validity check.
 * @param {string} txt Text
 * @param {string} type Type
 * @returns {boolean} Validity check result
 * @see module:dom~validate
 * @public
 * @since 1.0
 * @function
 */
export let isValid = (txt, type) => {
  let pattern, lenOK = true;
  switch (type.toLowerCase()) {
    case 'email':
      pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //From SO
      lenOK = txt.length >= 9 && txt.length < 64;
      break;
    case 'tel':
      pattern = /^\+(?:[0-9]?){6,14}[0-9]$/; //From somewhere
      break;
    case 'username':
      pattern = /^[A-Za-z_0-9-]+$/;
      lenOK = txt.length > 3 && txt.length <= 16;
      break;
    case 'name':
      pattern = /^[A-Za-z-]{2,35}$/;
      break;
    case 'price':
      pattern = /^[0-9]*\x2e[0-9]{2}$/;
      lenOK = txt.length > 3;
      break;
    case 'number':
      pattern = /\d/; // /^(\x2d|)[0-9]*$/ wouldn't accept floats
      break;
    case 'date':
      pattern = /(\d{1,2}\/d{1,2}\/d{2,4})/; // /^([0-9]{2}\x2f){2}\x2f([0-9]{2}|[0-9]{4})$/; //Accept d/m/y*
      lenOK = txt.split('/')[1] <= 12 && txt.split('/')[0] <= 31;
      break;
    case 'hex':
      pattern = /(#|0x)?([A-Fa-f0-9]){3}(([A-Fa-f0-9]){3})?/; //From CheatSheets (iOS)
      break;
    case 'tag': //From CheatSheets (iOS)
      pattern = /(<(\/?[^>]+)>)/;
      break;
    case 'password':
      pattern = /|^\c]\w{8,}/;
      break;
    case 'file':
      pattern = /^[\S]+([A-Za-z0-9_]*\.(jpg|png|gif|ico|bmp))$/;
      break;
    case 'variable':
      pattern = /^[A-Za-z_$]+[0-9]*[A-Za-z_$]*$/;
      break;
    case 'colour':
      pattern = /^(#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}))|(rgb\(([0-9]+,\s){2}([0-9]+)\))|(rgba\(([0-9]+,\s){3}((0|1|)\.[0-9]*)\))|(hsl\(([0-9]+,\s){2}([0-9]+)\))|(hsla\(([0-9]+,\s){3}((0|1|)\.[0-9]*)\))$/;
      break;
    case 'url':
      pattern = /^((http(|s):\/\/)|((file|ftp):\/\/\/))(\/[A-Za-z0-9_-]*)|[A-Za-z0-9_-]$/;
      break;
    case 'ip':
      pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; //From http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
      break;
    case 'time':
      pattern = /^[0-5][0-9](\x3a|\.)[0-5][0-9]|([0-5][0-9]\x3a[0-5][0-9]){0,2}(\x3a|\.)[0-5][0-9]$/;
      break;
    default: pattern = /\w/;
  }
  return pattern.test(txt) && lenOK
};

/**
 * @description Validation check on a form.
 * @param {node} fm Form
 * @param {boolean} [ignoreRequired=false] Ignored the required attribute
 * @returns {boolean} Validation check
 * @see module:dom~isValid
 * @public
 * @since 1.0
 * @function
 * @todo Add: select, datetime, datetime-local, time, month, range, search, week, url
 */
export let validate = (fm=document.forms[0], ignoreRequired=false) => { //Check if a form is valid
  let valid = true;
  for (let i = 0; i < fm.length; i++) {
    if (ignoreRequired || fm[i].required) {
      if (fm[i].name === 'username' || fm[i].name === 'price') valid = valid && isValid(fm[i].value, fm[i].name);
      else if (fm[i].type === 'password' || fm[i].type === 'email' || fm[i].type === 'tel' || fm[i].type === 'date' || fm[i].type === 'hex' || fm[i].type === 'variable' || fm[i].type === 'file' || fm[i].type === 'hidden') valid = valid && isValid(fm[i].value, fm[i].type);
      else if (fm[i].name.indexOf('name') >= 0) valid = valid && isValid(fm[i].value, 'name');
      //else if (fm[i].type === 'checkbox' && fm[i].checked) valid = valid && true;
      else valid = valid && !isNon(fm[i].value); //Radio ...
    }
  }
  return valid
};

/**
 * @description Get the HTML equivalent of the string
 * @param {string} str String
 * @returns {code} HTML equivalent
 * @see module:dom~unescapeHTML
 * @public
 * @since 1.0
 * @function
 */
export let escapeHTML = (str) => {
  let span = document.createElement('span');
  span.appendChild(document.createTextNode(str));
  return span.innerHTML
};

/**
 * @description Get the string equivalent of the HTML code
 * @param {string} code HTML code
 * @returns {string} String equivalent
 * @see module:dom~escapeHTML
 * @public
 * @since 1.0
 * @function
 */
export let unescapeHTML = (code) => {
  let span = document.createElement('span');
  span.innerHTML = code;
  return span.innerText;
};

/**
 * @description Get all the resources of a page apart from the in-CSS ones
 * @param {boolean} rmEmpty Flag to remove empty resources from the list
 * @todo Maybe some specifications to filter up ? And also more info about those resources
 * @returns {Array} Resources
 * @since 1.0
 * @func
 */
export let getResources = (rmEmpty) => {
  let links = $n('*link'), scripts = $n('*script'), rsc = [], hypertxt = $n('*a'), img = $n('*img'), btnImg = $n('*input image'),
    inCSS = [$n('*div'), $n('*section'), $n('*td'), $n('*th'), $n('*li')];
  for (let l of links) {
    if (!isNon(l)) rsc[i] = l.href;
  }
  for (let s of scripts) {
    if (!isNon(s)) rsc.push(s.src);
  }
  for (let h of hypertxt) {
    if (!isNon(h)) rsc.push(h.href);
  }
  for (let i of img) {
    if (!isNon(i)) rsc.push(i.src);
  }
  for (let bi of btnImg) {
    if (!isNon(bi)) rsc.push(bi.src);
  }
  for (let css of inCSS) {
    for (let c of css) rsc.push(c.style.backgroundImage.slice(4, c.style.backgroundImage.length - 1));
  } //Remove or not unnecessary cells with a double check for one.
  return rmEmpty ? rsc.clean() : rsc
};

/**
 * @description Get the list of scripts
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of scripts
 * @see module:dom~gatherStylesheets
 * @public
 * @since 1.0
 * @function
 */
export let gatherScripts = (asList) => { //Sort of getResources() but dedicated to only scripts and easier to use
  let res = asList ? [] : {};
  for (let s of $n('*script')) asList ? res.push(s.src) : res[s.src.split('/')[s.src.split('/').length - 1]] = s.src;
  return res
};

/**
 * @description Gather internal scripts.
 * @param {boolean} [format=false] Format to an easy-to-use array
 * @returns {Array} Internal scripts
 * @public
 * @since 1.0
 * @function
 * @see module:dom~gatherExternalScripts
 */
export let gatherInternalScripts = (format=false) => {
  let internalScripts = Array.from(document.scripts).filter(s => s.text != "");
  return format ? internalScripts.map(s => s.src) : internalScripts;
};

/**
 * @description Gather external scripts.
 * @param {boolean} [format=false] Format to an easy-to-use array
 * @returns {Array} External scripts
 * @public
 * @since 1.0
 * @function
 * @see module:dom~gatherInternalScripts
 */
export let gatherExternalScripts = (format=false) => {
  let externalScripts = Array.from(document.scripts).filter(s => s.src != "");
  return format ? externalScripts.map(s => s.src) : externalScripts;
};

/**
 * @description Gather remote resources from the file.
 * @param {string} [type] Type (either: "script", "stylesheet" or "" (for both))
 * @return {string[]} Remote resources
 * @function
 * @public
 * @since 1.0
 * @see module:dom~gatherLocalResources
 */
export let gatherRemoteResources = (type) => {
  let $rsc = type === 'script' ? gatherScripts(true) : (type === 'stylesheet' ? gatherStylesheets(true) : gatherStylesheets(true).concat(gatherScripts(true)));
  return $rsc.filter(r => r.sameFirst(location.href) != files.getDirectoryPath())
};

/**
 * @description Gather local resources from the file.
 * @param {string} [type] Type (either: "script", "stylesheet" or "" (for both))
 * @return {string[]} Remote resources
 * @function
 * @public
 * @since 1.0
 * @see module:dom~gatherRemoteResources
 */
export let gatherLocalResources = (type) => {
  let $rsc = type === 'script' ? gatherScripts(true) : (type === 'stylesheet' ? gatherStylesheets(true) : gatherStylesheets(true).concat(gatherScripts(true)));
  return $rsc.filter(r => r.sameFirst(location.href) === files.getDirectoryPath())
};

/**
 * @description Get the list of stylesheets.
 * @param {boolean} [asList=false] Result should be a list or an object
 * @returns {*} List/dictionary of stylesheets
 * @see module:dom~gatherScripts
 * @public
 * @since 1.0
 * @function
 */
export let gatherStylesheets = (asList=false) => {
  let res = asList ? [] : {};
  for (let l of $n('*link')) asList ? res.push(l.href) : res[l.href.split('/')[l.href.split('/').length - 1]] = l.href;
  for (let s of $n('*style')) asList ? res.push(s.href): res[s.href.split('/')[s.href.split('/').length - 1]] = s.href;
  return res
};

/**
 * @description Gather internal stylesheets.
 * @param {boolean} [format=false] Format to easy-to-use array
 * @returns {Array} Internal stylesheets
 * @public
 * @since 1.0
 * @function
 * @see module:dom~gatherExternalStylesheets
 */
export let gatherInternalStylesheets = (format=false) => {
  let internalStyles = Array.from(document.styleSheets).filter(s => s.ownerNode.tagName === 'STYLE');
  return format ? internalStyles.map(s => s.href) : internalStyles;
};

/**
 * @description Gather external stylesheets.
 * @param {boolean} [format=false] Format to easy-to-use array
 * @returns {Array} External stylesheets
 * @public
 * @since 1.0
 * @function
 * @see module:dom~gatherInternalStylesheets
 */
export let gatherExternalStylesheets = (format=false) => {
  let externalStyles = Array.from(document.styleSheets).filter(s => s.ownerNode.tagName === 'LINK');
  return format ? externalStyles.map(s => s.href) : externalStyles;
};

/**
 * @description A basic HTML table.
 * @param {NumberLike} [caption=''] Caption
 * @param {Array} rows Rows of the table
 * @param {string} [id='t'] ID of the table
 * @param {string} [style] Style of table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 * @public
 * @since 1.0
 * @function
 */
export let simpleTable = (caption='', rows, id='t', style='', split, cellIds) => {
  let tab = `<table id="${id}" style="${style}" cellspacing=0 cellpadding=2>${caption ? `<caption>${caption}</caption>` : ''}`;
  for (let i = 0; i < rows.length; i++) {
    tab += '<tr>';
    if (split) {
      for (let j = 0; j < rows[i].length; j++) tab += `<td id="${id + (isNon(cellIds) ? i + '_' + j : cellIds[i][j])}">${rows[i][j]}</td>`;
    } else tab += `<td id="${id + (isNon(cellIds) ? i : cellIds[i])}">${rows[i]}</td>`;
    tab += '</tr>';
  }
  tab += '</table>';
  addCSS(`#${id} table{background: #000;}
    #${id} table, #${id} td {border: 1px solid #000; color: #000; background: #fff;}
    #${id} tr:nth-child(even) td{background: #ddd;}
    #${id} tr td:hover{background: #bbb;}`);
  return tab
};

