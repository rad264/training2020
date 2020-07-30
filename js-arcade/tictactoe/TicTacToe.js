function TicTacToe() {
    var thisObj = this;
    this.squares = [
        [],
        [],
        []
    ];
    this.L = 3;
    this.xIsNext = true;
    this.gameOver = false;
    this.turns = 0;
    var gameBoard = new GameBoard(
        document.getElementById("gameArea"),
        this.L, this.L,
        function(x, y) {
            thisObj.click(x, y)
        });
    this.click = function(x, y) {
        if (!this.gameOver && this.squares[x][y] === undefined) {
            var button = gameBoard.getButton(x, y);
            button.innerHTML = this.xIsNext ? "X" : "O";
            this.squares[x][y] = this.xIsNext;
            if (this.isGameOver(x, y)) {
                this.gameOver = true;
                alert((this.xIsNext ? "X" : "O") + " wins!");
            }
            this.turns++;
            this.xIsNext = !this.xIsNext;
        }
        if (!this.gameOver && this.turns == this.L * this.L)
            alert("Tie.");
    };
    this.isGameOver = function(x, y) {
        return (
            this.checkRow(x, y) ||
            this.checkColumn(x, y) ||
            this.checkUpDiag(x, y) ||
            this.checkDownDiag(x, y)
        )
    };

    this.checkRow = function(x, y) {
        for (i = 0; i < this.L; i++) {
            if (this.squares[i][y] != this.xIsNext)
                return false;
        }
        console.log("row found.");
        return true;
    };

    this.checkColumn = function(x, y) {
        for (i = 0; i < this.L; i++) {
            if (this.squares[x][i] != this.xIsNext)
                return false;
        }
        console.log("column found.");
        return true;
    };

    this.checkUpDiag = function(x, y) {
        for (i = 0, j = this.L - 1; i < this.L, j >= 0; i++, j--) {
            if (this.squares[i][j] != this.xIsNext)
                return false;
        }
        console.log("up diag found.");
        return true;
    };

    this.checkDownDiag = function(x, y) {
        for (i = 0, j = 0; i < this.L, j < this.L; i++, j++) {
            if (this.squares[i][j] != this.xIsNext)
                return false;
        }
        console.log("down diag found.")
        return true;
    };

}
