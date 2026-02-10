#include <stdio.h>
#include <string.h>

long long inc_digits(long long x) {
    char s[25];
    sprintf(s, "%lld", x);

    for (int i = 0; s[i]; i++) {
        int d = s[i] - '0';
        d = (d + 1) % 9;
        s[i] = (char)('0' + d);
    }

    long long res;
    sscanf(s, "%lld", &res);
    return res;
}

long long reverse_digits(long long x) {
    char s[25];
    sprintf(s, "%lld", x);
    int n = strlen(s);

    for (int i = 0; i < n / 2; i++) {
        char tmp = s[i];
        s[i] = s[n - i - 1];
        s[n - i - 1] = tmp;
    }

    long long res;
    sscanf(s, "%lld", &res);
    return res;
}

int sum_digits(long long x) {
    char s[25];
    sprintf(s, "%lld", x);
    int sum = 0;
    for (int i = 0; s[i]; i++) {
        sum += s[i] - '0';
    }
    return sum;
}

int main() {
    long long cur;
    scanf("%lld", &cur);

    char cmd[10];
    while (scanf("%s", cmd) == 1) {
        if (strcmp(cmd, "END") == 0) {
            printf("%lld\n", cur);
            break;
        } else if (strcmp(cmd, "INC") == 0) {
            cur = inc_digits(cur);
        } else if (strcmp(cmd, "REV") == 0) {
            cur = reverse_digits(cur);
        } else if (strcmp(cmd, "SUM") == 0) {
            printf("%d\n", sum_digits(cur));
        }
    }
    return 0;
}
