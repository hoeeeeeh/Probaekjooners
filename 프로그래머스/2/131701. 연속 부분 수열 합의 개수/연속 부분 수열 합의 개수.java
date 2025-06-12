import java.util.HashSet;

class Solution {
    public int solution(int[] elements) {
        int answer = 0;
        
        HashSet<Integer> s = new HashSet<>();
        
        for(int i = 0; i < elements.length; i++) {
            s.add(elements[i]);
            int acc = 0;
            for(int j = (i+1) % elements.length; j != i; j = (j+1) % elements.length) {
                acc += elements[j];
                s.add(elements[i] + acc);
            }
        }
        
        return s.size();
    }
}
