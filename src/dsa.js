/**
 * @module dsa
 * @description Data Structure & Algorithms.
 * @requires module:essence
 * @since 1.0
 */
import {END_OF_SEQUENCE}  from './data';
import {isNon, isNativeType, say, isType, entries, keys, isCustomType, lookfor} from './essence';
import {range, euclidianDist, manhattanDist, conv} from './maths';
import {Buffer, println} from './dom';
import {rmDuplicates, RegExpify} from './misc';
import {InvalidParamError} from './qtest';

//Data structures
/**
 * @description Numerical array (like an n-puzzle).
 * @param {number} n Size of the array (matrix)
 * @param {number} [start=0] Starting number
 * @returns {number[]} Numerical array
 * @public
 * @since 1.0
 * @function
 */
export let numArr = (n, start = 0) => {
  let res = [], x = start;
  for (let i = 0; i < n; i++) {
    res[i] = [];
    for (let j = 0; j < n; j++) res[i][j] = x++;
  }
  return res
};

/**
 * @description Returns a function that, when called,
 * returns a generator object that is immediately
 * ready for input via `next()`.<br />
 * Source: {@link http://www.2ality.com/2015/03/es6-generators.html}
 * @param {(GeneratorFunction|Function)} generatorFunction Generating function
 * @returns {(function(...[*])|GeneratorFunction)} Ready generator
 * @constructor
 * @public
 * @since 1.0
 * @example
 * const wrapped = Coroutine(function* () {
 *      console.log(`First input: ${yield}`);
 *      return 'DONE';
 * });
 * wrapped().next('hello!'); //First input: hello!
 */
