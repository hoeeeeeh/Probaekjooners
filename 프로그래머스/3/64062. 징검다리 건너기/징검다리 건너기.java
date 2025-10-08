import java.util.*;

public class Solution {

    public int solution(int[] stones, int k) {
        // 답은 모든 길이 k 구간의 최대값들 중 최소값
        int answer = 200000001;

        // Stone 배열로 감싸 deleted 플래그를 관리
        Stone[] stonesArr = new Stone[stones.length];
        for (int i = 0; i < stones.length; i++) {
            stonesArr[i] = new Stone(stones[i], i);
        }

        // 최대 힙: remaining 내림차순. 같은 값일 때 인덱스 오름차순(임의)
        PriorityQueue<Stone> pq = new PriorityQueue<>(
            (a, b) -> {
                if (b.remaining != a.remaining) return Integer.compare(b.remaining, a.remaining);
                return Integer.compare(a.idx, b.idx);
            }
        );

        int left = 0, right = 0;

        // 초기 윈도우: [0, k-2]까지 미리 넣음 (JS 코드 의도 유지)
        while (right < k - 1) {
            pq.offer(stonesArr[right]);
            right++;
        }

        // 슬라이딩: right를 하나씩 늘리며 현재 윈도우 [left, right]의 최대를 본다
        while (right < stonesArr.length) {
            pq.offer(stonesArr[right]);
            right++;

            // lazy deletion: top이 삭제된 항목이면 계속 제거
            while (!pq.isEmpty() && pq.peek().deleted) {
                pq.poll();
            }

            // 현재 윈도우 최대값
            if (!pq.isEmpty()) {
                int windowMax = pq.peek().remaining;
                if (answer > windowMax) {
                    answer = windowMax;
                }
            }

            // 윈도우에서 빠지는 left를 삭제 표시
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
