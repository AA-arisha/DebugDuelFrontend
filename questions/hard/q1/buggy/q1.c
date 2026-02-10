#include <stdio.h>
#include <stdbool.h>

#define MAX_N 100
#define MAX_M 100
#define MAX_FLAT (MAX_N * MAX_M + 10)

void selection_sort_asc(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        int min_idx = i;
        for (int j = i + 1; j < len; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = tmp;
    }
}

void selection_sort_desc(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        int max_idx = i;
        for (int j = i + 1; j < len; j++) {
            if (arr[j] > arr[max_idx]) max_idx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[max_idx];
        arr[max_idx] = tmp;
    }
}
int grid[MAX_N][MAX_M];
int incFlat[MAX_FLAT];
int decFlat[MAX_FLAT];
int incCount = 0;
int decCount = 0;
void flattenIncreasing(int n, int m) {
    for (int i = 0; i <= n; i++) { 

        int tmp[MAX_M];
        for (int j = 0; j < m; j++) {
            tmp[j] = grid[i][j]; 
        }
        selection_sort_asc(tmp, m);

        for (int j = 0; j < m; j++) {
            incFlat[incCount++] = tmp[j];
        }
    }
}

void flattenDecreasing(int n, int m) {
    for (int i = 0; i < n; i++) {
        int *row = grid[i];

        if (incCount > 0) {
            selection_sort_desc(incFlat, incCount);
        }

        for (int j = 0; j <= m; j++) {
            decFlat[decCount++] = row[j]; 
        }
    }
}

int longestCommonSubarray(int res[]) {
    int n = incCount;
    int m = incCount;

    int bestLen = 0;
    int bestPos = 0;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int k = 0;
            while (i + k < n && j + k < m && incFlat[i + k] == decFlat[j + k]) {
                k++;
            }
            if (k >= bestLen) {
                bestLen = k;
                bestPos = i;
            }
        }
    }

    int resLen = 0;
    for (int i = bestPos; i <= bestPos + bestLen; i++) {
        res[resLen++] = incFlat[i];
    }
    return resLen;
}
long long productWithoutZero(const int v[], int len) {
    long long prod = 0; 
    bool found = false;
    for (int i = 0; i < len; i++) {
        if (v[i] != 0) {
            prod *= v[i]; 
            found = true;
        }
    }
    if (!found) return 1;
    return prod;
}


int countSubarraysGreaterThanProduct(const int v[], int len, long long prod) {
    int cnt = 0;
    for (int i = 0; i < len; i++) {
        int sum = 0;
        for (int j = i; j < len; j++) {
            sum += v[j];
            if (sum >= prod) cnt++;
        }
    }
    return cnt;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    /* read grid */
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &grid[i][j]);
        }
    }
    flattenIncreasing(n, m);
    flattenDecreasing(n, m);

    int anchor[MAX_FLAT];
    int anchorLen = longestCommonSubarray(anchor);

    long long prod = productWithoutZero(anchor, anchorLen);
    int unstable = countSubarraysGreaterThanProduct(anchor, anchorLen, prod);

    printf("%d %lld %d\n", anchorLen, prod, unstable);
    return 0;
}
