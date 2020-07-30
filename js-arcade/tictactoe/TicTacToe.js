function TicTacToe() {
    let width = 3
    let height = 3

    var thisObj = this;
    this.squares = [[], [], []];
    this.xIsNext = true;
    this.gameOver = false;
    var gameBoard = new GameBoard(document.getElementById("gameArea"), width, height, function (x, y) { thisObj.click(x, y) });

    this.click = function (x, y) {
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
    this.isGameOver = function (x, y) {
        let current_player = this.xIsNext ? "X" : "O";
        console.log(current_player)

        //Check row
        for (i = 0; i < width; i++) {
            if (!(gameBoard.getButton(i, y).innerHTML === current_player)) {
                break
            }
            if (i === (width - 1)) {
                return true
            }
        }

        //Check column
        for (i = 0; i < height; i++) {
            if (!(gameBoard.getButton(x, i).innerHTML === current_player)) {
                break
            }
            if (i === (height - 1)) {
                return true
            }
        }

        //check diagonal
        if (x === y) {
            for (i = 0; i < width; i++) {
                if (!(gameBoard.getButton(i, i).innerHTML === current_player)) {
                    break
                }
            }
            if (i === (width)) {
                return true
            }
        }

        //check cross diagonal
        if ((x+y) === ((width - 1))) {

            for (i = 0; i < width; i++) {
                if (!(gameBoard.getButton(i, ((width -1 ) -i)).innerHTML === current_player)) {
                    break
                }
            }
            console.log(i)
            if (i === (width)) {
                return true
            }
        }

    };

}     