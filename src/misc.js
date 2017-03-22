/**
 * @module misc
 * @description Miscellaneous things that didn't had a whole module of their own.
 * @requires module:essence
 * @since 1.0
 */
import {say, date2num, getDate, isType} from './essence';
import {log, conv} from './maths';
import {POST} from './ajax';

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

  toString() { //Weirdly showing 'getName' which isn't the case of toLocaleString()
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
    return `${this.firstName} ${this.secondName} ${this.nickname != '' ? `'${this.nickname}'` : ' '} ${this.lastName}`;
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

/**
 * @description Letter pair array.
 * @param {string} [first='a'] First letter
 * @param {string} [last='z'] Last letter
 * @returns {Array} Letter pair array
 * @public
 * @since 1.0
 * @function
 */
export let letterArray = (first='a', last='z') => {
  let f = first.charCodeAt(0), l = last.charCodeAt(0), arr = [];
  for (let firstLetter = f; firstLetter <= l; firstLetter++) {
    for (let secondLetter = f; secondLetter <= l; secondLetter++) {
      if (firstLetter != secondLetter) arr.push(String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter));
    }
  }
  return arr
};

/**
 * @description Remove the consecutive duplicated values in an array.
 * @param {Array} arr Array
 * @returns {Array} Filtered array
 * @see module:misc~rmDuplicates
 * @public
 * @since 1.0
 * @function
 */
export let rmConsecDuplicates = (arr) => {
  let out = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || !arr[i].equals(arr[i - 1])) out[j++] = arr[i];
  }
  j = 0;
  for (let i = 0; i < arr.length - 1; i++) { //Double enforced check
    if (!arr[i].equals(arr[i + 1])) out[j++] = arr[i];
  }
  return out
};

/**
 * @description Remove the duplicates of an array.
 * @param {Array|string} arr Array
 * @returns {Array|string} Filtered array
 * @see module:misc~rmConsecDuplicates
 * @public
 * @since 1.0
 * @function
 * @throws {TypeError} arr isn't iterable
 * @example
 * rmDuplicates('hello world !'); //'helo wrd!'
 * rmDuplicates([4, 10, 1, 9, 10, 10, 10, 3, 4, 2]); //[4, 10, 1, 9, 3, 2]
 */
export let rmDuplicates = (arr) => {
  if (!arr.isIterable()) throw new TypeError('It\'s not possible to remove duplicates of a non iterable object.');
  let uniques = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniques.contains(arr[i])) uniques.push(arr[i]);
  }
  return isType(arr, 'Array') ? uniques : uniques.join('');
};

/**
 * @description Remove the Unique values of an array (keep the ones that are initially duplicated).
 * @param {Array|string} arr Array
 * @returns {Array|string} Filtered array
 * @see module:Misc~rmDuplicates
 * @since 1.1
 * @func
 * @throws {TypeError} arr isn't iterable
 * @example
 * rmUniques('hello world !'); //'lo '
 * rmUniques([4, 10, 1, 9, 10, 10, 10, 3, 4, 2]); //[10, 4]
 */
export let rmUniques = (arr) => {
  if (!arr.isIterable()) throw new TypeError('It\'s not possible to remove uniques of a non iterable object.');
  let duplicates = rmDuplicates(arr.filter(item => arr.count(item) > 1));
  return isType(arr, 'Array') ? duplicates : duplicates.join('');
};

/**
 * @description Base64.<br />
 * Source: somewhere
 * @type {{PADCHAR: string, ALPHA: string, getbyte64: base64.getbyte64, decode: base64.decode, getbyte: base64.getbyte, encode: base64.encode}}
 * @global
 * @this base64
 * @since 1.0
 * @property {string} base64.PADCHAR PAD character
 * @property {string} base64.ALPHA Alphabet
 * @property {function(string, number): number} base64.getbyte64 b64 byte getter
 * @property {function(string): string} base64.decoder Base64 decoder
 * @property {function(string, number): string} base64.getbyte Byte getter
 * @property {function(string): string} base64.encoder Base64 encoder
 */
