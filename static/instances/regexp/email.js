function isEmail(email) {
  const regExp = new RegExp('^[\w\-]+@[\w\-]+\.[\w\-]+$');
  // const regExp = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regExp.test(email);
}

console.log(isEmail('isaacgun@outlook.com'));
