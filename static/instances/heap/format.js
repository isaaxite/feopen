// 最小堆
const arr = [50, 45 , 40, 20, 25, 35, 30, 10, 15];

class MinHeap {
  constructor(arr) {
    this.arr = arr;
  }

  swap(arr, lIdx, rIdx) {
    arr[lIdx] = arr[lIdx] + arr[rIdx];
    arr[rIdx] = arr[lIdx] - arr[rIdx];
    arr[lIdx] = arr[lIdx] - arr[rIdx];
  }

  shiftUp(arr, idx) {
    let subIdx = idx;
    let supIdx = Math.floor((subIdx - 1) / 2);
  
    while (arr[subIdx] < arr[supIdx]) {
      arr[subIdx] = arr[subIdx] + arr[supIdx];
      arr[supIdx] = arr[subIdx] - arr[supIdx];
      arr[subIdx] = arr[subIdx] - arr[supIdx];
      subIdx = supIdx;
      supIdx = Math.floor((subIdx - 1) / 2)
    }
  }

  shiftDown(arr, idx, _maxIdx) {
    let supIdx = idx;
    let lIdx = 2 * supIdx + 1;
    let rIdx = lIdx + 1;
    const maxIdx = _maxIdx || arr.length - 1;

    while(1) {
      if (arr[supIdx] > arr[lIdx]) {
        if (lIdx >= maxIdx) { break; }
        this.swap(arr, lIdx, supIdx);
        supIdx = lIdx;
      } else if (arr[supIdx] > arr[rIdx]) {
        if (rIdx >= maxIdx) { break; }
        this.swap(arr, rIdx, supIdx);
        supIdx = rIdx;
      } else {
        break;
      }
      lIdx = 2 * supIdx + 1;
      rIdx = lIdx + 1;
    }
  }

  adjust(_len) {
    const len = _len || this.arr.length;
    for (let i = 1; i < len; i += 1) {
      this.shiftUp(this.arr, i);
    }
  }
}

const minIns = new MinHeap(arr);
minIns.adjust();
const newArr = minIns.arr;

console.log(minIns.arr);

let len = minIns.arr.length;
for (let i = 0; i < len; i += 1) {
  minIns.swap(minIns.arr, 0, len - 1);
  len -= 1;
  minIns.shiftDown(minIns.arr, 0, len - 1);
  console.log(minIns.arr);
}

console.log(minIns.arr);
