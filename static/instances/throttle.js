function throttle1(callback, threshold) {
  let prevTime = 0;
  let timer = 0;

  return function(...rest) {
    const now = Date.now();
    if (now - prevTime < threshold) {
      return console.log('无效点击');
    }
    prevTime = now;
    console.log(rest);
    timer = setTimeout(() => {
      clearTimeout(timer);
      console.log(timer);
      callback.apply(this, rest);
    }, threshold);
  }
}

// 使用时间间隔实现
function throttle2(callback, threshold) {
  let prevTime = 0;
  return function(...rest) {
    const now = Date.now();
    if (now - prevTime > threshold) {
      prevTime = now;
      callback.apply(this, rest);
    }
  }
}

// 使用定时器实现
function throttle3(callback, threshold) {
  let timer = null;
  return function(...rest) {
    if (timer) { return ; }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      callback.apply(this, rest);
    }, threshold);
  }
}

const test = throttle3((...rest) => {
  console.log('\n\n', ...rest, '\n\n');
}, 1000);


let count = 50;
const pointer = setInterval(() => {
  count--
  console.log(count)
  if (count) {
    test(count);
  } else {
    clearInterval(pointer);
  }
}, 100);