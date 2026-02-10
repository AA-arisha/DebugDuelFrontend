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

#include <bits/stdc++.h>
using namespace std;

class Solver {
public:
	long long minimumCost(const string &s, const string &t, int flipCost, int swapCost, int crossCost) {
		int n = (int)s.size();
		int zero = 0, one = 0;
		for (int i = 0; i < n; ++i) {
			if (s[i] != t[i]) {
				if (s[i] == '1') zero++;
				else one++;
			}
		}

		if (zero == 0 && one == 0) return 0;

		long long baseline = (zero + one) * flipCost;

		if (zero == 0 || one == 0) return 0;

		int pairs = min(zero, one);
		int rest = abs(zero - one);

		long long pairCost = min( (long long)swapCost,
		                          min( 2LL * flipCost, (long long)crossCost + flipCost ) );

		long long cur = pairs * pairCost;

		if (rest > 0) {

			long long restPair = min(2LL * flipCost, (long long)crossCost + swapCost);
			cur += (rest / 2) * restPair;
			if (rest % 2 == 1) {
				cur += swapCost;
			}
		}

		return max(baseline, cur);
	}
};

int main() {
	
    string s, t;
    int flipC, swapC, crossC;
    cin >> s >> t >> flipC >> swapC >> crossC;
    Solver sol;
    cout << sol.minimumCost(s, t, flipC, swapC, crossC) << '\n';
	
	return 0;
}
