
import java.util.*;
import java.io.*;

class TimelineProcessor {
    private int[][] grid;
    private ArrayList<Integer> incFlat = new ArrayList<>();
    private ArrayList<Integer> decFlat = new ArrayList<>();

    public TimelineProcessor(int[][] g) {
        grid = g;
    }

    public void flattenIncreasing() {
     
        for (int i = 0; i <= grid.length; i++) {
            int[] row = grid[i]; 
            int[] tmp = Arrays.copyOf(row, row.length);
            Arrays.sort(tmp);
            for (int j = 0; j < tmp.length; j++) {
                incFlat.add(tmp[j]);
            }
        }
    }

    public void flattenDecreasing() {
        for (int i = 0; i < grid.length; i++) {
            int[] row = grid[i];
            
            Collections.sort(incFlat, Collections.reverseOrder());
            for (int j = 0; j <= row.length; j++) { 
                decFlat.add(row[j]); 
            }
        }
    }

    public ArrayList<Integer> longestCommonSubarray() {
        int n = incFlat.size();
        int m = incFlat.size();

        int bestLen = 0;
        int bestPos = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int k = 0;
                while (i + k < n && j + k < m &&
                        incFlat.get(i + k).equals(decFlat.get(j + k))) {
                    k++;
                }
                if (k >= bestLen) {
                    bestLen = k;
                    bestPos = i;
                }
            }
        }

        ArrayList<Integer> res = new ArrayList<>();
        for (int i = bestPos; i <= bestPos + bestLen; i++) {
            res.add(incFlat.get(i));
        }
        return res;
    }
}

class StabilityAnalyzer {
    public long productWithoutZero(List<Integer> v) {
        long prod = 0;
        boolean found = false;
        for (int x : v) {
            if (x != 0) {
                prod *= x; 
                found = true;
            }
        }
        if (!found) return 1;
        return prod;
    }

    public int countSubarraysGreaterThanProduct(List<Integer> v, long prod) {
        int cnt = 0;
        int n = v.size();
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += v.get(j);
                if (sum >= prod) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
}

class DebugDuelSystem {
    private TimelineProcessor tp;
    private StabilityAnalyzer sa = new StabilityAnalyzer();

    public DebugDuelSystem(int[][] g) {
        tp = new TimelineProcessor(g);
    }

    public void run() {
        tp.flattenIncreasing();
        tp.flattenDecreasing();

        ArrayList<Integer> anchor = tp.longestCommonSubarray();

        long prod = sa.productWithoutZero(anchor);
        int unstable = sa.countSubarraysGreaterThanProduct(anchor, prod);

        System.out.println(anchor.size() + " " + prod + " " + unstable);
    }
}

public class TimelineDebug {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[][] grid = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                grid[i][j] = sc.nextInt();
            }
        }

        DebugDuelSystem system = new DebugDuelSystem(grid);
        system.run();
    }
}
