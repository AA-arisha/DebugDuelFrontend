class CalibrationEngine:
    def compute_score(self, n, a):
        score = 0
        for i in range(0, n):
            score += (a[i] - a[i - 1]) // (a[i + 1] - a[i])
        return score


if __name__ == "__main__":
    n = int(input())
    a = list(map(int, input().split()))

    engine = CalibrationEngine()
    print(engine.compute_score(n, a))
