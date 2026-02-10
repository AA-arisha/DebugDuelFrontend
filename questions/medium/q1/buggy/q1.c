// Algorithm to find smallest possible digit
// 1)Since Paradox Verse Kiro must swap at his turn, he will try to have a non-minimum number at the last
// 2)So we first calculate the minimum digit in the string
// 3)Then we see if that minimum exists anywhere except the last position
// 4)If it does, we swap it with that position. Otherwise what do we do? Think

#include <stdio.h>
#include <string.h>

char cur[20];

void paradoxTurn() {
    // bug is in this function

    char mn = '9' + 1; // find the smallest digit

    // missing implementation

    int pos = -1;
    int len = strlen(cur);

    for (int i = 0; i + 1 < len; i++) {
        if (cur[i] > mn) {
            pos = i;
            break;
        }
    }

    if (pos == -1) {
        // missing implementation in case we did not find
    } else {
        char temp = cur[pos];
        cur[pos] = cur[len - 1];
        cur[len - 1] = temp;
    }
}

void omniTurn() {
    // ignore this function, it is correct anyways
    int len = strlen(cur);
    cur[len - 1] = '\0';
}

char play() {
    // there is something missing, some edge case

    int isParadoxTurn = 1;

    printf("Starting  Duel.. ..\n");

    while (strlen(cur) > 1) {
        if (isParadoxTurn) {
            printf("Paradox Verse Kiro turn.. ..\n");
            paradoxTurn();
        } else {
            printf("Omniverse Verse Kiro turn.. ..\n");
            omniTurn();
        }
        isParadoxTurn = isParadoxTurn ? 0 : 1;
    }
    return cur[0];
}

int main() {
    scanf("%s", cur);
    printf("%c\n", play());
    return 0;
}
