function instanceOf (ins, target) {
  const isBaseType = (val) => {
    if (
      (!val && typeof val === 'object')
      || ['number', 'undefined', 'boolean', 'string', 'symbol'].includes(typeof val)
    ) {
      return true;
    }
    return false;
  } 
  if (isBaseType(ins)) return false;
  let proto = Object.getPrototypeOf(ins);
  const targetProto = target.prototype;
  while(proto) {
    if (proto === targetProto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false;
}

console.log(instanceOf(Symbol.for('asdasd'), Object));
