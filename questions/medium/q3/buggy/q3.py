class Solution:
    def countConfigs(self, n: int) -> int:
        maxCows = n
        configurations = 0
        print("Max Cows Calculated:  ")
        for cows in range(maxCows + 1):
            remLegs = n - cows
            

            chickens = remLegs // 2
       

            if chickens > 0:
                
                configurations += 1

        print("Total vaLid  arrangements found:")
        return configurations

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip().split()
    if not data:
        sys.exit(0)
    n = int(data[0])
    sol = Solution()
    print(sol.countConfigs(n))
