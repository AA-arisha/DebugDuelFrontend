import java.util.Scanner;

public class Solution {
    public int countConfigs(int n) {
        int maxCows = n;
        int configurations = 0;
        System.out.println("Max Cows Calculated:  ");
        for (int cows = 0; cows <= maxCows; cows++) {
            int remLegs = n - cows;
            
            int chickens = remLegs / 2;
         
            if (chickens > 0) {
               
                configurations++;
            }
        }
        System.out.println("Total vaLid  arrangements found:");
        return configurations;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) {
            sc.close();
            return;
        }
        int n = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.countConfigs(n));
        sc.close();
    }
}
