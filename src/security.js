/**
 * @module security
 * @description Security focused module.
 * @requires module:essence
 * @since 1.0
 */

/**
 * @description Caesar crypting
 * @param {NumberLike} character Character to encrypt
 * @param {number} n Key
 * @returns {string} Cryped character
 * @public
 * @since 1.0
 * @function
 */
export let trans = (character, n) => String.fromCharCode(character.charCodeAt(0) + n);

/**
 * @description Encrypt a text.
 * @param {string} txt Text
 * @param {number} [key] Key
 * @returns {string} Encrypted text
 * @see module:security~decrypt
 * @public
 * @since 1.0
 * @function
 */
export let encrypt = (txt, key) => {
  if (!key) {
    let len = txt.length, extra = 0, mid = Math.floor(len / 2);

    mid = (len % 2 === 0) ? txt.charCodeAt(mid) : (txt.charCodeAt(txt[mid - 1]) + txt.charCodeAt(txt[mid])) / 2;
    if (mid >= 97 && mid <= 122) extra = 2;
    else if (mid >= 65 && mid <= 90) extra = 1;
    else if (mid - Math.floor(mid / 2) * 2 === 0) extra = -1;
    else extra = 2;

    key = Math.round((Math.pow(2, 7) + txt.sum() - 48) / txt.prod()) + extra;
  }
  let res = '';
  for(let character of txt) res += trans(character, key);

  return res
};

/**
 * @description Decrypt a text
 * @param {string} txt Encrypted text
 * @param {number} [key] Key
 * @returns {string} Decrypted text
 * @see module:security~encrypt
 * @public
 * @since 1.0
 * @function
 */
export let decrypt = (txt, key) => {
  let res = '';
  if (key) {
    for (let i = 1; i <= txt.length; i++) res += trans(txt[i - 1], key);
  } else {
    res = new Array(131073); //2 * Math.pow(2, 16) + 1
    for (let i = -65536; i < 65537; i++) {
      res[i + 65536] = '';
      for (let chr of txt) res[i + 65536] += trans(chr, i % 65537);
    }
  }
  if (!key) console.log(console.table(res));
  return key? res: dom.complexTable(`Decryption result for <i>${txt}</i>`, maths.range(-65536, 1, 65536), res, ['Key', 'Result'], `decrypted_${txt}`, false);
};

