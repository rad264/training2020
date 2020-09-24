function Sudoku() {
    var thisObj = this;
    this.sudokuGame = ""2;
    this.gameOver = false;
    var gameBoard = new GameBoardSudoku(document.getElementById("gameArea"), function(x, y) {thisObj.click(x, y)}, this.sudokuGame);
    this.click = function(x, y) {
        if (!this.gameOver) {
            var button = gameBoard.getButton(x, y);

        }
    }
}