export let Coroutine = (generatorFunction) => {
  return (...args) => {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
};

//Algorithms
/**
 * @description QuickSort adapted from {@link https://Www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/}.
 * Complexity (best/average/worst): O(n log n)/O(n log n)/O(n<sup>2</sup>)
 * @param {List} list List to sort (array/string)
 * @param {number} [left=0] Left position
 * @param {number} [right=list.length-1] Right position
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let QuickSort = (list, left = 0, right = list.length - 1) => {
  let i, res = list;
  if (res.length > 1) {
    let pivot = res[Math.floor((right + left) / 2)], j = right;
    i = left;
    while (i <= j) {
      while (res[i] < pivot) i++;
      while (res[j] > pivot) j--;
      if (i <= j) {
        [res[i], res[j]] = [res[j], res[i]];
        i++;
        j--;
      }
    }
    if (left < i - 1) QuickSort(res, left, i - 1);
    if (i < right) QuickSort(res, i, right);
  }
  return res
};

/**
 * @description Reverse QuickSort.
 * @param {List} list List to sort (array/string)
 * @param {number} [left=0] Left position
 * @param {number} [right=list.length-1] Right position
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let RevSort = (list, left = 0, right = list.length - 1) => {
  let i, res = list;
  if (res.length > 1) {
    let pivot = res[Math.floor((right + left) / 2)], j = right;
    i = left;
    while (i <= j) {
      while (res[i] > pivot) i++;
      while (res[j] < pivot) j--;
      if (i <= j) {
        [res[i], res[j]] = [res[j], res[i]];
        i++;
        j--;
      }
    }
    if (left > i - 1) RevSort(res, left, i - 1);
    if (i > right) RevSort(res, i, right);
  }
  return res
};

/**
 * @description BubbleSort.<br />
 * Complexity (best/worst): O(n)/O(n<sup>2</sup>)
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let bubbleSort = (list) => {
  let j = 1, sorted = true, res = list;
  while (sorted) {
    sorted = false;
    for (let i = 0; i <= res.length - j; i++) {
      if (res[i] > res[i + 1]) {
        [res[i], res[i + 1]] = [res[i + 1], res[i]];
        sorted = true;
      }
    }
    j++;
  }
  return res;
};

/**
 * @description Improved BubbleSort algorithm that affects the initial list.
 * @param {List} list List to sort
 * @param {string} [order='asc'] Sorting order (asc/des)
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let bubbleSort2 = (list, order = 'asc') => {
  let j = 1, sorted = true, res = list;
  if (order === 'asc') {
    while (sorted) {
      sorted = false;
      for (let i = 0; i <= res.length - j; i++) {
        if (res[i] > res[i + 1]) {
          [res[i], res[i + 1]] = [res[i + 1], res[i]];
          sorted = true;
        }
        if (i < res.length - (j + 1)) {
          if (res[i] > res[i + 2]) [res[i], res[i + 2]] = [res[i + 2], res[i]];
          if (res[i + 1] > res[i + 2]) {
            [res[i + 1], res[i + 2]] = [res[i + 2], res[i + 2]];
            sorted = true;
          }
        }
        if (i < res.length - (j + 2)) {
          if (res[i] > res[i + 3]) [res[i], res[i + 3]] = [res[i + 3], res[i]];
          if (res[i + 1] > res[i + 3]) {
            [res[i], res[i + 3]] = [res[i + 3], res[i]];
            //sorted = true;
          }
        }
      }
      j++;
    }
  } else if (order === 'des') { //Descending order
    while (sorted) {
      sorted = false;
      for (let i = 0; i <= res.length - j; i++) {
        if (res[i] < res[i + 1]) {
          [res[i], res[i + 1]] = [res[i + 1], res[i]];
          sorted = true;
        }
        if (i < res.length - (j + 1)) {
          if (res[i] < res[i + 2]) [res[i], res[i + 2]] = [res[i + 2], res[i]];
          if (res[i + 1] < res[i + 2]) {
            [res[i + 1], res[i + 2]] = [res[i + 2], res[i + 1]];
            sorted = true;
          }
        }
        if (i < res.length - (j + 2)) {
          if (res[i] < res[i + 3]) [res[i], res[i + 3]] = [res[i + 3], res[i]];
          if (res[i + 1] < res[i + 3]) {
            [res[i + 1], res[i + 3]] = [res[i + 3], res[i + 1]];
            //sorted = true
          }
        }
      }
      j++;
    }
  }
  return res
};

/**
 * @description Brute-force sort.
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let bruteForceSort = (list) => {
  let res = list;
  for (let i of res) {
    let small = res[i], pos = i;
    for (let j = i + 1; j <= res.length; j++) {
      if (small > res[j]) {
        small = res[j];
        pos = j;
      }
    }
    let temp = res[i];
    res[i] = small;
    res[pos] = temp;
  }
  return res
};

/**
 * @description Max's Sort (mine).
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let maxSort = (list) => {
  //Ignores repeated values and loose data
  let med = list.median(), res = new Array(list.length), inc = list.getIncrement(3), q1 = list.quartile(1), q3 = list.quartile(3);
  //Pre-sort some elements
  res[0] = list.min();
  res.last(list.max());
  if (parseInt(res.length / 2) === (res.length / 2)) res[res.length / 2] = med;
  if (parseInt(res.length / 4) === (res.length / 4)) res[res.length / 4] = q1;
  if (parseInt(3 * res.length / 4) === (3 * res.length / 4)) res[3 * res.length / 4] = q3;

  for (let i = 1; i < list.length - 1; i++) { //Add elements in the correct order that belongs to x
    if (list[i] === Math.floor(res[0] + i * inc)
      || list[i] === Math.round(res[0] + i * inc)
      || list[i] == Math.ceil(res[0] + i * inc)
      || list[i] >= Math.floor(res[0] + i * inc) && list[i] <= Math.ceil(res[0] + i * inc)) res[i] = list[i];
  }
  //console.log('current result: ' + res.toStr(true));
  for (let i = list.length - 1; i > 1; i--) { //Same thing but from the end to complete the missing ones
    if (list[i] === Math.floor(res[res.length - 1] - i * inc) && isNon(res[i])
      || list[i] === Math.round(res[res.length - 1] - i * inc) && isNon(res[i])
      || list[i] === Math.ceil(res[res.length - 1] + i * inc) && isNon(res[i])
      || list[i] >= Math.floor(res[res.length - 1] + i * inc) && list[i] <= Math.ceil(res[0] + i * inc) && isNon(res[i])) res[i] = list[i];
  }
  //console.log('current result: ' + res.toStr(true));
  for (let i = 1; i < list.length - 1; i++) {
    for (let j of list) {
      if (list[j] === Math.floor(res[0] + i * inc)
        || list[j] === Math.round(res[0] + i * inc)
        || list[j] === Math.ceil(res[0] + i * inc)
        || list[j] >= Math.floor(res[0] + i * inc) && list[j] <= Math.ceil(res[0] + i * inc)) res[i] = list[j];
    }
  }
  return res
};

/**
 * @description Centre Sort (mine).
 * @param {List} list List to sort
 * @param {number} [left=Math.floor(list.length / 2)] Left position
 * @param {number} [right=Math.ceil(list.length / 2)] Right position
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let cenSort = (list, left = Math.floor(list.length / 2), right = Math.ceil(list.length / 2)) => {
  if (list.length <= 1) return list;
  let res = list, pivot = res[Math.floor((left + right) / 2)], j = right, i = left;
  while (i <= j) {
    while (res[i] < pivot) i--;
    while (res[j] > pivot) j++;
    if (i >= j) {
      [res[i], res[j]] = [res[j], res[i]];
      i--;
      j++;
    }
  }

  if (left > i - 1) cenSort(res, left, i - 1);
  if (i > right) cenSort(res, i, right);
  return res
};

/**
 * @description Set Sort.<br />Useful when sorting list with only integers.
 * Source: {@link http://www.stoimen.com/blog/2010/06/25/friday-algorithms-sorting-a-set-of-integers-far-quicker-than-quicksort/}
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let setSort = (list) => {
  let tmp = [], res = [];
  for (let i = 0; i < 1000; i++) tmp[i] = 0;
  for (let i = 0; i < list.length; i++) tmp[list[i]] = 1;
  for (let i = 0; i < 1000; i++) {
    for (let i = 0; i < 1000; i++) tmp[i] = 0;
  }
  for(let i = 0; i < list.length; i++) tmp[list[i]] = 1;
  for(let i = 0; i < 1000; i++) {
    if (1 === tmp[i]) res.push(i);
  }
  return res
};

/**
 * @description Set Sort v2.<br />Useful when sorting list with only integers where there's duplicate values.
 * Source: {@link http://www.stoimen.com/blog/2010/06/25/friday-algorithms-sorting-a-set-of-integers-far-quicker-than-quicksort/|by @jeroen}
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let setSort2 = (list) => {
  let tmp = [], res = [];
  for (let i = 0; i < 1000; i++) tmp[i] = 0;
  for (let i = 0; i < list.length; i++) tmp[list[i]]++;
  for (let i = 0; i < 1000; i++) {
    for (let j = 1; j < tmp[i]; j++) res.push(i);
  }
  for(let i = 0; i < 1000; i++) tmp[i] = 0;
  for(let i = 0; i < list.length; i++) tmp[list[i]]++;
  for(let i = 0; i < 1000; i++) {
    for(let j = 1; j < tmp[i]; j++) res.push(i);
  }
  return res
};

/**
 * @description Insertion sort.<br />
 * Complexity (best/worst): O(n)/O(n<sup>2</sup>)<br />
 * Source: {@link https://moodle.royalholloway.ac.uk/pluginfile.php/285743/mod_resource/content/5/14%20-%20Sorting.pdf}
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let insertionSort = (list) => {
  let res = list;
  for (let i of res) {
    let j;
    //Starting from the left neighbour, shift all elements greater than res[i] to the right
    for (j = i - 1; j >= 0 && res[i] < res[j]; j--) res[j + 1] = res[j];
    //Now j points to the 1st element smaller or equal to res[i] so put res[i] in the slot j+1
    res[j + 1] = res[i];
  }
  return res;
};

/**
 * @description Selection sort.<br />
 * Complexity: O(n<sup>2</sup>)<br />
 * Source: {@link https://moodle.royalholloway.ac.uk/pluginfile.php/285743/mod_resource/content/5/14%20-%20Sorting.pdf}
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let selectionSort = (list) => {
  let res = list;
  for (let i of res) {
    let min = res.min(i);
    [res[i], min] = [min, res[i]];
  }
  return res;
};

/**
 * @description Shell sort adapted {@link http://interactivepython.org/runestone/static/pythonds/SortSearch/TheShellSort.html}.
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let shellSort = (list) => {
  let res = list, gap = list.midIndex();
  while (gap > 0) {
    for (let small = 0; small < gap; small++) {
      let rg = range(small + gap, gap, list.length);
      for (let i of rg) {
        let pos = i;
        while (pos >= gap && res[i - gap] > list[i]) {
          res[pos] = res[pos - gap]; //[res[pos], res[pos - gap]] = [res[pos - gap], res[pos]]
          pos -= gap;
        }
        res[pos] = res[i]; //[res[pos], res[i]] = [res[i], res[pos]]
      }
    }
  }
  return res;
};

/**
 * @description Merge sort.
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 */
export let mergeSort = (list) => {
  if (list.length <= 1) return list; //Base case
  let res = list;
  //Recursive calls to sort left/right sub-arrays
  let left = mergeSort(res.get(0, res.midIndex(true))), right = mergeSort(res.get(0, res.midIndex()));
  return left.concat(right);
};

/**
 * @description Spread sort.
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 * @todo complete
 */
export let spreadSort = (list) => {
  /*let mid = list[list.midIndex()], left = mid, right = mid, res = list;
  //look up the rest
  return res;*/
  return list;
};

/**
 * @description Put the elements of the list in an heap order.<br />
 * Adapted from {@link https://en.wikipedia.org/wiki/Heapsort}
 * @param {List} list List
 * @returns {List} Heapified list
 * @private
 * @since 1.0
 * @function
 */
let heapify = (list) => {
  //start is assigned the index in list of the last parent node
  let res = list, start = Math.floor((list.length - 2) / 2);

  while (start >= 0) {
    //sift down the node at index start to the proper place such that all nodes below the start index are in heap order
    siftDown(res, start);
    start--; //Go to the next parent node
  }
  return res;
};

/**
 * @description Repair the heap whose root element is at index start, assuming the heaps rooted at its children are valid.<br />
 * Adapted from {@link https://en.wikipedia.org/wiki/Heapsort}
 * @param {List} list List
 * @param {number} start Starting position
 * @param {number} [end=list.length-1] Ending position
 * @returns {List} Down-sifted list
 * @private
 * @since 1.0
 * @function
 */
let siftDown = (list, start, end = list.length - 1) => {
  let res = list, root = start, leftChild = 2 * root + 1;

  while (leftChild <= end) { //While the root has at least one child
    let child = leftChild, swap = root;
    if (res[swap] < res[child]) swap = child; //If there is a right child and that child is greater
    if (child + 1 <= end && res[swap] < res[child + 1]) swap = child + 1;
    //The root holds the largest element. Since we assume the heaps rooted at the children are valid, this means that we are done
    if (swap === root) return res;
    else {
      [res[root], res[swap]] = [res[swap], res[root]];
      root = swap; //Repeat to continue sifting down the child now
    }
  }

  return res;
};

/**
 * @description Heap sort.<br />
 * Complexity: O(n log n)<br />
 * Adapted from {@link https://en.wikipedia.org/wiki/Heapsort}
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 * @todo complete
 */
export let heapSort = (list) => {
  let res = heapify(list); //Build the heap in the list so that largest value is at the root

  /*
   The following loop maintains the invariants that list[0:end] is a heap and every element
   beyond end is greater than everything before it (so list[end:list.length] is in sorted order)
   */
  let end = res.length - 1;
  while (end > 0) {
    //list[0] is the root and largest value. The swap moves it in front of the sorted elements
    [res[end], res[0]] = [res[0], res[end]];
    end--;
    res = siftDown(res, 0, end);
  }
  return res;
};

/**
 * @description Radix sort.<br />
 * Complexity: O(n)
 * @param {List} list List to sort
 * @returns {List} Sorted list
 * @public
 * @since 1.0
 * @function
 * @todo complete
 */
export let radixSort = (list) => {
  let res = list;

  return res;
};

/**
 * @description Get a portion of the list
 * @param {List} list List
 * @param {number} start=0 Starting position
 * @param {number} [end] Ending position
 * @returns {List} Portion of the list
 * @protected
 * @since 1.0
 * @function
 */
export let get = (list, start = 0, end) => {
  let res = [];
  if (start < 0 && !end) {
    end = start;
    start = 0;
  }
  if (end < 0) end = list.length + end - 1;
  for (let i = start; i <= (end || list.length - 1); i++) res.push(list[i]);
  return isNativeType(res, 'String') ? res.join('') : res;
};

export let sort = (list, order = 'asc') => {
  let arr = [...list];
  switch (order) {
    case 'des':
      return arr.sort((a, b) => b - a);
    default:
      return arr.sort((a, b) => a - b);
  }
};

/**
 * @description Get the next item of an iterator.<br />
 * Source: {@link http://www.2ality.com/2015/03/es6-generators.html}
 * @param {Iterator} iterator Iterator
 * @returns {Symbol} Item
 * @protected
 * @since 1.0
 * @function
 */
export let getNextItem = (iterator) => {
  let item = iterator.next();
  //noinspection JSUnresolvedVariable
  return item.done ? END_OF_SEQUENCE : item.value;
};

/**
 * @description Item logger which outputs everything it receives.<br />
 * Inspired by {@link http://www.2ality.com/2015/03/es6-generators.html}
 * @type {GeneratorFunction}
 * @public
 * @since 1.0
 */
export const logItems = Coroutine(function*() {
  try {
    for (; ;) {
      let item = yield;
      say(item, 'time');
    }
  } finally {
    console.log('DONE');
  }
});

/**
 * @description Linked list.
 * @this LinkedList
 * @class
 * @public
 * @since 1.0
 * @property {NumberLike} LinkedList.payload Payload
 * @property {LinkedList|Object} LinkedList.next Next element
 * @property {string} LinkedList.name Name
 * @property {function(this:LinkedList): string} LinkedList.show Show the linked list
 * @property {function(this:LinkedList): string} LinkedList.next.show Show the linked list
 * @property {function(): string} LinkedList.toString String representation
 */
class LinkedList {
  /**
   * @param {*} [pl=1] Payload
   * @param {(LinkedList|{payload: number, next: null})} [nx={payload: 1, next: ?LinkedList}] Next
   * @param {string} name Name of the linked list
   */
  constructor(pl=1, nx={payload: 1, next: null}, name) {
    this.payload = pl;
    this.next = nx;
    this.next.show = () => `${this.name}:${this.next.payload}->`;
    this.name = name;
  }

  show () {
    `${this.name}:${this.payload}->${this.next ? this.next.show() : null}`
  };

  toString() {
    return `LinkedList(${this.show()})`
  };
}

/**
 * @description Node.
 * @this Node
 * @class
 * @public
 * @since 1.0
 * @property {NumberLike} Node.payload Payload
 * @property {Node} Node.next Next node
 * @property {function(): Node} Node.traverse Node traversal
 * @property {Function} Node.print Node printer
 * @property {Function} Node.printList Node list printer
 * @property {function(): Node} Node.last Get the last node
 * @property {function(NumberLike)} Node.append Append the list with a new node
 * @property {Function} Node.remove Node remover
 * @property {function(): Node} Node.reverse List reversal
 * @property {function(NumberLike, number): Nums} Node.find Look for a node
 * @property {function(Node): boolean} Node.equals Node comparator
 * @property {function(): string} Node.toString String representation
 */
class Node {
  /**
   * @param {*} [pl=1] Payload
   * @param {Node} [nx] Next node
   * @param {Node} [pv] Previous node
   */
  constructor(pl=1, nx=null, pv=null) {
    this.payload = pl;
    this.next = nx;
    this.prev = pv;
  }

  traverse() {
    if (this.next) this.next.traverse();
    say(`payload: ${this.payload}`);
  };

  print() {
    if (this.next != null) this.next.print();
    Buffer.add(`${this.payload}=>`);
  };

  printList() {
    (this.next === null) ? Buffer.add(`->${this.payload}`) : this.next.printList();
    Buffer.writeToConsole();
  };

  last() {
    return (this.next === null) ? this : this.next.last();
  };

  append(n) {
    if (this.next === null) {
      this.next = new Node(n); //If there is no next node, link the new one here
      this.next.prev = this;
    } else this.next.append(n); //Else, append to next node
  };

  remove() {
    let n = this.next;
    this.next = n.next;
    n.next.prev = this;
  };

  reverse() {
    if (this.next == null) return this;
    else {
      let newHead = this.next.reverse();
      newHead.next = this;
      newHead.prev = null;
      this.prev = newHead;
      this.next = null;
      return newHead
    }
  };

  toString() {
    return `Node(payload=${this.payload}, previous=${this.prev}, next=${this.next})`
  };

  equals(node) {
    return this.payload === node.payload && this.next.equals(node.next) && this.prev.equals(node.prev)
  };

  find(n, d=0) {
    if (this.payload === n) return d;
    if (this.next) return this.next.find(n, d + 1);
    return [-1, d]
  };
}

/**
 * @description Nodes for path finding algs
 * @this Vertex
 * @public
 * @class
 * @since 1.0
 * @property {number} Vertex.g Cost of the path to that node
 * @property {number} Vertex.h Heuristic to get to that node
 * @property {number} Vertex.f Cost of the path (g) + heuristic estimate
 * @property {Edge[]} Vertex.edges List of edges connected to the path node
 * @property {*} Vertex.payload Payload (content/data) of the node
 * @property {number[]} Vertex.pos Position of the node
 * @property {?Vertex} Vertex.parent Parent of the vertex
 * @property {function(number): Vertex} Vertex.back Go n vertexes back
 * @property {function(Vertex): boolean} Vertex.isCloser Check if the current vertex is closer than the other one
 * @property {function(Vertex[]): string} Vertex.toString String representation
 * @property {function(Vertex[])} Vertex.join Join Vertexes with edges
 * @property {function(): Vertex} Vertex.getVertexInEdge Get the vertex connected to a particular edge
 * @property {function(): Vertex[]} Vertex.getConnectedVertices Get the vertexes connected to this one
 * @property {function(): (Vertex[]|Vertex[][])} Vertex.getNetwork Get the network/tree/graph/map of vertices connected to this one
 * @property {function(): number} Vertex.size Size of the vertex's network
 * @property {function(Vertex): number} Vertex.distanceFrom Distance from this vertex to another
 * @property {function(): Vertex} Vertex.getNearestVertex Get the nearest connected vertex
 */
class Vertex {
  /**
   * @param {number} [g=0] Current total cost
   * @param {number} [h=0] Current total heuristic
   * @param {number[]} [pos=[0, 0]] 2D position of the node
   * @param {*} [payload=''] Payload
   * @param {Edge[]} [edges=[]] List of edges connected to the path node
   */
  constructor(g=0, h=0, pos=[0, 0], payload='', edges=[]) {
    this.g = g;
    this.h = h;
    this.f = this.g + this.h | 1;
    this.pos = pos;
    this.parent = null;
    this.payload = payload;
    this.edges = edges;
  }

  back(n=0) {
    return (n <= 1) ? this.parent : this.parent.back(n - 1);
  };

  isCloser(vertex) {
    return this.f <= vertex.f;
  };

  toString() {
    let edges = this.edges.length > 0 ? this.edges.map((edge) => {
        try {
          return edge.toString()
        } catch (err) {
          return null;
        }
      }) : '';
    return `Vertex(g=${this.g}, h=${this.h}, f=${this.f}, pos=[${this.pos.toStr(true)}], payload=${this.payload}, edges=[${edges}], parent=${(this.parent || this.parent.toString())})`;
  };

  join(vertices) {
    for (let i = 0; i < vertices.length; i++) {
      if (!isType(this.edges[i], 'Edge')) this.edges[i] = new Edge(this, vertices[i]);
      else {
        this.edges[i].startNode = this;
        this.edges[i].endNode = vertices[i];
      }
      vertices[i].edges.push(this.edges[i]);
      vertices[i].edges.last().startNode = this;
      vertices[i].edges.last().endNode = vertices[i];
    }
  };

  getVertexInEdge(index=0) {
    let edge = this.edges[index];
    return edge.startNode.equals(this) ? edge.endNode : edge.startNode;
  };

  getConnectedVertices() {
    let list = [];
    for (let i = 0; i < this.edges.length; i++) list.push(this.getVertexInEdge(i));
    return list;
  };

  find(n, depth=0) {
    if (this.payload === n) return depth;
    let search = this.getConnectedVertices().map(node => {
      try {
        return node.find(n, depth + 1);
      } catch (err) {
        return [-1, depth];
      }
    });
    let res = search.filter(item => !isType(item, 'Array')); //Filters out the items [-1, $depth]

    return res.length > 0 ? res : [-1, depth]
  };

  getNetwork() {
    let listVertices = (vertex) => {
      let list = vertex.getConnectedVertices().remove([this, null], true);
      return list.length > 0 ? list.map(listVertices) : list;
    };
    return this.getConnectedVertices().map(listVertices);
  };

  size() {
    return this.getNetwork().linearise().length;
  };

  distanceFrom(vertex) {
    return euclidianDist(this.pos, vertex.pos);
  };

  getNearestVertex() {
    let smallestEdge = this.edges.filter(edge => edge.length === this.edges.map(edge => edge.length).min());
    return smallestEdge.startNode.equals(this) ? smallestEdge.endNode : smallestEdge.startNode;
  };
}

/**
 * @description Edge that connects two Vertices.
 * @this Edge
 * @public
 * @since 1.0
 * @class
 * @property {?Vertex} Edge.startNode Starting node/vertex of the edge
 * @property {?Vertex} Edge.endNode Ending node/vertex of the edge
 * @property {number} Edge.length Length of the edge
 * @property {function(): string} Edge.toString String representation of the edge
 * @property {Function} Edge.draw Draw the edge
 * @property {function(): Edge[]} Edge.getSurroundingEdges Get all the surrounding edges
 * @property {function(): Edge[]} Edge.getNeighbours Get the neighbour edges
 */
class Edge {
  /**
   * @param {?Vertex} [start=null] Starting vertex/node
   * @param {?Vertex} [end=null] Ending vertex/node
   * @param {number} [len=0] Length of the edge.
   */
  constructor(start=null, end=null, len=0) {
    this.startNode = start;
    this.endNode = end;
    this.length = len || ((!isNon(start) && !isNon(end)) ? euclidianDist(start.pos, end.pos) : 0);
    this.line = new Line(start ? start.pos : [0, 0], end ? end.pos : [0, 0]);
  }

  toString() {
    return `Edge(startNode=${this.startNode}, endNode=${this.endNode}, length=${this.length})`;
  };

  draw() {
    this.line.draw();
  };

  getSurroundingEdges() {
    let vertexNetwork = this.startNode ? this.startNode.getNetwork() : [];
    vertexNetwork.append(this.endNode? this.endNode.getNetwork() : []);
    return vertexNetwork.map(vertex => vertex.edges).linearise().remove(this, true); //Get a 1d array of edges which are different than this one
  };

  getNeighbours() {
    let neighbours = this.startNode? this.startNode.getConnectedVertices() : [];
    neighbours.append(this.endNode ? this.endNode.getConnectedVertices() : []);
    return neighbours.map(vertex => vertex.edges).linearise().remove(this, true);
  }
}

/**
 * @description Binary tree node.
 * @this TreeNode
 * @class
 * @public
 * @since 1.0
 * @property {TreeNode} TreeNode.left Left child
 * @property {TreeNode} TreeNode.right Right child
 * @property {NumberLike} TreeNode.payload Payload
 * @property {function(?TreeNode, ?TreeNode)} TreeNode.add Child adder
 * @property {function(TreeNode[])} TreeNode.addLeft Left child adder
 * @property {function(TreeNode[])} TreeNode.addRight Right child adder
 * @property {function(): TreeNode} TreeNode.traverse Tree traversal
 * @property {Function} TreeNode.printInOrder Console in-order printing
 * @property {Function} TreeNode.printPreOrder Console pre-order printing
 * @property {Function} TreeNode.printPostOrder Console post-order printing
 * @property {Function} TreeNode.printInOrder Console in-order printing
 * @property {Function} TreeNode.inOrder Window in-order printing
 * @property {Function} TreeNode.preOrder Window pre-order printing
 * @property {Function} TreeNode.postOrder Window post-order printing
 * @property {function(): string} TreeNode.getInOrder In-order getter
 * @property {function(): string} TreeNode.getPreOrder Pre-order getter
 * @property {function(): string} TreeNode.getPostOrder Post-order getter
 * @property {function(): boolean} TreeNode.isLeaf Leaf check
 * @property {function(*, string): number[]} TreeNode.find Look for a tree-node
 * @property {function(*): number[]} TreeNode.dfs Depth First Search
 * @property {function(*): number[]} TreeNode.bfs Breath First Search
 * @property {Function} TreeNode.sum Sum of the payloads
 * @property {Function} TreeNode.min Smallest payload
 * @property {Function} TreeNode.max Biggest payload
 * @property {function(number): number} TreeNode.nbOfBranches Branches counter
 * @property {function(): number} TreeNode.avg Average of the payloads
 * @property {function(): string} TreeNode.printBFS Print in the BFS order
 * @property {function(): string} TreeNode.toString String representation
 * @property {function(boolean): Array} TreeNode.toArray Array representation
 * @property {function(NumberLike): number} TreeNode.count Count the number of times there's a particular payload
 */
export class TreeNode {
  /**
   * @param {*} [pl=0] Payload
   * @param {TreeNode} [l=null] Left child
   * @param {TreeNode} [r=null] Right child
   */
  constructor(pl=0, l=null, r=null) {
    this.left = l;
    this.right = r;
    this.payload = pl;
  }
  add(l, r=null) {
    this.left = l;
    this.right = r;
  };
  addLeft(child) {
    for (let i = 0; i < child.length; i++) (i === 0)  ? this.left = child[0] : child[i - 1].left = child[i];
  };
  addRight(childs) {
    for (let i in childs) {
      if(childs.has(i)) {
        (i === 0) ? this.right = childs[0] : childs[i-1].right = childs[i];
      }
    }
  };
  traverse() {
    if (this.left) this.left.traverse();
    if (this.right) this.right.traverse();
    return this
  };

  //Console printing
  printInOrder() {
    if (this.left) this.left.printInOrder();
    Buffer.add(`${this.payload}->`);
    if (this.right) this.right.printInOrder();
    Buffer.add('\r\n');
  };
  printPreOrder() {
    Buffer.add(`${this.payload}->`);
    if (this.left) this.left.printPreOrder();
    if (this.right) this.right.printPreOrder();
    Buffer.add('\r\n');
  };
  printPostOrder() {
    if (this.left) this.left.printPreOrder();
    if (this.right) this.right.printPreOrder();
    Buffer.add(`${this.payload}->`);
    Buffer.add('\r\n');
  };

  //Window printing
  inOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    if (this.left) this.left.inOrder(t + s, s, d + 1, sym);
    println(t + sym + this.payload + s + ` (depth=${d})`);
    if (this.right) this.right.inOrder(t + s, s, d + 1, sym);
  };
  preOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    println(t + sym + this.payload + s + ` (depth=${d})`);
    if (this.left) this.left.preOrder(t + s, s, d + 1, sym);
    if (this.right) this.right.preOrder(t + s, s, d + 1, sym)
  };
  postOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    if (this.left) this.left.postOrder(t + s, s, d + 1, sym);
    if (this.right) this.right.postOrder(t + s, s, d + 1, sym);
    println(t + sym + this.payload + s + ` (depth=${d})`);
  };

  //Getter
  getInOrder(sym='->') {
    let order = '';
    if (this.left) order += this.left.getInOrder(sym);
    order += sym + this.payload;
    if (this.right) order += this.right.getInOrder(sym);
    return order
  };
  getPreOrder(sym='->') {
    let order = '';
    order += sym + this.payload;
    if (this.left) order += this.left.getPreOrder(sym);
    if (this.right) order += this.right.getPreOrder(sym);
    return order
  };
  getPostOrder(sym='->') {
    let order = '';
    if (this.left) order += this.left.getPostOrder(sym);
    if (this.right) order += this.right.getPostOrder(sym);
    return order + sym + this.payload
  };
  isLeaf() { //Is it an end of branch ?
    return !this.left && !this.right
  };
  find(n, method='bfs') {
    return (method.normal() === 'bfs') ? this.bfs(n) : this.dfs(n)
  };
  dfs(n) { //Depth First Search
    let d = 0, td = 0; //Depth, total depth
    let stack = [];
    stack.push(this);
    while (!stack.equals([])) {
      d = 0;
      let cur = stack.pop();
      try {
        if (cur.payload === n) return [d, td]
      } catch (e) {
        return [-1, td]
      }
      if (cur.left) stack.push(cur.left);
      if (cur.right) stack.push(cur.right);
      d++;
      td++;
    }
  };
  bfs(n) { //Breadth First Search
    let b = 0, tb = 0; //Breadth, total breadth
    let queue = [];
    queue.unshift(this); //Add as the end
    while (!queue.equals([])) {
      b = 0;
      let cur = queue.pop(); //Get the first element of the queue
      try {
        if (cur.payload === n) return [b, tb]
      } catch (err) {
        return [-1, tb]
      }
      if (cur.left) queue.unshift(cur.left);
      if (cur.right) queue.unshift(cur.right);
      b++;
      tb++;
    }
  };
  sum() {
    let s = this.payload;
    if (this.left) s += this.left.sum();
    if (this.right) s += this.right.sum();
    return s
  };
  min() {
    let m = this.payload;
    if (this.left) m = Math.min(m, this.left.min());
    if (this.right) m = Math.min(m, this.right.min());
    return m
  };
  max() {
    let m = this.payload;
    if (this.left) m = Math.max(m, this.left.max());
    if (this.right) m = Math.max(m, this.right.max());
    return m
  };
  nbOfBranches(n=0) {
    if (this.left) n = this.left.nbOfBranches(n + 1);
    if (this.right) n = this.right.nbOfBranches(n + 1);
    return n
  };
  avg() {
    return this.sum() / this.nbOfBranches()
  };
  printBFS(sym='->') {
    let queue = [], res = '';
    queue.unshift(this); //Add as the end
    while (!queue.equals([])) {
      let cur = queue.pop(); //Get the first element of the queue
      res += cur + sym;
      try {
        if (cur.left) queue.unshift(cur.left);
        if (cur.right) queue.unshift(cur.right);
      } catch (err) {
        say(`${err} caused ${this}.printBFS(${sym}) to go wrong`, 'error');
      }
    }
    return res
  };
  toString() {
    let str = `TreeNode(payload=${this.payload}, `;
    if (this.left) str += `left=${this.left.toString()}`;
    if (this.right) str += `right=${this.right.toString()}`;
    return str.substring(0, str.length) + ')'
  };
  toArray(singly) {
    let arr = [];
    if (this.left) singly ? arr.push(this.left.toArray().toString().split(',')) : arr.push(this.left.toArray());
    arr.push(this.payload);
    if (this.right) singly ? arr.push(this.right.toArray().toString().split(',')) : arr.push(this.right.toArray());
    return singly ? arr.toString().split(',') : arr
  };

  count(n) {
    return this.getInOrder().countWord(n, '->');
  };
}

