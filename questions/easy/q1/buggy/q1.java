import java.util.*;

class TemporalStabilityAnalyzer {
    private int n, k;
    private int[] a;

    public void readInput(Scanner sc) {
        n = sc.nextInt();
        k = sc.nextInt();
        a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
    }

    public int countStableTimelines() {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] >= k) {   
                cnt++;
            }
        }
        return cnt;
    }

    public void process() {
        System.out.println(countStableTimelines());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TemporalStabilityAnalyzer analyzer = new TemporalStabilityAnalyzer();
        analyzer.readInput(sc);
        analyzer.process();
    }
}
