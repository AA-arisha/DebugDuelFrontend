#include <bits/stdc++.h>
using namespace std;

class Solution {
public:

    int countConfigs(int n) {

        int maxCows = n;
        int configurations = 0;
        cout<<"Max Cows Calculated:  "<<endl;
        for (int cows = 0; cows <= maxCows; ++cows) {

            int remLegs = n - cows;
       

            int chickens = remLegs / 2;


            if (chickens > 0) {
          
                configurations++; 
            }
        }

        cout<<"Total vaLid  arrangements found:"<<endl;
        return configurations;
    }
};

int main() {
  
    int n;
    if (!(cin >> n)) return 0;
    Solution sol;
    cout << sol.countConfigs(n) << '\n';
    return 0;
}