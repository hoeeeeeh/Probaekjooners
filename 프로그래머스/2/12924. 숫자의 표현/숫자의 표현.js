function solution(n) {
    let answer = 0;
    let left = 1, right = 1, sum = 1;

    while (left <= n / 2) {
        if (sum < n) {
            right++;
            sum += right;
        } else if (sum > n) {
            sum -= left;
            left++;
        } else {
            answer++;
            sum -= left;
            left++;
        }
    }

    return answer + 1;
}