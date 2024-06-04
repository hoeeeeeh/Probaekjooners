import sys
read = sys.stdin.readline

N = int(read())

words = []
# 26개
ord_zero = "00000000000000000000000000"
finish = int("11111111111111111111111111", 2)
ord_a = ord('a')

for _ in range(N):
    word = read().rstrip()
    original = list(ord_zero)
    for c in word:
        ord_c = ord(c) - ord_a
        original[ord_c] = '1'
    words.append(int("0b" + "".join(original), 2))


ans = 0
or_sentences = [0]
for i, word in enumerate(words):
    ran = len(or_sentences)
    for j in range(ran):
        or_sentence = or_sentences[j] | word
        if or_sentence == finish:
            ans += 2 ** (len(words) - (i+1))

        else:
            or_sentences.append(or_sentence)


print(ans)




