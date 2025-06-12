import java.util.HashSet;

class Solution {
    public int solution(int[] elements) {
        int answer = 0;
        
        HashSet<Integer> s = new HashSet<>();
        
        int n = elements.length;
        
        int[] circularElements = new int[n * 2];
        System.arraycopy(elements, 0, circularElements, 0, n);
        System.arraycopy(elements, 0, circularElements, n, n);
        
        int[] accSum = new int[n * 2 + 1];
        
        accSum[0] = 0;
        
        
        for(int i = 1; i < circularElements.length; i++) {
            accSum[i] = accSum[i-1] + circularElements[i];
        }
        
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                s.add(circularElements[i] + (accSum[i+j] - accSum[i]));
            }
        }
        
        return s.size();
    }
}
