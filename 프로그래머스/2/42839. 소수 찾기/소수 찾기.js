function solution(numbers) {
    const nums = numbers.split('');
    const results = new Set();

    function dfs(current, used) {
        if (current.length > 0) {
            results.add(Number(current));
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                dfs(current + nums[i], used);
                used[i] = false;
            }
        }
    }

    dfs('', Array(nums.length).fill(false));

    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    let answer = 0;
    results.forEach(num => {
        if (isPrime(num)) answer++;
    });

    return answer;
}
