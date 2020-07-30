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
        while(x_iterator < width && y_iterator < height){
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
        while(x_iterator >= 0 && y_iterator < height){
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
        while(x_iterator < width && y_iterator >= 0){
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
        while(x_iterator >= 0 && y_iterator >= 0){
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