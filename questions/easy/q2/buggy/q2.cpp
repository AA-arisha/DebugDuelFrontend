#include <bits/stdc++.h>
using namespace std;

class TimelineProcessor {
public:
    long long inc_digits(long long x) {

        string s = to_string(x);
        for (int i=0; i < s.length(); i++) {
            int d = s[i] - '0';
            d = (d + 1) % 9;
            s[i] = char('0' + d);
        }
        return stoll(s);
    }

    long long reverse_digits(long long x) {
        string s = to_string(x);
        reverse(s.begin(), s.end());
        return stoll(s);
    }

    int sum_digits(long long x) {
        int sum = 0;
        string s = to_string(x);
        for (int i=0; i < s.length(); i++) sum += (s[i] - '0');
        return sum;
    }
};

int main() {
    long long cur;
    cin >> cur;

    TimelineProcessor tp;
    string cmd;

    while (cin >> cmd) {
        if (cmd == "END") {
            cout << cur << endl;
            break;
        }
        else if (cmd == "INC") {
            cur = tp.inc_digits(cur);
        }
        else if (cmd == "REV") {
            cur = tp.reverse_digits(cur);
        }
        else if (cmd == "SUM") {
            cout << tp.sum_digits(cur) << endl;
        }
    }
    return 0;
}
