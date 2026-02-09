#include <bits/stdc++.h>
using namespace std;

class TemporalStabilityAnalyzer {
public:
    int countStableTimelines(int n, int k, int a[]) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] >= k) {
                cnt++;
            }
        }
        return cnt;
    }
};

int main() {
    int n, k;
    cin >> n >> k;

    int a[n];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    TemporalStabilityAnalyzer analyzer;
    cout << analyzer.countStableTimelines(n, k, a) << endl;

    return 0;
}
