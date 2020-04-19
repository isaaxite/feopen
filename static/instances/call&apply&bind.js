Function.prototype._call = function(_ctx, ...rest) {
  const ctx = _ctx || window || global;
  // 所有function声明都是new Function的语法糖
  // 因此，this指向Function的实例，即当前调用_call的方法
  ctx.anonymous = this;
  const res = rest.length ? ctx.anonymous(...rest) : ctx.anonymous();
  delete ctx.anonymous;
  return res;
};

Function.prototype._apply = function(_ctx, rest) {
  const ctx = _ctx || window || global;
  ctx.anonymous = this;
  const res = rest.length ? ctx.anonymous(...rest) : ctx.anonymous();
  delete ctx.anonymous;
  return res;
};

Function.prototype._bind = function(_ctx, ...rest) {
  const ctx = _ctx || window || global;
  const anonymous = this;
  return function F(...args) {
    // 如果使用new操作符号this就会指向F实例话的对象
    if (this instanceof F) {
      // 在构造函数内，如果返回非基本数据类型数据，则使用当前返回，否则返回实例
      return new anonymous(...rest, ...args);
    }
    return anonymous.apply(ctx, [...rest, ...args]);
  };
};

function foo() {
  console.log(this.a);
  this.b = 3;
}

const a = { a: 1, b:2 };
const A = foo._bind(a);
const aa = new A();
console.log(aa);




