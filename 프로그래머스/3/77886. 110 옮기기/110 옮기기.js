function solution(s) {
  return s.map(move);
}

function move(str) {
  let count110 = 0;
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
    if (stack.length >= 3) {
      const t = stack[stack.length - 3] + stack[stack.length - 2] + stack[stack.length - 1];
      if (t === "110") {
        stack.pop();
        stack.pop();
        stack.pop();
        count110++;
      }
    }
  }

  const base = stack.join("");
  const idx = base.lastIndexOf("0");

  if (idx === -1) {
    return "110".repeat(count110) + base;
  }

  return base.slice(0, idx + 1) + "110".repeat(count110) + base.slice(idx + 1);
}
