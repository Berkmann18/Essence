/**
 * @module dom
 * @description Document-Object Model related module.
 * @requires module:essence
 * @since 1.0
 */
import {$n, $e, isNon, Copy, isCustomType, getDate, getTime, getTimestamp, keys, isType} from './essence';
import {getDirectoryPath, save, getFilename} from './files';
import {RegExpify, Objectify} from './misc';
import {lorem} from './data';

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
      <meta charset='UTF-8' />
      <meta name='author' content='${author}' />
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
  $e(`#${divId}`).write(`<h2> Redirecting to <ins>${to}</ins> ...<br />in <span id='timeleft'>${s}</span>start</h2>`, true);
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
 * @public
 * @since 1.0
 * @function
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
  let internalScripts = Array.from(document.scripts).filter(s => s.text != '');
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
  let externalScripts = Array.from(document.scripts).filter(s => s.src != '');
  return format ? externalScripts.map(s => s.src) : externalScripts;
};

/**
 * @description Gather remote resources from the file.
 * @param {string} [type] Type (either: 'script', 'stylesheet' or '' (for both))
 * @return {string[]} Remote resources
 * @function
 * @public
 * @since 1.0
 * @see module:dom~gatherLocalResources
 */
export let gatherRemoteResources = (type) => {
  let $rsc = type === 'script' ? gatherScripts(true) : (type === 'stylesheet' ? gatherStylesheets(true) : gatherStylesheets(true).concat(gatherScripts(true)));
  return $rsc.filter(r => r.sameFirst(location.href) != getDirectoryPath())
};

/**
 * @description Gather local resources from the file.
 * @param {string} [type] Type (either: 'script', 'stylesheet' or '' (for both))
 * @return {string[]} Remote resources
 * @function
 * @public
 * @since 1.0
 * @see module:dom~gatherRemoteResources
 */
