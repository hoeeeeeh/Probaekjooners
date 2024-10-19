const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const passwordList = fs.readFileSync(filePath).toString().trim().split('\n');

function 모음_하나를_반드시_포함해야한다(password) {
    const regex = /[aeiou]/;
    return regex.test(password);
}

function 모음이_3개_혹은_자음이_3개_연속으로_오면_안_된다(password) {
    const regex = /[aeiou]{3,}|[^aeiou]{3,}/;
    return !regex.test(password);
}

function 같은_글자가_연속적으로_두_번_오면_안되나_ee_oo_는_허용한다(password) {
    const regex = /([^eo])\1/;
    return !regex.test(password);
}

const password_rules = [
    모음_하나를_반드시_포함해야한다,
    모음이_3개_혹은_자음이_3개_연속으로_오면_안_된다,
    같은_글자가_연속적으로_두_번_오면_안되나_ee_oo_는_허용한다,
]

passwordList.forEach((password) => {
    if(password === 'end') return;
    const validation = password_rules.every((rule) => rule(password));
    const result = `<${password}> is ${validation ? '' : 'not '}acceptable.`;
    console.log(result);
});

