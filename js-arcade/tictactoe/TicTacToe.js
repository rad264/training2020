function TicTacToe() {
    var thisObj = this;
    this.squares = [[], [], []];
    this.xIsNext = true;
    this.gameOver = false;
    var playerXCoord = new Array();
    var playerOCoord = new Array();
    var playerXCol = new Array();
    var playerXRow = new Array();
    var playerOCol = new Array();
    var playerORow = new Array();
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

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

    function rowColCheck(array) {
        for (var i = 0; i < array.length; i++) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                {
                    if (array[i] == array[j]) {
                        count++;
                    }
                }
                if (count >= 3) {
                   return true;
                }
            }    
        }
        return false;
    }

    function diagCheckLeft(array) {
        for (var i = 0; i < array.length; i++) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                {
                    console.log(array[i]);
                    if (arrayEquals(array[i],[0,0]) ||
                        arrayEquals(array[i],[1,1]) ||
                        arrayEquals(array[i],[2,2])) {
                        count++;     
                        console.log(count);
                    }
                }
                if (count >= 3) {
                    return true;
                }                   
            }
        }
    }

    function diagCheckRight(array){
        for (var i = 0; i < array.length; i++) {
            var count = 0;
            for (var j = 0; j < array.length; j++) {
                {
                    console.log(array[i]);
                    if (arrayEquals(array[i],[0,2]) ||
                        arrayEquals(array[i],[2,0])) {
                        count++;     
                        console.log(count);
                    }
                }
                if (count >= 3) {
                    return true;
                }                   
            }
        }
    }

    this.isGameOver = function(x, y) {

        if(this.xIsNext) {
            playerXCoord.push([x, y]);
            playerXCol.push(x);
            playerXRow.push(y);
            if(playerXCol.length >= 3|| playerXRow.length >= 3) {
                return (rowColCheck(playerXCol) || rowColCheck(playerXCol)|| rowColCheck(playerXCol)
                || rowColCheck(playerXRow) || rowColCheck(playerXRow)|| rowColCheck(playerXRow)
                || diagCheckLeft(playerXCoord) || diagCheckRight(playerXCoord));
            }
        }
        else {
            playerOCoord.push([x, y]);
            playerOCol.push(x);
            playerORow.push(y);
            if(playerOCol.length >= 3 || playerORow.length >= 3) {
                return (rowColCheck(playerOCol) || rowColCheck(playerOCol)|| rowColCheck(playerOCol)
                || rowColCheck(playerORow) || rowColCheck(playerORow)|| rowColCheck(playerORow)
                || diagCheckLeft(playerOCoord) || diagCheckRight(playerOCoord));
            }
        }
        return false;
    };
}