export let gatherLocalResources = (type) => {
  let $rsc = type === 'script' ? gatherScripts(true) : (type === 'stylesheet' ? gatherStylesheets(true) : gatherStylesheets(true).concat(gatherScripts(true)));
  return $rsc.filter(r => r.sameFirst(location.href) === getDirectoryPath())
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
 * @description Open (initialise the beginning of) an HTML table.
 * @param {NumberLike} [caption=''] Caption
 * @param {string} [id='t'] ID of the table
 * @param {string} [style] Style of table
 * @returns {string} Open HTML table
 * @private
 * @since 1.0
 * @function
 */
let openHtmlTable = (caption, id='t', style='') => `<table id='${id}' style='${style}' cellspacing=0 cellpadding=2>${caption ? `<caption>${caption}</caption>` : ''}`;

/**
 * @description Close an HTML table.
 * @param {string} table HTML table
 * @param {string} [id='t'] ID of the table
 * @returns {string} Closed HTML table
 * @private
 * @since 1.0
 * @function
 */
let closeHtmlTable = (table, id='t') => {
  table += '</table>';
  addCSS(`#${id} table{background: #000;}
    #${id} table, #${id} td, #${id} th{border: 1px solid #000; color: #000; background: #fff;}
    #${id} tr:nth-child(even) td, #${id} tr:nth-child(even) th{background: #ddd;}
    #${id} tr td:hover, #${id} tr th:hover{background: #bbb;}`);
  return table
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
  let tab = openHtmlTable(caption, id, style);
  for (let i = 0; i < rows.length; i++) {
    tab += '<tr>';
    if (split) {
      for (let j = 0; j < rows[i].length; j++) tab += `<td id='${id + (isNon(cellIds) ? i + '_' + j : cellIds[i][j])}'>${rows[i][j]}</td>`;
    } else tab += `<td id='${id + (isNon(cellIds) ? i : cellIds[i])}'>${rows[i]}</td>`;
    tab += '</tr>';
  }
  return closeHtmlTable(tab, id);
};

/**
 * @description Row HTML table.
 * @param {NumberLike} caption Caption
 * @param {Array} headerRows Row headers
 * @param {Array} rows Rows of the table
 * @param {string} [id='t'] ID of the table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 * @public
 * @since 1.0
 * @function
 */
export let rowTable = (caption, headerRows, rows, id='t', split=false, style='', cellIds) => {
  let tab = openHtmlTable(caption, id, style);
  //let rowspan = (headerRows.length <= rows.length) ? rows.length / headerRows.length: headerRows.length / rows.length;
  for (let i = 0; i < rows.length; i++) {
    tab += headerRows ? `<tr><th>${headerRows[i]}</th>`: '<tr>';
    if (split) {
      for (let j = 0; j < rows[i].length; j++) {
        tab += `<td id='${id + (isNon(cellIds) ? i + '_' + j : cellIds[i][j])}'>${rows[i][j]}</td>`;
      }
    } else tab += `<td id='${id + (isNon(cellIds) ? i : cellIds[i])}'>${rows[i]}</td>`;
    tab += '</tr>';
  }
  return closeHtmlTable(tab, id);
};

/**
 * @description Column HTML table.
 * @param {NumberLike} caption Caption
 * @param {Array} headerCols Row headers
 * @param {Array} cols Cols of the table
 * @param {string} [id='t'] ID of the table
 * @param {boolean} [split=false] Split columns into multiple rows
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 * @public
 * @since 1.0
 * @function
 */
export let colTable = (caption, headerCols, cols, id='t', split=false, style='', cellIds) => {
  let tab = openHtmlTable(caption, id, style);
  //let colspan = (headerCols.length <= cols.length) ? cols.length / headerCols.length : headerCols.length / cols.length;
  if (headerCols) {
    tab += '<tr>';
    for (let col of headerCols) tab += `<th>${col}</th>`;
    tab += '</tr>';
  }
  for (let i = 0; i < cols.length; i++) {
    tab += '<tr>';
    if (split) {
      for (let j = 0; j < cols[i].length; j++) tab += `<td id='${id + (isNon(cellIds) ? i + '_' + j : cellIds[i][j])}'>${cols[i][j]}</td>`;
    } else tab += `<td id='${id + (isNon(cellIds) ? i : cellIds[i])}'>${cols[i]}</td>`;
    tab += '</tr>';
  }
  return closeHtmlTable(tab, id);
};

/**
 * @description Complex HTML table
 * @param {NumberLike} caption Caption
 * @param {Array} headerRows Row headers
 * @param {Array} rows Rows of the table
 * @param {Array} headerCols Columns Headers
 * @param {string} id ID of the table
 * @param {boolean} [split=false] Split rows into multiple columns
 * @param {string} [style] Style of table
 * @param {string[]} [cellIds] Ids of each cells
 * @returns {string} HTML code
 * @public
 * @since 1.0
 * @function
 */
export let complexTable = (caption, headerRows, rows, headerCols, id='t', split=false, style='', cellIds) => {
  let tab = openHtmlTable(caption, id, style);
  for (let col of headerCols) tab += `<th>${col}</th>`;
  tab += '</tr>';
  for (let i = 0; i < rows.length; i++) {
    tab += headerRows ? `<tr><th>${headerRows[i]}</th>`: '<tr>';
    if (split) {
      for (let j = 0; j < rows[i].length; j++) tab += `<td id='${id + (isNon(cellIds) ? i + '_' + j : cellIds[i][j])}'>${rows[i][j]}</td>`;
    } else tab += `<td id='${id + (isNon(cellIds) ? i : cellIds[i])}'>${rows[i]}</td>`;
    tab += '</tr>';
  }
  return closeHtmlTable(tab, id);
};

/**
 * @description HTML table with coloured empty cells
 * @param {NumberLike} caption Caption
 * @param {Array} cols Columns
 * @param {string[]} clrs Colours list
 * @param {string} [id='t'] ID of the table
 * @param {boolean} [split=false] Split the cells into multiple ones
 * @param {string} [style] Style of the table
 * @returns {string} Colour HTML table
 * @public
 * @since 1.0
 * @function
 */
export let colourTable = (caption, cols, clrs, id='c', split=false, style='') => {
  let tab = openHtmlTable(caption, id, style);
  if (cols) {
    tab += '<tr>';
    for(let col of cols) tab += `<th>${col}</th>`;
    tab += '</tr>';
  }
  for (let i = 0; i < clrs.length; i++) {
    tab += '<tr>';
    if (split) {
      for (let j = 0; j < clrs[i].length; j++) tab += isValid(clrs[i][j], 'color') ? `<td style='background: ${clrs[i][j]}'><br /></td>`: `<td>${clrs[i][j]}</td>`;
    } else tab += `<td style='background: ${clrs[i]}'><br /></td>`;
    tab += '</tr>'
  }
  return closeHtmlTable(tab, id);
};

/**
 * @description Compare two matrices and display a table with all the different elements of <code>b</code> in regards to <code>a</code>.
 * @param {Array} a Matrix a
 * @param {Array} b Matrix b
 * @param {boolean} [toHTML=false] HTML output
 * @returns {*} Comparison table result
 * @public
 * @since 1.0
 * @function
 * @throws {Error} Uncomparable matrices
 */
export let tableCompare = (a, b, toHTML) => {
  if (a.size(true) != b.size(true)) throw new Error('You can\'t compare two matrices of different sizes');
  let res = Copy(a);
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[i].length; j++) res[i][j] = (a[i][j] === b[i][j]) ? '' : b[i][j];
  }
  toHTML ? println(simpleTable('Comparison', res)) : console.table(res);
  return res;
};

