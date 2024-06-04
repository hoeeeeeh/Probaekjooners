# 백준 && 프로그래머스 문제 풀이 정리!

# 다시 볼 만한 문제 정리!
## 1325 효율적인 해킹 (S5)
실버5 라고 해서 완전히 얕봤는데 생각보다 너무 헤맸다. 
<details>
<summary> 알고리즘 </summary>
'각 노드' 마다 BFS 를 돌아서 간선 갯수를 세면 된다. 시간이 5초 이므로 이러한 풀이가 가능하다.
</details>

## 프로그래머스 - 야근 지수
<details>
<summary> 알고리즘 </summary>
이 문제는 단순 구현 문제이지만 heapq 를 쓰면 조금 더 간단하게 풀 수 있다.
</details>

## 16120 PPAP(G4)
<details>
<summary> 알고리즘 </summary>
이 문제는 Stack 을 사용한다는 걸 알면서도 풀지 못했는데,  
`지나간 PPAP 를 모아두는 스택` ,`검사(PPAP인지)를 위한 스택`, `남은 PPAP String` 이렇게 2개의 스택을 쓰고 있었다. 굳이 이렇게 하지 않고 `PPAP String 을 계속 모아두다가, PPAP[-4:] 부터 PPAP 인지` 검사하면 되는 문제였다.
</details>
