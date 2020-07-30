describe("TicTacToe", function() {
    let gameBoard;
    let game;
    beforeEach(function() {
        gameBoard = {
            getButton: jasmine.createSpy().and.returnValue({})
        };
        GameBoard = jasmine.createSpy().and.returnValue(gameBoard);
        alert = jasmine.createSpy();
        game = new TicTacToe();
    });
    describe("click", function() {
        it("changes to other player's turn when empty square clicked", function() {
            const xIsNextBeforeClick = game.xIsNext;
            game.click(0, 0);
            expect(game.xIsNext).toBe(!xIsNextBeforeClick);
        });
        it("puts true in model when X's turn", function() {
            game.xIsNext = true;
            game.click(0, 0);
            expect(game.squares[0][0]).toBe(true);
        });
        it("puts false in model when O's turn", function() {
            game.xIsNext = false;
            game.click(0, 0);
            expect(game.squares[0][0]).toBe(false);
        });
        it("puts X on board when X's turn", function() {
            const buttonAt00 = {};
            gameBoard.getButton.and.returnValue(buttonAt00)
            game.xIsNext = true;
            game.click(0, 0);
            expect(buttonAt00.innerHTML).toBe("X");
        });
        it("puts O on board when O's turn", function() {
            const buttonAt00 = {};
            gameBoard.getButton.and.returnValue(buttonAt00)
            game.xIsNext = false;
            game.click(0, 0);
            expect(buttonAt00.innerHTML).toBe("O");
        });
        it("does not count as turn when square already filled", function() {
            game.xIsNext = true;
            game.squares[0][0] = false;
            game.click(0, 0);
            expect(game.xIsNext).toBe(true);
            expect(game.squares[0][0]).toBe(false);
            expect(gameBoard.getButton).not.toHaveBeenCalled();
        });
        it("sets gameOver=true when game is over", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.click(0, 0);
            expect(game.gameOver).toBe(true);
        });
        it("alerts win for X if game over on X's turn", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.xIsNext = true;
            game.click(0, 0);
            expect(alert).toHaveBeenCalledWith("X wins!");
        });
        it("alerts win for O if game over on O's turn", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.xIsNext = false;
            game.click(0, 0);
            expect(alert).toHaveBeenCalledWith("O wins!");
        });
        it("does not fill square when game is over", function() {
            game.gameOver = true;
            game.click(0, 0);
            expect(game.squares[0][0]).toBe(undefined);
            expect(gameBoard.getButton).not.toHaveBeenCalled();
        });
    });
    describe("isGameOver", function() {
        it("gaveOver if top row is filled with X's", function() {
            game.squares[0][0] = true;
            game.squares[1][0] = true;
            game.click(2, 0);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if middle row is filled with X's", function() {
            game.squares[0][1] = true;
            game.squares[1][1] = true;
            game.click(2, 1);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if bottom row is filled with X's", function() {
            game.squares[0][2] = true;
            game.squares[1][2] = true;
            game.click(2, 2);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if left column is filled with X's", function() {
            game.squares[0][0] = true;
            game.squares[0][1] = true;
            game.click(0, 2);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if middle column is filled with X's", function() {
            game.squares[1][0] = true;
            game.squares[1][1] = true;
            game.click(1, 2);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if left column is filled with X's", function() {
            game.squares[2][0] = true;
            game.squares[2][1] = true;
            game.click(2, 2);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if diagonal (top-left to bottom-right) is filled with X's", function() {
            game.squares[0][0] = true;
            game.squares[1][1] = true;
            game.click(2, 2);
            expect(game.gameOver).toBe(true);
        });
        it("gaveOver if diagonal (bottom-left to top-right) is filled with X's", function() {
            game.squares[0][2] = true;
            game.squares[1][1] = true;
            game.click(2, 0);
            expect(game.gameOver).toBe(true);
        });
    });
    describe("isTie", function() {
        it("isTie if all squares are filled but no winner is found.", function() {
            // game.squares[0][1] = false;
            // game.squares[0][2] = true;
            // game.squares[1][0] = false;
            // game.squares[1][1] = true;
            // game.squares[1][2] = true;
            // game.squares[2][0] = false;
            // game.squares[2][1] = true;
            // game.squares[2][2] = false;
            game.turns = 8;
            game.click(0, 0);
            expect(game.isTie()).toBe(true);
        });
    });
});
