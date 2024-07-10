const fs = require('fs');
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().replaceAll('\r', '').split('\n');
const N = Number(input[0]);
const strings = [];
/*
48	0x30	0   57	0x39	9
97	0x61	a   65	0x41	A 
122	0x7A	z   90	0x5A	Z
(130 ~ 180)A~Z 는 58 + (n-65) *2 하고, a~z 는 59 + (n - 97)*2
*/
for(let i = 0; i<N; i++){
    const string = input[1+i];
    const row = [];
    let j = 0;
    let number = '';
    while(j < string.length){
        unicode = string[j].charCodeAt(0);
        if(48 <= unicode && unicode <= 57){
            number += string[j];
            j++;
            continue;
        }
        if(number.length > 0){
            row.push(number);
            number = '';
        }
        if(65 <= unicode && unicode <= 90){
            row.push(58 + (Number(unicode) - 65) * 2);
        }
        else if(97 <= unicode && unicode <= 122){
            row.push(59 + (Number(unicode) - 97) * 2);
        }
        j++;
    }
    if(number.length > 0){
        row.push(number);
        number = '';
    }
    row.push(input[1+i]);
    strings.push(row);
}
strings.sort((a, b)=>{
    // number, bigInt
    const length = Math.min(a.length, b.length) - 1;
    for(let i = 0; i<length; i++){
        if(typeof(a[i]) !== typeof(b[i])){
            if(typeof(a[i]) === 'string') return -1;
            else return 1;
        }else{
            const [bigA, bigB] = [BigInt(a[i]), BigInt(b[i])]; 
            if( (typeof(a[i]) === 'string') && (bigA === bigB) ){
                if(a[i].length < b[i].length) return -1;
                else if(a[i].length > b[i].length) return 1;
                continue;
            }
            else if(bigA > bigB) return 1;
            else if(bigA < bigB) return -1;
        }
    }
    if(a.length === b.length) return 0;
    else if(a.length > b.length) return 1;
    else return -1;
});

strings.map((s)=>{
    console.log(s[s.length - 1]);
});
