import java.util.*;

class Solution {
    public ArrayList<Integer> solution(int[] progresses, int[] speeds) {
        ArrayList<Integer> answer = new ArrayList<>();
        int prev = -1;
        int acc = 1;
        
        for(int i = 0; i < progresses.length; i++) {
            int progress = progresses[i];
            int speed = speeds[i];
            
            int workingDay = (int)Math.ceil((100.0-progress)/speed);   
            
            if(workingDay <= prev){
                acc += 1;
                continue;
            }
            
            if(prev != -1) {
                answer.add(acc);
            }
            prev = workingDay;
            acc = 1;
        }
        
        answer.add(acc);
        
        return answer;
    }
}