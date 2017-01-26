/**
 * @module security
 * @description Security focused module.
 * @requires module:essence
 * @since 1.0
 */
import {isType, say} from './essence';
import {InvalidParamError} from './qtest';
import {range, bruteForceNum, getStep, abcModulus, gcd, isPrime, clamp} from './maths';
let fs = require('fs'), rsa = require('ursa');

/**
 * @description Caesar crypting
 * @param {NumberLike} character Character to encrypt
 * @param {number} n Key
 * @returns {string} Crypted character
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
  return key? res: dom.complexTable(`Decryption result for <i>${txt}</i>`, range(-65536, 1, 65536), res, ['Key', 'Result'], `decrypted_${txt}`, false);
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
  if (isType(txt, 'String') || isType(txt, 'Array')) {
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
    return isType(txt, 'String') ? code.join('') : code
  }
  throw new InvalidParamError('The parameter of abcEncode must be a string or an array.');
};

/**
 * @description Alphabetically decode from hexadecimal to lowercase text.
 * @param {string} txt Hexadecimal code
 * @returns {string} Alphabetical text
 * @see module:security~abcEncode
 * @since 1.0
 * @function
 */
export let abcDecode = (txt) => {
  let code = new Array(txt.length);
  if (isType(txt, 'String') || isType(txt, 'Array')) {
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
    return isType(txt, 'String') ? code.join('') : code
  }
  return InvalidParamError('The parameter of abcDecode must be a string or an array.');
};

/**
 * @description Data encryption
 * @param {Str} data Data
 * @returns {Str} Encrypted data
 * @public
 * @since 1.0
 * @function
 * @see module:security~ilDecrypt
 */
export let ilEncrypt = (data) => {
  let res = isType(data, 'String') ? data.split('') : data;
  for (let i = 0; i < res.length; i++) res[i] = String.fromCharCode(data[i].charCodeAt(0) + data.length * 2);
  return isType(data, 'String') ? res.join('') : res;
};

/**
 * @description Data decryption
 * @param {Str} data Data
 * @returns {Str} Decrypted data
 * @public
 * @since 1.0
 * @function
 * @see module:security~ilEncrypt
 */
export let ilDecrypt = (data) => {
  let res = isType(data, 'String') ? data.split('') : data;
  for (let i = 0; i < res.length; i++) res[i] = String.fromCharCode(data[i].charCodeAt(0) - data.length * 2);
  return isType(data, 'String') ? res.join('') : res;
};

/**
 * @description RSA algorithm keys computation
 * @param {number} [p=23] Number #1
 * @param {number} [q=29] Number #2
 * @param {boolean} [safe=false] Safety flag for returning the private key
 * @returns {number[]} Public key
 * @see module:Security~cryptRSA
 * @since 1.0
 * @function
 * @throws {Error} Either p or q isn't a prime number
 */
export let computeRSA = (p, q, safe=false) => {
  if (!Array.from(arguments).length) {
    p = bruteForceNum('isPrime(x)', 23, 99);
    q = bruteForceNum(`isPrime(x) && x!=${p}`, 23, 99);
  }
  if (!isPrime(p)) throw new Error(`p=${p}; isn't a prime number !!`);
  if (!isPrime(q)) throw new Error(`q=${q}; isn't a prime number !!`);
  if (p < 20 || q < 20) say('p/q should be bigger !', 'warn');
  let n = p * q, z = (p - 1) * (q - 1), e = bruteForceNum(`1<x<${n} && gcd(x, ${z})==1`, 2, n + 1), d; //1 < end < n & gcd(end, z) = 1
  d = bruteForceNum(`(x*${e})%${z}==1`, 0, n); //other possible condition: `x*${e}==1+k{z}`, n);

  say([n, d]); //Private key
  return safe ? [[n, d], [n, e]] : [n, e]; //Public key
};

/**
 * @description Encrypt text using an RSA public key from a file
 * @param {string} text Text to encrypt
 * @param {string} file Filename where the RSA public key is
 * @public
 * @since 1.0
 * @returns {*} Encrypted text
 * @see module:security~decryptRSAFromFile
 */
