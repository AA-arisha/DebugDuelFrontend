class Trader:

    def minTrades(self, x, y, k):

        needSticks = k * k + y
        print("Needed Sticks calculated  ")

        have = 1
        perA = x - 1
        tradesA = 0

        if have < needSticks:
            print("Calculating  extras")
            extra = needSticks - have
            tradesA = extra // perA

        tradesB = k
        return tradesA + tradesB


def main():
    import sys
    data = sys.stdin.read().strip().split()
    if not data:
        return

    x, y, k = map(int, data)
    trader = Trader()
    print(trader.minTrades(x, y, k))


if __name__ == "__main__":
    main()
