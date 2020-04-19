/**
 * 1. 无法克隆 Date
 * 2, 无法克隆 RegExp
 * 3. 无法复制函数
 * 4. 解决循环引用
 * 
 * RegExp 对象属性
 * global：RegExp 对象是否具有标志 g。	
 * ignoreCase：RegExp 对象是否具有标志 i。	
 * lastIndex：一个整数，标示开始下一次匹配的字符位置。	
 * multiline：RegExp 对象是否具有标志 m。
 * source：正则表达式的源文本。
 * 
 * @param {*} parent 
 */
function deepCopy(parent) {
  const parents = [];
  const childs = [];
  const isBaseType = (val) => !(val instanceof Object);
  const toString = (val) => Object.prototype.toString.call(val);
  const isArray = (val) => toString(val) === '[object Array]';
  const isDate = (val) => toString(val) === '[object Date]';
  const isRegExp = (val) => toString(val) === '[object RegExp]';
  const isSet = (val) => toString(val) === '[object Set]';
  const isWeakSet = (val) => toString(val) === '[object WeakSet]';
  const isMap = (val) => toString(val) === '[object Map]';
  const isWeakMap = (val) => toString(val) === '[object WeakMap]';
  const getRegExpFlags = (regExp) => {
    const flags = [];
    if (regExp.global) flags.push('g');
    if (regExp.ignoreCase) flags.push('i');
    if (regExp.multiline) flags.push('m');
    return flags.join('');
  };

  const _deepCopy = (parent) => {
    if (isBaseType(parent)) return parent;
    let child;
    let proto;
    if (isArray(parent)) {
      child = [];
    } else if (isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (isRegExp(parent)) {
      child = new RegExp(parent.source, getRegExpFlags(parent));
      if (parents.lastIndex) {
        child.lastIndex = parent.lastIndex;
      }
    } else if (isSet(parent)) {
      child = new Set();
    } else if (isWeakSet(parent)) {
      child = new WeakSet();
    } else if (isMap(parent)) {
      child = new Map();
    } else if (isWeakMap(parent)) {
      child = new WeakMap();
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    const idx = parents.indexOf(parent);
    if (idx > -1) {
      return childs[idx];
    }
    parents.push(parent);
    childs.push(child);

    if (isSet(parent) || isWeakSet(parent)) {
      console.log(parent);
      parent.forEach((val) => {
        child.add(_deepCopy(val));
      });
    } else if (isMap(parent) || isWeakMap(parent)) {
      parent.forEach(({ key, value }) => {
        child.set(key, _deepCopy(value));
      });
    } else {
      Object.entries(parent).forEach(([key, val]) => {
        child[key] = _deepCopy(val);
      });
    }
    return child;
  };

  return _deepCopy(parent);
}

module.exports = deepCopy;