export let encryptRSAFromFile = (text, file) => {
  return rsa.createPublicKey(fs.readFileSync(file)).encrypt(text, 'utf8', 'base64');
};

/**
 * @description Decrypt text using an RSA private key from a file
 * @param {string} text Text to decrypt
 * @param {string} file Filename where the RSA private key is
 * @public
 * @since 1.0
 * @returns {*} Decrypted text
 * @see module:security~encryptRSAFromFile
 */
export let decryptRSAFromFile = (text, file) => {
  return rsa.createPrivateKey(fs.readFileSync(file)).decrypt(text, 'utf8', 'base64');
};

/**
 * @description Encrypt text using an RSA public key from a file
 * @param {string} text Text to encrypt
 * @param {number} p First prime number
 * @param {number} q Second prime number
 * @public
 * @since 1.0
 * @returns {*} Encrypted text
 * @see module:security~decryptRSA
 */
export let encryptRSA = (text, p, q) => {
  let n = p * q, z = (p - 1) * (q - 1), e = bruteForceNum(`1<x<${n} && gcd(x, ${z})==1`, 2, n + 1);
  return rsa.createPublicKey(z, e).encrypt(text);
};

/**
 * @description Decrypt text using an RSA private key from a file
 * @param {string} text Text to decrypt
 * @param {number} p First prime number
 * @param {number} q Second prime number
 * @public
 * @since 1.0
 * @returns {*} Decrypted text
 * @see module:security~encryptRSA
 */
export let decryptRSA = (text, p, q) => {
  let n = p * q, z = (p - 1) * (q - 1), e = bruteForceNum(`1<x<${n} && gcd(x, ${z})==1`, 2, n + 1), d = bruteForceNum(`(x*${e})%${z}==1`, 0, n);
  return rsa.createPrivateKeyFromComponents(z, e, p, q, d * p, d * q, 1 / q, d).decrypt(text);
};

/**
 * @description Generate a password.
 * @returns {string} Password
 * @see module:security~genHash
 * @public
 * @since 1.0
 * @function
 */
export let genPassword = () => {
  let chars = [], sym = ['&', '~', '"', '#', '\'', '{', '[', '(', '-', '|', '`', '_', '\\', '^', '@', ')', ']', '+', '=', '}', '%', '*', '?', ',', ';', '.', '/', ':', '!', ' ', ''], word = '';
  for (let i = 65; i < 123; i++) {
    if (i <= 90 || i >= 97) chars[i - 65] = String.fromCharCode(i);
  }
  chars = chars.concat(sym, range(9)).remove();
  while (word.length < 20) word += chars.rand();
  if (word.length < 20) word += chars.rand();
  return word
};

/**
 * @description Hash a word (might deprecate genHash())
 * @param {string} word Word
 * @return {Str} hash
 * @public
 * @since 1.1
 * @function
 */
export let hash = (word) => {
  let s = getStep(word.split('').map((x) => x.charCodeAt(0)).min(), word.split('').map((x) => x.charCodeAt(0)).max()), w = word.split('');
  let p = w.even().concat(w.odd()).join('').map((c) => String.fromCharCode(abcModulus(c.charCodeAt(0) + s)));
  return toFSHA(p.split('').portion(2).concat(p.split('').portion(-2)).join(''));
};

/**
 * @description String/array to Fake SHA hash.
 * @param {Str} str String/array
 * @return {Str} Fake SHA hash
 * @public
 * @function
 * @since 1.1
 */
export let toFSHA = (str) => str.map((c) => /[A-Za-z]/.test(c) ? c : c.charCodeAt(0));

/**
 * @description Data Encryption Standard algorithm.
 * @param {Str} text Plaintext
 * @param {NumberLike[]} keys Key list of sub-keys
 * @returns {Array|string} DES cipher
 * @public
 * @since 1.1
 * @function
 */
