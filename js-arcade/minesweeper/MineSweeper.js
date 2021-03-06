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
    this.mines = Array(this.M).fill().map(() => Array(this.N).fill());
    this.gameOver = false;
    this.firstClick = true;

    resetTimer();
    startTimer();

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
                updateSquare(x, y, 'F');
                this.flags--;
            } else if (buttonHTML == 'F') {
                updateSquare(x, y, '');
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
        if (!this.gameOver && this.board[x][y] === undefined) {
            if (this.isGameOver(x, y)) {
                this.revealMines();
                updateSquare(x, y, "X");
                alert("Game Over");
            }
        }
    };

    this.updateFlags = function() {
        document.getElementById("flags").innerHTML = this.flags;
    }

    this.isGameOver = function(x, y) {
        if (this.mines[x][y] == 'M') {
            this.gameOver = true;
            return true;
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
        return false;
    }

    this.recur = function(x, y) {

        if (this.board[x][y] !== undefined) {
            return;
        }
        adj = 0
        for (d of this.directions) {
            dx = d[0], dy = d[1];
            nx = x + dx, ny = y + dy;
            if (0 <= nx && nx < this.M && 0 <= ny && ny < this.N && this.mines[nx][ny] == 'M') {
                adj++;
            }
        }
        if (adj > 0) {
            this.board[x][y] = adj;
            updateSquare(x, y, adj.toString());
        } else {
            this.board[x][y] = 0;
            updateSquare(x, y, '-');
            for (d of this.directions) {
                dx = d[0], dy = d[1];
                nx = x + dx, ny = y + dy;
                if (0 <= nx && nx < this.M && 0 <= ny && ny < this.N) {
                    this.recur(nx, ny);
                }
            }
        }
    };


    function updateSquare(x, y, icon) {
        var button = gameBoard.getButton(x, y);
        button.innerHTML = icon;
    };

    this.generateMines = function(x, y) {
        this.minePositions = this.generateMinePositions(x, y);
        for (p of this.minePositions) {
            this.mines[p[0]][p[1]] = 'M';
            // updateSquare(p[0], p[1], 'M');
        }
    };

    this.revealMines = function() {
        for (p of this.minePositions) {
            updateSquare(p[0], p[1], 'M');
        }
    }

    this.generateMinePositions = function(x, y) {
        var positions = [],
        xpositions = [x],
        ypositions = [y];
        for (i = 0; i < this.numOfMines; i++) {
            x = getRandom(this.M);
            y = getRandom(this.N);
            var xloc = xpositions.indexOf(x);
            if (xloc > -1) {
                while (y == ypositions[xloc]) {
                    y = getRandom(this.N);
                }
            }
            xpositions.push(x);
            ypositions.push(y);
            positions.push([x, y]);
        }
        return positions;

        function getRandom(limit) {
            return Math.floor(Math.random() * limit);
        }
    };

    function startTimer() {
        this.time = 0;
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
    };
}
