#include <bits/stdc++.h>
using namespace std;

class Trader {
public:
  
    long long minTrades(long long x, long long y, long long k) {
   
        long long needSticks = k * k + y;
        cout<<"Needed Sticks calculated  "<<endl;


        long long have = 1;
        long long perA = x - 1;
        long long tradesA = 0;

        if (have < needSticks) {
            cout<<"Calculating  extras"<<endl;
            long long extra = needSticks - have;
            tradesA = extra / perA;
        }
        long long tradesB = k;
        return tradesA + tradesB;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long x, y, k;
    if (!(cin >> x >> y >> k)) return 0;

    Trader trader;
    cout << trader.minTrades(x, y, k) << '\n';
    return 0;
}