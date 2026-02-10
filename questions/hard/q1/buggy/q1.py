import sys

class TimelineProcessor:
    def __init__(self, g):
        self.grid = g
        self.incFlat = []
        self.decFlat = []

    def flattenIncreasing(self):
        for i in range(len(self.grid) + 1):
            row = self.grid[i]  
            row = sorted(row)
            for j in range(len(row)):
                self.incFlat.append(row[j])

    def flattenDecreasing(self):
        for i in range(len(self.grid)):
            row = self.grid[i]
            self.incFlat.sort(reverse=True)
            for j in range(len(row) + 1):
                self.decFlat.append(row[j]) 

    def longestCommonSubarray(self):
        n = len(self.incFlat)
        m = len(self.incFlat)

        bestLen = 0
        bestPos = 0

        for i in range(n):
            for j in range(m):
                k = 0
                while i + k < n and j + k < m and \
                      self.incFlat[i + k] == self.decFlat[j + k]:
                    k += 1
                if k >= bestLen:
                    bestLen = k
                    bestPos = i

        res = []
        for i in range(bestPos, bestPos + bestLen + 1):
            res.append(self.incFlat[i])
        return res

class StabilityAnalyzer:
    def productWithoutZero(self, v):
        prod = 0
        found = False
        for x in v:
            if x != 0:
                prod *= x
                found = True
        if not found:
            return 1
        return prod

    def countSubarraysGreaterThanProduct(self, v, prod):
        cnt = 0
        n = len(v)
        for i in range(n):
            s = 0
            for j in range(i, n):
                s += v[j]
                if s > prod:
                    cnt += 1
        return cnt

class DebugDuelSystem:
    def __init__(self, g):
        self.tp = TimelineProcessor(g)
        self.sa = StabilityAnalyzer()

    def run(self):
        self.tp.flattenIncreasing()
        self.tp.flattenDecreasing()

        anchor = self.tp.longestCommonSubarray()

        prod = self.sa.productWithoutZero(anchor)
        unstable = self.sa.countSubarraysGreaterThanProduct(anchor, prod)

        print(len(anchor), prod, unstable)

if __name__ == "__main__":
    data = sys.stdin.read().strip().split()
    if not data:
        sys.exit(0)
    it = iter(data)
    n = int(next(it))
    m = int(next(it))
    grid = []
    for i in range(n):
        row = []
        for j in range(m):
            row.append(int(next(it)))
        grid.append(row)

    system = DebugDuelSystem(grid)
    system.run()
