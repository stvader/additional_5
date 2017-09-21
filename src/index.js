module.exports = function check(str, bracketsConfig) {
  let reg = /\(\)/;

  let rez = str.match(reg);
  if (rez === str) return true;
  return false;
}
