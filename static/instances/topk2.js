let count = 0;
const log = (...rest) => count-- > 0 && console.log(...rest);
function partition(arr, low, high) {
  const left = [];
  const right = [];
  for (let i = low + 1; i <= high; i += 1) {
    arr[i] >= arr[low]
      ? left.push(arr[i]) 
      : right.push(arr[i]) 
  }
  const newArr = [...left, arr[low], ...right];
  arr.splice(low, newArr.length, ...newArr);
  log(low, arr[low], newArr, arr);
  return low + left.length;
}

function rs(arr, lowIdx, highIdx, k) {
  const midIdx = partition(arr, lowIdx, highIdx);
  const nums = midIdx - lowIdx;

  if (nums > k) {
    return rs(arr, lowIdx, midIdx - 1, k);
  } else if (nums < k) {
    return rs(arr, midIdx + 1, highIdx, k - nums - 1);
  } else {
    return midIdx;
  }
}

for (i = 1; i < 13; i++) {
  const arr = [5,3,7,1,8,2,9,4,7,2,6,6];
  const res = rs(arr, 0, arr.length - 1, i);
  console.log(arr.slice(0, res));
}
// console.log([5,3,7,1,8,2,9,4,7,2,6,6].sort((p, n) => n - p).slice(0, len), res);

