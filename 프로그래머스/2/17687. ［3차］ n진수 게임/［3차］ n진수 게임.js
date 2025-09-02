function solution(n, t, m, p) {
    let numberString = "";
    let num = 0;
    
    while (numberString.length < t * m) {
        numberString += num.toString(n).toUpperCase();
        num += 1;
    }
    
    let answer = "";
    for (let i = 0; i < t; i++) {
        answer += numberString[(p - 1) + i * m];
    }
    
    return answer;
    
}