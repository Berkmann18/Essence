"use strict";

/**
 * @module essence
 * @description Core module of the framework
 * @typedef {(number|string)} NumberLike
 * @typedef {(number|number[])} Nums
 * @typedef {(string|string[])} Str
 * @typedef {(number|boolean)} Bool
 * @typedef {(Array|Object|string)} Iterable
 * @typedef {(Array|Object)} Dict
 * @typedef {(XML|string)} Code
 * @typedef {(Node|TreeNode|NTreeNode|Vertex)} Node
 */


//AirBnB suggestion
//usage: has.call(object, key)
const has = Object.prototype.hasOwnProperty;

//obj.toArray() => Array.from(obj)
/*
 Array.linearise:
 const flat = {};
 [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
 const flatten = memo.concat(item);
 flat[index] = flatten;
 return flatten;
 });
 */

//NodeJS suggestion !a.length instead of a.isEmpty()