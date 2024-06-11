def solution(enroll, referral, seller, amount):
    answer = {}
    parent = {}

    for idx in range(len(referral)):
        parent[enroll[idx]] = referral[idx]
        answer[enroll[idx]] = 0
    answer["-"] = 0

    for idx in range(len(seller)):
        money = amount[idx] * 100
        start = seller[idx]
        while money > 9:
            pay = money // 10
            answer[start] += money - pay
            money = pay

            start = parent[start]
            if start == "-":
                break

        answer[start] += money

    result = []
    for member in enroll:
        result.append(answer[member])

    return result