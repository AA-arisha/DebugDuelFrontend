#include <stdio.h>

long long minTrades(long long x, long long y, long long k) {

    long long needSticks = k * k + y;
    printf("Needed Sticks calculated  \n");

    long long have = 1;
    long long perA = x - 1;
    long long tradesA = 0;

    if (have < needSticks) {
        printf("Calculating  extras\n");
        long long extra = needSticks - have;
        tradesA = extra / perA;
    }

    long long tradesB = k;
    return tradesA + tradesB;
}

int main() {

    long long x, y, k;
    if (scanf("%lld %lld %lld", &x, &y, &k) != 3)
        return 0;

    printf("%lld\n", minTrades(x, y, k));
    return 0;
}
