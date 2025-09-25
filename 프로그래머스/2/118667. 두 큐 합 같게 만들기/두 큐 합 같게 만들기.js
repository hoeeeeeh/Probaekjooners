function solution(queue1, queue2) {
    const n = queue1.length;
    const total = [...queue1, ...queue2].reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return -1;

    const target = total / 2;

    let sum1 = queue1.reduce((a, b) => a + b, 0);
    let sum2 = total - sum1;

    let q = [...queue1, ...queue2];
    let [i, j] = [0, n]; 
    let count = 0;
    const limit = n * 4;

    while (count <= limit) {
        if (sum1 === target) return count;

        if (sum1 > target) {
            sum1 -= q[i];
            sum2 += q[i];
            i++;
        } else {
            sum1 += q[j];
            sum2 -= q[j];
            j++;
        }
        count++;
    }
    return -1;
}