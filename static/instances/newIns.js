function newInsOf(ctor, ...rest) {
  const ins = new Object();
  Object.setPrototypeOf(ins, ctor.prototype);
  const res = ctor.apply(ins, rest);
  // 若结果是引用类型，则直接应用结果
  return res instanceof Object ? res : ins;
}

function Coder(name, age) {
  this.name = name;
  this.age = age;
  return new String(1);
}

Coder.prototype.print = function() {
  console.log(this.name, this.age);
}

const ins = newInsOf(Coder, 'isaac', 26);
console.log(ins);

const ins2 = new Coder('frank', 26);
console.log(ins2);
