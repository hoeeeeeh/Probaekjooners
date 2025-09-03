function solution(order) {
    let answer = 0;
    const stack = [];
    order.reverse();
    let cur = 1;
    let endFlag = false;
    
    while(order.length > 0) {
        endFlag = true;
        const next = order[order.length - 1];
        
        while(cur <= next) {
            endFlag = false;
            stack.push(cur);
            cur += 1;
        }
        
        if(endFlag) {
            break;
        }
        
        while(stack.length > 0 && order.length > 0 && 
              stack[stack.length - 1] === order[order.length - 1]) {
            stack.pop();
            order.pop();
            answer += 1;
        }
    }
    
    return answer;
}