function solution(numbers, target) {
    var answer = 0;
    const q = [{value : 0, cnt : 0 }];
    const visited = new Set();
    
    while (q.length > 0) {
        const { value, cnt } = q.pop();
        
        if(cnt === numbers.length) {
            if(value === target) {
                answer += 1;
            }
            continue;
        }
        
        const plus = { value : value + numbers[cnt], cnt : cnt + 1 };
        const minus = { value : value - numbers[cnt], cnt : cnt + 1 };
        
        if(!visited.has(plus)){
            visited.add(plus);
            q.push(plus);
        }
        
        if(!visited.has(minus)){
            visited.add(minus);
            q.push(minus);
        }
    }
    return answer;
}

