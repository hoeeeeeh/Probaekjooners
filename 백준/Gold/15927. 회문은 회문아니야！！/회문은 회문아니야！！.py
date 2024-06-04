import sys

read = sys.stdin.readline

string = read().strip()

palindrome = True
allsame = True

for i in range(len(string) // 2):
    if string[i] != string[-1 - i]:
        palindrome = False
        print(len(string))
        break

    elif string[i] != string[0]:
        allsame = False

if string[len(string)//2] != string[0]:
    allsame = False

if palindrome:
    if allsame:
        print(-1)
    else:
        print(len(string) - 1)
