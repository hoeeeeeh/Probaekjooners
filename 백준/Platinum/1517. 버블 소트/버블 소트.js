const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "./test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = parseInt(input[0]);

/* Merge Sort 풀이 */
const numbers = input[1].split(" ").map(Number);
function mergeSort(arr) {
  if (arr.length <= 1) return [arr, 0];
  const mid = Math.floor(arr.length / 2);
  const [left, leftSwaps] = mergeSort(arr.slice(0, mid));
  const [right, rightSwaps] = mergeSort(arr.slice(mid));
  return merge(left, right, leftSwaps + rightSwaps);
}

function merge(left, right, howManySwaps) {
  let merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      //howManySwaps += right.length - rightIndex;
      merged.push(left[leftIndex]);
      leftIndex++;
    } else if (left[leftIndex] > right[rightIndex]) {
      howManySwaps += left.length - leftIndex;
      merged.push(right[rightIndex]);
      rightIndex++;
    } else {
      merged.push(right[rightIndex]);
      rightIndex++;
    }
  }
  //left or right array has elements left
  //left 가 먼저오든, right 가 먼저오든 상관이없다. 둘 중에 하나는 빈 배열이고 나머지 하나에 남은 원소들을 추가하려는 거니까.

  return [
    [...merged, ...left.slice(leftIndex), ...right.slice(rightIndex)],
    howManySwaps,
  ];
}
console.log(mergeSort(numbers)[1]);
