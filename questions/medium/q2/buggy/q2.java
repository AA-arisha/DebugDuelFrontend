import java.util.*;

class Trader {

    public long minTrades(long x, long y, long k) {

        long needSticks = k * k + y;
        System.out.println("Needed Sticks calculated  ");

        long have = 1;
        long perA = x - 1;
        long tradesA = 0;

        if (have < needSticks) {
            System.out.println("Calculating  extras");
            long extra = needSticks - have;
            tradesA = extra / perA;
        }

        long tradesB = k;
        return tradesA + tradesB;
    }
}

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) {
            sc.close();
            return;
        }

        long x = sc.nextLong();
        long y = sc.nextLong();
        long k = sc.nextLong();
        sc.close();

        Trader trader = new Trader();
        System.out.println(trader.minTrades(x, y, k));
    }
}
