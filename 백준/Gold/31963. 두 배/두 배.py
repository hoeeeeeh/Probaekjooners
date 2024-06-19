import sys
import math

def solution(N, numbers):
    answer = 0
    for i in range(1, len(numbers)):
        prev = numbers[i - 1]
        next = numbers[i]
        if prev > next:
            m = math.ceil(math.log2(prev / next))  # math.log2 사용
            numbers[i] = numbers[i] * 2 ** m  # ** 연산자 사용
            answer += m  # += 연산자 사용
    return answer

# 입력 처리
if __name__ == "__main__":
    N = int(input())
    numbers = list(map(int, input().split()))  # 입력 받아 정수 리스트로 변환
    print(solution(N, numbers))  # 결과 출력
