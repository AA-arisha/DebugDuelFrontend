class TemporalStabilityAnalyzer:
    def __init__(self):
        self.n = 0
        self.k = 0
        self.a = []

    def read_input(self):
        self.n, self.k = map(int, input().split())
        self.a = list(map(int, input().split()))

    def count_stable_timelines(self):
        cnt = 0
        for x in self.a:
            if x >= self.k:
                cnt += 1
        return cnt

    def process(self):
        print(self.count_stable_timelines())


analyzer = TemporalStabilityAnalyzer()
analyzer.read_input()
analyzer.process()
