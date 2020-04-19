function partition(arr, k) {
  if (k <= 0) { return []; }
  const left = [];
  const right = [];
  const len = arr.length;
  const midIdx = Math.floor(len / 2);
  for (let i = 0; i < len; i += 1) {
    if (midIdx === i) { continue; }
    arr[i] <= arr[midIdx]
      ? left.push(arr[i]) 
      : right.push(arr[i]);
  }
  left.push(arr[midIdx]);
  if (left.length === k) {
    return left;
  } else if (left.length < k) {
    return [...left, ...partition(right, k - left.length)];
  } else {
    left.pop();
    return partition(left, k);
  }
}

for (i = -3; i < 13; i++) {
  const arr = [5,3,7,1,8,2,9,4,7,2,6,6];
  const res = partition(arr, i);
  console.log(res.toString());
}
// console.log([5,3,7,1,8,2,9,4,7,2,6,6].sort((p, n) => n - p).slice(0, len), res);

