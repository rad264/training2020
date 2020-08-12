function TicTacToe() {
    var thisObj = this;
    this.squares = [[], [], []];
    this.xIsNext = true;
    this.gameOver = false;
    var gameBoard = new GameBoard(document.getElementById("gameArea"), 3, 3, function (x, y) { thisObj.click(x, y) });
    this.click = function(x, y) {
        if (!this.gameOver && this.squares[x][y] === undefined) {
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
    this.isGameOver = function(x, y) {
        return this.checkVertical(x) || this.checkHorizontal(y) || this.checkDiagonal(x,y);
    };
    this.checkVertical = function(x){
        return (this.squares[x][0] === this.squares[x][1]) && (this.squares[x][1] === this.squares[x][2]);
    }
    this.checkHorizontal = function(y){
        return (this.squares[0][y] === this.squares[1][y]) && (this.squares[1][y] === this.squares[2][y]);
    }
    this.checkDiagonal = function(x,y){
        let isTLtoBR = (this.squares[0][0] == this.squares[1][1]) && (this.squares[1][1] === this.squares[2][2]);
        let isBLtoTR = (this.squares[0][2] == this.squares[1][1]) && (this.squares[1][1] === this.squares[2][0]);
        let isInBLtoTR = (x===0 && y===2) || (x===1 && y===1) || (x===2 && y===0);
        return (isTLtoBR && x===y) || (isBLtoTR && isInBLtoTR);
    }
}