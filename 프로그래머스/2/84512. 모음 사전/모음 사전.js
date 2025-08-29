function solution(word) {
    const chars = ['A', 'E', 'I', 'O', 'U'];
    const weights = [1];
    for(let i = 1; i < 5; i++) {
        weights.unshift(weights[0] + 5 ** i);
    }

    let answer = 0;

    for (let i = 0; i < word.length; i++) {
        const idx = chars.indexOf(word[i]);
        answer += idx * weights[i] + 1;
    }

    return answer;
}
