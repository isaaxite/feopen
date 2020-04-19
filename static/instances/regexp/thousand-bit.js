function parseToMoney(num) {
  // num = parseFloat(num.toFixed(3));
  // console.log(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  console.log(integer);
  integer = integer.replace(/\d(?=(\d{3})+$)/g, (...rest) => {
    return `${rest[0]},`;
  });
  return decimal
    ? [integer, decimal].join('.')
    : integer;
}

// 保留三位小数
// const t1 = parseToMoney(1234.56); // return '1,234.56'
// console.log({ t1 });
const t2 = parseToMoney(12345678.1); // return '123,456,789'
console.log({ t2 });
// const t3 = parseToMoney(1087654.321); // return '1,087,654.321'
// console.log({ t3 });