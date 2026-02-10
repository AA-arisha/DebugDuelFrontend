// Algorithm to find smallest possible digit
// 1)Since Paradox Verse Kiro must swap at his turn, he will try to have a non-minimum number at the last
// 2)So we first calculate the minimum digit in the string
// 3)Then we see if that minimum exists anywhere except the last position
// 4)If it does, we swap it with that position. Otherwise what do we do? Think

import java.util.*;

class QuantumDuel {
    private StringBuilder cur;

    public QuantumDuel(String s) {
        // ignore this function it is correct anyways
        cur = new StringBuilder(s);
    }

    void paradoxTurn() {
        // bug is in this function

        char mn = (char)('9' + 1); // find the smallest digit

        // missing implementation

        int pos = -1;

        for (int i = 0; i + 1 < cur.length(); i++) {
            if (cur.charAt(i) > mn) {
                pos = i;
                break;
            }
        }

        if (pos == -1) {
            // missing implementation in case we did not find
        } else {
            char temp = cur.charAt(pos);
            cur.setCharAt(pos, cur.charAt(cur.length() - 1));
            cur.setCharAt(cur.length() - 1, temp);
        }
    }

    void omniTurn() {
        // ignore this function, it is correct anyways
        cur.deleteCharAt(cur.length() - 1);
    }

    char play() {
        // there is something missing, some edge case

        boolean isParadoxTurn = true;

        System.out.println("Starting  Duel.. ..");

        while (cur.length() > 1) {
            if (isParadoxTurn) {
                System.out.println("Paradox Verse Kiro turn.. ..");
                paradoxTurn();
            } else {
                System.out.println("Omniverse Verse Kiro turn.. ..");
                omniTurn();
            }
            isParadoxTurn = !isParadoxTurn;
        }
        return cur.charAt(0);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String n = sc.next();
        QuantumDuel duel = new QuantumDuel(n);
        System.out.println(duel.play());
    }
}
