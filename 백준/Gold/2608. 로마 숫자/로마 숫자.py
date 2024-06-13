import sys
from collections import deque

read = sys.stdin.readline

# I V X L C D M
# IV IX XL XC CD CM`    1번씩만 사용 가능
# IV IX , XL XC, CD CM 은 각각 같이 못쓴다.
# I X C M 연속해서 3번까지만
# V L D 는 한 번만
# 큰 숫자 -> 작은 숫자
# 작은 숫자가 왼쪽에 오면 , 오른쪽의 큰 숫자 - 작은 숫자

test = {4: []}
rta = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

atr = [[1000, 'M'],
       [900, "CM"],
       [500, 'D'],
       [400, "CD"],
       [100, 'C'],
       [90, "XC"],
       [50, 'L'],
       [40, "XL"],
       [10, 'X'],
       [9, "IX"],
       [5, 'V'],
       [4, "IV"],
       [1, 'I']
       ]


# ['I', 'V', 'X', 'L', 'C', 'D', 'M', "IV", "IX", "XL", "XC", "CD", "CM"]

# I V X L C D M / IV IX XL XC CD CM

def roma_to_arabia(rs: str):
    rs = deque(list(rs))
    ret = 0
    while rs:
        left = rs.popleft()
        if rs and rta[left] < rta[rs[0]]:
            ret += rta[rs.popleft()] - rta[left]
        else:
            ret += rta[left]

    return ret


def arabia_to_roma(ara: int):
    ret = ""
    while ara > 0:
        idx = 0
        while atr[idx][0] > ara:
            idx += 1
        ara -= atr[idx][0]
        ret += atr[idx][1]
    return ret


def solution():
    rms1 = read().rstrip()
    rms2 = read().rstrip()

    roma_ans = roma_to_arabia(rms1) + roma_to_arabia(rms2)
    print(roma_ans)
    print(arabia_to_roma(roma_ans))

solution()