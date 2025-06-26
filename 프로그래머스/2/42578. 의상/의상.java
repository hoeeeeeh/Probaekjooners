import java.util.HashMap;

class Solution {
    public int solution(String[][] clothes) {
        int answer = 1;
        HashMap<String, Integer> types = new HashMap<>();
        for(String[] clothInfo : clothes) {
            String clothType = clothInfo[1];
            if(!types.containsKey(clothType)){
                types.put(clothType, 0);
            }
            types.put(clothType, types.get(clothType) + 1);
            
            answer = types.values().stream().reduce(1, (prev, next) -> prev * (next + 1));
        }
        
        return answer - 1;
        
    }
}