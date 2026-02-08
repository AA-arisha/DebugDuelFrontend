#include <stdio.h>
#include <stdlib.h>

struct TemporalStabilityAnalyzer {
    int n, k;
    int *a;
};

void readInput(struct TemporalStabilityAnalyzer *t) {
    scanf("%d %d", &t->n, &t->k);
    t->a = (int *)malloc(t->n * sizeof(int));
    for (int i = 0; i < t->n; i++) {
        scanf("%d", &t->a[i]);
    }
}

int countStableTimelines(struct TemporalStabilityAnalyzer *t) {
    int cnt = 0;
    for (int i = 0; i < t->n; i++) {
        if (t->a[i] >= t->k) {
            cnt++;
        }
    }
    return cnt;
}

int main() {
    struct TemporalStabilityAnalyzer t;
    readInput(&t);
    printf("%d\n", countStableTimelines(&t));
    return 0;
}
