/**
 * @module dsa
 * @description Data Structure & Algorithms.
 * @requires module:essence
 * @since 1.0
 */
import {END_OF_SEQUENCE}  from './data';
import {isNon, isNativeType, say} from './essence';
import {range} from './maths';

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
