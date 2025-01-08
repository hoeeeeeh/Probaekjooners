function solution(storey) {
    return calculate(storey);
}

function calculate(storey) {
    const arr = numToArr(storey);
    let up = 0;
    let answer = 0;
    console.log(arr);
    while(arr.length > 0) {
        const cur = arr.pop() + up;
        const next = arr[arr.length - 1];
        if (cur > 5 || (cur === 5 && (next && next >= 5))) {
            answer += 10 - cur;
            up = 1;
        }else {
          answer += cur;
          up = 0;
        }
    }
    console.log(answer + up);
    return answer + up;

}

function numToArr(num) {
    return [...`${num}`].map((n) => parseInt(n));
}

