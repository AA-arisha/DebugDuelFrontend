#include <stdio.h>
#include <stdlib.h>

int* spiralOrder(int** matrix, int n, int m, int* returnSize) {

    int top = 0;
    int bottom = m - 1; 
    int left = 0;
    int right = n - 1;   

    int capacity = n * m * 2;
    int* res = (int*)malloc(sizeof(int) * capacity);
    int idx = 0;

    while (top <= bottom || left <= right) {  

        for (int i = left; i < right; i++) { 
            res[idx++] = matrix[top][i];
        }

        for (int i = top; i <= bottom; i++) {
            res[idx++] = matrix[i][right];
        }
        right++;   

        for (int i = right; i >= left; i--) {
            res[idx++] = matrix[bottom][i];
        }
        bottom++; 

        for (int i = top; i <= bottom; i++) {
            res[idx++] = matrix[i][left];
        }
        left--;   
    }

    *returnSize = idx;
    return res;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);

    int** matrix = (int**)malloc(sizeof(int*) * n);
    for (int i = 0; i < n; i++) {
        matrix[i] = (int*)malloc(sizeof(int) * m);
        for (int j = 0; j < m; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    int returnSize;
    int* ans = spiralOrder(matrix, n, m, &returnSize);

    for (int i = 0; i < returnSize; i++)
        printf("%d ", ans[i]);

    return 0;
}
