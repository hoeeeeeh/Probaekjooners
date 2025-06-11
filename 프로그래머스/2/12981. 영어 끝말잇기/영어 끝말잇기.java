import java.util.Map;
import java.util.HashMap;

class Solution {
    Map<String, Boolean> dup = new HashMap();
    
    public int[] solution(int n, String[] words) {
        int[] answer = {0, 0};
        String prevWord = "";
        int count = 0;
        for(String word : words) {
            count += 1;
            if(!validate(prevWord, word, count)) {
                answer = new int[] {((count - 1) % n) + 1, (int) Math.ceil((double)count / n)};
                break;
            }
            prevWord = word;
        }
        return answer;
    }
    
    public boolean validate(String prevWord, String curWord, int count) {
        if(dup.containsKey(curWord)) {
            return false;
        }
        
        if(count > 1 && curWord.charAt(0) != prevWord.charAt(prevWord.length() - 1)) {
            return false;
        }
        
        if(curWord.length() < 2 || curWord.length() > 50) {
            return false;
        }
        
        dup.put(curWord, true);
        
        return true;
    }
}

   