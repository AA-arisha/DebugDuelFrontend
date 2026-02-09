#include <bits/stdc++.h>
using namespace std;

class CalibrationEngine {
public:
    double computeScore(int n, int a[]) {
        int score = 0;

        for (int i = 0; i < n; i++) {
            score += (a[i] - a[i - 1]) / (a[i + 1] - a[i]);
        }
        return score;
    }
};

int main() {
    int n;
    cin >> n;

    int* a = new int[n];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    CalibrationEngine engine;
    cout << engine.computeScore(n, a) << endl;
    return 0;
}
