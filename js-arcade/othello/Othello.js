function Othello() {
    let width = 8
    let height = 8
    const black_marker = "B"
    const white_marker = "W"

    const black_tile_style = "black-tile"
    const white_tile_style = "white-tile"

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
    this.presentValidMoves = function () {
        for (m = 0; m < width; m++) {
            for (n = 0; n < height; n++) {
                if (this.isAValidMove(m, n) === true) {
                    gameBoard.getButton(m, n).innerHTML = "*"
                    gameBoard.getButton(m, n).classList.add("viable-move")
                } else {
                    gameBoard.getButton(m, n).classList.remove("viable-move")
                    if (gameBoard.getButton(m, n).innerHTML === "*") {
                        gameBoard.getButton(m, n).innerHTML = ""
                        console.log("removing class")

                    }
                }
            }
        }

        return false;
    }

    this.update_button_colors = function(){
        for (m = 0; m < width; m++) {
            for (n = 0; n < height; n++) {
                if(this.squares[m][n] !== undefined){
                    gameBoard.getButton(m,n).classList.add(this.squares[m][n] === black_marker ? black_tile_style : white_tile_style)
                    gameBoard.getButton(m,n).classList.remove(this.squares[m][n] === black_marker ? white_tile_style :  black_tile_style )

                }
            }
        }

    }

    this.isAValidMove = function (x, y) {



        if (this.squares[x][y] !== undefined) {
            return false
        }

        let current_color = this.blackIsNext ? black_marker : white_marker;
        let buttons = []
        // check right
        for (i = x + 1; i < width; i++) {
            if (this.squares[i][y] === undefined) {
                break
            }
            if (this.squares[i][y] !== current_color) {
                buttons.push({ button: gameBoard.getButton(i, y), x: i, y: y })

            }
            if (this.squares[i][y] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
        }

        buttons = []
        // check left
        for (i = x - 1; i >= 0; i--) {
            if (this.squares[i][y] === undefined) {
                break
            }
            if (this.squares[i][y] !== current_color) {
                buttons.push({ button: gameBoard.getButton(i, y), x: i, y: y })

            }
            if (this.squares[i][y] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
        }

        buttons = []
        // check up
        for (i = y - 1; i >= 0; i--) {
            if (this.squares[x][i] === undefined) {
                break
            }
            if (this.squares[x][i] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x, i), x: x, y: i })

            }
            if (this.squares[x][i] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
        }

        buttons = []
        // check down
        for (i = y + 1; i < height; i++) {
            if (this.squares[x][i] === undefined) {
                break
            }
            if (this.squares[x][i] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x, i), x: x, y: i })

            }
            if (this.squares[x][i] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
        }


        buttons = []
        // check diagonal - down-right
        x_iterator = x + 1
        y_iterator = y + 1
        while (x_iterator < width && y_iterator < height) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
            x_iterator++
            y_iterator++
        }

        buttons = []
        // check diagonal - down-left
        x_iterator = x - 1
        y_iterator = y + 1
        while (x_iterator >= 0 && y_iterator < height) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
            x_iterator--
            y_iterator++
        }

        buttons = []
        // check diagonal - up-right
        x_iterator = x + 1
        y_iterator = y - 1
        while (x_iterator < width && y_iterator >= 0) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
            x_iterator++
            y_iterator--
        }

        buttons = []
        // check diagonal - up-left
        x_iterator = x - 1
        y_iterator = y - 1
        while (x_iterator >= 0 && y_iterator >= 0) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                if (buttons.length > 0) {
                    return true
                }
                break
            }
            x_iterator--
            y_iterator--
        }

        return false

    }
    this.initialize()
    this.presentValidMoves()

    this.click = function (x, y) {
        if (!this.gameOver && (this.squares[x][y] === undefined) && gameBoard.getButton(x, y).innerHTML === "*") {
            var button = gameBoard.getButton(x, y);
            button.innerHTML = this.blackIsNext ? black_marker : white_marker;
            this.squares[x][y] = this.blackIsNext ? black_marker : white_marker;

            this.checkForFlips(x, y)

            if (this.isGameOver(x, y)) {
                this.gameOver = true;
                alert((this.blackIsNext ? "Black" : "White") + " wins!");
            }
            this.blackIsNext = !this.blackIsNext;
            this.presentValidMoves()
            this.update_button_colors()

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
            if (this.squares[i][y] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
        }

        buttons = []
        // check up
        for (i = y - 1; i >= 0; i--) {
            if (this.squares[x][i] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x][i] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x, i), x: x, y: i })

            }
            if (this.squares[x][i] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
        }

        buttons = []
        // check down
        for (i = y + 1; i < height; i++) {
            if (this.squares[x][i] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x][i] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x, i), x: x, y: i })

            }
            if (this.squares[x][i] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
        }


        buttons = []
        // check diagonal - down-right
        x_iterator = x + 1
        y_iterator = y + 1
        while (x_iterator < width && y_iterator < height) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
            x_iterator++
            y_iterator++
        }

        buttons = []
        // check diagonal - down-left
        x_iterator = x - 1
        y_iterator = y + 1
        while (x_iterator >= 0 && y_iterator < height) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
            x_iterator--
            y_iterator++
        }

        buttons = []
        // check diagonal - up-right
        x_iterator = x + 1
        y_iterator = y - 1
        while (x_iterator < width && y_iterator >= 0) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
            x_iterator++
            y_iterator--
        }

        buttons = []
        // check diagonal - up-left
        x_iterator = x - 1
        y_iterator = y - 1
        while (x_iterator >= 0 && y_iterator >= 0) {
            if (this.squares[x_iterator][y_iterator] === undefined) {
                buttons = {}
                break
            }
            if (this.squares[x_iterator][y_iterator] !== current_color) {
                buttons.push({ button: gameBoard.getButton(x_iterator, y_iterator), x: x_iterator, y: y_iterator })

            }
            if (this.squares[x_iterator][y_iterator] === current_color) {
                this.flipButtons(buttons)
                buttons = []
                break
            }
            x_iterator--
            y_iterator--
        }




    }




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