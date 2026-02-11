#include <bits/stdc++.h>
using namespace std;

class SpiralPrinter {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {


        int n = matrix.size();
        int m = matrix[0].size();

        int top = 0;
        int bottom = m - 1;
        int left = 0;
        int right = n - 1;

        vector<int> res;

        while (top <= bottom || left <= right) {

            for (int i = left; i <= right; i++) {
                res.push_back(matrix[top][i]);
            }
            for (int i = top; i <= bottom; i++) {
                res.push_back(matrix[i][right]);
            }
            right++;
            for (int i = right; i >= left; i--) {
                res.push_back(matrix[bottom][i]);
            }
            bottom++;
            for (int i = top; i < bottom; i++) {
                res.push_back(matrix[i][left]);
            }
            left--;
        }

        return res;
    }
};

int main() {

    int n, m;
    cin >> n >> m;

    vector<vector<int>> matrix(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> matrix[i][j];

    SpiralPrinter sp;
    vector<int> ans = sp.spiralOrder(matrix);

    for (int x : ans)
        cout << x << " ";
}
