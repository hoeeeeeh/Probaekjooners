function solution(n, s) {
    if (n > s) {
        return [-1];
    }
    if (s % n === 0) {
        return Array(n).fill(s / n);
    }
    
    const cnt = s % n;
    const base = Math.floor(s / n);
    return Array.from({ length : n }, (_, i) => 
        i < n - cnt ? base : base + 1
    )
}