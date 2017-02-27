/**
 * @module files
 * @description Files/directories related module.
 * @requires module:essence
 * @since 1.0
 */
import {XHR, CORS} from './ajax';
import {occurrenceSort, virtualHistory} from './dsa';
import {isType, say, isNon, wait} from './essence';
import {markConv} from './maths';
import {anim} from './misc';
import {tryNode} from './dom';

/**
 * @description Keeps the file name even if it's not in the same directory as the file that uses this.
 * @param {string} path Path
 * @returns {*} File name
 * @public
 * @since 1.0
 * @function
 */
export let stripPath = (path) => path.split('/')[path.split('/').length - 1];

/**
 * @description Get the name of the current file.
 * @param {boolean} [withExt=false] With the extension
 * @returns {string} File name
 * @public
 * @since 1.0
 * @function
 */
export let getFilename = (withExt=false) => {
  let name = stripPath(location.pathname);
  return withExt ? name : name.get(-name.lastIndexOf('.') - 1);
};

/**
 * @description A bit like stripPath but which would preserve the directories that aren't listed in the local path.
 * @param {string} path Path
 * @param {string} [localPath='file:///'] Local path
 * @returns {string} Current path
 * @public
 * @since 1.0
 * @function
 */
export let getCurrentPath = (path, localPath='file:///') => {
  let parts = path.split('/'), res, pParts = localPath.split('/'), i = 0, j = 0;
  while(localPath.contains(parts[i])) i++;
  res = parts.get(i).join('/');

  while (res.has(pParts[j])) j++;
  if (j > 0) {
    for (i = 0; i < j; i++) res = '../' + res;
  }

  return res
};

/**
 * @description Get the path for an external file.
 * @param {string} path Full path
 * @returns {string} External path
 * @function
 * @public
 * @since 1.0
 */
export let getExtPath = (path) => {
  let currPath = location.href;
  let parentPath = currPath.sameFirst(path);
  return '../'.repeat(getCurrentPath(currPath, parentPath).count('/')) + getCurrentPath(path, parentPath);
};

/**
 * @description Get the filename list of the path list.
 * @param {string[]} list Path list
 * @returns {Array} File name list
 * @public
 * @since 1.0
 * @function
 */
export let filenameList = (list) => {
  let res = [];
  for (let file of list) res.push(stripPath(file));
  return res.remove()
};

/**
 * @description Get the directory's path of the file (opposite of stripPath())
 * @param {string} [path=location.href] Path
 * @returns {string} Directory path
 * @public
 * @since 1.0
 * @function
 */
export let getDirectoryPath = (path=location.href) => path.get(0, path.indexOf(stripPath(path)) - 1);

/**
 * @description ActiveX file manipulation.
 * @param {string} filename Filename
 * @param {string} text2write Text to write to the file
 * @param {boolean} [close=false] Closing flag
 * @param {boolean} [remove=false] Removing flag
 * @public
 * @since 1.0
 * @function
 */
export let AX = (filename, text2write, close=false, remove=false) => {
  let fso = new ActiveXObject('Scripting.FileSystemObject');
  //Bool: flat the file of the same name if it's already present
  fso.CreateTextFile(filename,true);
  //Opening type: 1-read only; 2-rewriting; 8-continue to write at the end, create (true) or not (false) the file if it doesn't exist
  let otf = fso.OpenTextFile(filename, 1, true);
  //WriteLn add a new line
  //- the file has to be already opened in mode 2 or 8
  otf.Write(text2write);
  /* the file has to be opened in the read mod
   - Read read to the specified number of characters. */
  otf.ReadAll();
  if (close && confirm('Do you really want to close this file ?')) otf.Close();
  if (remove && confirm('Do you really want to delete this file ?')) fso.DeleteFile(filename);
};

/**
 * @description Execute a file.
 * @param {string} file File name
 * @param {string} ext Extension (without the '.')
 * @public
 * @since 1.0
 * @function
 */
export let execFile = (file, ext) => (new ActiveXObject('WScript.Shell')).Run(`${file}.${ext}`, 1, true);

/**
 * @description Copy to clipboard.
 * @param {*} txt Text to copy
 * @param {string} type Type of the text
 * @public
 * @since 1.0
 * @function
 */
