#include <stdio.h>

int countConfigs(int n) {
    int maxCows = n;
    int configurations = 0;
    printf("Max Cows Calculated:  \n");
    for (int cows = 0; cows <= maxCows; ++cows) {
        int remLegs = n - cows;
      

        int chickens = remLegs / 2;
      

        if (chickens > 0) {
           
            configurations++;
        }
    }
    printf("Total vaLid  arrangements found:\n");
    return configurations;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int ans = countConfigs(n);
    printf("%d\n", ans);
    return 0;
}