export let base64 = {
  /**
   * @readonly
   * @instance
   */
  PADCHAR: '=',
  /**
   * @readonly
   * @instance
   */
  ALPHA: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  /**
   * @throws Invalid character error: DOM Exception 5
   * @param {String} s String to use
   * @param {number} [i=0] Index
   * @returns {number}
   * @throws String State
   */
  getbyte64(s, i) {
    /* "This is oddly fast, except on Chrome/V8.
     Minimal or no improvement in performance by using an
     object with properties mapping chars to value (eg. 'A': 0)" */
    i = base64.ALPHA.indexOf(s.charAt(i || 0));
    if (i === -1) throw 'Cannot decode base64';
    return i
  },
  /**
   * @throws Cannot decode base64
   * @param {String} s String to decode
   * @returns {String} Decoded base64 code
   * @throws String State
   */
  decode(s) {
    s += '';
    let pads, i, b10;
    let imax = s.length;
    if (imax === 0) return s;
    else if (imax % 4 != 0) throw 'Cannot decode base64';

    pads = 0;
    if (s.charAt(imax - 1) === this.PADCHAR) {
      pads = 1;
      if (s.charAt(imax - 2) === this.PADCHAR) pads = 2;
      //Either way, we want to ignore this last block
      imax -= 4;
    }

    let x = [];
    for (i = 0; i < imax; i += 4) {
      b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) | (this.getbyte64(s, i + 2) << 6) | this.getbyte64(s, i + 3);
      x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
      case 1:
        b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12) | (this.getbyte64(s, i + 2) << 6);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
        break;
      case 2:
        b10 = (this.getbyte64(s, i) << 18) | (this.getbyte64(s, i + 1) << 12);
        x.push(String.fromCharCode(b10 >> 16));
        break;
    }
    return x.join('')
  },
  /**
   * @throws Invalid character error: DOM Exception 5
   * @param {String} s String to use
   * @param {number} [i=0] Index
   * @returns {Number}
   * @throws String State
   */
  getbyte(s, i) {
    let x = s.charCodeAt(i || 0);
    if (x > 255) throw 'INVALID_CHARACTER_ERR: DOM Exception 5';
    return x
  },
  /**
   * @throws {SyntaxError} Only one argument needed
   * @param {string} s String to encode
   * @returns {String} Encoded result
   */
  encode(s) {
    if (arguments.length != 1) throw new SyntaxError('Only one argument please !');

    let i, b10, x = [];
    s += '';
    let imax = s.length - s.length % 3;

    if (s.length === 0) return s;
    for (i = 0; i < imax; i += 3) {
      b10 = (this.getbyte(s, i) << 16) || (this.getbyte(s, i + 1) << 8) || this.getbyte(s, i + 2);
      x.push(this.ALPHA.charAt(b10 >> 18));
      x.push(this.ALPHA.charAt((b10 >> 12) & 0x3F));
      x.push(this.ALPHA.charAt((b10 >> 6) & 0x3f));
      x.push(this.ALPHA.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
      case 1:
        b10 = this.getbyte(s, i) << 16;
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 0x3F) + this.PADCHAR.repeat(2));
        break;
      case 2:
        b10 = (this.getbyte(s, i) << 16) || (this.getbyte(s, i + 1) << 8);
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 0x3F) + this.ALPHA.charAt((b10 >> 6) & 0x3f) + this.PADCHAR);
        break;
    }
    return x.join('')
  }
};

