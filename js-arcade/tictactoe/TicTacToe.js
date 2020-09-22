function TicTacToe() {
    var thisObj = this;
    this.squares = [[null, null, null], [null, null, null], [null, null, null]];
    this.xIsNext = true;
    this.gameOver = false;
    var gameBoard = new GameBoard(document.getElementById("gameArea"), 3, 3, function(x, y) {thisObj.click(x, y)});
    this.click = function(x, y) {
        if (!this.gameOver && this.squares[x][y] === null) {
            console.log(this.squares);
            var button = gameBoard.getButton(x, y);
            button.innerHTML = this.xIsNext ? "X" : "O";
            this.squares[x][y] = this.xIsNext;
            if (this.isGameOver(x, y)) {
                this.gameOver = true;
                alert((this.xIsNext ? "X" : "O") + " wins!");
            }
            this.xIsNext = !this.xIsNext;
        }
    };

    this.isGameOver = function (x, y) {
        if (x - 1 >= 0) {
            if (x - 2 >= 0) {
                if (this.squares[x-1][y] !== null && this.squares[x-1][y] == this.IsNext
                    && this.squares[x-2][y] !== null && this.squares[x-2][y] === this.xIsNext) 
                    return true;
            }
            if (x + 1 <= 2 && this.squares[x+1][y] !== null && this.squares[x+1][y] === this.xIsNext) {
                if (this.squares[x-1][y] !== null && this.squares[x-1][y] == this.IsNext
                    && this.squares[x+1][y] !== null && this.squares[x+1][y] === this.xIsNext) 
                    return true;
            }
        }
        if (x + 2 <=2) {
            if (this.squares[x+1][y] !== null && this.squares[x+2][y] !== null 
                && this.squares[x+1][y] === this.xIsNext && this.squares[x+2][y] === this.xIsNext) 
                return true;
        }
        if (y - 1 >= 0) {
            if (y - 2 >= 0) {
                if (this.squares[x][y-1] !== null && this.squares[x][y-1] === this.xIsNext 
                    && this.squares[x][y-2] !== null && this.squares[x][y-2] === this.xIsNext)
                return true;
            }
            if (y + 1 <= 2) {
                if (this.squares[x][y-1] !== null && this.squares[x][y-1] === this.xIsNext 
                    && this.squares[x][y+1] !== null && this.squares[x][y+1] === this.xIsNext)
                return true;
            }
        }
        if (y + 2 <=2) {
            if (this.squares[x][y+1] !== null && this.squares[x][y+2] !== null 
                && this.squares[x][y+1] === this.squares[x][y+2] === this.xIsNext)
            return true;
        }
        if (this.squares[0][0] !== null && this.squares[1][1] !== null && this.squares[2][2] !== null) {
            if (this.squares[0][0] === this.squares[1][1] === this.squares[2][2] === this.xIsNext)
                return true;
        }
        if (this.squares[0][2] !== null && this.squares[1][1] !== null && this.squares[2][0] !== null) {
            if (this.squares[0][2] === this.squares[1][1] === this.squares[2][0] === this.xIsNext)
                return true;
        }
        for (var i = 0; i < 3; i++) {
            if (this.squares[i].some(function (el) {
                return el == null;
              })) {
                  return false;
              }
        }
        return true;
    };
}     