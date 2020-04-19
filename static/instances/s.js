var merge = function(nums1, m, nums2, n) {
  let idx1 = m;
  let idx2 = 0;
  while (idx2 < n) {
    if (nums2[idx2] <= nums1[0] || !m) {
      nums1[idx1] = nums2[idx2];
      idx2 += 1;
      idx1 += 1;
    } else {
      nums1[idx1] = nums1[0];
      const tmp = nums1.shift();
      m -= 1;
    }
  }
};

const nums1 = [1,2,3,0,0,0];
merge(
  nums1,
  3,
  [2,5,6],
  3
);
console.log(nums1);
