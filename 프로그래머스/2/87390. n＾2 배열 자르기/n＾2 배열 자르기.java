import java.util.*;

class Solution {
    public ArrayList<Integer> solution(int n, long left, long right) {
        ArrayList<Integer> answer = new ArrayList<>();
        
        int lx = (int)(left / n);
        int ly = (int)(left % n);
        
        int rx = (int)(right / n);
        int ry = (int)(right % n);

        for(long i = left; i <= right; i++) {
            int x = (int)(i / n);
            int y = (int)(i % n);
            answer.add(Math.max(x + 1, y + 1));
        }
        
        return answer;
    }
}

