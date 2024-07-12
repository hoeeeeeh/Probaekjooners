const fs = require("fs");
const path = process.platform === "linux" ? "dev/stdin" : "./test.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");
const numberString = input[1].split(" ");
const N = Number(input[0]);
const number = Array.from({ length: N }, (_, i) => Number(numberString[i]));
number.sort((a, b) => a - b);
function solution(numbers) {
  let [start, end] = [0, numbers.length - 1];
  let minSum = 2000000000;
  let minIndex = [-1, -1];
  while (start < end) {
    const sum = numbers[start] + numbers[end];
    if (sum === 0) {
      break;
    }

    if (minSum > Math.abs(sum)) {
      minSum = Math.abs(sum);
      minIndex = [start, end];
    }

    if (sum < 0) start++;
    else end--;
  }

  if (start < end) {
    console.log(numbers[start] + " " + numbers[end]);
  } else {
    console.log(numbers[minIndex[0]] + " " + numbers[minIndex[1]]);
  }
}

solution(number);
