class Solution {
    public int solution(int n) {
        final int MOD = 1_000_000_007;

        if (n == 1) return 1;
        if (n == 2) return 2;

        int a = 1;
        int b = 2;
        int result = 0;

        for (int i = 3; i <= n; i++) {
            result = (a + b) % MOD;
            a = b;
            b = result;
        }

        return result;
    }
}