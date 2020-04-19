/**
 * 1. 处理Array
 * 2. 处理Object
 * 3. 处理Date
 * 4. 处理RegExp
 * 5. 处理循环引用
 */
function deepClone(origin) {
  const parents = [];
  const childs = [];
  const toString = Object.prototype.toString;
  const isArray = (val) => toString.call(val) === '[object Array]';
  const isRegExp = (val) => toString.call(val) === '[object RegExp]';
  const isDate = (val) => toString.call(val) === '[object Date]';
  const hasOwned = (target, val) => Object.hasOwnProperty.call(target, val);
  const getRegExpFlags = re => {
    const flags = [];
    if (re.global) flags.push('g');
    if (re.ignoreCase) flags.push('i');
    if (re.multiline) flags.push('m');
    return flags.join('');
  };

  const _clone = (_origin) => {
    let cloned;
    let proto;

    if (isArray(_origin)) {
      cloned = [];
    } else if (isDate(_origin)) {
      cloned = new Date(_origin.getTime());
    } else if (isRegExp(_origin)) {
      cloned = new RegExp(_origin.source, getRegExpFlags(_origin));
      // todo: 不知道是什么意思
      if (_origin.lastIndex) cloned.lastIndex = _origin.lastIndex;
    } else {
      proto = Object.getPrototypeOf(_origin);
      cloned = Object.create(proto);
    }

    const parentIdx = parents.indexOf(_origin);
    if (parentIdx > -1) {
      return childs[parentIdx];
    }

    parents.push(_origin);
    childs.push(cloned);

    for (let key in _origin) {
      const value = _origin[key];
      if (hasOwned(_origin, key)) {
        cloned[key] = _clone(value);
      }
    }
    return cloned;
  };
  return _clone(origin);
}

function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
};

oldObj.b = oldObj;

let bb;
const aa = deepClone(oldObj);
try {
  bb = JSON.parse(JSON.stringify(oldObj));
} catch (error) {
  bb = {};
}
console.log(aa, bb);