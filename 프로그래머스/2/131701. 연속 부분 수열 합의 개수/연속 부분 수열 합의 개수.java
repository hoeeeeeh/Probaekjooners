import java.util.HashSet;

class Solution {
    public int solution(int[] elements) {
        HashSet<Integer> s = new HashSet<>();
        
        int n = elements.length;
        
        int[] circularElements = new int[n * 2];
        System.arraycopy(elements, 0, circularElements, 0, n);
        System.arraycopy(elements, 0, circularElements, n, n);
        
        int[] accSum = new int[n * 2 + 1];
        accSum[0] = 0;
        
        for(int i = 1; i < n * 2; i++) {
            accSum[i] = accSum[i-1] + circularElements[i-1];
        }
        
        for(int i = 0; i < n; i++){
            for(int j = 1; j <= n; j++){
                s.add(accSum[i+j] - accSum[i]);
            }
        }
        
        return s.size();
    }
}
