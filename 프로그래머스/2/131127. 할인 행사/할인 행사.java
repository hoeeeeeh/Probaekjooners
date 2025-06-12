import java.util.HashMap;
import java.util.LinkedList;

class Solution {
    public int solution(String[] want, int[] number, String[] discount) {
        HashMap<String, Integer> last = new HashMap<>();
        int answer = 0;
        int SLIDING = 10;
        
        for(int i = 0; i < want.length; i++) {
            last.put(want[i], number[i]);
        }
        
        int order = 0;
        LinkedList<String> q = new LinkedList<>();
        
        for(String item : discount) {
            if(last.containsKey(item)) {
                last.put(item, last.get(item) - 1);
            }
            
            q.add(item);
            
            if(order < SLIDING) {
                order += 1;
            } else {
                String pop = q.poll();
            
                if(last.containsKey(pop)) {
                    last.put(pop, last.get(pop) + 1);
                }

            }
                        
            boolean p = last.values().stream().allMatch(v -> v <= 0);
            
            if(p) {
                answer += 1;    
            }
        }
        
        return answer;
    }
}

// 바나나 3개, 사과 2개, 쌀 2개, 돼지고기 2개, 냄비 1개
// 치킨, 사과, 사과, 바나나, 쌀, 사과, 돼지고기, 바나나, 돼지고기, 쌀, 냄비, 바나나, 사과, 바나나