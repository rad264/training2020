function Sudoku(difficulty, gameString, solutionString) {
    var thisObj = this;
    switch (difficulty) {
        case 'easy':
            this.sudokuGame = "080076030700000604046002050400000270205000403039000008060200390307000001090150040";
            this.sudokuSolution = "581476932723591684946832157418365279275918463639724518164287395357649821892153746";
            break;
        case 'intermediate':
            this.sudokuGame = "000020870200400500001600000600901035705030409430508006000002100003004008052010000";
            this.sudokuSolution = "396125874287493561541687392628941735715236489439578216974862153163754928852319647";
            break;
        case 'hard':
            this.sudokuGame = "100050004008903100050000080070405060600000007080607020060000010003709200700020009";
            this.sudokuSolution = "197852634428963175356174982271495368634281597589637421962548713843719256715326849";
            break;
        case 'import':
            this.sudokuGame = gameString;
            this.sudokuSolution = solutionString;
            break;
    }
    
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