const md1_1 = require('./module-1_1');

module.exports = {
  bar() {
    md1_1.foo();
    console.log('module-1:bar', this);
  }
};