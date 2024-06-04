import sys
read = sys.stdin.readline
string = list(read().rstrip())
stack = []
ppap = ["P", "P", "A", "P"]
for i in range(len(string)):
    stack.append(string[i])
    if stack[-4:] == ppap:
        for _ in range(4):
            stack.pop()
        stack.append("P")
if stack == ppap or stack == ["P"]:
    print("PPAP")
else:
    print("NP")