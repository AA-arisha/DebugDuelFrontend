class TemporalStabilityAnalyzer:
    def count_stable_timelines(self, n, k, a):
        cnt = 0
        for x in a:
            if x >= k:
                cnt += 1
        return cnt

if __name__ == "__main__":
    n, k = map(int, input().split())
    a = list(map(int, input().split()))

    analyzer = TemporalStabilityAnalyzer()
    print(analyzer.count_stable_timelines(n, k, a))
