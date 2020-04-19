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
  return low + left.length;
}

function rs(arr, low, high, k) {
  // if(low === high) return arr.slice(0, low);
  log({ low, high });
  const mdIdx = partition(arr, low, high);
  const nums = mdIdx - low + 1;
  log({ mdIdx, k , nums });
  if (nums === k) {
    return arr.slice(0, mdIdx + 1);
  }
  if (nums > k) {
    log('\n', 1111);
    return rs(arr, low, mdIdx - 1, k);
  } else {
    log('\n', 222);
    return rs(arr, mdIdx + 1, high, k - mdIdx - 1);
  }
}

const arr = [5,3,7,1,8,2,9,4,7,2,6,6];
const res = rs(arr, 0, arr.length - 1, 9);
console.log(res);

