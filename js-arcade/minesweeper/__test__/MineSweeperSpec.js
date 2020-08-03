describe("MineSweeper", function() {

    var gameArea = document.createElement("div");
    gameArea.id = "gameArea";
    // document.getElementById = jasmine.createSpy("HTML Element").and.returnValue(gameArea);
    document.body.appendChild(gameArea);
    var flags = document.createElement("span");
    flags.id = "flags";
    // document.getElementById = jasmine.createSpy().and.returnValue(flags);
    document.body.appendChild(flags);

    let gameBoard;
    let game;

    beforeEach(function() {
        gameBoard = {
            getButton: jasmine.createSpy().and.returnValue({})
        };
        GameBoard = jasmine.createSpy().and.returnValue(gameBoard);
        alert = jasmine.createSpy();
        game = new MineSweeper();
        spyOn(game, 'generateMines');
        spyOn(game, 'updateBoard');
    });

    describe("constructor", function() {
        it("creates 8x8 GameBoard in div#gameArea", function() {
            expect(GameBoard).toHaveBeenCalledWith(gameArea, 8, 8, jasmine.any(Function), jasmine.any(Function));
        });
        it("creates 10 flags", function() {
            expect(flags.innerHTML).toBe("10");
        });
        it("starts with gameOver=false", function() {
            expect(game.gameOver).toBe(false);
        });
        it("starts with firstClick=true", function() {
            expect(game.firstClick).toBe(true);
        });
        it("starts with numOfMines=10", function() {
            expect(game.numOfMines).toBe(10);
        });
        it("starts with empty model", function() {
            for (var i = 0; i < 8; i++)
                for (var j = 0; j < 8; j++)
                    expect(game.board[i][j]).toBe(undefined);
        });
    });

    describe("click", function() {
        it("first click calls generateMines", function() {
            game.click(0, 0);
            expect(game.generateMines).toHaveBeenCalledWith(0, 0);
            // expect(game.updateBoard).toHaveBeenCalledWith(0, 0);
        });
        it("first click is to be a mine", function() {
            const buttonAt00 = {};
            gameBoard.getButton.and.returnValue(buttonAt00)
            game.click(0, 0);
            expect(game.gameOver).toBe(false);
            expect(buttonAt00.innerHTML).not.toBe("M");
        });
        it("after first click, firstClick=false", function() {
            game.click(0, 0);
            expect(game.firstClick).toBe(false);
        });
        it("does not count as turn when square already filled", function() {
            game.board[0][0] = '-';
            game.click(0, 0);
            expect(game.board[0][0]).toBe('-');
        });
        it("gameOver when mine is clicked", function() {
            const buttonAt00 = {};
            gameBoard.getButton.and.returnValue(buttonAt00);
            buttonAt00.innerHTML = '';
            game.firstClick = false;
            game.board[0][0] = 'M';
            game.click(0, 0);
            // expect(game.gameOver).toBe(true);
            // expect(alert).toHaveBeenCalledWith("Game Over");
        });
        it("board to get correct adjacent number", function() {
            // game.firstClick = false;
            // game.board[0][1] = 'M';
            // game.board[1][0] = 'M';
            // game.board[1][1] = 'M';
            // game.click(0, 0);
            // expect(game.updateBoard).toHaveBeenCalledWith(0, 0);
        });
    });

});
