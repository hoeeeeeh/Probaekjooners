function solution(topping) {
    let answer = 0;
    const remainToppingTypes = {};
    
    for(let top of topping) {
        if(!remainToppingTypes.hasOwnProperty(top)) {
            remainToppingTypes[top] = 0;
        }
        remainToppingTypes[top] += 1;
    }

    let remainTypesNum = Object.keys(remainToppingTypes).length;
    
    const curToppingTypes = new Set();
    
    for(let top of topping) {
        if(!curToppingTypes.has(top)){
            curToppingTypes.add(top);
        }
        
        remainToppingTypes[top] -= 1;
        if(remainToppingTypes[top] === 0) {
            remainTypesNum -= 1;
        }

        if(curToppingTypes.size === remainTypesNum) {
            answer += 1;
        }
    }
    return answer;
}