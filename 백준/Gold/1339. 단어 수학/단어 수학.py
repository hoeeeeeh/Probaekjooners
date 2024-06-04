# 첫째 줄에 단어의 개수 N(1 ≤ N ≤ 10)이 주어진다. 둘째 줄부터 N개의 줄에 단어가 한 줄에 하나씩 주어진다.
# 단어는 알파벳 대문자로만 이루어져있다. 모든 단어에 포함되어 있는 알파벳은 최대 10개이고, 수의 최대 길이는 8이다.
# 서로 다른 문자는 서로 다른 숫자를 나타낸다.

word_list = []
alphabet_set = set()


def arithmetic_num(alphabet):
    decimal = 0
    for word in word_list:
        arithmetic = ""
        for alphabet_in_word in word:
            if alphabet == alphabet_in_word:
                arithmetic += '1'
            else:
                arithmetic += '0'

        decimal += int(arithmetic, 10)
        # ABBB
        # DBBB
        # DBBB
        # DBBB 
        # 에서, A가 B보다 앞에 있어서 우선순위를 B보다 높게 가져가야한다면, 우선순위를 구할 때 int(arithmetc, n + 1) 로 해야
        # B를 모두 더해도 A를 넘을 수 없다 (2진법에서 k 자릿수 까지 더했을 때 k+1 자릿수만 1인 경우를 넘지 못하는 것처럼)
    return decimal


def main():
    num = int(input())
    for _ in range(num):
        word_list.append(input())

    for word in word_list:
        for alphabet in word:
            alphabet_set.add(alphabet)

    priority_dict = {}
    for alphabet in alphabet_set:
        priority_dict[alphabet] = arithmetic_num(alphabet)

    priority_dict = sorted(priority_dict.items(), key=lambda item: item[1], reverse=True)

    MAX_NUM = 9
    count = 0
    ans = 0
    for key, value in priority_dict:
        ans += value * (MAX_NUM - count)
        count += 1

    print(ans)


main()