/**
 * @description (Ask to) bookmark a webpage?
 * @param {string} url URL of the webpage
 * @param {string} title Title
 * @param {string} [elmId='body'] Element ID
 * @public
 * @since 1.0
 * @function
 */
export let addToFav = (url, title, elmId='body') => {
  let place = elmId ? `#${elmId}` : 'body';
  if (navigator.appName.substring(0, 3) === 'Mic' && navigator.appVersion.substring(0, 1) >= 4) $e(place).write(`<a href='#' onClick='window.external.AddFavorite(${url}, ${title});return false;'>Bookmark this webpage</a><br />`, true);
  else $e(place).write('Press CTRL + D to add this webpage to your bookmarks!', true)
};

/**
 * @description Browser check.<br />
 * Improved from somewhere
 * @returns {checkBrowser} Browser check
 * @this checkBrowser
 * @public
 * @since 1.0
 * @todo Document the properties
 * @constructor
 */
export let checkBrowser = () => {
  this.ver = navigator.appVersion;
  this.dom = !!document.getElementById;
  this.ie5 = this.ver.has('MSIE 5') && this.dom;
  this.ie4 = document.all && !this.dom;
  this.ns5 = this.dom && (this.ver | 0) >= 5;
  this.ns4 = document.layers && !this.dom;
  this.any = (this.ie5 || this.ie4 || this.ns4 || this.ns5);
  return this
};

/**
 * @description Browser detection system.<br />
 * Source: somewhere
 * @type {{init: (()), searchString: ((data)), searchVersion: ((dataString)), dataBrowser: [*], dataOS: [*], info: (())}}
 * @public
 * @since 1.0
 * @global
 * @property {Function} BrowserDetect.init Initializer
 * @property {function(Object): Object} BrowserDetect.searchString String search
 * @property {function(string): number} BrowserDetect.searchVersion Version search
 * @property {Object[]} BrowserDetect.dataBrowser Browser data
 * @property {Object[]} BrowserDetect.dataOS OS data
 * @property {function(): string} BrowserDetect.info Information about the browser
 */
