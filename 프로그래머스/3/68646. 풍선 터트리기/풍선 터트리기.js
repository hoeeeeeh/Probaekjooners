function solution(a) {
    const startBase = [Infinity];
    const endBase = [Infinity];

    for(let i = 0; i < a.length - 1; i++) {
        if(startBase[i] > a[i]) {
            startBase.push(a[i]);
        } else {
            startBase.push(startBase[i]);
        }
    }
    
    for(let j = a.length - 1; j > 0; j--) {
        if(endBase[endBase.length - 1] > a[j]) {
            endBase.push(a[j]);
        } else {
            endBase.push(endBase[endBase.length - 1]);
        }
    }
    
    const endBaseReverse = endBase.reverse();
    
    let answer = 0;
    for(let i = 0; i < a.length; i++) {
        // console.log('i ==' , i, '//', startBase[i], a[i], endBaseReverse[i]);
        if(startBase[i] > a[i]) {
            answer += 1;
            continue;
        }
        
        if(endBaseReverse[i] > a[i]) {
            answer += 1;
            continue;
        }
    }
    
    return answer;
}

// 자신보다 큰 것을 제거할 수 있는가?
// 제일 작은 숫자를 제외하고, 살아남으려면 무조건 1번의 작은 숫자를 제거하는 기회를 써야한다. 이전에 기회를 써서, 자신보다 큰 숫자를 남겨오거나, 아니면 마지막에.
/*
제일 작은 숫자를 제외하고, 살아남으려면 무조건 1번의 작은 숫자를 제거하는 기회를 써야한다. 
이전에 기회를 써서, 자신보다 큰 숫자를 남겨오거나, 아니면 마지막에.

숫자가 전부 다르기 때문에, 두 풍선에는 무조건 큰 것과 작은 것이 존재한다.

n을 기준으로 |<--A-->| n |<--B-->| 의 구간으로 나뉠텐데, A 와 B 중에서 n 보다 큰게 있으면 n은 생존가능 
*/

