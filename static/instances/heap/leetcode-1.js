/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  if (stones.length == 1) return stones[0];
  const arr = buildMaxHeap(stones);

  while(arr.length > 1) {
    swap(arr, 0, arr.length - 1);
    const stone1 = arr.pop();
    maxHeapify(arr, 0);
    console.log(1, arr);

    swap(arr, 0, arr.length - 1);
    const stone2 = arr.pop();
    maxHeapify(arr, 0);
    console.log(2, arr);
    
    const newStone = Math.abs(stone2 - stone1);
    console.log(2.5, newStone)
    if (newStone) {
      arr.push(newStone);
      console.log(3, arr);
      swap(arr, 0, arr.length - 1);
      maxHeapify(arr, 0);
    }
    console.log(arr, newStone);
  }
  return arr[0] || 0;
};

function swap(arr, l, r) {
  if (arr.length < 2) return;
  arr[l] = arr[l] + arr[r];
  arr[r] = arr[l] - arr[r];
  arr[l] = arr[l] - arr[r];
}

function maxHeapify(arr, idx, maxLen = arr.length) {
  let rootIdx = idx;
  let leftIdx = rootIdx * 2 + 1;
  let rightIdx = rootIdx * 2 + 2;

  if (leftIdx < maxLen && arr[leftIdx] > arr[rootIdx]) {
    rootIdx = leftIdx;
  }

  if (rightIdx < maxLen && arr[rightIdx] > arr[rootIdx]) {
    rootIdx = rightIdx;
  }

  if (idx !== rootIdx) {
    swap(arr, rootIdx, idx);
    maxHeapify(arr, rootIdx);
  }
}

function buildMaxHeap(arr) {
  let idx = Math.floor((arr.length - 2) / 2);
  while(idx >= 0) {
    maxHeapify(arr, idx);
    idx--;
  }
  return arr;
}

const arr = [434,667,378,919,212,902,240,257,208,996,411,222,557,634,425,949,755,833,785,886,40,159,932,157,764,916,85,300,130,278];
const res = lastStoneWeight(arr);
console.log(res);
