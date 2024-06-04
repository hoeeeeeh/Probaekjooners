import sys

sys.setrecursionlimit(10 ** 8)

read = sys.stdin.readline

sentence = "Messi Gimossi Messi "
super_ans = "Messi Messi Gimossi"





def fibonacci(prev_str, prev_value, next_str, next_value, sum_value):
    while True:
        sum_value = prev_value + next_value
        if sum_value > num:
            break
        prev_value, next_value = next_value, sum_value
        prev_str, next_str = next_str, next_str + prev_str

    index = sum_value - num
    answer_str = -1
    for w in reversed(prev_str):
        index -= int(w)
        if index < 0:
            answer_str = w
            break
    index = -index
    if answer_str == '6':
        answer_str = 'Messi '
    else:
        answer_str = 'Gimossi '

    ans_ = answer_str[index - 1]
    print(ans_ if ans_ != ' ' else super_ans)

num = int(read())

if num < 20:
    ans = sentence[num - 1]
    if ans == ' ':
        print(super_ans)
    else:
        print(ans)
else:
    fibonacci('6', 6, '68', 14, 0)