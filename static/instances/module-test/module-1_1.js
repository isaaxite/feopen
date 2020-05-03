
exports.name = 'module1.1';
exports.foo = function() {
  console.log('module-1_1:foo', this);
};

console.log(11, this);
