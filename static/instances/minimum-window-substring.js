var minWindow = function(s, t) {
  if (t.length > s.length) return '';
  let left = 0;
  let right = 0;
  let match = 0;
  const window = {};
  const needs = genStrMap(t);
  const needLen = Object.keys(needs).length;
  let res = s;

  while (right < s.length) {
    const str1 = s[right];
    if (needs[str1]) {
      inc(window, str1);
      if (window[str1] === needs[str1]) match++;
    }
    right++;

    while (match === needLen) {
      // 更新结果
      // 注意：在满足匹配条件后又执行了一次right++，所以right已经只想下一个idx
      // 即[left, right) => len = right - left
      res = updateRes(res, s, left, right);
      // 移动left指针缩小字符串
      let str2 = s[left];
      if (needs[str2]) {
        des(window, str2);
        if (window[str2] < needs[str2]) match--;
      }
      left++;
    }
  }
  return left > 0 ? res : '';
};

function updateRes(res, origin, start, end) {
  // [start, end)
  let newRes = res;
  const newLen = end - start;
  if (newLen < res.length) {
    newRes = origin.slice(start, end);
  }
  return newRes;
}

function genStrMap(str) {
  const obj = {};
  for (const char of str) {
    inc(obj, char);
  }
  return obj;
}

function inc(obj, str) {
  if (!obj[str]) {
    obj[str] = 0;
  }
  obj[str] += 1;
}

function des(obj, str) {
  if (!obj[str]) {
    obj[str] = 1;
  }
  obj[str] -= 1;
}

const res = minWindow(
  "ADOBECODEBANC",
  "ADOB"
);

console.log({
  output: res,
  except: "BANC"
});
