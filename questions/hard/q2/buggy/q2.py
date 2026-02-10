"""
 Short hints:
  - Only indices with s[i] != t[i] matter; classify them by type carefully.
  - Watch which count you call "zero" and which "one".
  - The pair-cost and leftover pair-cost formulas must match the intended options:
      pair: min(swapCost, 2*flipCost, crossCost + swapCost)
      leftover pair (two of same type): min(2*flipCost, crossCost + swapCost)
  - If an odd leftover remains, the extra cost is flipCost (not swapCost).
  - Compare the greedy-pairing result against the naive "flip all" baseline using min(), not max().
  - Edge cases: no mismatches, only one type of mismatch, very large costs.
"""


class Solver:
    def minimumCost(self, s: str, t: str, flipCost: int, swapCost: int, crossCost: int) -> int:
        n = len(s)
        zero = 0
        one = 0
        for i in range(n):
            if s[i] != t[i]:
                if s[i] == '1':
                    zero += 1
                else:
                    one += 1

        if zero == 0 and one == 0:
            return 0

        baseline = (zero + one) * flipCost

        if zero == 0 or one == 0:
            return 0

        pairs = min(zero, one)
        rest = abs(zero - one)

        pairCost = min(swapCost, min(2 * flipCost, crossCost + flipCost))

        cur = pairs * pairCost

        if rest > 0:
            restPair = min(2 * flipCost, crossCost + swapCost)
            cur += (rest // 2) * restPair
            if rest % 2 == 1:
                cur += swapCost

        return max(baseline, cur)


if __name__ == "__main__":
   
    s = input()
    t = input()
    flipC = int(input())
    swapC = int(input())
    crossC = int(input())
    sol = Solver()
    print(sol.minimumCost(s, t, flipC, swapC, crossC))
