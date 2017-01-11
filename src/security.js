/**
 * @module security
 * @description Security focused module.
 * @requires module:essence
 * @since 1.0
 */
import * as essence from './essence';
import * as qtest from './qtest';

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

/**
 * @description Alphabetically encode (regardless of the case) to hexadecimal.
 * @param {string} txt Text
 * @returns {string} Encoded text
 * @see module:security~abcDecode
 * @public
 * @since 1.0
 * @function
 */
export let abcEncode = (txt) => {
  let code = new Array(txt.length);
  if (essence.isType(txt, 'String') || essence.isType(txt, 'Array')) {
    for (let i in txt) {
      if (txt.hasOwnProperty(i)) {
        switch (txt[i]) {
          case ' ': code[i] = '00';break;
          case 'a': code[i] = '01';break;
          case 'b': code[i] = '02';break;
          case 'c': code[i] = '03';break;
          case 'd': code[i] = '04';break;
          case 'e': code[i] = '05';break;
          case 'f': code[i] = '06';break;
          case 'g': code[i] = '07';break;
          case 'h': code[i] = '08';break;
          case 'i': code[i] = '09';break;
          case 'j': code[i] = '10';break;
          case 'k': code[i] = '11';break;
          case 'l': code[i] = '12';break;
          case 'm': code[i] = '13';break;
          case 'n': code[i] = '14';break;
          case 'o': code[i] = '15';break;
          case 'p': code[i] = '16';break;
          case 'q': code[i] = '17';break;
          case 'r': code[i] = '18';break;
          case 's': code[i] = '19';break;
          case 't': code[i] = '20';break;
          case 'u': code[i] = '21';break;
          case 'v': code[i] = '22';break;
          case 'w': code[i] = '23';break;
          case 'x': code[i] = '24';break;
          case 'y': code[i] = '25';break;
          case 'z': code[i] = '26';break;
          case '.': code[i] = '27';break;
          case ',': code[i] = '28';break;
          case '!': code[i] = '29';break;
          case '?': code[i] = '30';break;
          case '(': code[i] = '31';break;
          case ')': code[i] = '32';break;
          case ':':code[i] = '33';break;
          case ';': code[i] = '34';break;
          case '@': code[i] = '35';break;
          case '~': code[i] = '36';break;
          case '\'': code[i] = '37';break;
          case '#': code[i] = '38';break;
          case '{': code[i] = '39';break;
          case '}': code[i] = '40';break;
          case '-': code[i] = '41';break;
          case '\\': code[i] = '42';break;
          case '/': code[i] = '43';break;
          case '£': code[i] = '44';break;
          case '$': code[i] = '45';break;
          case '€': code[i] = '46';break;
          case '+': code[i] = '47';break;
          case '*': code[i] = '48';break;
          case '%': code[i] = '49';break;
          case '^': code[i] = '50';break;
          case '°': code[i] = '51';break;
          case 'A': code[i] = '52';break;
          case 'B': code[i] = '53';break;
          case 'C': code[i] = '54';break;
          case 'D': code[i] = '55';break;
          case 'E': code[i] = '56';break;
          case 'F': code[i] = '57';break;
          case 'G': code[i] = '58';break;
          case 'H': code[i] = '59';break;
          case 'I': code[i] = '60';break;
          case 'J': code[i] = '61';break;
          case 'K': code[i] = '62';break;
          case 'L': code[i] = '63';break;
          case 'M': code[i] = '64';break;
          case 'N': code[i] = '65';break;
          case 'O': code[i] = '66';break;
          case 'P': code[i] = '67';break;
          case 'Q': code[i] = '68';break;
          case 'R': code[i] = '69';break;
          case 'S': code[i] = '70';break;
          case 'T': code[i] = '71';break;
          case 'U': code[i] = '72';break;
          case 'V': code[i] = '73';break;
          case 'W': code[i] = '74';break;
          case 'X': code[i] = '75';break;
          case 'Y': code[i] = '76';break;
          case 'Z': code[i] = '77';break;
          default: code[i] = 'x';
        }
      }
    }
    return essence.isType(txt, 'String') ? code.join('') : code
  }
  throw new qtest.InvalidParamError('The parameter of abcEncode must be a string or an array.');
};

