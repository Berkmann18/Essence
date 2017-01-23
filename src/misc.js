/**
 * @module misc
 * @description Miscellaneous things that didn't had a whole module of their own.
 * @requires module:essence
 * @since 1.0
 */
import * as essence from './essence';

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
    }).catch(err => essence.say(err, 'error'));
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
    }).catch(err => essence.say(err, 'error'));
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