const ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function toBase62(num) {
  if (num === 0) return ALPHABET[0];
  let str = '';
  while (num > 0) {
    str = ALPHABET[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
}

function fromBase62(str) {
  let num = 0;
  for (const char of str) {
    const index = ALPHABET.indexOf(char);
    if (index === -1) return null;
    num = num * 62 + index;
  }
  return num;
}

module.exports = { toBase62, fromBase62 };