/**
 * @description Alphabetically decode from hexadecimal to lowercase text.
 * @param {string} txt Hexadecimal code
 * @returns {string} Alphabetical text
 * @see module:Security~abcEncode
 * @since 1.0
 * @func
 */
export let abcDecode = (txt) => {
  let code = new Array(txt.length);
  if (essence.isType(txt, 'String') || essence.isType(txt, 'Array')) {
    for (let i = 0; i < txt.length; i += 2) {
      switch (txt.get(i, i + 2)) {
        case '00': code[i] = ' ';break;
        case '01': code[i] = 'a';break;
        case '02': code[i] = 'b';break;
        case '03': code[i] = 'c';break;
        case '04': code[i] = 'd';break;
        case '05': code[i] = 'e';break;
        case '06': code[i] = 'f';break;
        case '07': code[i] = 'g';break;
        case '08': code[i] = 'h';break;
        case '09': code[i] = 'i';break;
        case '10': code[i] = 'j';break;
        case '11': code[i] = 'k';break;
        case '12': code[i] = 'l';break;
        case '13': code[i] = 'm';break;
        case '14': code[i] = 'n';break;
        case '15': code[i] = 'o';break;
        case '16': code[i] = 'p';break;
        case '17': code[i] = 'q';break;
        case '18': code[i] = 'r';break;
        case '19': code[i] = 's';break;
        case '20': code[i] = 't';break;
        case '21': code[i] = 'u';break;
        case '22': code[i] = 'v';break;
        case '23': code[i] = 'w';break;
        case '24': code[i] = 'x';break;
        case '25': code[i] = 'y';break;
        case '26': code[i] = 'z';break;
        case '27': code[i] = '.';break;
        case '28': code[i] = ',';break;
        case '29': code[i] = '!';break;
        case '30': code[i] = '?';break;
        case '31': code[i] = '(';break;
        case '32': code[i] = ')';break;
        case '33': code[i] = ':';break;
        case '34': code[i] = ';';break;
        case '35': code[i] = '@';break;
        case '36': code[i] = '~';break;
        case '37': code[i] = '\'';break;
        case '38': code[i] = '#';break;
        case '39': code[i] = '{';break;
        case '40': code[i] = '}';break;
        case '41': code[i] = '-';break;
        case '42': code[i] = '\\';break;
        case '43': code[i] = '/';break;
        case '44': code[i] = '£';break;
        case '45': code[i] = '$';break;
        case '46': code[i] = '€';break;
        case '47': code[i] = '+';break;
        case '48': code[i] = '*';break;
        case '49': code[i] = '%';break;
        case '50': code[i] = '^';break;
        case '51': code[i] = '°';break;
        case '52': code[i] = 'A';break;
        case '53': code[i] = 'B';break;
        case '54': code[i] = 'C';break;
        case '55': code[i] = 'D';break;
        case '56': code[i] = 'E';break;
        case '57': code[i] = 'F';break;
        case '58': code[i] = 'G';break;
        case '59': code[i] = 'H';break;
        case '60': code[i] = 'I';break;
        case '61': code[i] = 'J';break;
        case '62': code[i] = 'K';break;
        case '63': code[i] = 'L';break;
        case '64': code[i] = 'M';break;
        case '65': code[i] = 'N';break;
        case '66': code[i] = 'O';break;
        case '67': code[i] = 'P';break;
        case '68': code[i] = 'Q';break;
        case '69': code[i] = 'R';break;
        case '70': code[i] = 'S';break;
        case '71': code[i] = 'T';break;
        case '72': code[i] = 'U';break;
        case '73': code[i] = 'V';break;
        case '74': code[i] = 'W';break;
        case '75': code[i] = 'X';break;
        case '76': code[i] = 'Y';break;
        case '77': code[i] = 'Z';break;
        default: code[i] = 0;
      }
    }
    return essence.isType(txt, 'String') ? code.join('') : code
  }
  return qtest.InvalidParamError('The parameter of abcDecode must be a string or an array.');
};