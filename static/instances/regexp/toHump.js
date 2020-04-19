function toHump(_str) {
  // 转小写
  let str = _str.toLowerCase();
  str = str.replace(/(_\w)/g, ($0) => {
    return $0.slice(1).toUpperCase();
  });
  return str;
}

const str = toHump('SSS_asd_EDF');
console.log(str);
