#include <bits/stdc++.h>
using namespace std;

class QuantumDuel {
public:
    string signature;

    QuantumDuel(long long n) {
        signature = to_string(n);
    }
    void paradoxTurn() {
        if (signature.size() <= 1) return;
        char minDigit = '9' + 1;
        int pos = -1;
        for (int i = 0; i < signature.size() - 1; i++) {
            if (signature[i] < minDigit) {
                minDigit = signature[i];
                pos = i;
            }
        }
        if (pos != -1 && signature.back() < signature[pos]) {
            swap(signature[pos], signature.back());
        }
    }

    void omniTurn() {
        if (!signature.empty())
            signature.pop_back();
    }

    char playDuel() {
        bool paradoxTurnFlag = true;
        while (signature.size() > 1) {
            if (paradoxTurnFlag) paradoxTurn();
            else omniTurn();
            paradoxTurnFlag = !paradoxTurnFlag;
        }
        return signature[0];
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        QuantumDuel duel(n);
        cout << duel.playDuel() << "\n";
    }
    return 0;
}
