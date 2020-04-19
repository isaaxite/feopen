const Immer = require('immer');
function shellSort(arr) {
  var len = arr.length,
      temp,
      gap = 1;

  // 动态定义间隔序列
  while(gap < len / 5) {
    gap = gap * 5 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap/5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
        arr[j+gap] = arr[j];
      }
      arr[j+gap] = temp;
    }
  }
  
  return arr;
}

var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// const arr2 = Immer.produce(arr, () => {});

// console.time('希尔排序耗时:');
// const sorted = shellSort(arr);
// console.timeEnd('希尔排序耗时:');
// console.log(sorted);

const arr2 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
function shellSort2(arr) {
  // start: 生成增量列表
  let newGap = arr.length;
  const gaps = [];
  while(newGap > 1) {
    newGap = Math.floor(newGap / 2);
    gaps.push(newGap);
  }
  // end: 生成增量列表

  for (let i = 0; i < gaps.length; i += 1) {
    const gap = gaps[i];
    // 对每个增量为gap的子数组进行插入排序
    for (let j = gap; j < arr.length; j += gap) {
      let k = j - gap;
      let tmp = arr[j];
      while(k >= 0 && arr[k] > tmp) {
        arr[k + gap] = arr[k];
        k -= gap;
      }
      arr[k + gap] = tmp;
    }
  }
  return arr;
}
console.time('希尔排序耗时2');
const sorted2 = shellSort2(arr2);
console.timeEnd('希尔排序耗时2');
console.log(sorted2);
