function solution(numbers) {
    numbers = numbers.map((number) => {
        const binary = number.toString(2);
        return binary.padStart(findBinary(binary.length), '0');
    });
    
    console.log(numbers);

    let answer = []
    
    for(const number of numbers) {
        if(dfs(number)) {
            answer.push(1);
        } else {
            answer.push(0);
        }
    }
    
    return answer;
}

function dfs(binary) {
    const m = Math.floor(binary.length / 2);
    const [leftChild, rightChild] = sliceBinary(binary);
    if(binary[m] === '0') {
        return [...leftChild].every(c => c === '0') && [...rightChild].every(c => c === '0');
    }
    
    if(binary.length === 1) {
        return true;
    }
    
    return dfs(leftChild) && dfs(rightChild);
}

function sliceBinary(binary) {
    const l = binary.length;
    const m = Math.floor(binary.length / 2);
    const leftChild = binary.slice(0, m);
    const rightChild = binary.slice(m + 1);
    
    return [leftChild, rightChild];
}

function findBinary(number) {
    let i = 0;
    
    while((2 ** i) - 1 < number) {
        i += 1;
    }
    
    return 2 ** i - 1;
}