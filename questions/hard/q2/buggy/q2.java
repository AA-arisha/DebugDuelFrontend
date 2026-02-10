/*

 Short hints:
  - Only indices with s[i] != t[i] matter; classify them by type carefully.
  - Watch which count you call "zero" and which "one".
  - The pair-cost and leftover pair-cost formulas must match the intended options:
      pair: min(swapCost, 2*flipCost, crossCost + swapCost)
      leftover pair (two of same type): min(2*flipCost, crossCost + swapCost)
  - If an odd leftover remains, the extra cost is flipCost (not swapCost).
  - Compare the greedy-pairing result against the naive "flip all" baseline using min(), not max().
  - Edge cases: no mismatches, only one type of mismatch, very large costs.
*/
import java.util.*;
import java.io.*;

class Solver {
    public long minimumCost(final String s, final String t, int flipCost, int swapCost, int crossCost) {
        int n = (int) s.length();
        int zero = 0, one = 0;
        for (int i = 0; i < n; ++i) {
            if (s.charAt(i) != t.charAt(i)) {
                if (s.charAt(i) == '1') zero++;
                else one++;
            }
        }

        if (zero == 0 && one == 0) return 0;

        long baseline = (long)(zero + one) * flipCost;

        if (zero == 0 || one == 0) return 0;

        int pairs = Math.min(zero, one);
        int rest = Math.abs(zero - one);

        long pairCost = Math.min((long) swapCost,
                                 Math.min(2L * flipCost, (long) crossCost + flipCost));

        long cur = pairs * pairCost;

        if (rest > 0) {
            long restPair = Math.min(2L * flipCost, (long) crossCost + swapCost);
            cur += (rest / 2) * restPair;
            if (rest % 2 == 1) {
                cur += swapCost;
            }
        }

        return Math.max(baseline, cur);
    }
}

public class TimelineMinCost {
    public static void main(String[] args) throws Exception {
       
        String s = sc.next();
        String t = sc.next();
        int flipC = sc.nextInt();
        int swapC = sc.nextInt();
        int crossC = sc.nextInt();
        Solver sol = new Solver();
        System.out.println(sol.minimumCost(s, t, flipC, swapC, crossC));
        
        sc.close();
    }
}
