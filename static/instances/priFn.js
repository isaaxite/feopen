function Foo(cb) {
  this.yes = 'yes!';
  const sayYes = () => {
    console.log(this);
    console.log(`AMD ${this.yes}`);
  }
  sayYes();
  cb(sayYes);
}

new Foo(function(say) {
  say();
});