/**
 * @description N-ary tree node.
 * @see module:dsa~TreeNode
 * @this NTreeNode
 * @public
 * @since 1.0
 * @class
 * @property {NTreeNode[]} NTreeNode.child Child
 * @property {NumberLike} NTreeNode.payload Payload
 * @property {function(NTreeNode)} NTreeNode.add Child adder
 * @property {function(NTreeNode)} NTreeNode.remove Child remove
 * @property {function(): NTreeNode} NTreeNode.traverse Tree traversal
 * @property {Function} NTreeNode.printInOrder Console in-order printing
 * @property {Function} NTreeNode.printPreOrder Console pre-order printing
 * @property {Function} NTreeNode.printPostOrder Console post-order printing
 * @property {Function} NTreeNode.printInOrder Console in-order printing
 * @property {function(number, string, number, string)} NTreeNode.inOrder Window in-order printing
 * @property {function(number, string, number, string)} NTreeNode.preOrder Window pre-order printing
 * @property {function(number, string, number, string)} NTreeNode.postOrder Window post-order printing
 * @property {function(): string} NTreeNode.getOrder ??-order getter
 * @property {function(): boolean} NTreeNode.isLeaf Leaf check
 * @property {function(*, string): Nums} NTreeNode.find Look for a tree-node
 * @property {function(...number): Nums} NTreeNode.dfs Depth First Search
 * @property {function(...number): Nums} NTreeNode.bfs Breath First Search
 * @property {function(): number} NTreeNode.sum Sum of the payloads
 * @property {function(): number} NTreeNode.min Smallest payload
 * @property {function(): number} NTreeNode.max Biggest payload
 * @property {function(number): number} NTreeNode.nbOfBranches Branches counter
 * @property {function(): number} NTreeNode.avg Average of the payloads
 * @property {function(string)} NTreeNode.printBFS Print in the BFS order
 * @property {function(): string} NTreeNode.toString String representation
 * @property {function(): Array} NTreeNode.toArray Array representation
 * @property {function(number): NTreeNode} NTreeNode.getChild Child getter
 * @property {function(string, boolean): ?string} NTreeNode.see See the tree for that particular node
 * @property {function(*): number} NTreeNode.count Count the number of times there's a particular payload
 */
