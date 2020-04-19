function swap(arr, left, right) {
  arr[left] = arr[left] + arr[right];
  arr[right] = arr[left] - arr[right];
  arr[left] = arr[left] - arr[right];
}

function maxHeapify(arr, idx, maxLen = arr.length) {
  let rootIdx = idx;
  let leftIdx = rootIdx * 2 + 1;
  let rightIdx = rootIdx * 2 + 2;
  if (leftIdx < maxLen && arr[leftIdx] > arr[rootIdx]) {
    swap(arr, leftIdx, rootIdx);
    rootIdx = leftIdx;
  }

  if (rightIdx < maxLen && arr[rightIdx] > arr[rootIdx]) {
    swap(arr, rightIdx, rootIdx);
    rootIdx = rightIdx;
  }

  if (rootIdx !== idx) {
    maxHeapify(arr, rootIdx, maxLen);
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

function heapSort(_arr) {
  let len = _arr.length;
  const arr = buildMaxHeap(_arr);

  while(len > 1) {
    swap(arr, 0, len - 1);
    maxHeapify(arr, 0, len - 1);
    len--;
  }
  return arr;
}

let arr = [50, 45 , 40, 20, 25, 35, 30, 10, 15];
arr = heapSort(arr);
console.log(arr);
