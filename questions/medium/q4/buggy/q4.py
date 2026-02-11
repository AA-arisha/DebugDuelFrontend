class SpiralPrinter:
    def spiralOrder(self, matrix):

        n = len(matrix)
        m = len(matrix[0])

        top = 0
        bottom = m - 1   
        left = 0
        right = n - 1    

        res = []

        while top <= bottom or left <= right:  

            for i in range(left, right):  
                res.append(matrix[top][i])

            for i in range(top, bottom + 1):
                res.append(matrix[i][right])
            right += 1  

            for i in range(right, left - 1, -1):
                res.append(matrix[bottom][i])
            bottom += 1  

            for i in range(top, bottom + 1):
                res.append(matrix[i][left])
            left -= 1  

        return res


if __name__ == "__main__":
    n, m = map(int, input().split())
    matrix = [list(map(int, input().split())) for _ in range(n)]

    sp = SpiralPrinter()
    ans = sp.spiralOrder(matrix)

    print(*ans)