export let copyToClipboard = (txt, type='Text') => clipboardData.setData(type, txt);

/**
 * @description Save <code>text</code> into a file.
 * @param {*} txt Text
 * @param {string} name Filename
 * @param {string} [type='plain'] Type
 * @public
 * @since 1.0
 * @function
 * @todo Find a way to change where the files is downloaded to
 */
export let save = (txt, name, type='plain') => {
  let txtfile = new Blob([txt], {type: `text/${type}`});

  let dlLink = document.createElement('a');
  dlLink.download = name;
  dlLink.innerHTML = 'Download File';
  if (window.webkitURL != null) dlLink.href = window.webkitURL.createObjectURL(txtfile); //Chrome allows the link to be clicked without actually adding it to the DOM.
  else { //Firefox requires the link to be added to the DOM before it can be clicked.
    dlLink.href = window.URL.createObjectURL(txtfile);
    dlLink.onclick = evt => document.body.removeChild(evt.target);
    dlLink.style.display = 'none';
    document.body.appendChild(dlLink);
  }
  dlLink.click()
};

/**
 * @description Get the content of the file.
 * @param {string} fname File name
 * @param {boolean} [crossOrigin=false] Cross Origin flag (for accessing resources outside of the same origin)
 * @returns {string} File's content
 * @public
 * @since 1.0
 * @function
 */
export let getFileContent = (fname, crossOrigin=false) => {
  if (!crossOrigin && (fname.contains('://') && fname.split('//')[0] != location.protocol)) crossOrigin = true;
  let getResponse = req => (res = req.responseText, req.responseText), nothing = () => 'Nothing';
  let res = '', xhr = crossOrigin ? new CORS(fname, 'GET', false, getResponse, nothing) : new XHR(fname, 'GET', false, getResponse, nothing);
  xhr.init();
  return res;
};

/**
 * @description Evaluate a file (useful for getting JSON data and into JS objects).
 * @param {string} filename Filename
 * @param {boolean} [crossOrigin=false] Is a CORS request needed ?
 * @returns {*} Object of the file
 * @public
 * @since 1.0
 * @function
 */
export let evalFile = (filename, crossOrigin=false) => (new Function(`return ${getFileContent(filename, crossOrigin)}`))();

/**
 * @description Keyword getter.
 * @param {Str} text Text
 * @param {boolean} [noSymbols=false] Ignore symbols
 * @returns {Array} Keywords
 * @public
 * @since 1.0
 * @function
 */
