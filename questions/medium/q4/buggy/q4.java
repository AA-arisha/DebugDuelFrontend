import java.util.*;

class SpiralPrinter {

    public List<Integer> spiralOrder(int[][] matrix) {

        int n = matrix.length;
        int m = matrix[0].length;

        int top = 0;
        int bottom = m - 1;  
        int left = 0;
        int right = n - 1;   

        List<Integer> res = new ArrayList<>();

        while (top <= bottom || left <= right) { 

            for (int i = left; i < right; i++) {
                res.add(matrix[top][i]);
            }

            for (int i = top; i <= bottom; i++) {
                res.add(matrix[i][right]);
            }
            right++;  

            for (int i = right; i >= left; i--) {
                res.add(matrix[bottom][i]);
            }
            bottom++; 

            for (int i = top; i <= bottom; i++) {
                res.add(matrix[i][left]);
            }
            left--;   
        }

        return res;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();

        int[][] matrix = new int[n][m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                matrix[i][j] = sc.nextInt();

        SpiralPrinter sp = new SpiralPrinter();
        List<Integer> ans = sp.spiralOrder(matrix);

        for (int x : ans)
            System.out.print(x + " ");
    }
}
