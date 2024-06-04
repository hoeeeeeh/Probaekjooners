import sys

read = sys.stdin.readline


class Trie:
    def __init__(self):
        self.root = {}

    def add(self, nodes):
        cur = self.root

        for node in nodes:
            if node not in cur:
                cur[node] = {}
            cur = cur[node]
        # 먹이 정보는 알파벳 대문자로만 이루어져 있다.
        cur[0] = True

    def find(self, level, node):
        if 0 in node:
            return
        nodes = sorted(node)

        for child in nodes:
            print("--" * level + child)
            self.find(level + 1, node[child])

N = int(read())
trie = Trie()
for _ in range(N):
    trie.add(read().split()[1:])

trie.find(0, trie.root)