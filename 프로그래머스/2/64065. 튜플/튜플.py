def splitint(str):
    arr = list(map(int, str.split(",")))
    return arr

def solution(s):
    s = s.split("},{")
    s[0] = s[0].replace("{", "")
    s[-1] = s[-1].replace("}", "")

    s = list(map(splitint, s))
    s.sort(key=len)

    answer = []

    for str in s:
        for e in str:
            if e not in answer:
                answer.append(e)
    return answer