export let getKeywords = (text, noSymbols=false) => {
  let txt = (isType(text, 'Array') ? text.join(' ') : text).replace(/(\.|!|\?|;|:|"|,|\t|\n|\f|\r|\v|\{|})+/gm, ' ').split(' ').remove(); //The \b would treat a-b as 'a - b'
  let kw = occurrenceSort(txt).filter(x => { //Filter out non-keywords words
    return noSymbols
      ? (['=', '+', '-', '*', '/', '\\', '%', '#', '\'', '@', '^', '$', '£', 'µ', '~', '&', '[', ']', '(', ')', '|', '`'].contains(x) ? false : txt.count(x) > 3)
      : txt.count(x) > 3;
  });

  return kw.map(word => `${word}: ${txt.count(word)} (${markConv(txt.count(word), txt.length)}%)`);
};

/**
 * @description Web spider.
 * @param {string[]} [filenames=[]] Names of each files to crawl through
 * @this {Spider}
 * @public
 * @since 1.0
 * @class
 * @property {string[]} Spider.name Directory containing the files to crawl through
 * @property {string[]} Spider.keywords Keywords
 * @property {function(...boolean): Array[]} Spider.get Keyword getter
 * @property {function(...boolean): string[]} Spider.getAll Get all the keywords nice and clean
 * @property {function(...boolean): string[]} Spider.getWords Get all the key-words
 * @property {function(...boolean): number[]} Spider.getOccurrences Get the number of occurrences of all the keywords
 * @property {function(...boolean): number[]} Spider.getFreq Get the frequency of all the keywords
 * @property {function(...boolean): number} Spider.getCoverage Get the coverage of all the keywords compared to all the words
 * @property {function(...boolean): string[]} Spider.getGlobalKeywords Get all the keywords of all the file at once
 * @property {function(): string} Spider.toString String representation
 */
export class Spider {
  constructor(filenames=[]) {
    this.dir = filenames;
    this.keywords = [];
  }

  get(withSymbols=true, crossOrigin=false) { //Keywords infos
    for (let file of this.dir) this.keywords[i] = getKeywords(getFileContent(file, crossOrigin), withSymbols);
    return this.keywords;
  };

  getAll(withSymbols, crossOrigin) {
    return this.get(withSymbols, crossOrigin).linearise();
  };

  getWords(withSymbols, crossOrigin) { //Occurring words
    return this.getAll(withSymbols, crossOrigin).map(keyword => keyword.split(':')[0])
  };

  getOccurrences(withSymbols, crossOrigin) {
    return this.getAll(withSymbols, crossOrigin).map(kw => parseInt(kw.split(' ')[1]))
  };

  getFreq(withSymbols, crossOrigin) { //Frequency
    return this.getAll(withSymbols, crossOrigin).map(kw => parseFloat(kw.split(' ')[2].replace(/^\((\d+|\d+\.\d+)%\)$/, '$1')))
  };

  //noinspection JSUnusedGlobalSymbols
  getCoverage(withSymbols, crossOrigin) {
    return this.getFreq(withSymbols, crossOrigin).sum().toNDec(2);
  };

  getGlobalKeywords(withSymbols=true, crossOrigin=false) {
    let fullDir = this.dir.map(file => getFileContent(file, crossOrigin)).toStr();
    return getKeywords(fullDir, withSymbols);
  };

  toString() {
    return `Spider(dir=${this.dir}, keywords=${this.keywords.toStr(true)})`;
  };
}

/*
 1. Get the file (if it exists) then get the content saved in an history accessible to the code.
 2. When the the code changes/updates the content, it's saved in the file (which is created if it didn't exist)
 */
/**
 * @description A mediator between data of the code and files to keep both interfaces up-to-date.
 * @class
 * @public
 * @since 1.0
 * @return {$Data} Mediator object (sort of an API)
 * @todo Make sure that save() would save at the right place (since it would get it to be downloaded by the user)
 */
export class $Data {
  /**
   * @param {string} [filename='data.json'] Filename
   * @param {*} [data=null] Data to write to the file (if needed).
   */
  constructor(filename='data.json', data=null) {
    this.name = filename;
    this.data = data;
    this.req = new CORS(this.name, 'GET', false, xhr => this.data = xhr.response,
      () => say(`The file %c${self.name}%c isn't available !`, 'warn', 'text-decoration: italic;', 'text-decoration: none;'),
      () => anim('Loading', 0, 5e3, 500, false, !isNon(this.req.data)), this.data);
    this.req.init();
    this.req.update();
    this.history = new virtualHistory(this.data);
  }

  save() {
    save(this.data, this.name, this.data.split('.').last());
  };
  undo() {
    this.history.undo();
    this.data = this.history.src;
  };
  redo() {
    this.history.redo();
    this.data = this.history.src;
  };
  update(newData) {
    this.history.update(newData || this.data);
    if (newData) this.data = newData;
    this.save();
  };
  get() {
    this.req.init();
    this.req.update();
    return this.data;
  };
  toString() {
    return `$Data(name=${this.name}, data=${this.data}, history=${this.history.getStates()}, req=${this.req})`;
  };
}

/**
 * @description Load a stylesheet in a deferred manner.<br />
 * Inspired by {@link https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery|Google's CSS Optimized delivery}.
 * @param {String} file Filename
 * @public
 * @since 1.0
 * @function
 */
export let loadDeferredStyle = (file) => {
  let addStylesNode = tryNode('noscript#deferredStyles', 'body');
  let replacement = document.createElement('div');
  replacement.innerHTML = addStylesNode.innerText;
  document.body.appendChild(replacement);
  addStylesNode.delete();
  let raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) raf(() => wait(loadDeferredStyle));
  else window.addEventListener('load', loadDeferredStyle);
};

