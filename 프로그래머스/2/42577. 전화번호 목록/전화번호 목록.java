import java.util.*;

class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = false;
        Arrays.sort(phone_book);
        for(int i = 0; i < phone_book.length - 1; i++) {
            answer |= phone_book[i+1].startsWith(phone_book[i]);
        }
        
        return !answer;
    }
}