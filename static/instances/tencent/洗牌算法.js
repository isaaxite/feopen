/**
 * (1)洗牌算法：对52张牌洗牌，要求尽量洗乱，而且原牌不能在原位置上重复
 */
function random(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const base = Math.round(Math.random() * (len - 1 - i));
    const idx = i + (base);
    let tmp = arr[0];
    arr[0] = arr[idx];
    arr[idx] = tmp;
  }
  return arr;
}

// const arr = random([1,2,3,4,5,6,7]);

 /**
  * 数组a[N]，存放了数字1至N-1，其中某个数字重复一次。写一个函数，找出被重复的数字。
  * 时间复杂度必须为O(N), 空间复杂度不能是O[N]。 函数原型：
  * int find(int a[], int N)
  */
function find(a) {
  for (let i = 1; i < a.length; i++) {
    if (i !== a[i-1]) {
      return a[i-1];
    } 
  }
}

/**
 * 4) 判断正整数是否是对称数，如3， 121， 12321。 不能把整数转为字符串来判断。
 * //返回 1：对称； 0： 不对称
 */
function ismirror(val) {
  const nums = [];
  while (val) {
    const bit = val % 10;
    nums.push(bit);
    val = Math.floor(val / 10);
  }
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (nums[left] !== nums[right]) {
      return 0;
    }
    left++;
    right--;
  }
  return 1;
}
console.log(
  ismirror(123211)
);

/**
 * 有一个二叉树，每个节点的值是一个整数。写一个函数，判断这棵树中是否存在从根到叶子节点的一个路径，
 * 这个路径上所有节点之和为某一个值。存在返回1， 否则返回0
 */
function haspath(root, val) {
  let res = false;
  function dfs(node, count) {
    if (res) return;
    if (!node) {
      if (count === val) {
        res = true;
      }
      return;
    }
    count += node.val;
    dfs(node.left, count);
    dfs(node.right, count);
  }
  dfs(root, 0);
  return res;
}

function TreeNode() {
  this.val = void 0;
  this.right = null;
  this.left = null;
}

/**
 * 2) 现在有n个微信群，每个群里面有2到m个人，请定义好微信群存放的数据结构，并写一个函数，快速找出某个人所在的群，要求时间复杂度尽可能的低
 */
class DataList {
  constructor() {
    this._data = {};
  }

  add(key, val) {
    if (!this._data[key]) {
      this._data[key] = [];
    }
    this._data[key].push(val);
  }

  isInList(key, val) {
    if (!this._data[key] || !this._data[key].includes(val)) {
      return false;
    }
    return true;
  }
}

// class Node {
//   this.val = null;
//   this.left = this.right = null;
// }


/**
 * 5) 无重复字符的最长子串（滑动窗口）
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:
 * 输入: "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

function findMostLong(s) {
  let res = 0;
  let idx = 0;
  const wind = [];
  while (idx < s.length) {
    const char = s[idx];
    if (wind.includes(char)) {
      if (wind.length > res) {
        res = wind.length;
      }
      wind.shift();
    } else {
      wind.push(char);
      idx++;
    }
  }
  return res;
}