class NTreeNode extends TreeNode {
  /**
   * @param {*} pl Payload
   * @param {TreeNode[]} [ch=[]] Child
   */
  constructor(pl=0, ch=[]) {
    this.payload = pl;
    this.child = ch;
  }
  add(c) {
    this.child.push(c);
  };
  remove(c) {
    this.child.remove(c);
  };
  traverse() {
    for (let child of this.child) child.traverse();
    return this
  };

  //Console printing
  printInOrder() {
    for (let i = 0; i < this.child - 1; i++) {
      this.child[i].printInOrder();
      Buffer.add(`${this.payload}->`);
      this.child[i + 1].printInOrder();
      Buffer.add('\r\n');
    }
  };
  printPreOrder() {
    for (let i = 0; i < this.child - 1; i++) {
      Buffer.add(`${this.payload}->`);
      this.child[i].printInOrder();
      this.child[i + 1].printInOrder();
      Buffer.add('\r\n');
    }
  };
  printPostOrder() {
    for (let i = 0; i < this.child - 1; i++) {
      this.child[i].printInOrder();
      this.child[i + 1].printInOrder();
      Buffer.add(`${this.payload}->`);
      Buffer.add('\r\n');
    }
  };

  //Window printing
  inOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    for (let i = 0; i < this.child; i++) {
      this.child[i].inOrder(t + s, s, d + 1, sym);
      println(t + sym + this.payload + s + ` (depth=${d})`);
      this.child[i].inOrder(t + s, s, d + 1, sym);
    }
  };
  preOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    println(t + sym + this.payload + s + ` (depth=${d})`);
    for (let i = 0; i < this.child - 1; i++) this.child[i].preOrder(t + s, s, d + 1, sym);
  };
  postOrder(t='', s='&nbsp;&nbsp;', d=0, sym='|-') {
    for (let i = 0; i < this.child; i++) this.child[i].postOrder(t + s, s, d + 1, sym);
    println(t + sym + this.payload + s + ` (depth=${d})`);
  };

  //Getter
  getOrder(sym='->') {
    let getPayloads = node => node.isLeaf() ? node.payload : node.payload + sym + node.getOrder(sym);
    return this.payload + sym + this.child.map(getPayloads).join(sym);
  };

  isLeaf() {
    return this.child.length === 0;
  };

  find(n, method='bfs') {
    return (method && method.toLowerCase() === 'bfs') ? this.bfs(n) : this.dfs(n)
  };
  dfs(n, d=0, td=0) { //Depth First Search
    for (let c of this.child) {
      if (!isType(c, 'NTreeNode')) throw new TypeError(`The child "${c}" is not a NTreeNode`);
      c.dfs(n, d + 1, td++);
    }
    return [-1, td]
  };
  bfs(n, b=0, tb=0) { //Breadth First Search
    let queue = [];
    queue.unshift(this); //Add as the end
    while (!queue.equals([])) {
      b = 0;
      let cur = new NTreeNode(queue.pop()); //Get the first element of the queue
      if (cur.payload === n) return [b, tb];
      if (cur.left) queue.unshift(cur.left);
      if (cur.right) queue.unshift(cur.right);
      b++;
      tb++;
    }
    return [-1, tb]
  };
  sum() {
    let s = this.payload;
    for (let c of this.child) s += c.payload;
    return s
  };
  min() {
    let m = this.payload;
    for (let c of this.child) m = Math.min(m, c.payload);
    return m
  };
  max() {
    let m = this.payload;
    for (let c of this.child) m = Math.max(m, c.payload);
    return m
  };
  nbOfBranches(n=0) {
    for (let c of this.child) n = c.nbOfBranches(n + 1);
    return n
  };
  avg() {
    return this.sum() / this.nbOfBranches()
  };
  printBFS(t='-') {
    let queue = [this], tab = t;
    while (!queue.isEmpty()) {
      let cur = new NTreeNode(queue.pop()); //Get the first element of the queue
      println(`${tab}>${cur.payload}`);
      tab += '-';
      for (let c in this.child) queue.unshift(c);
    }
  };
  toString() {
    let str = `NTreeNode(payload=${this.payload}, child=[`;
    for (let c of this.child) str += this.child[c].toString() + ', ';
    return (str.substring(0, str.length) + '])').replace(', ]', ']');
  };
  toArray(singly=false) {
    let arr = [];
    arr.push(this.payload);
    for (let c of this.child) singly ? arr.push(c.toArray().toString().split(',')) : arr.push(c.toArray());
    return singly ? arr.toString().split(',') : arr
  };

  getChild(pos) {
    return this.child[pos];
  };

  see(symbol, console=false) {
    traverseTree(this, symbol);
    Buffer.show(console, !console, true);
    let tree = Buffer.log;
    Buffer.clear();
    return tree;
  };

  count(n) {
    return this.getOrder().countWord(n, '->');
  };
}