export let DES = (text, keys) => {
  let left = text.portion(2, -1), right = text.portion(2, 1);
  for (let i = 1; i < 16; i++) {
    left[i] = right[i - 1];
    /*right[i] = isType(left[i - 1], 'String')
      ? left[i - 1].charCodeAt(0) ^ trans(right[i - 1].charCodeAt(0), (isType(keys[i - 1], 'String') ? keys[i - 1].charCodeAt(0) : keys[i - 1]))
      : left[i - 1] ^ trans(right[i - 1], (isType(keys[i - 1], 'String') ? keys[i - 1].charCodeAt(0): keys[i - 1]));*/ //Or keys[i] instead of keys[i - 1]
    right[i] = String.fromCharCode(left.charCodeAt(i - 1) ^ trans(right[i - 1], keys[i]).charCodeAt(0));
  }
  return left.concat(right);
};

/**
 * @description Password checker (might be worth using password-checker).<br />
 * Inspired from {@link http://www.passwordmeter.com}.
 * @param {String} password Password to check
 * @param {boolean} [realScore=false] Flag indicating that the user only wants a real un-clamped score
 * @returns {(number|String[])} Score of the password
 * @since 1.1
 * @function
 */
export let checkPassword = (password, realScore) => {
  /*
   Type	Pool of Characters Possible
   Lowercase	26
   Lower & Upper Case	52
   Alphanumeric	36
   Alphanumeric & Upper Case	62
   Common ASCII Characters	30
   Diceware Words List	7,776
   English Dictionary Words	171,000

   Entropy: log(x, 2) where x is the pool of character used
   Score: password.length * log(x, 2) bits
   */
  let score = 0, uppercase = 0, lowercase = 0, num = 0, symbol = 0, midChar = 0, uniqueChar = 0, repChar = 0, repInc = 0, consecUppercase = 0, consecLowercase = 0, consecNum=0, seqAlpha=0, seqNum=0, seqSymbol=0, reqChar = 0;
  let multMidChar = 2, multiConsecUppercase = 2, multConsecLowercase = 2, multiConsecNum = 2, multiSeqAlpha = 3, multiSeqNum = 3, multiSeqSymbol = 3, multLength = 4, multNum = 4, nMultSymbol = 6;
  let tmpUppercase = '', tmpLowercase = '', tmpNum = '', minPwLen = 8;
  let alpha = 'abcdefghijklmnopqrstuvwxyz', numbers = '01234567890', symbols = ')!@#$%^&*()';
  score = parseInt(password.length * multLength);
  let pwArr = password.replace(/\s+/g, '').split(/\s*/);

  /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
  for (let i = 0; i < pwArr.length; i++) {
    if (pwArr[i].match(/[A-Z]/g)) {
      if (tmpUppercase !== '' && (tmpUppercase + 1) === i) consecUppercase++;
      tmpUppercase = i;
      uppercase++;
    } else if (pwArr[i].match(/[a-z]/g)) {
      if (tmpLowercase !== '' && (tmpLowercase + 1) === i) consecLowercase++;
      tmpLowercase = i;
      lowercase++;
    } else if (pwArr[i].match(/[0-9]/g)) {
      if (i > 0 && i < (pwArr.length - 1)) midChar++;
      if (tmpNum !== '' && (tmpNum + 1) === i) consecNum++;
      tmpNum = i;
      num++;
    } else if (pwArr[i].match(/[^a-zA-Z0-9_]/g)) {
      if (i > 0 && i < (pwArr.length - 1)) midChar++;
      symbol++;
    }
    //Repetition check
    let bCharExists = false;
    for (let j = 0; j < pwArr.length; j++) {
      if (pwArr[i] === pwArr[j] && i != j) { //Repetition present
        bCharExists = true;
        /*
         Calculate increment deduction based on proximity to identical characters
         Deduction is incremented each time a new match is discovered
         Deduction amount is based on total password length divided by the
         difference of distance between currently selected match
         */
        repInc += Math.abs(pwArr.length / (j - i));
      }
    }
    if (bCharExists) {
      repChar++;
      uniqueChar = pwArr.length - repChar;
      repInc = uniqueChar ? Math.ceil(repInc / uniqueChar) : Math.ceil(repInc);
    }
  }

  //Check for sequential alpha string patterns (forward and reverse)
  for (let s = 0; s < 23; s++) {
    let sFwd = alpha.substring(s,parseInt(s + 3));
    let sRev = sFwd.reverse();
    if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqAlpha++;
  }

  //Check for sequential numeric string patterns (forward and reverse)
  for (let s = 0; s < 8; s++) {
    let sFwd = numbers.substring(s, parseInt(s + 3));
    let sRev = sFwd.reverse();
    if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqNum++;
  }

  //Check for sequential symbol string patterns (forward and reverse)
  for (let s = 0; s < 8; s++) {
    let sFwd = symbols.substring(s, parseInt(s + 3));
    let sRev = sFwd.reverse();
    if (password.toLowerCase().has(sFwd) || password.toLowerCase().has(sRev)) seqSymbol++;
  }

  //Modify overall score value based on usage vs requirements
  //General point assignment
  if (uppercase > 0 && uppercase < password.length) score = parseInt(score + ((password.length - uppercase) * 2));
  if (lowercase > 0 && lowercase < password.length) score = parseInt(score + ((password.length - lowercase) * 2));
  if (num > 0 && num < password.length) score = parseInt(score + (num * multNum));
  if (symbol > 0) score = parseInt(score + (symbol * nMultSymbol));
  if (midChar > 0) score = parseInt(score + (midChar * multMidChar));

  //Point deductions for poor practices
  if ((lowercase > 0 || uppercase > 0) && symbol === 0 && num === 0) score = parseInt(score - password.length); //Only Letters
  if (lowercase === 0 && uppercase === 0 && symbol === 0 && num > 0) score = parseInt(score - password.length); //Only Numbers
  if (repChar > 0) score = parseInt(score - repInc); //Same character exists more than once
  if (consecUppercase > 0) score = parseInt(score - (consecUppercase * multiConsecUppercase)); //Consecutive Uppercase Letters exist
  if (consecLowercase > 0) score = parseInt(score - (consecLowercase * multConsecLowercase)); //Consecutive Lowercase Letters exist
  if (consecNum > 0) score = parseInt(score - (consecNum * multiConsecNum)); //Consecutive Numbers exist
  if (seqAlpha > 0) score = parseInt(score - (seqAlpha * multiSeqAlpha)); //Sequential alpha strings exist (3 characters or more)
  if (seqNum > 0) score = parseInt(score - (seqNum * multiSeqNum)); //Sequential numeric strings exist (3 characters or more)
  if (seqSymbol > 0) score = parseInt(score - (seqSymbol * multiSeqSymbol)); //Sequential symbol strings exist (3 characters or more)

  //Determine if mandatory requirements have been met and set image indicators accordingly
  let arrChars = [password.length, uppercase, lowercase, num, symbol];
  let arrCharsIds = ['nLength', 'nAlphaUC', 'nAlphaLC', 'nNumber', 'nSymbol'];
  for (let c of arrChars) {
    let minVal = c === 'nLength' ? parseInt(minPwLen - 1) : 0;
    if (c === parseInt(minVal + 1) || c > parseInt(minVal + 1)) reqChar++;

  }

  let minReqChars = password.length >= minPwLen ? 3 : 4;
  if (reqChar > minReqChars) score = parseInt(score + (reqChar * 2)); //One or more required characters exist

  //Determine complexity based on overall score
  if (!realScore) score = clamp(score, 0, 100);
  let complexity;

  if (score < 0) complexity = 'Really weak';
  else if (score >= 0 && score < 20) complexity = 'Very weak';
  else if (score >= 20 && score < 40) complexity = 'Weak';
  else if (score >= 40 && score < 60) complexity = 'Good';
  else if (score >= 60 && score < 80) complexity = 'Strong';
  else if (score >= 80 && score <= 100) complexity = 'Very strong';
  else if (score > 100) complexity = 'Really strong';
  else complexity = 'Too short';
  return realScore ? score : [`${score}%`, complexity];
};