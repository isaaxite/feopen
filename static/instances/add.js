function add(a) {
  var fn = function(b) {
      return add( a+b ); //fn返回的是add函数，并将a与b相加的值传递给add
  }
  fn.toString = fn.valueOf = function() {
    console.log(234324);
    return a; // 1为什么返回a?   // 2为什么定义fn.toString而不是add.toString?
  }
  return fn;
}

const t = add(1)(2);
console.log(typeof t);
console.log(t);
