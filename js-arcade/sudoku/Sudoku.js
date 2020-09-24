function Sudoku() {
    var thisObj = this;
    this.sudokuGame = "0000000000030000160067035004608120900090080030002079806800690350026000090000000000";
    this.sudokuSolution = "489261573235847169167935284678123945591486732342579816814692357726358491953714628";
    var gameBoard = new GameBoardSudoku(document.getElementById("gameArea"), this.sudokuGame, this.sudokuSolution, function(x, y) {thisObj.click(x, y)});
    this.click = function(x, y) {
        if (typeof(gameBoard.getButtonOrNumber(x, y)) !== 'number') {
            var button = gameBoard.getButtonOrNumber(x, y);
            if (button.state === 9) {
                button.innerHTML = "0";
                button.state = 0;
            } else {
                button.innerHTML = (button.state + 1).toString(); 
                button.state = button.state + 1;  
            }
        }
        if (this.isGameOver()) {
            alert("You win!");
        }
    };
    this.isGameOver = function() {
        if (gameBoard.toString() === this.sudokuSolution) return true;
        return false;
    };
}