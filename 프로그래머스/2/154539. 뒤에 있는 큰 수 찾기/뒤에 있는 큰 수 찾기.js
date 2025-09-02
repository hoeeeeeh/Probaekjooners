function solution(numbers) {
    let answer = Array(numbers.length).fill(-1);
    let biggerNumberIndex = Array(numbers.length).fill(-1);
    
    for(let i = answer.length - 2; i >= 0; i--) {
        let j = i + 1;
        
        while(j < answer.length) {
            if(numbers[i] < numbers[j]) {
                biggerNumberIndex[i] = j;
                answer[i] = numbers[j];
                break;
            }
            
            if(biggerNumberIndex[j] === -1) {
                break;
            }
            
            j = biggerNumberIndex[j];
        }
    }
    return answer;
}

// 다음 인덱스에 대한 행동은 두 가지가 있다. 만약 다음 인덱스의 숫자가 현재보다 작거나 같으면, 그만큼 건너뛸 수 있다.
// 만약 다음 인덱스의 숫자가 더 크면, biggerNumber 이다.
// 즉 건너뛰거나 더 큰 숫자이거나 둘 중에 하나.

