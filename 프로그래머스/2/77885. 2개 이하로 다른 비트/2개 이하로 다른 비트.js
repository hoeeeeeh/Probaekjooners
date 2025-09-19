function solution(numbers) {
    return numbers.map((number) => {
        const binaryArray = [...number.toString(2)];

        let zeroBit = false;
        for(let i = 0; i < binaryArray.length; i++) {
            const char = binaryArray[binaryArray.length - i - 1];
            if(char === '0') {
                zeroBit = true;
                binaryArray[binaryArray.length - i - 1] = '1';
                
                if(i > 0) {
                    binaryArray[binaryArray.length - i] = '0';
                }
                break;
            }
        }
        
        
        if(!zeroBit) {
            binaryArray[0] = 0;
            return parseInt('1' + binaryArray.join(''), 2);
        }
        
        return parseInt(binaryArray.join(''), 2);
    });
}
