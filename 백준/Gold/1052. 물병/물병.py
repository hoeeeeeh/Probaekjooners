import sys

read = sys.stdin.readline

N, K = map(int, read().split())
N = bin(N)[2:]
for i in range(len(N)):
    if K == 0:
        if '1' in N[i:]:
            binary = N[i:]
            str = "0b"
            for b in binary:
                if b == '1':
                    str += '0'
                else:
                    str += '1'

            int_b = int(str, 2)
            print(int_b + 1)
            exit(0)
        else:
            print(0)
            exit(0)

    if N[i] == '1':
        K -= 1

print(0)
