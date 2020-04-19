// 使用定时器实现
function debounce1(callback, threshold) {
  let timer = null;
  return function(...rest) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, rest);
    }, threshold);
  }
}
