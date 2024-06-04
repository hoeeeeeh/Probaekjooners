import sys

read = sys.stdin.readline

K = int(read())
K += 1

binary_K = bin(K)[3:]
print(binary_K.replace('0', '4').replace('1', '7'))





