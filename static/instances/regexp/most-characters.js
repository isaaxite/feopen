function findMostStr(_str) {
  let num = 0;
  let char = '';
  const str = [..._str].sort().join('');
  const regExp = /(\w)\1+/g;
  str.replace(regExp, ($0, $1) => {
    if (num < $0.length) {
      num = $0.length;
      char = $1;
    }
  });
  return { char, num };
}

const { char, num } = findMostStr('abcabcabcbbccccc');
console.log(`字符最多的是${char}，出现了${num}次`);
