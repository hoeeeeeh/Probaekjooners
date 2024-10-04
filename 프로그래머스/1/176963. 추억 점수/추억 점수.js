function solution(name, yearning, photo) {
    var answer = [];
    const nameYearningMap = {};
    for(let i = 0; i<name.length; i++){
        nameYearningMap[name[i]] = yearning[i];
    }
    photo.forEach((photoElement)=>{
        const score = photoElement.reduce((acc, name)=>{
            const personalScore = nameYearningMap[name]
            if(personalScore) acc += personalScore;
            return acc;
        }, 0)
        answer.push(score);
    })
    
    return answer;
}