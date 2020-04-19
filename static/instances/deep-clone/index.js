const clone = require('./deep-copy');

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
  e: new Set([1, 2, 3]),
  f: Symbol.for('f'),
  g: new WeakSet([[1], [2], [3, 4]]),
};
oldObj.b = oldObj;

const newObj = clone(oldObj);
console.log(oldObj, newObj);
