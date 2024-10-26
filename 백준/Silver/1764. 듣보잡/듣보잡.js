const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const names = fs.readFileSync(filePath).toString().trim().split('\n');

const search = (idx, no_ear_or_no_eye, neither_eye_nor_ear) => {
    if(idx >= names.length) {
        neither_eye_nor_ear.sort();
        return neither_eye_nor_ear;
    }

    const name = names[idx];

    if (no_ear_or_no_eye.has(name)) neither_eye_nor_ear.push(name)
    else no_ear_or_no_eye.set(name, true);

    return search(idx + 1,no_ear_or_no_eye,neither_eye_nor_ear);
}

const neither_eye_nor_ear = search(1, new Map(), []);

console.log(neither_eye_nor_ear.length);
neither_eye_nor_ear.forEach((name) => console.log(name));