/**
 * @description Traverse a (sub)tree starting from a particular node.
 * @param {Node} node Node
 * @param {string} [symbol="--"] Symbol/string/character to denote a branch
 * @param {string} [start="|"] Starting symbol/string/character to denote the head of a branch
 * @param {number} [indent=0] Indentation preceding a branch
 * @return {string} Current buffer (assuming it's only containing what this function added to it).
 * @function
 * @since 1.0
 * @public
 */
export let traverseTree = (node, symbol='--', start='|', indent=0) => {
  Buffer.add('  '.repeat(indent) + start + symbol + node.payload);
  indent++;
  for (let i = 0; i < node.child.length; i++) traverseTree(node.getChild(i), symbol, start, indent);
  return Buffer.log;
};

/**
 * @description Sorted mathematical set
 * @this SortedSet
 * @class
 * @inheritdoc
 * @public
 * @since 1.0
 * @property {number[]} SortedSet.value Values
 * @property {function(*)} SortedSet.add Add an item to the set and sort it
 * @property {function(): string} SortedSet.toString String representation
 * @property {function(): number} SortedSet.size Size of the set
 * @property {function()} SortedSet.clear Clear the set
 * @property {function(*): boolean} SortedSet.delete Delete an eventual item from the set
 * @property {function(): Iterator} SortedSet.entries Entries of the set
 * @property {function(): Iterator} SortedSet.keys Keys of the set
 * @property {function(*): boolean} SortedSet.has Check if the set has an item
 */
