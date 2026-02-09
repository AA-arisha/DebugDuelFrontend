#include <stdio.h>

double computeScore(int n, int a[]) {
    double score = 0.0;
    for (int i = 0; i < n; i++) {
        score += (a[i] - a[i - 1]) / (a[i + 1] - a[i]);
    }

    return score;
}

int main() {
    int n;
    scanf("%d", &n);

    int a[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    printf("%lf\n", computeScore(n, a));

    return 0;
}
