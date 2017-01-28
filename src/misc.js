/**
 * @module misc
 * @description Miscellaneous things that didn't had a whole module of their own.
 * @requires module:essence
 * @since 1.0
 */
import {say} from './essence';

/**
 * @description Process centre/manager.
 * @type {{list: Array, size: number, getDetails: (()), add: ((process?)), remove: ((process?)), removeById: ((id))}}
 * @public
 * @since 1.0
 * @function
 * @property {Process[]} Processes.list List of processes
 * @property {number} Processes.size Total size of all the processes
 * @property {function(): Array[][]} Processes.getDetails Table of details on each processes
 * @property {function(Process)} Processes.add Add a process to the list
 * @property {function(Process)} Processes.remove Remove the process from the list
 * @property {function(number)} Processes.removeById Remove the process with the specified id from the list
 * @property {function(string)} Processes.removeByName Remove the process with the specified name from the list
 */
export let Processes = {
  list: [],
  size: 0,
  getDetails() {
    let table = [['Name (signature)', 'Author', 'Size']];
    this.list.forEach(process => table.push([`${process.name} (${process.sig})`, process.author, process.size]));
    return table;
  },
  add(process) {
    process.update();
    this.list.push(process);
    process.id = this.list.length - 1;
    this.size += process.size;
    this.list.push(process);
  },
  remove(process) {
    this.list.remove(process);
    this.size -= process.size;
  },
  removeById(id) {
    if((this.list.length - 1) < id < 0) throw new RangeError(`The id ${id} is outside the acceptable range`);
    let processSearch = this.list.filter(process => process.id === id);
    let processFound = new Promise((resolve, reject) => {
      !processFound.length ? resolve(processSearch[0]) : reject(`The process #${id} wasn't found!`);
    });
    processFound.then(process => {
      this.list.remove(process);
      //noinspection JSAnnotator
      process.delete();
    }).catch(err => say(err, 'error'));
  },
  removeByName(name) {
    let processSearch = this.list.filter(process => process.name === name);
    let processFound = new Promise((resolve, reject) => {
      !processFound.length ? resolve(processSearch) : reject(`The process #${name} wasn't found!`);
    });
    processFound.then(process => {
      this.list.remove(process);
      //noinspection JSAnnotator
      process.delete();
    }).catch(err => say(err, 'error'));
  }
};

/**
 * @description Send values from one generator to another.
 * @param {Iterable} sender Sender
 * @param {Iterable} receiver Receiver
 * @public
 * @since 1.0
 * @function
 */
export let send = (sender, receiver) => {
  for(let x of sender) receiver.next(x);
  receiver.return(); //Signal end of stream
};

/**
 * @description Start date of an event.<br />
 * Used by {@link module:misc~debounce}
 * @since 1.0
 * @private
 * @type {Date}
 */
const EVT_START_DATE = new Date(0);

/**
 * Debounce function that will wrap our event and thus avoid the over-firing of the event handlers
 * (e.g: when clicking way too many times in a short time).<br />
 * Source: {@link https://medium.com/@maxheiber/thanks-for-these-good-examples-of-js-interview-questions-8e1728731083#.hwvnl96ex}
 * @param {Function} cb Function to debounce
 * @param {number} [delay=100] Debouncing delay
 * @returns {function()} Debounced function
 * @public
 * @since 1.0
 * @function
 * @example
 * let myFunc = () => console.log('CLICK!');
 *
 * $e('#btn').on('click', debounce(myFunc, 500));
 */
export let debounce = (cb, delay=100) => {
  let lastCallDate = EVT_START_DATE;
  return (...args) => {
    let curDate = new Date();
    const shouldSkip = new Date() - lastCallDate < delay;
    if (shouldSkip) return;
    lastCallDate = curDate;
    return cb.apply(null, args)
  }
};

