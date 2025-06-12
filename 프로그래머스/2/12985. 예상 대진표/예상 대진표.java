class Solution
{
    public int solution(int n, int a, int b)
    {
        int answer = 1;
        while(Math.ceil((double)a/2) != Math.ceil((double)b/2)) {
            answer += 1;
            a = (int)Math.ceil((double)a/2);
            b = (int)Math.ceil((double)b/2);
        }
    
        return answer;
    }
}