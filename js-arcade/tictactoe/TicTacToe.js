function TicTacToe() {
    var thisObj = this;
    this.squares = [[], [], []];
    this.xIsNext = true;
    this.gameOver = false;
    var gameBoard = new GameBoard(document.getElementById("gameArea"), 3, 3, function(x, y) {thisObj.click(x, y)});
    this.click = function(x, y) {
        if (!this.gameOver && this.squares[x][y] === undefined) {
            var button = gameBoard.getButton(x, y);
            button.innerHTML = this.xIsNext ? "X" : "O";
            this.squares[x][y] = this.xIsNext;
            if (this.isGameOver(x, y)) {
                this.gameOver = true;
                alert((this.xIsNext ? "X" : "O") + " wins!");
            } else if (this.isTie()) {
				this.gameOver = true;
				alert("It's a tie!");
			}
            this.xIsNext = !this.xIsNext;
        }
    };
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6], 
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
    this.isGameOver = function (x, y) {
        for (var combo of winningCombos){
			if (combo.includes(3*y+x)) {
				let a = this.squares[combo[0]%3][Math.floor(combo[0]/3)];
				let b = this.squares[combo[1]%3][Math.floor(combo[1]/3)];
				let c = this.squares[combo[2]%3][Math.floor(combo[2]/3)];
				if (a !== undefined && b !== undefined && c !== undefined) {
					if (a === b && a === c) {
						return true;
					}
				}
			} else continue;
	        
		}
		for (var row = 0; row < 3; row++) {
			for (var col = 0; col < 3; col++) {
				if (this.squares[row][col] === undefined) return false;
			}
		}
		return true;
    };
	this.isTie = function () {
		for (var row = 0; row < 3; row++) {
			for (var col = 0; col < 3; col++) {
				if (this.squares[row][col] === undefined) return false;
			}
		}
		return true;
	}

}