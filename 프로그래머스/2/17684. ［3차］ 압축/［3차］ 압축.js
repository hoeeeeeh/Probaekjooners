function solution(msg) {
    const CHARCODE_A = 'A'.charCodeAt(0), CHARCODE_Z = 'Z'.charCodeAt(0);
    const dict = {};

    let dictLength = 0;
    
    function next(str, arr) {
        return dict.hasOwnProperty(str + arr[arr.length - 1]);
    }
    
    for(let i = CHARCODE_A; i <= CHARCODE_Z; i++) {
        const c = String.fromCharCode(i);
        dictLength += 1;
        dict[c] = dictLength;
    }
    const message = [...msg].reverse();
    let answer = [];
    while(message.length > 0) {
        let str = "";
        while(message.length > 0 && next(str, message)) {
            str += message.pop();
        }
        answer.push(dict[str]);
        
        dictLength += 1;
        
        if(message.length > 0)
            dict[str + message[message.length -1]] = dictLength;   
    }
    
    return answer;
}

