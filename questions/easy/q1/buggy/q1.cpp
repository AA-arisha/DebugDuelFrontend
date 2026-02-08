#include <bits/stdc++.h>
using namespace std;

class TemporalStabilityAnalyzer {
private:
    int n, k;
    int *a;

public:
    TemporalStabilityAnalyzer() {
        a = nullptr;
    }

    void readInput() {
        cin >> n >> k;
        a = new int[n];
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
    }

    int countStableTimelines() {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] >= k) {
                cnt++;
            }
        }
        return cnt;
    }

    void process() {
        cout << countStableTimelines() << endl;
    }
};

int main() {

    TemporalStabilityAnalyzer analyzer;
    analyzer.readInput();
    analyzer.process();

    return 0;
}
