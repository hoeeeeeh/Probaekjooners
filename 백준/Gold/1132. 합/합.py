import sys

read = sys.stdin.readline

N = int(read())
alphabet = {}
start = [True] * 10
zero_allocated = False

for _ in range(N):
    num_string = read().rstrip()
    length = len(num_string)
    for num_i in range(length):
        idx = ord(num_string[num_i]) - ord('A')
        if idx not in alphabet:
            alphabet[idx] = 0

        if num_i == 0:
            start[idx] = False
        alphabet[idx] += 10 ** (length - num_i - 1)

alphabet = sorted(alphabet.items(), key=lambda x: x[1])

ans = 0
smallest = 10 - len(alphabet)

if smallest == 0:
    smallest += 1

for idx, s in alphabet:
    if len(alphabet) == 10 and not zero_allocated and start[idx]:
        zero_allocated = True

    else:
        ans += s * smallest
        smallest += 1

print(ans)
