import java.util.ArrayDeque;
import java.util.HashMap;

class Solution {
    public int solution(String s) {
        String sRing = s + s;

        HashMap<Character, Character> pair = new HashMap<>();
        pair.put('}', '{');
        pair.put(')', '(');
        pair.put(']', '[');
        
        
        for (int i = 0; i < s.length(); i++) {
            ArrayDeque<Character> dq = new ArrayDeque<>();
            boolean breaked = false;
            int answer = 0;
            int nested = 0;
            for (int j = 0; j < s.length(); j++) {
                char c = sRing.charAt(i + j);
                
                if (!pair.containsKey(c)) {
                    dq.push(c);
                    continue;
                }
                
                if(dq.isEmpty() || dq.pop() != pair.get(c)) {
                    breaked = true;
                    break;
                }
                    
                if(dq.isEmpty()) {
                    answer += 1;
                }
                continue;
            }
            
            if(!breaked) {
                return answer;
            }
        }
        return 0;
    }
}

// }]()[{
// ]()[{}