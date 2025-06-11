class Solution {
    public int solution(int[] arr) {
        int answer = 1;
        for (int num : arr) {
            answer = lcm(num, answer);
        }
        return answer;
    }
    
    public int gcd(int a, int b) {
        while(b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    public int lcm(int a, int b) {
        int g = gcd(a, b);
        int a_ = a / g;
        int b_ = b / g;
        return g * a_ * b_;
    }
}