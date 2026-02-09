import java.util.*;

class CalibrationEngine {

    public double computeScore(int n, int[] a) {
        int score = 0.0;
        for (int i = 0; i < n; i++) {
            score += (a[i] - a[i - 1]) / (a[i + 1] - a[i]);
        }

        return score;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        CalibrationEngine engine = new CalibrationEngine();
        System.out.println(engine.computeScore(n, a));
    }
}
