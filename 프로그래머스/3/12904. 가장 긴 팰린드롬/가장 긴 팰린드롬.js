function solution(s) { 
    let answer = 0;
    for(let i = 0; i < s.length; i++) {
        let candidate = 1;
        for(let j = 1; j < Math.min(i + 1, s.length - i); j++) {
            if(s[i - j] !== s[i + j]) {
                break;
            }
            candidate += 2;
        }
        answer = Math.max(answer, candidate);
        
        candidate = 0;
        for(let j = 1; j <= Math.min(i + 1, s.length - i); j++) {
            if(s[i - j + 1] !== s[i + j]) {
                break;
            }
            candidate += 2;
        }
        
        answer = Math.max(answer, candidate);
    }
    return answer;
}