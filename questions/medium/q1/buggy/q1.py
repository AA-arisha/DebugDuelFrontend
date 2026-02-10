# Algorithm to find smallest possible digit
# 1)Since Paradox Verse Kiro must swap at his turn, he will try to have a non-minimum number at the last
# 2)So we first calculate the minimum digit in the string
# 3)Then we see if that minimum exists anywhere except the last position
# 4)If it does, we swap it with that position. Otherwise what do we do? Think

class QuantumDuel:
    def __init__(self, s):
        # ignore this function it is correct anyways
        self.cur = list(s)

    def paradoxTurn(self):
        # bug is in this function

        mn = chr(ord('9') + 1)  # find the smallest digit

        # missing implementation

        pos = -1

        for i in range(len(self.cur) - 1):
            if self.cur[i] > mn:
                pos = i
                break

        if pos == -1:
            # missing implementation in case we did not find
            pass
        else:
            self.cur[pos], self.cur[-1] = self.cur[-1], self.cur[pos]

    def omniTurn(self):
        # ignore this function, it is correct anyways
        self.cur.pop()

    def play(self):
        # there is something missing, some edge case

        isParadoxTurn = True

        print("Starting  Duel.. ..")

        while len(self.cur) > 1:
            if isParadoxTurn:
                print("Paradox Verse Kiro turn.. ..")
                self.paradoxTurn()
            else:
                print("Omniverse Verse Kiro turn.. ..")
                self.omniTurn()

            isParadoxTurn = False if isParadoxTurn else True

        return self.cur[0]

if __name__ == "__main__":
    n = input()
    duel = QuantumDuel(n)
    print(duel.play())
