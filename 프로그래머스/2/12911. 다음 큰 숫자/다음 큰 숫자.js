// 뒤에서부터, 가장 먼저 나오는 이어진 1

function solution(n) {
    let nextBinary = '';
    const bin = [...('0' + n.toString(2))].map((n) => parseInt(n));
    let continuousOneNum = 0;
    
    for(let i = bin.length - 1; i >= 0; i--) {
        const char = bin[i];
        if(char === 0) {
            if(continuousOneNum > 0) {
                bin[i] = 1;
                break;
            }
            continue;
        }
        
        continuousOneNum += 1;
        bin[i] = 0;
    }
    for(let j = continuousOneNum - 1; j > 0; j--) {
        bin[bin.length - j] = 1;
    }
    const answer = parseInt(bin.join(''), 2);
    return answer;
}

/*
1001110
1010011
*/