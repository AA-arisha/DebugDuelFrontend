import java.util.*;

class TimelineProcessor {

    long incDigits(long x) {
        char[] s = Long.toString(x).toCharArray();
        for (int i = 0; i < s.length; i++) {
            int d = s[i] - '0';
            d = (d + 1) % 9;
            s[i] = (char) ('0' + d);
        }
        return Long.parseLong(new String(s));
    }

    long reverseDigits(long x) {
        String s = new StringBuilder(Long.toString(x)).reverse().toString();
        return Long.parseLong(s);
    }

    int sumDigits(long x) {
        int sum = 0;
        for (char c : Long.toString(x).toCharArray()) {
            sum += c - '0';
        }
        return sum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long cur = sc.nextLong();

        TimelineProcessor tp = new TimelineProcessor();

        while (sc.hasNext()) {
            String cmd = sc.next();
            if (cmd.equals("END")) {
                System.out.println(cur);
                break;
            } else if (cmd.equals("INC")) {
                cur = tp.incDigits(cur);
            } else if (cmd.equals("REV")) {
                cur = tp.reverseDigits(cur);
            } else if (cmd.equals("SUM")) {
                System.out.println(tp.sumDigits(cur));
            }
        }
    }
}
