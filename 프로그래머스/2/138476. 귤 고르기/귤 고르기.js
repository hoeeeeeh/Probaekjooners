// 갯수가 적은 순서대로 정렬해서, 가장 적은 것부터 빼면 되지 않나..
function solution(k, tangerine) {
    const tangerineMap = new Map();
    for(size of tangerine) {
        if(!tangerineMap.has(size)){
            tangerineMap.set(size, 0);
        }
        const num = tangerineMap.get(size);
        tangerineMap.set(size, num + 1);
    }
    const sortedTangerineList = [...tangerineMap].sort((a, b) => b[1] - a[1]);
    
    let popTangerine = 0;
    const limit = tangerine.length - k;
    
    while(sortedTangerineList) {
        if(popTangerine + sortedTangerineList[sortedTangerineList.length - 1][1] <= limit) {
            popTangerine += (sortedTangerineList.pop())[1];
            continue
        }
        break;
    }
    
    return sortedTangerineList.length;
}