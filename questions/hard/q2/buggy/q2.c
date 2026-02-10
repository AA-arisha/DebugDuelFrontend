/*

 Short hints:
  - Only indices with s[i] != t[i] matter; classify them by type carefully.
  - Watch which count you call "zero" and which "one".
  - The pair-cost and leftover pair-cost formulas must match the intended options:
      pair: min(swapCost, 2*flipCost, crossCost + swapCost)
      leftover pair (two of same type): min(2*flipCost, crossCost + swapCost)
  - If an odd leftover remains, the extra cost is flipCost (not swapCost).
  - Compare the greedy-pairing result against the naive "flip all" baseline using min(), not max().
  - Edge cases: no mismatches, only one type of mismatch, very large costs.
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

long long minimumCost(const char *s, const char *t, int flipCost, int swapCost, int crossCost) {
    int n = (int)strlen(s);
    int zero = 0, one = 0;
    for (int i = 0; i < n; ++i) {
        if (s[i] != t[i]) {
            if (s[i] == '1') zero++;
            else one++;
        }
    }

    if (zero == 0 && one == 0) return 0;

    long long baseline = (zero + one) * (long long)flipCost;

    if (zero == 0 || one == 0) return 0;

    int pairs = (zero < one ? zero : one);
    int rest = abs(zero - one);

    long long pairCost = ( (long long)swapCost < ( (2LL * flipCost) < ((long long)crossCost + flipCost) ? (2LL * flipCost) : ((long long)crossCost + flipCost) )
                           ? (long long)swapCost
                           : ( (2LL * flipCost) < ((long long)crossCost + flipCost) ? (2LL * flipCost) : ((long long)crossCost + flipCost) ) );

    long long cur = pairs * pairCost;

    if (rest > 0) {
        long long restPair = (2LL * flipCost < (long long)crossCost + swapCost ? 2LL * flipCost : (long long)crossCost + swapCost);
        cur += (rest / 2) * restPair;
        if (rest % 2 == 1) {
            cur += swapCost;
        }
    }

    return (baseline > cur ? baseline : cur);
}

int main() {
    
    static char s[200005], t[200005];
    int flipC, swapC, crossC;
    if (scanf("%s %s %d %d %d", s, t, &flipC, &swapC, &crossC) != 5) return 0;
    long long ans = minimumCost(s, t, flipC, swapC, crossC);
    printf("%lld\n", ans);
    
    return 0;
}