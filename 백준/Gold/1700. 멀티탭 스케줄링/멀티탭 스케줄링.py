import sys

read = sys.stdin.readline
n, k = list(map(int, read().split()))
multap = [0] * n
list_ = list(map(int, read().split()))
ans = swap = num = max_num = 0
# 플러그 뽑는 횟수, 뽑을 제품 플러그, li를 슬라이싱할 인덱스, swap의 인덱스
for i in list_:
    if i in multap:  # 이미 꽂은 플러그면 넘어가기
        pass
    elif 0 in multap:  # 빈 곳에 플러그 꽂기
        multap[multap.index(0)] = i
    else:
        for j in multap:
            if j not in list_[num:]:  # 더이상 j제품을 쓸일이 없다
                swap = j
                break
            elif list_[num:].index(j) > max_num:  # 가장 나중에 사용할 전기용품을 뽑는다
                max_num = list_[num:].index(j)
                swap = j
        multap[multap.index(swap)] = i  # 새로운 제품 플러그 꽂기
        max_num = swap = 0
        ans += 1  # 플러그 뽑는 횟수
    num += 1
print(ans)
exit(0)