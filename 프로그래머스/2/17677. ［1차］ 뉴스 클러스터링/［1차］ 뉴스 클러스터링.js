function solution(str1, str2) {
    var answer = 0;
    
    const s1 = str1.toLowerCase(), s2 = str2.toLowerCase();
    const s1TwoCharacters = splitTwoCharacters(s1);
    const s2TwoCharacters = splitTwoCharacters(s2);
    const intersection = calculateIntersection(s1TwoCharacters, s2TwoCharacters);
    const union = calculateUnion(s1TwoCharacters, s2TwoCharacters, intersection);
    if(intersection === 0 && union === 0){
        return 65536;
    }
    answer = Math.floor(intersection * 65536 / union);
    return answer;
}

function calculateIntersection(s1, s2) {
    let intersectionNum = 0;
    for(const str of Object.keys(s1)) {
        if(s2.hasOwnProperty(str)) {
            intersectionNum += Math.min(s1[str], s2[str]);
        }
    }
    
    return intersectionNum;
}

function calculateUnion(s1, s2, intersectionNum) {
    return Object.values(s1).reduce((prev, cur) => prev + cur, 0) 
        + Object.values(s2).reduce((prev, cur) => prev + cur, 0) 
        - intersectionNum;
}

function splitTwoCharacters(str) {
    const twoCharacters = {};
    
    for(let i = 0; i < str.length - 1; i++) {
        const c1 = str[i], c2 = str[i + 1];
        if('a' <= c1 && c1 <= 'z' && 'a' <= c2 && c2 <= 'z') {
            twoCharacters[c1 + c2] = twoCharacters[c1 + c2] + 1 || 1;
        }
    }
    
    return twoCharacters;
}