class SortedSet {
  /**
   * @param {Array} arr Array
   */
  constructor(arr=[]) {
    this.value = [...arr].sort();
  }

  size() {
    return this.value.length;
  }

  add(item) {
    isType(item, 'Array') ? this.value.multiPlace(item) : this.value.place(item);
    this.value = rmDuplicates(this.value);
  };

  clear() {
    this.value = [];
  }

  delete(item) {
    let included = this.has(item);
    this.value.remove(item);
    return included;
  }

  entries() {
    return entries(this.value);
  }

  forEach(cb, thisArg) {
    this.value.forEach(cb, thisArg);
  }

  has(item) {
    return this.value.contains(item);
  }

  keys() {
    return keys(this.value);
  }

  toString() {
    return `SortedSet(${this.value.toString()})`
  };
}

/**
 * @description Stack.
 * @this Stack
 * @public
 * @class
 * @since 1.0
 * @property {number[]} Stack.value Values
 * @property {?number} Stack.limit Limit
 * @property {function(): *} Stack.peek Returns the top value
 * @property {function(): *} Stack.ground Returns the bottom value
 * @property {function(*)} Stack.push Add items at the top
 * @property {function(): *} Stack.pop Remove the top item
 * @property {function(): boolean} Stack.isEmpty Emptiness check
 * @property {function(): boolean} Stack.isFull Fullness check
 * @property {function(): number} Stack.size Size
 * @property {function(): string} Stack.toString String representation
 */
class Stack {
  /**
   * @param {Array|*} [arr] Array
   * @param {?number} [lim=null] Limit
   */
  constructor(arr, lim=null) {
    this.value = isType(lim, 'Number') ? new Array(lim) : [];
    this.limit = lim;
    if (arr) this.value.push(arr);
  }

  peek() {
    return this.value.last()
  };

  ground() {
    return this.value[0]
  };

  /**
   * @throws {Error} Stack overflow
   * @param {*} item Item
   * @returns {undefined}
   */
  push(item) {
    if (this.isFull()) throw new Error('Stack overflow !');
    isType(item, 'Array') ? this.value.concat(item) : this.value.push(item);
  };

  /**
   * @throws {Error} Stack underflow
   * @return {*} Item
   */
  pop() {
    if (this.isEmpty()) throw new Error('Stack underflow !');
    return this.value.pop();
  };

  isEmpty() {
    return this.value.length === 0
  };

  isFull() {
    return this.limit != null ? this.value.length >= this.limit : false
  };

  size() {
    return this.value.length
  };

  toString() {
    return `Stack(${this.value.toString()})`
  };
}

/**
 * @description Stack array.
 * @this StackArray
 * @class
 * @public
 * @since 1.0
 * @property {number[]} StackArray.value Values
 * @property {number} StackArray.top Top index
 * @property {function(): *} StackArray.peek Returns the top value
 * @property {function(): *} StackArray.ground Returns the bottom value
 * @property {function(*)} StackArray.push Add items at the top
 * @property {function(): *} StackArray.pop Remove the top item
 * @property {function(): boolean} StackArray.isEmpty Emptiness check
 * @property {function(): boolean} StackArray.isFull Fullness check
 * @property {function(): number} StackArray.size Size
 * @property {function(): string} StackArray.toString String representation
 * @see module:dsa~Stack
 */
class StackArray {
  /**
   * @param {number} sz Array size
   */
  constructor(sz) {
    this.value = new Array(sz);
    /** @default */
    this.top = -1;
  }

  peek() {
    return this.value[this.top]
  };

  ground() {
    return this.value[0];
  };

  /**
   * @throws {Error} Stack overflow
   * @param {*} item Item
   * @returns {undefined}
   */
  push(item) {
    if (this.isFull()) throw new Error('Stack overflow !');
    if (isType(item, 'Array')) {
      for (let el of item) this.push(el);
    } else {
      this.top++;
      this.value[this.top] = item;
    }
  };

  /**
   * @throws {Error} Stack underflow
   * @param {*} item Item
   * @returns {*} Item
   */
  pop(item) {
    if (this.isEmpty()) throw new Error('Stack underflow !');
    if (isType(item, 'Array')) {
      for (let el of item) this.pop(el);
    } else {
      let el = this.peek();
      this.top--;
      return el
    }
  };

  isEmpty() {
    return this.top <= -1
  };

  isFull() {
    return this.top >= this.value.length
  };

  size() {
    return this.top + 1
  };

  toString() {
    return `Stack(${this.value.toString()})`
  };
}

/**
 * @description Stack list
 * @this StackList
 * @class
 * @public
 * @since 1.0
 * @property {number[]} StackList.top Top node
 * @property {function(): *} StackList.peek Returns the top value
 * @property {function(): *} StackList.ground Returns the bottom value
 * @property {function(*)} StackList.push Add items at the top
 * @property {function(): *} StackList.pop Remove the top item
 * @property {function(): boolean} StackList.isEmpty Emptiness check
 * @property {function(): boolean} StackList.isFull Fullness check
 * @property {function(): number} StackList.size Size
 * @property {function(): string} StackList.toString String representation
 * @see module:dsa~Stack
 */
class StackList {
  /**
   * @param {Array|*} [arr] Array or payloads
   */
  constructor(arr) {
    this.top = null;
    if (arr) this.push(arr);
  }

  ground() {
    return (this.isEmpty() || this.top === null) ? null : (this.top.next === null ? this.top.payload : this.top.next.payload);
  };

  peek() {
    return this.top.payload;
  };

  push(item) {
    if (isType(item, 'Array')) {
      for (let el of item) this.push(el);
    } else this.top = new Node(item, this.top);
    return this
  };

  /**
   * @throws {Error} Stack underflow
   * @param {number} [n] Number of pops to do
   * @returns {Node} Item
   */
  pop(n) {
    if (!this.isEmpty()) throw new Error('I can\'t pop from an empty stack list');
    if (n) {
      for(let i = 0; i < n; i++) this.pop();
    } else {
      let el = this.top.payload;
      this.top = this.top.next;
      return el
    }
  };

  isEmpty() {
    return this.top == null
  };

  size() {
    let size = 0, crt = this.top;
    while (crt != null) {
      crt = crt.next;
      size++;
    }
    return size;
  };

  toString() {
    let chain = '', crt = this.top;
    do {
      chain += crt.payload + '->';
      crt = crt.next;
    } while (crt != null);
    return `StackList(${chain})`;
  };
}

