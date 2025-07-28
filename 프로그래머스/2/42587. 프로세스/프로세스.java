import java.util.ArrayDeque;
class Solution {
    public int solution(int[] priorities, int location) {
        int answer = 0;
        ArrayDeque<Integer> deque = new ArrayDeque<>();
        
        for(int priority : priorities) {
            deque.add(priority);
        }
        
        boolean fin = false;
        int index = location;
        while(!fin && deque.size() > 0) {
            int priority = deque.pop();
            index = index - 1;
            boolean exec = true;
            for(int remain_priority : deque) {
                if(priority < remain_priority) {
                    exec = false;
                    break;
                }
            }

            if(!exec) {
                deque.add(priority);
                if(index == -1) {
                    index = deque.size() - 1;
                }
                continue;
            }
            answer += 1;
            
            if(index == -1) {
                fin = true;
            }
        }
        return answer;
    }
}

// 가장 운이 나쁠 경우, 내림차순으로 정렬되어있는경우.
// N * N * N
