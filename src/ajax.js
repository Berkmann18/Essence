/**
 * @module ajax
 * @description AJAX related module.
 * @requires module:essence
 * @since 1.0
 */
import {$f} from './essence';

/**
 * @description XHR manipulation callback
 * @callback XhrCallback
 * @param {XMLHttpRequest} XHR object
 */

/**
 * @description HTTP GET request, it retrieves data. Equivalent to:
 * let val;
 * parseURL(<code>name</code>, (x) => {val = x}); //as using return x won't return anything
 * @param {string} name Name of the key
 * @returns {string} Value of the key
 * @public
 * @since 1.0
 * @function
 */
export let GET = (name) => {
  let exp = new RegExp(`[?&]${encodeURIComponent(name)}=([^&]*)`).exec(location.search);
  if (exp) return decodeURIComponent(exp[1]);
};

/**
 * @description HTTP POST request. Create data..<br />
 * Source: Stackoverflow
 * @param {string} path Path of the file to post to
 * @param {Object} params Parameters
 * @public
 * @since 1.0
 * @function
 */
export let POST = (path, params) => {
  let form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', path);

  for (let key in params) {
    if (params.has(key)) {
      let hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit()
};

/**
 * @description HTTP PUT request. Update/replace data.
 * @param {*} data Date to place/update
 * @param {String} url URL where the insertion/alternation is happening
 * @public
 * @since 1.0
 * @function
 */
export let PUT = (data, url) => {
    /*let xhr = new XHR(url, 'PUT', true, $f, $f, $f, data);
     xhr.init();*/
  fetch(url, {
    method: 'PUT',
    headers: new Headers({
      charset: 'UTF-8'
    }),
    mode: 'cors',
    cache: 'default'
  }).then(response => response).catch(err => new Error(`PUT error: ${err}`));
};

/**
 * @description HTTP DELETE request. Delete data
 * @param {*} data Date to delete
 * @param {String} url URL where the deletion is happening
 * @public
 * @since 1.0
 * @function
 */
export let DELETE = (data, url) => {
  let xhr = new XHR(url, 'DELETE', true, $f, $f, $f, data);
  xhr.init();
};

/**
 * @description Load a document/file using AJAX
 * @param {string} url URL
 * @param {XhrCallback} cb What to do when the document/file is loaded
 * @public
 * @since 1.0
 * @function
 * @example
 * let showLogs = () => {
 *   load('logs.log', (xhr) => $e('#logView').write(xhr.responseText);
 * }
 */
export let load = (url, cb) => {
  let xhr = new XHR(url, 'GET', true, cb);
  xhr.init();
};

/**
 * @description Load a JSON file.
 * @param {string} [file='data'] Filename (without the '.json' bit)
 * @func
 * @since 1.0
 * @returns {*} JSON data
 * @example
 * loadJSON('package'); //Loads the package.json file which content can be found in $G.json if not returned
 * //Equivalent of doing that
 * var package = {};
 * load('package.json', (xhr) => package = JSON.parse(xhr.response)); //Returning that won't do anything so we need to store it in a variable
 */
export let loadJSON = (file='data') => {
    /*let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
     xhr.overrideMimeType('application/json');
     xhr.open('GET', `${file}.json`, true);
     xhr.onreadystatechange = () => {
     if (xhr.readyState === 4 && xhr.status === 200) return JSON.parse(xhr.responseText);
     };
     xhr.send(null);
     return JSON.parse(xhr.response);*/
  fetch(file).then((response) => {
    let contentType = response.headers.get('content-type');
    if (contentType && contentType.contains('application/json')) return response.json();/*.then(json => json)*/
    else throw new TypeError('The response is not a JSON file');
  }).catch(err => err);
};

/**
 * @description shellmonger.com's AJAX GET.
 * @param url
 * @returns {Promise}
 * @private
 * @example
 * _get(url).then(JSON.parse).then(r => this.doSomethingWithJSON(r)).catch(err => throw new ApplicationError())
 */
let _get = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => (req.status === 200) ? resolve(req.response) : reject(new Error(req.statusText));
    req.onerror = () => reject('Network error');
    req.send();
  });
};