/**
 * @description Queue.
 * @param {Array|*} [arr] Array or element
 * @param {?number} [lim=null] Limit
 * @this Queue
 * @class
 * @public
 * @since 1.0
 * @property {number[]} Queue.value Values
 * @property {?number} Queue.limit Limit
 * @property {function(): *} Queue.head Returns the first value
 * @property {function(): *} Queue.tail Returns the last value
 * @property {function(*)} Queue.enqueue Add items at the end
 * @property {function(): *} Queue.dequeue Remove the first item
 * @property {function(): boolean} Queue.isEmpty Emptiness check
 * @property {function(): boolean} Queue.isFull Fullness check
 * @property {function(): number} Queue.size Size
 * @property {function(): string} Queue.toString String representation
 */
class Queue {
  constructor(arr, lim=null) {
    this.value = isType(lim, 'Number') ? new Array(lim) : [];
    this.limit = lim;
    if (arr) this.value.push(arr);
  };

  /**
   * @throws {Error} Queue overflow
   * @param {*} item Item
   * @returns {undefined}
   */
  enqueue(item) {
    if (this.isFull()) throw new Error('Queue overflow !');
    isType(item, 'Array') ? this.value.prepend(item) : this.value.unshift(item);
  };

  /**
   * @throws {Error} Queue underflow
   * @returns {*} Item
   */
  dequeue() {
    if (this.isEmpty()) throw new Error('Queue underflow !');
    let item = this.head();
    this.value.pop();
    return item
  };

  head() {
    return this.value.last()
  };

  tail() {
    return this.value[0]
  };

  isEmpty() {
    return this.value.length === 0
  };

  isFull() {
    return this.limit != null? this.value.length >= this.limit: false
  };

  size() {
    return this.value.length
  };

  toString() {
    return `Queue(head=${this.head()}, tail=${this.tail()}, value=${this.value.toString()})`
  };
}

/**
 * @description Queue array.
 * @this QueueArray
 * @class
 * @since 1.0
 * @see module:dsa~Queue
 * @property {number[]} QueueArray.value Values
 * @property {number} QueueArray.front Front index
 * @property {number} QueueArray.back Back index
 * @property {function(): *} QueueArray.head Returns the first value
 * @property {function(): *} QueueArray.tail Returns the last value
 * @property {function(*)} QueueArray.enqueue Add items at the end
 * @property {function(): *} QueueArray.dequeue Remove the first item
 * @property {function(): boolean} QueueArray.isEmpty Emptiness check
 * @property {function(): boolean} QueueArray.isFull Fullness check
 * @property {function(): number} QueueArray.size Size
 * @property {function(): string} QueueArray.toString String representation
 */
class QueueArray {
  /**
   * @param {Array|*} [arr=[]] Array or element
   */
  constructor(arr=[]) {
    /** @default */
    this.value = arr;
    /** @default */
    this.front = -1;
    /** @default */
    this.back = -1;
  }

  /**
   * @throws {Error} Queue full
   * @param {*} item Item
   * @returns {undefined}
   */
  enqueue(item) {
    if (isType(item, 'Array')) {
      for (let i = 0; i < item.length; i++) this.enqueue(item[i]);
    } else {
      if (this.isFull()) throw new Error('The queue is full');
      if (this.isEmpty()) {
        this.front++;
        this.back++;
        this.value[this.back] = item;
      } else {
        this.back = (this.back + 1) % this.value.length;
        this.value[this.back] = item;
      }
    }
  };

  /**
   * @throws {Error} Queue empty
   * @returns {*} Dequeued element
   */
  dequeue() {
    let val;
    if (this.isEmpty()) throw new Error('I can\'t dequeue from an empty queue');
    if (this.front === this.back) {
      val = this.value[this.front];
      this.front = this.back = -1;
    }else {
      val = this.value[this.front];
      this.front = (this.front + 1) % this.value.length;
    }
    return val
  };

  isEmpty() {
    return this.front === -1 && this.back === -1
  };

  isFull() {
    return this.back>(this.front + 1) % this.value.length
  };

  size() {
    return this.value.length
  };

  toString() {
    return `Queue(front=${this.front}, back=${this.back}, value=${this.value.toString()})`
  };
}

/**
 * @description Queue list.
 * @this QueueList
 * @class
 * @since 1.0
 * @property {number[]} QueueList.value Values
 * @property {?Node} QueueList.front Front node
 * @property {?Node} QueueList.back Back node
 * @property {number} QueueList.len Length of the list
 * @property {function(): *} QueueList.head Returns the first value
 * @property {function(): *} QueueList.tail Returns the last value
 * @property {function(*)} QueueList.enqueue Add items at the end
 * @property {function(): *} QueueList.dequeue Remove the first item
 * @property {function(): boolean} QueueList.isEmpty Emptiness check
 * @property {function(): boolean} QueueList.isFull Fullness check
 * @property {function(): number} QueueList.size Size
 * @property {function(): string} QueueList.toString String representation
 * @property {function(*)} QueueList.remove Node removal
 * @property {function(number, *)} QueueList.insertAt Positional node insertion
 */
class QueueList {
  constructor() {
    this.front = new Node(null);
    this.back = new Node(null);
    this.len = 0;
  }

  enqueue(item) {
    if (isType(item, 'Array')) {
      for (let el of item) this.enqueue(el);
    } else {
      let n = this.back != null ? new Node(item, this.back, null) : new Node(item);
      this.back.prev = n;
      this.back = n;
      this.len++;
    }
    return this
  };

  /**
   * @throws {Error} Queue underflow
   * @returns {?Node} Dequeued node
   */
  dequeue() {
    if (this.isEmpty()) throw new Error('I can\'t dequeue an empty queue list');
    this.front = this.front.prev;
    this.len--;
    return this.front
  };

  isEmpty() {
    return this.len === 0 || this.back === null
  };

  size() {
    return this.len
  };

  toString() {
    let str = '', crt = this.front;
    while (crt != null) {
      str += '<-' + crt.payload;
      crt = crt.prev;
    }
    return str
  };

  remove(pl) {
    let crt = this.front;
    while (crt != null) {
      if (crt.payload != null && (crt.payload == pl || crt.payload.equals(pl))) crt = null;
      crt = crt.next;
    }
  };

  insertAt(i, pl) {
    this.back.next = new Node(pl);
    if (i === 0) this.front = new Node(pl);
    else if (i === this.len) this.back = new Node(pl);
    else if (i > this.len) this.enqueue(pl);
  };
}

/**
 * @description A* algorithm.<br />
 * JS version of: {@link https://en.wikipedia.org/wiki/A*_search_algorithm|wiki's pseudo alg}
 * @param {Vertex} start Starting node
 * @param {Vertex} goal Ending node
 * @param {Vertex[]} grid Grid
 * @returns {?Array} Optimal Path
 * @public
 * @since 1.0
 * @function
 * @throws {InvalidParamError} Not a Vertex object
 * @todo Getting rid of the redundancy
 */
export let A = (start, goal, grid) => {
  if (!isCustomType(start, 'Vertex') || !isCustomType(goal, 'Vertex')) throw new InvalidParamError('The boundary nodes needs to be Vertex objects !');
  /*
   closedSet: The set of nodes already evaluated
   openSet: The set of currently discovered nodes still to be evaluated (where only the start node is known)
   */
  let closedSet = [], openSet = [start], cameFrom = {}, gScore = {}, fScore = {}, current;
  gScore[start] = 0; //cost of going from start to start
  //Heuristic for the start node
  start.f = euclidianDist(start.pos, goal.pos);
  fScore[start] = euclidianDist(start.pos, goal.pos);

  while (!openSet.isEmpty()) {
    //Node in openSet which has the lowest fScore
    current = openSet.filter(node => node.f === openSet.map(node => node.f).min());

    if (current.equals(goal)) return reconPath(cameFrom, current);
    openSet.remove(current);
    closedSet.push(current);

    let currentPos = lookfor(current, grid), tentativeGScore = 0; //position of the current node and the gScore of the path from start to the neighbour
    grid.neighbour(currentPos[0], currentPos[1]).map(function (neighbour) { //Goes through each neighbours of the current neighbour
      //if (closedSet.has(neighbour)) continue;
      tentativeGScore = current.g + manhattanDist(currentPos, neighbour.pos); //Distance from start to a neighbour
      if (!openSet.has(neighbour)) openSet.push(neighbour); //Discover a new neighbour
      //else if (tentativeGScore >= neighbour.g) continue;
      cameFrom[neighbour] = current;
      neighbour.g = gScore[neighbour] = tentativeGScore;
      neighbour.f = fScore[neighbour] = neighbour.g + euclidianDist(neighbour.pos, goal.pos);
    });
  }
  return null;
};

