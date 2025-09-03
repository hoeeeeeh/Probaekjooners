function solution(prices) {
    const answer = Array(prices.length).fill(-1);
    const stack = []
    for(let time = 0; time < prices.length; time++) {
        const price = prices[time];
        while(stack.length > 0 && stack[stack.length - 1].price > price) {
            const element = stack.pop();
            answer[element.time] = time - element.time;
        }
        stack.push({ time , price });
    }
    
    for(let i = 0; i < answer.length; i++) {
        if(answer[i] === -1) {
            answer[i] = answer.length - (i + 1);
        }
    }
    
    return answer;
}