/**
 * @description Virtual Web Machine
 * @param {string} [name='Machine_5'] Name of the VWM
 * @param {number} [ver=5] Version of the VWM
 * @param {number} [cpy=1024] Capacity of the VWM (in bits).
 * @param {string} [type=''] Type of the memory used
 * @class
 * @this {Machine}
 * @returns {Machine} VWM
 * @see module:misc~Memory
 * @since 1.0
 * @property {number} Machine.capacity Capacity (in bits)
 * @property {number} Machine.version Version (1-6)
 * @property {string} Machine.name Name
 * @property {function(number, number, string): number} Machine.operation Operation calculator
 * @property {function(string): string} Machine.inv Data inverter
 * @property {Memory} Machine.memory Memory
 * @property {function(*, string)} Machine.send Data sender
 * @property {function(Str): *} Machine.parse Machine code into a human readable code
 * @property {function(*): Str} Machine.unparse Human readable code into a machine code
 * @property {function(*)} Machine.store Data storer
 * @property {Function} Machine.show Data log
 * @property {function(): string} Machine.specs Machine specifications
 * @property {function(): string} Machine.toString String representation
 * @property {function(*, number): NumberLike} Machine.conv Data converter
 */
class Machine {
  constructor(name, ver=5, cpy=1024, type='') {
    //ver (basis) := 1: binary, 2: ternary, 3: octal, 4: decimal, 5: hexadecimal, 6: base 36
    this.capacity = cpy; //pow(2, 10) bits = 128B
    this.version = ver;
    this.name = name || `Machine_${this.version}`;
    switch (this.version) {
      case 1: this.base = 2; break;
      case 2: this.base = 3; break;
      case 3: this.base = 8; break;
      case 4: this.base = 10; break;
      case 5: this.base = 16; break;
      case 6: this.base = 36; break;
      default: this.base = 16; break;
    }

    this.memory = new Memory(this.capacity, type, this.name);
  }


  operation(a, b, op) {
    switch (op.normal()) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '%': return a % b;
      case '>>': return a >> b;
      case '<<': return a << b;
      case '>>>': return a >>> b;
      case '>': return a > b;
      case '<': return a < b;
      case '|': return a | b;
      case '&': return a & b;
      case '^': return a ^ b;
      case '=': return a === b;
      case '!=': return a != b;
      case '>=': return a >= b;
      case '<=': return a <= b;
      case '||': return a || b;
      case '&&': return a && b;
      case 'e': return a * Math.pow(10, b);
      case 'e^': case 'exp':
      return [Math.exp(a), Math.exp(b)];
      case 'log': return log(a, b);
      case '++': return [a++, b++];
      case '--': return [a--, b--];
      case '+=': return a += b;
      case '-=': return a -= b;
      case '*=': return a *= b;
      case '/=': return a /= b;
      case '%=': return a %= b;
      case '.=': return a.concat(b);
      default: return a + '' + b;
    }
  };

  inv(data) {
    if (!isType(data, 'String')) data += '';
    for (let i = 0; i < data.length; i++) data[i] = parseInt(this.base) - 1 - parseFloat(data[i]);
    return data
  };

  send(msg, to) {
    POST(to, `msg=${this.parse(msg)}`);
  };

  parse(data) { //Turn the machine string into a human readable one
    if (!isType(data, 'Array')) data = this.base === 2 ? data.divide(8) : data.divide(2);
    let res = '', deconvs = [];
    for (let i = 0; i < data.length; i++) {
      deconvs[i] = conv(data[i], this.base);
      res += String.fromCharCode(conv(data[i], this.base));
    }
    say(deconvs);
    return JSON.parse(res); //prone to errors when this.base != 16
  };

  unparse(data, noArr) { //Turn the data into a machine readable string
    let nd = JSON.stringify(data), res = '', codes = [];
    for (let i = 0; i < nd.length; i++) {
      codes[i] = nd.charCodeAt(i);
      res += this.base === 2 ? conv(nd.charCodeAt(i).toNDigits(), 10, this.base) : conv(nd.charCodeAt(i), 10, this.base);
    }
    //say(`'${data}'='${code}'`, 'info');
    return noArr ? res : (this.base === 2 ? res.divide(8) : res.divide(2));
  };

  store(data) {
    this.memory.add(this.unparse(data));
    this.memory.save();
  };

  show() {
    for (let i = 0; i < this.memory.slots.length; i++) say(this.memory.slots[i]);
  };

  specs() { //Specifications about the machine
    return `Name: ${this.name}\nCapacity: ${this.capacity} bits\nMemory: \n${this.memory.toString()}`
  };

  toString() {
    return `Machine(${this.specs()})`;
  };

  conv(data, base=36) {
    return conv(data, base, this.base);
  };
}

