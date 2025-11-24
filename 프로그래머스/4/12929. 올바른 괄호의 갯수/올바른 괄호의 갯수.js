function solution(n) {
    let answer = 0;
    function dfs(open, close) {
        if(open === n) {
            answer += 1;
            return;
        }

        // 닫기
        for(let i = close; i <= open; i++) {
            dfs(open + 1, i);
        }
    }
    dfs(1, 0);
    
    return answer;
    
}

/*
닫는 것이 몇 연속까지 할 수 있는가에 따라 달라진다.
*/