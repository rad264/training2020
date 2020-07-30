function MineSweeper(difficulty) {
    var thisObj = this;

    switch (difficulty) {
        case 1:
            this.M = 16;
            this.N = 16;
            this.numOfMines = 40;
            break;
        case 2:
            this.M = 30;
            this.N = 16;
            this.numOfMines = 99;
            break;
        default:
            this.M = 8;
            this.N = 8;
            this.numOfMines = 10;
    }
    this.flags = this.numOfMines;
    document.getElementById("flags").innerHTML = this.flags;
    this.board = Array(this.M).fill().map(() => Array(this.N).fill());
    this.gameOver = false;
    this.firstClick = true;

    var gameBoard = new GameBoard(
        document.getElementById("gameArea"),
        this.M, this.N,
        function(x, y) {
            thisObj.click(x, y);
        },
        function(x, y) {
            thisObj.rightClick(x, y);
        }
    );

    this.rightClick = function(x, y) {
        if (!this.gameOver) {
            var buttonHTML = gameBoard.getButton(x, y).innerHTML;
            if (buttonHTML == '' && this.flags > 0) {
                this.updateSquare(x, y, 'F');
                this.flags--;
            } else if (buttonHTML == 'F') {
                this.updateSquare(x, y, '');
                this.flags++;
            }
            this.updateFlags();
        }
    }

    this.click = function(x, y) {

        if (this.firstClick) {
            this.generateMines(x, y);
            this.firstClick = false;
        }
        var buttonHTML = gameBoard.getButton(x, y).innerHTML;
        if (!this.gameOver && buttonHTML == '') {
            this.updateBoard(x, y);
            if (this.gameOver) {
                this.revealMines();
                this.updateSquare(x, y, "X");
                alert("Game Over");
            }
        }
    };

    this.startTimer = function() {
        this.timer = setInterval(
            function() {
                document.getElementById("time").innerHTML = this.time++;
            }, 1000
        );
    };

    function resetTimer() {
        clearInterval(this.timer);
        this.time = 0;
        document.getElementById("time").innerHTML = '0';
    }

    this.updateFlags = function() {
        document.getElementById("flags").innerHTML = this.flags;
    }

    this.updateBoard = function(x, y) {

        if (this.board[x][y] == 'M') {
            this.gameOver = true;
            return;
        }
        this.directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ];
        this.recur(x, y);
    };

    this.recur = function(x, y) {

        if (this.board[x][y] !== undefined) {
            return;
        }
        adj = 0
        for (d of this.directions) {
            dx = d[0], dy = d[1];
            nx = x + dx, ny = y + dy;
            if (0 <= nx && nx < this.M && 0 <= ny && ny < this.N && this.board[nx][ny] == 'M') {
                adj++;
            }
        }
        if (adj > 0) {
            this.board[x][y] = adj;
            this.updateSquare(x, y, adj.toString());
        } else {
            this.board[x][y] = 'B';
            this.updateSquare(x, y, '-');
            for (d of this.directions) {
                dx = d[0], dy = d[1];
                nx = x + dx, ny = y + dy;
                if (0 <= nx && nx < this.M && 0 <= ny && ny < this.N) {
                    this.recur(nx, ny);
                }
            }
        }
    };

    this.updateSquare = function(x, y, icon) {
        var button = gameBoard.getButton(x, y);
        button.innerHTML = icon;
    };

    this.generateMines = function(x, y) {
        this.minePositions = this.generateMinePositions(x, y);
        for (p of this.minePositions) {
            this.board[p[0]][p[1]] = 'M';
            // this.updateSquare(p[0], p[1], 'M');
        }
    };

    this.revealMines = function() {
        for (p of this.minePositions) {
            this.updateSquare(p[0], p[1], 'M');
        }
    }

    this.generateMinePositions = function(x, y) {
        var positions = [],
            xpositions = [x],
            ypositions = [y];
        for (i = 0; i < this.numOfMines; i++) {
            x = this.getRandom(this.M);
            y = this.getRandom(this.N);
            var xloc = xpositions.indexOf(x);
            if (xloc > -1) {
                while (y == ypositions[xloc]) {
                    y = this.getRandom(this.N);
                }
            }
            xpositions.push(x);
            ypositions.push(y);
            positions.push([x, y]);
        }
        return positions;
    };

    this.getRandom = function(limit) {
        return Math.floor(Math.random() * limit);
    };

}
