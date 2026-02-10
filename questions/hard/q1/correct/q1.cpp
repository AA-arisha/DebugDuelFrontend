#include <bits/stdc++.h>
using namespace std;

class TimelineProcessor {
private:
    vector<vector<int>> grid;
    vector<int> incFlat, decFlat;

public:
    TimelineProcessor(const vector<vector<int>>& g) {
        grid = g;
    }

    void flattenIncreasing() {

        for (int i = 0; i < (int)grid.size(); i++) {
            vector<int> row = grid[i];
            sort(row.begin(), row.end());
            for (int x : row) incFlat.push_back(x);
        }
    }

    void flattenDecreasing() {
        decFlat.clear();
        for (int i = 0; i < (int)grid.size(); i++) {
            vector<int> row = grid[i];
            sort(row.begin(), row.end(), greater<int>());
            for (int x : row) decFlat.push_back(x);
        }
    }

    vector<int> longestCommonSubarray() {
        int n = incFlat.size();
        int m = decFlat.size();

        int bestLen = 0;
        int bestPos = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int k = 0;
                while (i + k < n && j + k < m &&
                        incFlat[i + k] == decFlat[j + k]) {
                    k++;
                }
                if (k > bestLen) {   // strictly better
                    bestLen = k;
                    bestPos = i;
                }
            }
        }

        vector<int> res;
        for (int i = bestPos; i < bestPos + bestLen; i++) {
            res.push_back(incFlat[i]);
        }
        return res;
    }
};

class StabilityAnalyzer {
public:
    long long productWithoutZero(const vector<int>& v) {
        long long prod = 1;
        bool hasNonZero = false;

        for (int x : v) {
            if (x != 0) {
                prod *= x;
                hasNonZero = true;
            }
        }
        if (!hasNonZero) return 0;
        return prod;
    }

    int countSubarraysGreaterThanProduct(const vector<int>& v, long long prod) {
        int n = v.size();
        int cnt = 0;

        for (int i = 0; i < n; i++) {
            long long sum = 0;
            for (int j = i; j < n; j++) {
                sum += v[j];
                if (sum > prod) cnt++;
            }
        }
        return cnt;
    }
};

class DebugDuelSystem {
private:
    TimelineProcessor tp;
    StabilityAnalyzer sa;

public:
    DebugDuelSystem(const vector<vector<int>>& g)
        : tp(g) {}

    void run() {
        tp.flattenIncreasing();
        tp.flattenDecreasing();

        vector<int> anchor = tp.longestCommonSubarray();
        long long prod = sa.productWithoutZero(anchor);
        int unstable = sa.countSubarraysGreaterThanProduct(anchor, prod);

        cout << anchor.size() << " " << prod << " " << unstable << "\n";
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> grid[i][j];
        }
    }

    DebugDuelSystem system(grid);
    system.run();
    return 0;
}
