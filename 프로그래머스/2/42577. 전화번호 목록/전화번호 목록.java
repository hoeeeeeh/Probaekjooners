import java.util.*;

class Solution {
    public boolean solution(String[] phone_book) {
        TrieNode trie = new TrieNode();

        for(String phone : phone_book) {
            TrieNode ctx = trie;
            for(int i = 0; i < phone.length(); i++) {
                char c = phone.charAt(i);

                if(ctx.children.containsKey(c)) {
                    ctx = ctx.children.get(c);
                } else {
                    TrieNode next = new TrieNode();
                    ctx.children.put(c, next);
                    ctx = next;
                }
                
                if(ctx.isLeaf) {
                    return false;
                }
                
                if(i != (phone.length() - 1)) {
                    continue;
                }
                
                ctx.isLeaf = true;
                
                if(ctx.children.size() > 0) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

class TrieNode {
    HashMap<Character, TrieNode> children = new HashMap<>();
    boolean isLeaf = false;
}