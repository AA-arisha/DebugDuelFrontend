import java.util.*;

class TemporalStabilityAnalyzer {

    public int countStableTimelines(int n, int k, int[] a) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] >= k) {
                cnt++;
            }
        }
        return cnt;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int k = sc.nextInt();

        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        TemporalStabilityAnalyzer analyzer = new TemporalStabilityAnalyzer();
        System.out.println(analyzer.countStableTimelines(n, k, a));
    }
}
