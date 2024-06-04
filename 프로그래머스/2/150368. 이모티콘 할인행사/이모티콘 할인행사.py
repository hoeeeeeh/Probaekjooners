from itertools import product


# users의 원소는 [비율, 가격]의 형태입니다.
# emoticons[i]는 i+1번 이모티콘의 정가를 의미합니다.
def solution(users, emoticons):
    discount_list = [10, 20, 30, 40]

    max_person = 0
    max_sum = 0
    for discount in list(product(discount_list, repeat=len(emoticons))):
        user_total = 0
        user_signup = 0

        for user in users:
            total = 0
            for idx, dc in enumerate(discount):
                if dc >= user[0]:
                    total += (emoticons[idx] * (100 - dc) / 100)

                if total >= user[1]:
                    user_signup += 1
                    total = 0
                    break

            user_total += total

        if user_signup > max_person:
            max_person = user_signup
            max_sum = user_total

        if user_signup == max_person:
            if user_total > max_sum:
                max_sum = user_total

    answer = [max_person, max_sum]
    return answer

