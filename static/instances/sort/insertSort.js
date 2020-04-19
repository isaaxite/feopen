const insertionSort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1
    let tmp = nums[i]
    while (j >= 0 && nums[j] > tmp) {
      nums[j + 1] = nums[j]
      j--
    }
    nums[j + 1] = tmp
  }
  return nums
}

console.time('希尔排序耗时');
const sorted = insertionSort([6, 5, 3, 1, 8, 7, 2, 4]);
console.timeEnd('希尔排序耗时');
console.log(sorted);
