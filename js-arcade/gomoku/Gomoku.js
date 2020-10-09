function Gomoku() {
    var canvasEl = document.getElementById("canvas");
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = 35 * 16;
    canvasEl.height = 35 * 16;
    var thisObj = this;
    this.gridSize = 15;
    this.squares = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.blackIsNext = true;
    this.gameOver = false;
    this.firstClick = true;
    var gameBoard = new DrawBoard(ctx);
    canvasEl.addEventListener("click", (e) => this.clickChessBoard(e));
    document.getElementById("whos_turn").style.display = "block";

    this.placeStone = function(x, y) {
        if (x < 0 || x >= 15 || y < 0 || y >= 15 || this.squares[x][y] !== undefined) {
          throw "Out of Bound!";
        }
        this.squares[x][y] = this.blackIsNext ? 1 : 2;
        //console.log('place');
        gameBoard.drawPiece(x, y, !this.blackIsNext);
        this.blackIsNext = !this.blackIsNext;
        let whosTurn = this.blackIsNext? "Black's": "White's";
        document.getElementById("whos_turn").innerHTML = whosTurn + " Turn";
    }
    
    this.isGameOver = function(x, y) {
        if (this.checkVerticalWin(x, y)) { 
            return true;
        }
        if (this.checkHorizontalWin(x, y)) { 
            return true;
        }
        if (this.checkUpDiagnalWin(x, y)) { 
            return true;
        }
        if (this.checkDownDiagnalWin(x,y)) {
            return true;
        }
        return false;
    }
    
    this.checkHorizontalWin = function(x, y) {  
        let counter = 0;
        for (let col = y - 4; col <= y + 4; col++) {
            if (col < 0) continue;
            if (col >= this.gridSize) break;
            if (this.squares[x][col] === this.squares[x][y]) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter === 5) {
                return true;
            }
        }
        return false;
    }

    this.checkVerticalWin = function(x, y) {   
        let counter = 0;
        for (let row = x - 4; row <= x + 4; row++) {
            if (row < 0) continue;
            if (row >= this.gridSize) break;
            if (this.squares[row][y] === this.squares[x][y]) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter === 5) return true;
        }
        return false;
    }

    this.checkUpDiagnalWin = function(x, y) {   
        let counter = 0;
        for (let i = -4; i <= 4; i++) {
            const currRow = x + i;
            const currCol = y - i;
            if (currRow < 0 || currCol < 0) continue;
            if (currRow >= this.gridSize || currCol >= this.gridSize) break;
            if (this.squares[currRow][currCol] === this.squares[x][y]) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter === 5) return true;
        }
        return false;
    }

    this.checkDownDiagnalWin = function(x, y) {   
        let counter = 0;
        for (let i = -4; i <= 4; i++) {
            const currRow = x + i;
            const currCol = y + i;
            if (currRow < 0 || currCol < 0) continue;
            if (currRow >= this.gridSize || currCol >= this.gridSize) break;
            if (this.squares[currRow][currCol] === this.squares[x][y]) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter === 5) return true;
        }
        return false;
    }

    this.clickChessBoard = (e) => {
        //console.log('click');
        const xPosition = e.clientY - canvasEl.offsetTop - 35;
        const yPosition = e.clientX - canvasEl.offsetLeft - 35;
        console.log(e.clientY);
        console.log(e.clientX);
        let i = Math.round(xPosition / 35);
        let j = Math.round(yPosition / 35);
        if (!this.gameOver) {
            this.placeStone(i, j);
            //console.log(this.gameOver);
            if (this.isGameOver(i, j)) {
                this.gameOver = true;
                alert((this.blackIsNext ? "White" : "Black") + " wins!");
            }
        }
    }
}