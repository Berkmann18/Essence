/**
 * @module web
 * @description Web related module.
 * @requires module:essence
 * @since 1.0
 */
import * as essence from './essence'

/**
 * @description Turn the current webpage into an in-browser editor
 * @param {code} [content=''] Content to be added to the code of the page
 * @public
 * @since 1.0
 * @function
 */
export let PageEditor = (content='') => {
  location.href = `data:text/html, <html contenteditable>${content}</html>`;
};

/**
 * @description Server centre/manager.
 * @public
 * @since 1.0
 * @function
 * @property {Server[]} ServerBase.list List of servers
 * @property {number} ServerBase.size Total size of all the servers
 * @property {function(): Array[][]} ServerBase.getDetails Table of details on each servers
 * @property {function(Server)} ServerBase.add Add a server to the list
 * @property {function(Server)} ServerBase.remove Remove the server from the list
 * @property {function(string)} ServerBase.removeByName Remove the server with the specified name from the list
 */
export let ServerBase = {
  list: [],
  size: 0,
  getDetails() {
    let table = [['Name', 'Author', 'Maximum size']];
    this.list.forEach(server => table.push([server.name, server.author, server.maxSize]));
    return table;
  },
  add(server) {
    server.update();
    this.list.push(server);
    this.size += server.maxSize;
    this.list.push(server);
  },
  remove(server) {
    this.list.remove(server);
    this.size -= server.size;
  },
  removeByName(name) {
    let serverSearch = this.list.filter(server => server.name === name);
    let serverFound = new Promise((resolve, reject) => {
      !serverFound.length ? resolve(serverSearch) : reject(`The server #${name} wasn't found!`);
    });
    serverFound.then(server => {
      this.list.remove(server);
      //noinspection JSAnnotator
      delete server;
    }).catch(err => essence.say(err, "error"));
  }
};

/**
 * @description System (a bit like in Java)
 * @type {{ready: boolean, in: {recording: boolean, data: Array, record: ((keyStroke?)), startRecording: ((keyStroke?)), stopRecording: Sys.in.stopRecording}, log: ((data)), debug: ((cb, ...args)), out: (()), toString: (())}}
 * @global
 * @since 1.0
 * @property {boolean} Sys.ready Ready to transmit inputted data
 * @property {object} Sys.in Input
 * @property {boolean} Sys.in.recording Recording flag
 * @property {Array} Sys.in.data Keystrokes recorded from the window
 * @property {function(Event)} Sys.in.record Input recorder
 * @property {function()} Sys.in.startRecording Record starter
 * @property {function(): string[]} Sys.in.stopRecording Record stopper
 * @property {function(*)} Sys.log Logger
 * @property {function(Function)} Sys.debug Debugger
 * @property {function(): string} Sys.out Output
 * @property {function(): string} Sys.toString() String representation
 * @property {function()} Sys.rest() Reset the Sys's internals
 */
export const Sys = {
  ready: false,
  in: {
    recording: false,
    data: [],
    record(keyStroke) {
      let keyPair = essence.getKey(keyStroke);
      if (this.recording) this.data.push(keyPair[0]);
      if (keyPair[1] === 10 || keyPair[1] === 13) this.ready = true;

    },
    startRecording() {
      this.recording = true;
      this.ready = false;
      /**
       * @description Start the keystroke recording
       * @param {*} keyStroke Keystroke
       * @returns {undefined}
       * @since 1.0
       * @func
       * @listens window.onkeypress
       */
      window.onkeypress = (keyStroke) => {
        this.record(keyStroke);
        data.lastKeyPair = essence.getKey(keyStroke);
      };
      this.record(keyStroke);
    },
    stopRecording() {
      this.recording = false;
      window.onkeypress = null;
      return this.data;
    },
  },
  log(data) {
    console.log(`[System]  ${data}`);
  },
  debug(cb, ...args) {
    this.log(`Debugging: ${cb.name}`);
    console.group();
    console.time("debug");
    cb(...args);
    console.timeEnd("Time");
    console.trace();
    console.groupEnd();
  },
  out() {
    essence.say(this.in.data);
    return this.in.data;
  },
  toString() {
    return "[object System]";
  },
  reset() {
    this.data = [];
    this.ready = false;
    this.recording = false;
  }
};

/**
 * @description Ask something at the user (which needs to be typed in the window and not in the CLI.
 * @param {string} [label='Is there a problem ?'] Label of the prompt
 * @returns {Promise} Promise containing the answer
 */
export let ask = (label='Is there a problem ?') => {
  essence.say(label, 'quest');
  Sys.reset();
  Sys.in.startRecording();
  let hasAnswer = new Promise((resolve, reject) => {
    Sys.ready ? resolve(Sys.in.data.join()) : reject('No answer :@');
  });
  Sys.in.stopRecording();
  return hasAnswer;
};