/**
 * @description Path reconstructor.
 * @param {Array} cameFrom List of visited nodes
 * @param {Array} current Current node
 * @returns {Array} Reconstructed path
 * @public
 * @since 1.0
 * @function
 */
export let reconPath = (cameFrom, current) => {
  let totalPath = [current];
  while (current in cameFrom) {
    current = cameFrom[current];
    totalPath.append(current);
  }
  return totalPath;
};

/**
 * @description Iterative Depending A* path finding algorithm.
 * @public
 * @since 1.0
 * @function
 * @see module:dsa~Astar
 * @todo Do it !
 */
export let IDAstar = () => {

};

/**
 * @description Sort alphabetically an string|array.
 * @param {string|Array} x String|array to alphabetically sort
 * @returns {string|Array} Sorted string|array
 * @public
 * @since 1.0
 * @function
 */
export let alphabetSort = (x) => {
  if (!x.isIterable()) throw new TypeError('alphabetSort cannot sort non iterable objects');
  if (isType(x, 'String')) return x.split('').sort((a, b) => a - b).join('');

  let res = x.uniform(), s = true, j = 1;
  while (s) {
    s = false;
    for (let k = 0; k < res.maxLength(); k++) {
      for (let i = 0; i < res.length - j; i++) {
        if (k == 0 && res[i].charAt(k) > res[i + 1].charAt(k)) { //Sort the by the first letter
          [res[i], res[i + 1]] = [res[i + 1], res[i]];
          s = true;
        } else if (res[i].charAt(k - 1) === res[i + 1].charAt(k - 1) && res[i].charAt(k) > res[i + 1].charAt(k)) {
          [res[i], res[i + 1]] = [res[i + 1], res[i]];
          s = true;
        }
      }
      j++;
    }
  }
  return res.trimAll('r')
};

/**
 * @description Sort the array from the most occurring items to the least occurring ones.
 * @param {Array} arr Array to sort
 * @returns {Array} Sorted array <i>(by occurrence obviously)</i>
 * @function
 * @public
 * @since 1.0
 */
export let occurrenceSort = (arr) => {
  let counts = arr.map(x => arr.count(x)), vals = rmDuplicates(arr);
  let lookup = new Map(counts), res = []; //Tablify(counts, vals);
  vals.map(x => lookup.add(arr.count(x), x));
  //lookup.forEach((x, i) => console.log(lookup.keys.get(i), x.toStr(true)), true)
  lookup.forEach(x => res.prepend(x), true);
  return res;
};

/**
 * @description Find if x is in the list.
 * @param {Array} list List
 * @param {*} x Element/term to find
 * @returns {boolean} Found or not
 * @public
 * @since 1.0
 * @todo Make it right
 * @function
 */
export let binarySearch = (list, x) => {
  list.sort((a, b) => a - b);
  let i = 2, term = list[Math.floor(list.length / i)], l = 0;
  while (term != x && i < list.length) {
    if (term === x) return true;
    else {
      i *= 2;
      term = term < x ? list[Math.floor(list.length / i)] : list[3 * Math.floor(list.length / i)];
    }
    l++;
  }
  return term === x
};

/**
 * @description Binary search.<br />
 * Source: {@link https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/implementing-binary-search-of-an-array|KhanAcademy}
 * @param {number[]} arr Array
 * @param {NumberLike} target Target of the search
 * @return {number} Binary index
 * @public
 * @since 1.0
 */
export let search = (arr, target) => {
  let min = 0, max = arr.length - 1, guess = Math.floor((max - min) / 2);
  if (arr[guess] === target) return guess;
  while (arr[guess] != target) {
    if (max < min) return -1;
    (arr[guess] < target) ? min = guess + 1 : max = guess - 1;
    guess = Math.floor((max - min) / 2);
  }
};

/**
 * @description Compressed data using Huffman's approach while differentiating uppercase from lowercase letters.
 * @class
 * @this {Archive}
 * @public
 * @since 1.0
 * @property {string} Archive.name Name of the archive
 * @property {string} Archive.data Data to compress
 * @property {string[]} Archive.dictionary Dictionary (values formatted as: letter=bitcode)
 * @property {Function} Archive.updateDict Update the dictionary
 * @property {function(): Str} Archive.getResult Get the result
 */
class Archive {
  /**
   * @param {string} [name='Archive'] Name of the archive
   * @param {string} [data=''] Data to compress
   */
  constructor(name='Archive', data='') {
    this.name = name;
    this.data = data;
    this.dictionary = [];
    this.result = [];
  }

  updateDict() {
    let lexiq = [], count = [], tmp = alphabetSort(data);
    for (let i = 0; i < this.data.length - 1; i++) {
      if (tmp[i] != tmp[i + 1]) lexiq.push(tmp[i]);
    }
    lexiq = rmDuplicates(lexiq);
    tmp = [];
    for (let i = 0; i < lexiq.length; i++) {
      count[i] = data.count(lexiq[i]);
      //say(`lexiq[${i}]=${lexiq[i]} is present ${timesLiteral(count[i])}`, "inf");
      tmp[i] = lexiq[i] + count[i];
    }

    this.dictionary = occurrenceSort(this.data);

    for (let i = 0; i < this.dictionary.length; i++) this.result[i] = conv(i, 10, 2);
  };

  getResult() {
    this.updateDict();
    let res = this.data;
    for (let i = 0; i < this.data.length; i++) {
      console.log(`${i}//${this.dictionary[this.dictionary.indexOf(this.data[i])]}`);
      res = res.replace(RegExpify(this.dictionary[this.dictionary.indexOf(this.data[i])]), this.result[i]);
    }
    return res;
  };
}

/**
 * @description State history allowing undos and redos on the element while keeping track of the previous and following states.
 * @this {virtualHistory}
 * @class
 * @public
 * @since 1.0
 * @property {*} virtualHistory.src Source
 * @property {*} virtualHistory.DEFAULT_STATE Default state of the source
 * @property {number} virtualHistory.state State number
 * @property {Function} virtualHistory.reset Reset the current state
 * @property {function(*)} virtualHistory.update Update the current state if needed
 * @property {function(*)} virtualHistory.add Add the new state to the list
 * @property {function(number): *} virtualHistory.get Get the i-th state
 * @property {Function} virtualHistory.undo Go the the previous state
 * @property {Function} virtualHistory.redo Go the following state
 * @property {function(): string} virtualHistory.getStates List the states
 * @property {*} virtualHistory.isStateDefault Check if the current state is the default one
 */
class virtualHistory {
  /**
   * @param {*} elm Element
   */
  constructor(elm) {
    this.src = elm;
    this.DEFAULT_STATE = elm;
    this.states = new Set(this.src);
    this.state = 0;
  }

  reset() {
    this.src = this.DEFAULT_STATE;
  };

  update(elm) {
    if (this.src != elm) this.add(elm);
  };

  add(val) {
    if (isType(val, 'Array')) {
      for (let state of val) this.add(state);
    } else {
      this.src = val;
      this.states.add(this.src);
      this.state++;
    }
  };

  get(i) {
    let j = 0;
    for (let item of this.states.values()) {
      if (i === j++) return item;
    }
    return;
  };

  /**
   * @throws {Error} Set underflow
   * @returns {undefined}
   */
  undo() {
    if (this.state === 0) throw new Error('Set underflow, it\'s not possible to undo to a non-existent state.');
    this.state--;
    this.src = this.get(this.state);
  };

  /**
   * @throws {Error} Set overflow
   * @returns {undefined}
   */
  redo() {
    if (this.state === (this.states.size() - 1)) throw new Error('Set overflow, it\'s not possible to redo to a non-existent state.');
    this.state++;
    this.src = this.get(this.state);
  };

  getStates() {
    return this.states.toString()
  };

  isStateDefault() {
    return this.src === this.DEFAULT_STATE
  };
}

/**
 * @description Get the occurrence list.
 * @param {string} list String
 * @returns {{}} Occurring object list
 * @public
 * @since 1.0
 * @throws {TypeError} list must be iterable
 */
export let occurrenceList = (list) => {
  if (!list.isIterable()) throw new TypeError('It must be an iterable object !');
  let nums = list.getOccurrences(true), chars = [], oc = list.getOccurrences(), res = {};
  for (let i = 0; i < oc.length; i++) chars[i] = oc[i].split(':')[0];
  for (let i = 0; i < nums.length; i++) res[chars[i]] = nums[i];
  return res;
};