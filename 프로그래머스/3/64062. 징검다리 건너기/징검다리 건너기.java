import java.util.*;

public class Solution {

    public int solution(int[] stones, int k) {
        int answer = 200000001;

        Stone[] stonesArr = new Stone[stones.length];
        for (int i = 0; i < stones.length; i++) {
            stonesArr[i] = new Stone(stones[i], i);
        }

        PriorityQueue<Stone> pq = new PriorityQueue<>(
            (a, b) -> {
                if (b.remaining != a.remaining) return Integer.compare(b.remaining, a.remaining);
                return Integer.compare(a.idx, b.idx);
            }
        );

        int left = 0, right = 0;

        while (right < k - 1) {
            pq.offer(stonesArr[right]);
            right++;
        }

        while (right < stonesArr.length) {
            pq.offer(stonesArr[right]);
            right++;

            while (!pq.isEmpty() && pq.peek().deleted) {
                pq.poll();
            }

            if (!pq.isEmpty()) {
                int windowMax = pq.peek().remaining;
                if (answer > windowMax) {
                    answer = windowMax;
                }
            }

            stonesArr[left].deleted = true;
            left++;
        }

        return answer;
    }

    static class Stone {
        int remaining;
        int idx;
        boolean deleted;

        Stone(int remaining, int idx) {
            this.remaining = remaining;
            this.idx = idx;
            this.deleted = false;
        }
    }
}
