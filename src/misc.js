/**
 * @module misc
 * @description Miscellaneous things that didn't had a whole module of their own.
 * @requires module:essence
 * @since 1.0
 */
import {say, date2num, getDate, isType} from './essence';

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

/**
 * @description ASCII table.
 * @param {NumberLike} [start=0] Starting decimal code
 * @param {number} [end=255] Ending decimal code
 * @returns {Array} ASCII table
 * @public
 * @since 1.0
 * @function
 */
export let asciiTable = (start=0, end=255) => {
  if (start === 'A-Z' && !end) {
    start = 65;
    end = 90;
  } else if (start === 'a-z' && !end) {
    start = 97;
    end = 122;
  } else if (start === 'A-z' && !end) {
    start = 65;
    end = 122;
  } else if (start === 'printable' && !end) {
    start = 32;
    end = 126;
  }

  let res = [];

  for (let i = start; i <= end; i++) res.push(String.fromCharCode(i));
  return res;
};

/**
 * @description A person.
 * @this Person
 * @class
 * @since 1.0
 * @property {string} Person.firstName First name
 * @property {string} Person.secondName Second name
 * @property {string} Person.lastName Last name
 * @property {string} Person.title Title
 * @property {string} Person.nickname Nickname
 * @property {NumberLike} Person.phoneNum Phone number
 * @property {string} Person.country Country of residence or birthplace
 * @property {string} Person.city City of residence or birthplace
 * @property {string} Person.sex Sex
 * @property {string} Person.birthday Birthday
 * @property {?string} Person.deathday Deathday
 * @property {Str} Person.jobs Job(s)
 * @property {Str} Person.activities Activity/Activities
 * @property {Str} Person.websites Website(s)
 * @property {Str} Person.quote Quote(s)
 * @property {function(): string} Person.toString String representation
 * @property {function(): string} Person.genID ID generator
 * @property {function(): number} Person.getAge Age getter
 * @property {function(): boolean} Person.isMajor Majority check
 * @property {function(): string} Person.getFullName Full name getter
 */
export class Person {
  /**
   * @param {string} fname First name
   * @param {string} sname Second name
   * @param {string} lname Last name
   * @param {string} title Title
   * @param {string} nickname Nickname
   * @param {NumberLike} [num=''] Phone number
   * @param {string} country='UK' Country
   * @param {string} city City
   * @param {string} sex='male' Sex
   * @param {string} bday='01/01/2000' Birth date
   * @param {Str} [jobs='unemployed'] Job(s)
   * @param {Str} [activities=''] Activitie(s)
   * @param {Str} [websites=''] Website(s)
   * @param {string} [quote=''] Quote
   */
  constructor(fname, sname, lname, title, nickname, num='', country='UK', city='', sex='male', bday='01/01/2000', jobs='unemployed', activities='', websites='', quote='') {
    this.firstName = fname;
    this.secondName = sname;
    this.lastName = lname;
    this.title = title;
    this.nickname = nickname;
    this.phoneNum = num;
    this.country = country;
    this.city = city;
    if (sex != 'male' && sex != 'female') this.sex = 'other';
    this.birthday = bday;
    this.deathday = null;
    this.jobs = jobs;
    this.activities = activities;
    this.websites = websites;
    this.quote = quote;
  }

  toString() { //Weirdly showing "getName" which isn't the case of toLocaleString()
    let str = 'Person(';
    for (let p in this) {
      if (this.has(p) && p != 'toString') str += `${p}=${this[p]}, `;
    }
    return str.substring(0, str.length - 2) + ')'
  };

  genID() {
    return (this.lastName.get(0, 3) + this.birthday.split('/')[1] + this.firstName.get(0, 1) + this.secondName.get(0, 1) + this.birthday.split('/')[2] + this.sex[0]).toUpperCase();
  };

  getAge() {
    return (date2num(getDate()) - date2num(this.birthday)).toNDec(2);
  };

  isMajor() {
    return ((this.country.get(0, 1) === 'UN' || this.country.toLowerCase() === 'united states') && this.getAge() > 20)
      || ((this.country.get(0, 1) != 'UN' || this.country.toLowerCase() != 'united states') && this.getAge() > 17);
  };

  getFullName() {
    return `${this.firstName} ${this.secondName} ${this.nickname != '' ? `"${this.nickname}"` : ' '} ${this.lastName}`;
  };
}

/**
 * @description An item.
 * @this Item
 * @class
 * @public
 * @since 1.0
 * @property {string} Item.name Name
 * @property {string} Item.category Category
 * @property {number} Item.price Price
 * @property {number} Item.ageMinRequired Minimum age required to use the item
 * @property {number} Item.quantity Quantity
 * @property {string|date} Item.firstMade First made date
 * @property {function(number, Item[])} Item.duplicate Duplication
 * @property {function(*)} Item.remove Remove the item from somewhere
 * @property {function(): string} Item.toString String representation
 */
export class Item  { //An item like the ones that can be bought/sold/traded/used
  /**
   * @param {string} [name='unknown'] Name
   * @param {string} [cat='unknown"] Category
   * @param {number} [price=0] Price
   * @param {number} [amr=0.25] Age minimum required to use this
   * @param {number} [nb=0] Quantity
   */
  constructor(name='unknown', cat='unknown', price=0, amr=.25, nb=0) {
    this.name = name;
    this.category = cat;
    this.price = price;
    this.ageMinRequired = amr; //3months+
    this.quantity = nb;
    this.firstMade = new Date().toLocaleDateString();
  }

  duplicate(n, dest) {
    for (let i = 0; i < n; i++) dest.push(new Item(this.name, this.category, this.price, this.ageMinRequired, this.quantity));
  };

  static remove(dest) {
    dest.remove()
  };
  toString() {
    let str = '';
    for (let p in this) {
      if (this.has(p) && p != 'toString' && !isType(p, 'Function')) str += `${p}=${this[p]}, `;
    }
    return str.substring(0, str.length - 2)
  };
}