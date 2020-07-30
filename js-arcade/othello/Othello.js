function Othello() {
    let width = 8
    let height = 8
    const black_marker = "B"
    const white_marker = "W"

    var thisObj = this;
    this.squares = [[], [], [], [], [], [], [], []];
    this.blackIsNext = true;
    this.gameOver = false;
    var gameBoard = new GameBoard(document.getElementById("gameArea"), 8, 8, function (x, y) { thisObj.click(x, y) });

    this.initialize = function () {
        this.squares[3][3] = black_marker
        gameBoard.getButton(3, 3).innerHTML = black_marker
        this.squares[4][4] = black_marker
        gameBoard.getButton(4, 4).innerHTML = black_marker

        this.squares[3][4] = white_marker
        gameBoard.getButton(3, 4).innerHTML = white_marker
        this.squares[4][3] = white_marker
        gameBoard.getButton(4, 3).innerHTML = white_marker


    }
    this.initialize()


    this.click = function (x, y) {
        if (!this.gameOver && (this.squares[x][y] === undefined)) {
            var button = gameBoard.getButton(x, y);
            button.innerHTML = this.blackIsNext ? black_marker : white_marker;
            this.squares[x][y] = this.blackIsNext ? black_marker : white_marker;

            this.checkForFlips(x, y)

            if (this.isGameOver(x, y)) {
                this.gameOver = true;
                alert((this.blackIsNext ? "Black" : "White") + " wins!");
            }
            this.blackIsNext = !this.blackIsNext;
        }
    };
    this.isGameOver = function (x, y) {



    }
    this.checkForFlips = function (x, y) {
        let current_color = this.blackIsNext ? black_marker : white_marker;
        let buttons = []
        // check right
        for (i = x + 1; i < width; i++) {
            if (this.squares[i][y] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[i][y] !== current_color) {
                buttons.push({ button: gameBoard.getButton(i, y), x: i, y: y })

            }
            if (this.squares[i][y] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
        }

        buttons = []
        // check left
        for (i = x - 1; i >= 0; i--) {
            if (this.squares[i][y] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[i][y] !== current_color) {
                buttons.push({ button: gameBoard.getButton(i, y), x: i, y: y })

            }
            console.log("loop")
            if (this.squares[i][y] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
        }

        // // check left
        // for (i = x - 1; i >= 0; i--) {
        //     if (this.squares[i][y] === undefined) {
        //         buttons = []
        //         break
        //     }
        //     if (this.squares[i][y] !== current_color) {
        //         buttons.push(gameBoard.getButton(i, y))
        //     }
        //     if (this.squares[i][y] === current_color) {
        //         this.flipButtons(buttons)
        //         buttons = []
        //         break
        //     }
        // }
    }

    // // check down
    // for (i = y + 1; i < height; i++) {
    //     if (this.squares[x][i] === undefined || this.squares[i][y] === current_color) {
    //         break
    //     }
    //     if (this.squares[x][i] !== current_color) {
    //         this.squares[i][y] = current_color
    //         buttons.push(gameBoard.getButton(i, y))
    //     }
    // }

    // // check up
    // for (i = y - 1; i >= 0; i++) {
    //     if (this.squares[x][i] === undefined || this.squares[i][y] === current_color) {
    //         break
    //     }
    //     if (this.squares[x][i] !== current_color) {
    //         this.squares[i][y] = current_color
    //         buttons.push(gameBoard.getButton(i, y))
    //     }
    // }



    this.flipButtons = function (buttons) {
        if (buttons.length === 0) {
            return
        }
        buttons.forEach(this.flip.bind(this))
    }

    this.flip = function (button) {
        button.button.innerHTML = this.blackIsNext ? black_marker : white_marker
        this.squares[button.x][button.y] = this.blackIsNext ? black_marker : white_marker
    }

}