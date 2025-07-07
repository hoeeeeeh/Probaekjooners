import java.util.LinkedHashSet;
import java.util.Iterator;

class Solution {
    public int solution(int cacheSize, String[] cities) {
        int answer = 0;
        LinkedHashSet<String> lhs = new LinkedHashSet<String>();
        
        for(String city : cities) {
            city = city.toLowerCase();
            if(lhs.contains(city)){
                lhs.remove(city);
                lhs.add(city);
                answer += 1;
            } else {
                Iterator<String> it = lhs.iterator();
                if (lhs.size() >= cacheSize && it.hasNext()) {
                    String first = it.next();
                    lhs.remove(first);
                }
                
                if (lhs.size() < cacheSize) {
                    lhs.add(city);   
                }
                
                answer += 5;
            }
        }
        return answer;
    }
}