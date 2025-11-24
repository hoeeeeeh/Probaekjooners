function solution(cookie) {
    let answer = 0;
    for(let i = 0; i < cookie.length - 1; i++) {
        let left = i;
        let right = i + 1;
        
        let leftSum = 0;
        let rightSum = 0;

        let add = [true, true];
        
        while(left >= 0 && right < cookie.length) {
            if(add[0]) {
                leftSum += cookie[left];
            }
            
            if(add[1]) {
                rightSum += cookie[right];
            }
            
            if(leftSum === rightSum) {
                answer = Math.max(answer, leftSum);
                left -= 1;
                right += 1;
                add = [true, true];
                continue;
            }
            
            else if(leftSum > rightSum) {
                right += 1;
                add = [false, true];
                continue;
            }
            
            else if(leftSum < rightSum) {
                left -= 1;
                add = [true, false];
                continue;
            }
            
        }
    }
    
    return answer;
}