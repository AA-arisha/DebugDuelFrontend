class TimelineProcessor:
    def inc_digits(self, x):
        s = list(str(x))
        for i in range(len(s)):
            d = ord(s[i]) - ord('0')
            d = (d + 1) % 9
            s[i] = chr(ord('0') + d)
        return int("".join(s))

    def reverse_digits(self, x):
        return int(str(x)[::-1])

    def sum_digits(self, x):
        return sum(int(c) for c in str(x))


if __name__ == "__main__":
    cur = int(input())
    tp = TimelineProcessor()

    while True:
        cmd = input().strip()
        if cmd == "END":
            print(cur)
            break
        elif cmd == "INC":
            cur = tp.inc_digits(cur)
        elif cmd == "REV":
            cur = tp.reverse_digits(cur)
        elif cmd == "SUM":
            print(tp.sum_digits(cur))