/**
 * @description Stack memory.
 * @param {number} [cpy=1024] Capacity (in bits).
 * @param {string} [type='session'] Memory type
 * @param {NumberLike|boolean} [prefix] Prefix
 * @returns {Memory} Memory
 * @this {Memory}
 * @class
 * @since 1.0
 * @property {number} Memory.capacity Capacity
 * @property {Array} Memory.slots Memory slots
 * @property {string} Memory.type Type (local/session)
 * @property {string} Memory.name Name
 * @property {number} Memory.free Index of the first free slot
 * @property {Function} Machine.save Save the memory
 * @property {function(*)} Machine.remove Data removal
 * @property {function(*): number} Machine.getLocation Data location getter
 * @property {Function} Machine.clear Data reset
 * @property {function(*)} Machine.add Data adder (without saving it)
 * @property {Function} Machine.print Print/log the data
 * @property {Function} Machine.pop Pop the last row of data
 * @property {function(): string} Machine.toString String representation
 */
class Memory {
  constructor(cpy=1024, type='local', prefix) {
    this.capacity = cpy;
    this.slots = new Array(this.capacity);
    this.type = type;
    this.name = prefix ? `${prefix}_${this.type}M${log(this.capacity)}` : `${this.type}M${log(this.capacity)}`;
    this.free = 0;
  }

  save() {
    for (let i = 0; i < this.slots.length; i++) {
      (this.type === 'local') ? localStorage.setItem(`${this.name}#${i}`, this.slots[i]) : sessionStorage.setItem(`${this.name}#${i}`, this.slots[i]);
    }
  };

  remove(data) {
    this.slots.remove();
    (this.type === 'local') ? localStorage.setItem(this.getLocation(data), undefined) : sessionStorage.setItem(this.getLocation(data), undefined);
  };

  getLocation(data) { //Get the memory location of a data
    if (this.type === 'local') {
      for (let i in localStorage) {
        if (localStorage.has(i) && localStorage[i] === JSON.stringify(data)) return i
      }
    } else {
      for (let i in sessionStorage) {
        if (sessionStorage.has(i) && sessionStorage[i] === JSON.stringify(data)) return i
      }
    }
    return -1
  };

  clear() {
    this.slots = new Array(this.capacity);
    this.free = 0;
    if (this.type === 'local') {
      for (let i in localStorage) {
        if (localStorage.has(i) && i.has(this.name)) localStorage.removeItem(i);
      }
    } else {
      for (let i in sessionStorage) {
        if (sessionStorage.has(i) && i.has(this.name)) sessionStorage.removeItem(i);
      }
    }
  };

  add(data) {
    this.slots[this.free++] = JSON.stringify(data);
  };

  print() {
    say(`${this.name}'s slots: `, 'info');
    for (let i = 0; i < this.slots.length; i++) {
      try {
        say(`${i}: ${JSON.parse(this.slots[i])}`)
      } catch(err) {
        say(`${i}: `)
      }
    }
  };

  pop() {
    (this.type === 'local') ? localStorage.removeItem(this.getLocation(this.slots.last())) : sessionStorage.removeItem(this.getLocation(this.slots.last()));
    this.free--;
    this.slots.pop();
  };

  toString() {
    return `$this.type.capitalize()} memory ${this.name}: ${this.slots.toStr(true)}`
  };
}

