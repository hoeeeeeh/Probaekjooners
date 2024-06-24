const fs = require('fs');
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');


function divideString(string){
    start = 0;
    mid = string.indexOf('*');
    end = string.length;

    return [string.slice(0, mid), string.slice(mid+1, end)];
}

function whichIsLonger(s1, s2){
    if(s1.length <= s2.length){
        short = s1;
        long = s2;
    }else{
        short = s2;
        long = s1;
    }
    return [short, long];

}

function solution(s1, s2){

    let [sh, lo] = whichIsLonger(s1, s2);
    lo = lo.replace('*', '');
    let sharr = divideString(sh);

    if(lo.startsWith(sharr[0]) && lo.endsWith(sharr[1])){
        return lo;
    }

    s1 = s1.replace('\r', '');
    s2 = s2.replace('\r', '');
    
    let answer = '';
    let s1arr = divideString(s1);
    let s2arr = divideString(s2);


    let [short, long] = whichIsLonger(s1arr[0], s2arr[0]);
    if(!long.startsWith(short)){
        return -1;
    }
    answer += long;
    let remain_1 = long.slice(short.length, long.length);
    [short, long] = whichIsLonger(s1arr[1], s2arr[1]);
    if(!long.endsWith(short)){
        return -1;
    }

    let remain_2 = long.slice(0, long.length - short.length);
    while(remain_1.length > 0){
        if(remain_2.startsWith(remain_1)){
                return answer + long.slice(remain_1.length, long.length);
        }
        remain_1 = remain_1.slice(1, remain_1.length);
    }

    return answer + long;
}

str1 = input[0];
str2 = input[1];

console.log(solution(str1, str2));