export let BrowserDetect = {
  init() {
    this.browser = this.searchString(this.dataBrowser) || 'Unknown browser';
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'xx.yy';
    this.OS = this.searchString(this.dataOS) || 'Unknown OS';
  },
  searchString(data) {
    for (let d of data) {
      let dataString = d.string, dataProp = d.prop;
      this.versionSearchString = d.versionSearch || d.identity;
      if (dataString) {
        if (dataString.contains(d.subString)) return d.identity
      }else if (dataProp) return data[i].identity
    }
  },
  searchVersion(dataString) {
    let index = dataString.indexOf(this.versionSearchString);
    if (index === -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
  },
  dataBrowser: [{
    string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome'
  }, {
    string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'
  }, {
    string: navigator.vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'
  }, {
    prop: window.opera, identity: 'Opera', versionSearch: 'Version'
  }, {
    string: navigator.vendor, subString: 'iCab', identity: 'iCab'
  }, {
    string: navigator.vendor, subString: 'KDE', identity: 'Konqueror'
  }, {
    string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox'
  }, {
    string: navigator.vendor, subString: 'Camino', identity: 'Camino'
  }, { //For newer Netscapes (6+)
    string: navigator.userAgent, subString: 'Netscape', identity: 'Netscape'
  }, {
    string: navigator.userAgent, subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'
  }, {
    string: navigator.userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'
  }, { //For older Netscapes (4-)
    string: navigator.userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'
  }],
  dataOS: [{
    string: navigator.platform, subString: 'Win', identity: 'Windows'
  }, {
    string: navigator.platform, subString: 'Mac', identity: 'Mac'
  }, {
    string: navigator.userAgent, subString: 'iPhone', identity: 'iPhone/iPod'
  }, {
    string: navigator.userAgent, subString: 'Android', identity: 'HTC/Samsung/LG/Nexus'
  }, {
    string: navigator.userAgent, subString: 'BlackBerry', identity: 'BlackBerry'
  }, {
    string: navigator.platform, subString: 'Linux', identity: 'Linux'
  }],
  info() {
    return this.browser + '/' + this.version + ' (' + this.OS + ')';
  }
};

/**
 * @description Type a message.
 * @param {string} msg Message
 * @param {Element|string} where Place to type the message
 * @param {boolean} [HTML=false] HTML flag
 * @returns {undefined}
 * @public
 * @see module:dom~writeMsg2
 * @since 1.0
 * @function
 */
export let writeMsg = (msg, where, HTML=false) => {
  let txt, pos = 0;
  while (pos < msg.length + 10) {
    txt = msg.substring(pos, 0);
    isCustomType(where, 'Element') ? where.write(txt, HTML) : $e(where).write(txt, HTML);
    pos++;
  }
};

/**
 * @description Type a message.
 * @param {string} msg Message
 * @param {string} slc Place to type the message
 * @param {boolean} [HTML=false] HTML flag
 * @param {number} [delay=150] Inter-character delay
 * @param {string} [txt=''] Text
 * @param {number} [pos=0] Position
 * @see module:dom~writeMsg
 * @public
 * @since 1.0
 * @function
 */
export let writeMsg2 = (msg, slc, HTML=false, delay=150, txt='', pos=0) => {
  if (pos < msg.length + 10) {
    txt = msg.substring(pos, 0);
    HTML ? $n(slc).innerHTML = txt : $n(slc).innerText = txt;
    pos++;
    setTimeout(`writeMsg2('${msg}', '${slc}', ${HTML}, ${delay}, '${txt}', ${pos})`, delay);
  }
};

/**
 * @description Templating + conversion.
 * @param {string} [name='Template"] Name
 * @param {string} [txt=''] Text/code containing the {{params}}
 * @param {string[]} [params=['tab', 'date', 'time', 'timestamp', 'br']] Parameters
 * @param {boolean} [consoleSpecial=false] Resulting text formatted to the console
 * @constructor
 * @this {Template}
 * @returns {Template} Template
 * @since 1.0
 * @func
 * @property {string} Template.name Name
 * @property {string} Template.path Path (for saving)
 * @property {string[]} Template.params Parameters (in {{...}})
 * @property {string[]} Template.special Special parameters (predefined parameters)
 * @property {string[]} Template.specialEq Special parameters equivalence
 * @property {string} Template.text Raw text/code containing the parameters ({{param}})
 * @property {function(Object, boolean): (code)} Template.gen Text/code generator
 * @property {function(Object, string, string)} Template.save Save the generated text/code in the specified path
 */
export class Template {
  constructor(name='Template', txt='', params=['name', 'description', 'version', 'title', 'path'], consoleSpecial=false) {
    this.name = name;
    this.path = this.name + '.jst';
    this.params = params;
    this.special = ['tab', 'date', 'time', 'timestamp', 'br', ''];
    this.specialEq = ['&nbsp;'.repeat(8), getDate(), getTime(true), getTimestamp(true), '<br />'];
    if (consoleSpecial) {
      this.specialEq[0] = '\t';
      this.specialEq[4] = '\n';
    }
    this.text = txt;
  }
  gen(obj, unEscape) {
    let res = unEscape ? unescapeHTML(this.text): this.text, k = keys(obj);
    for(let i = 0; i < k.length; i++) res = res.replace(RegExpify(`{{${k[i]}}}`), obj[k[i]]);
    for(let i = 0; i < this.special.length; i++) res = res.replace(RegExpify(`%${this.special[i]}%`), this.specialEq[i]);
    return res
  }
  save(obj, name=this.name, ext='js', type='javascript') {
    obj ? save(this.gen(obj), `${name}.${ext}`, type) : save(this.text, this.path, 'javascript')
  }
}

/**
 * @description Remove (X)HTML tags.
 * @param {string} str String with potential tags
 * @returns {string} Tagless string
 * @public
 * @since 1.0
 * @function
 */
export let stripTags = (str) => str.replace(/<[\s\S]+>(.*?)<\/[\s\S]+>/, '$1');

/**
 * @description Make tabs up.
 * @param {number} [n=1] Number of tabs
 * @returns {string} Tabs
 * @public
 * @since 1.0
 * @function
 */
export let tabs = (n=1) => '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(n);

/**
 * @description Get the value of an attribute of a tag with a known attribute selector.
 * @param {string} tagName Tag name
 * @param {string} knownAttrSelector Know attribute selector (in the form: attr='val')
 * @param {string} attr Attribute
 * @return {*} Value of the attribute in the tag
 * @public
 * @since 1.0
 * @function
 * @example
 * //We want to get the meta description and we know that there's an element such as $n('meta[name='description']') &ne; null
 * var docDescription = $t('meta', 'name='description'', 'content');
 * @global
 */
export let $t = (tagName, knownAttrSelector, attr) => {
  let tag = $e(`${tagName}[${knownAttrSelector}]`).val(false, true), start;
  start = tag.search(attr + '="|\'') + attr.length + 2;
  return tag.get(start, start + tag.get(start).indexOf(tag.has('\'') ? '\'': '"') - 1);
};

/**
 * @description A Document templating system that will change the DOM with the use of data-* attributes or {{*}}
 * @global
 * @type {{attrs: string[], assoc: Array, get: DocTemplate.get, getAll: DocTemplate.getAll, getVal: DocTemplate.getVal, getValAll: DocTemplate.getValAll, associate: DocTemplate.associate, associateAll: DocTemplate.associateAll, template: Template, deMustache: DocTemplate.deMustache}}
 * @public
 * @since 1.0
 * @this DocTemplate
 * @property {string[]} DocTemplate.attrs Attributes (either preceded by data- attributes in HTML elements or between {{ and }})
 * @property {Array} DocTemplate.assoc Associations What the templating system is going to use to associate/change the elements with data-[attr] or the {{attr}} strings
 * @property {function(Str, *)} DocTemplate.add Add attribute(s)/association(s) pairs
 * @property {function(string, boolean): (Array|NodeList)} DocTemplate.get Get the HTML elements with the attribute data-[<code>attrName</code>]
 * @property {function(boolean): (Array[]|NodeList[])} DocTemplate.getAll Get All the HTML elements with a data-* attribute
 * @property {function(string): Array} DocTemplate.getVal Get the values of the data-[<code>attrName</code>] attributes
 * @property {function(): Array} DocTemplate.getVallAll Get all the values of the data-[attr] attributes
 * @property {function(string, boolean)} DocTemplate.associate Place the corresponding association (in <code>DocTemplate.assoc</code>) in the HTML element's inner value
 * @property {function(boolean)} DocTemplate.associateAll Place the associations (in <code>DocTemplate.assoc</code>) in the HTML element's inner values
 * @property {Template} DocTemplate.template Mustache template (<span style='color: red;'>warning: This might mess up some JS generated HTML content</span>)
 * @property {Function} DocTemplate.deMustache Change all the mustached variables in the HTML body
 */
export let DocTemplate = {
  attrs: ['lorem', 'greet', 'date', 'time', 'timestamp', 'charset', 'author', 'title', 'dir'],
  assoc: [lorem, 'Welcome !', getDate(), getTime(true), getTimestamp(true), $t('meta', 'charset', 'charset') || 'UTF-8', $t('meta', 'name="author"', 'content') || 'Maximilian Berkmann', ($n('title', true) != null) ? $e('title').val() : getFilename(true), getDirectoryPath()],
  add(attr, assoc) {
    isType(attr, 'Array') ? this.attrs.append(attr) : this.attrs.push(attr);
    isType(assoc, 'Array') ? this.assoc.append(assoc) : this.assoc.push(assoc);
  },
  get(attrName, toArr=false) {
    return toArr ? Array.from($n('*[data-' + attrName + ']')) : $n(`*[data-${attrName}]`);
  },
  getAll(oneDim=false) {
    let nodeLists = this.attrs.map(attr => $n(`*[data-${attr}]`));
    return oneDim ? nodeLists.map(nodeList => Array.from(nodeList)) : nodeLists;
  },
  getVal(attrName) {
    return this.get(attrName, true).map(node => node.getAttribute(`data-${attrName}`));
  },
  getValAll() {
    let pos = -1;
    return this.getAll(true).map(nodeList => {
      pos++;
      return nodeList.map(node => node.getAttribute(`data-${DocTemplate.attrs[pos]}`));
    });
  },
  associate(attrName, html=false) {
    this.get(attrName, true).map(node => html ? node.innerHTML = this.assoc[this.attrs.indexOf(attrName)] : node.innerText = this.assoc[this.attrs.indexOf(attrName)]);
  },
  associateAll(html=false) {
    for (let i = 0; i < this.attrs.length; i++) this.get(this.attrs[i], true).map(node => html ? node.innerHTML = this.assoc[i] : node.innerText = this.assoc[i])
  },
  template: new Template('DocTemplate', escapeHTML($e('body').val(true)), this.attrs),
  deMustache() {
    $e('body').write(this.template.gen(Objectify(this.attrs, this.assoc), true), true);
  },
  fullDeMustache() {
    $e('html').write((new Template('DocTemplate', escapeHTML($e('html').val(true)), this.attrs)).gen(Objectify(this.attrs, this.assoc), true), true);
  }
};

/**
 * @description Turn HTML code into console/alert friendly text.
 * @param {code} code Code
 * @returns {string} Console friendly text
 * @function
 * @public
 * @since 1.0
 * @see module:dom~text2html
 */
export let html2text = (code) => code.multiReplace([[/<br \/>/gm, '\n'], [/\s{2,4}/gm, '\t']]);

/**
 * @description Turn console/alert friendly text into HTML code.
 * @param {string} text Console friendly text
 * @returns {code} HTML code
 * @function
 * @public
 * @since 1.0
 * @see module:dom~html2text
 */
export let text2html = (text) => text.multiReplace([[/\n/gm, '<br />'], [/\t|\s{2}/gm, '&nbsp;&nbsp']]);

/**
 * @description A text buffer to allow complex text printing management.
 * @type {{log: string, writeToDocument: Buffer.writeToDocument, writeToConsole: Buffer.writeToConsole, add: Buffer.add, show: Buffer.show}}
 * @property {code} Buffer.log Buffer's content
 * @property {function(boolean)} Buffer.writeToDocument Write the buffer's content to the page
 * @property {Function} Buffer.writeToConsole Write the buffer's content to the console
 * @property {function(code)} Buffer.add Add content to the buffer
 * @property {function(boolean, boolean, boolean)} Buffer.show Show the buffer's content at the desired place in the appropriate format
 * @property {Function} Buffer.clear Clear the buffer
 * @global
 * @public
 * @since 1.0
 */
export let Buffer = {
  log: '',
  writeToDocument(isHTML=false) {
    print(this.log, isHTML);
  },
  writeToConsole () {
    console.log(`\t[Buffer]\n${this.log}`);
  },
  add(text) {
    this.log += text + '\n';
  },
  show(console=false, withHTML=false, keepLog=false) {
    if (console) this.writeToConsole();
    else {
      this.log = text2html(this.log);
      this.writeToDocument(withHTML);
    }
    if (!keepLog) this.log = '';
  },
  clear () {
    this.log = '';
    console.log('Buffer cleared');
  }
};

/**
 * @description Dissect a selector and return if it matches some top-level CSS selections (or the matching bits).
 * @param {String} selector Selector
 * @param {boolean} [booleanOnly=false] Return the result as boolean (so test results)
 * @returns {{list: boolean, tag: boolean, id: boolean, class: boolean, pseudoSelector: boolean, multiple: boolean, namespace: boolean}} Dissection
 * @public
 * @since 1.0
 * @function
 * @TODO make sure it gets the tags and spaces right
 */
export let dissect = (selector, booleanOnly=false) => {
  let hasPart = (regexp) => selector.match(new RegExp(regexp, 'g'));

  return booleanOnly ? {
      list: /\*\w+/g.test(selector),
      tag: /^\w+[^#.|:](\s*?\w*[^#.|:]|$)/g.test(selector), //To improve
      id: /#\w+/g.test(selector),
      class: /\.\w+/g.test(selector),
      pseudoSelector: /:\w+/g.test(selector),
      multiple: /\s+/g.test(selector),
      namespace: /\w+\|\w+/g.test(selector)
    }: {
      list: hasPart(/\*\w+/),
      tag: hasPart(/^\w+[^#.|:](\s*?\w*[^#.|:]|$)/), //To improve
      id: hasPart(/#\w+/),
      class: hasPart(/\.\w+/),
      pseudoSelector: hasPart(/:\w+/),
      multiple: hasPart(/\s+/),
      namespace: hasPart(/\w+\|\w+/)
    };
};

/**
 * @description Try to gather an element <em>$e(selector)</em> while placing it if it's not there yet to be used
 * @param {String} selector Selector of the tested element
 * @param {String} [container='body'] Container where the new element will be placed if it doesn't already exist
 * @param {code} [newHTMLValue=''] Value (HTML code) that the element will get if it's not already existent
 * @returns {Element} Element
 * @public
 * @since 1.0
 * @function
 */
export let tryElement = (selector, container='body', newHTMLValue='') => {
  try {
    $e(selector);
  } catch (err) {
    let dissection = dissect(selector);
    let element = document.createElement(dissection.tag[0]);
    element.id = dissection.id[0].remove('#');
    element.className = dissection.class.join(' ').remove('.');
    element.innerHTML = newHTMLValue;
    $n(container).appendChild(element);
  }
  return $e(selector);
};

/**
 * @description Try to gather an element <em>$n(selector)</em> while placing it if it's not there yet to be used.
 * @param {String} selector Selector of the tested element
 * @param {String} [container='body'] Container where the new element will be placed if it doesn't already exist
 * @param {{tagName: String, id: String, class: String, title: (undefined|String)}} attr Attributes of the newly created element (if not already present)
 * @returns {HTMLElement} HTML element
 * @public
 * @since 1.0
 * @function
 */
export let tryNode = (selector, container='body', attr) => {
  try {
    $n(selector);
  } catch (err) {
    let node = document.createElement(attr.tagName);
    if (attr.has('id')) node.id = attr.id;
    if (attr.has('class')) node.className = attr.class;
    if (attr.has('title')) node.title = attr.title;
    $n(container).appendChild(node);
  }
  return $n(selector);
};

/**
 * @description Get the CSS path of a node <i>$n(...)</i>.<br />
 * Inspired by {@link https://stackoverflow.com/questions/4588119/get-elements-css-selector-when-it-doesnt-have-an-id|@Phrogz's answer on here}.
 * @param {HTMLElement} node Node
 * @returns {string} CSS Path
 * @public
 * @since 1.0
 * @function
 */
export let cssPath = (node) => {
  let names = [];
  while (node.parentNode) {
    if (node.id) {
      names.unshift(`#${node.id}`);
      break;
    } else {
      if (node === node.ownerDocument.documentElement) names.unshift(node.tagName.toLowerCase());
      else{
        for (let c = 1, e = node; e.previousElementSibling; e = e.previousElementSibling, c++) names.unshift(`${node.tagName.toLowerCase()}:nth-child(${c})`);
      }
      node = node.parentNode;
    }
  }
  return names.join(' > ');
};

/**
 * @description Simplify a CSS Path (useful in conjuction with cssPath()).
 * @param {String} path CSS Path
 * @returns {String} Simplified CSS Path
 * @public
 * @since 1.0
 * @function
 */
export let simplifyCSSPath = (path) => path.replace(/(?:html > )*(head:nth-child\(1\)|body:nth-child\(2\)) > +/gmi, '');