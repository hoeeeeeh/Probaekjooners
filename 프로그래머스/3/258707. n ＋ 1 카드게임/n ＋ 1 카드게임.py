from collections import deque


def solution(coin, cards):
    answer = 0
    init = len(cards) // 3
    target = len(cards) + 1

    cards = deque(cards)
    hands = [cards.popleft() for _ in range(init)]
    garbage = []
    flag = True

    while flag and cards:
        flag = False
        garbage.append(cards.popleft())
        garbage.append(cards.popleft())


        # hands 에서 2장 뽑기
        hands.sort()

        idx1, idx2 = tp(hands, target)
        if idx1 != -1:
            hands.pop(idx1)
            hands.pop(idx2 - 1)
            flag = True

        elif coin > 0:
            # hands 1장, garbage 1장
            garbage.sort()
            idx1, idx2 = tp2(hands, garbage, target)
            if idx1 != -1:
                hands.pop(idx1)
                garbage.pop(idx2)
                coin -= 1
                flag = True

            elif coin > 1:
                    idx1, idx2 = tp(garbage, target)
                    if idx1 != -1:
                        garbage.pop(idx1)
                        garbage.pop(idx2 - 1)
                        coin -= 2
                        flag = True

        if not flag:
            break

        answer += 1
    return answer + 1

def tp(arr, target):
    if len(arr) < 2:
        return -1, -1

    start = 0
    end = len(arr) - 1

    while start < end:
        if arr[start] + arr[end] > target:
            end -= 1

        elif arr[start] + arr[end] < target:
            start += 1

        else:
            return start, end

    return -1, -1

def tp2(arr1, arr2, target):
    if len(arr1) < 1 or len(arr2) < 1:
        return -1, -1

    start = 0
    end = len(arr2) - 1

    while start < len(arr1) and 0 <= end:
        if arr1[start] + arr2[end] > target:
            end -= 1

        elif arr1[start] + arr2[end] < target:
            start += 1

        else:
            return start, end

    return -1, -1


