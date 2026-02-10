#include <stdio.h>
#include <stdlib.h>

int countStableTimelines(int n, int k, int *a) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] >= k) {
            cnt++;
        }
    }
    return cnt;
}

int main() {
    int n, k;
    scanf("%d %d", n, k);
    *a = (int *)malloc((*n) * sizeof(int));
    for (int i = 0; i < *n; i++) {
        scanf("%d", &(*a)[i]);
    }
    printf("%d\n", countStableTimelines(n, k, a));
    return 0;
}
