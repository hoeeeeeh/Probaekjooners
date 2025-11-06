function solution(number, k) {
    const stack = [];
    const answerLength = number.length - k;
    
    for(const [n, idx] of number) {
        if(stack.length === 0) {
            stack.push(n);
            continue;
        }
        
        const last = number.length - idx;
        
        while(k > 0 && stack[stack.length - 1] < n) {
            stack.pop();
            k -= 1;
        }
        
        stack.push(n);
    }
    
    return stack.slice(0, stack.length - k).join('');
}
