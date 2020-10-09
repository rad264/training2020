describe("Gomoku", function() {
    const gameArea = document.createElement("canvas");
    gameArea.id = "gameArea";
    document.body.appendChild(gameArea);
    let gameBoard;
    let game;
    beforeEach(function() {
        gameBoard = {
            getButton: jasmine.createSpy().and.returnValue({})
        };
        GameBoard = jasmine.createSpy().and.returnValue(gameBoard);
        alert = jasmine.createSpy();
        game = new Gomoku();
    });
    describe("constructor", function() {
        var canvasEl = document.getElementById("canvas");
        const ctx = canvasEl.getContext("2d");
        canvasEl.width = 35 * 16;
        canvasEl.height = 35 * 16;
        it("creates GameBoard in canvas", function() {
            expect(GameBoard).toHaveBeenCalledWith(ctx);
        });
        it("starts on Black's turn", function() {
            expect(game.blackIsNext).toBe(true);
        });
        it("starts with gameOver=false", function() {
            expect(game.gameOver).toBe(false);
        });
        it("starts with empty model", function() {
            expect(game.squares[0][0]).toBe(undefined);
            expect(game.squares[0][1]).toBe(undefined);
            expect(game.squares[0][2]).toBe(undefined);
            expect(game.squares[1][0]).toBe(undefined);
            expect(game.squares[1][1]).toBe(undefined);
            expect(game.squares[1][2]).toBe(undefined);
            expect(game.squares[2][0]).toBe(undefined);
            expect(game.squares[2][1]).toBe(undefined);
            expect(game.squares[2][2]).toBe(undefined);
        });
    });
    describe("clickChessBoard", function() {
        it("changes to other player's turn when empty square clicked", function() {
            const blackIsNextBeforeClick = game.blackIsNext;
            game.clickChessBoard({clientY : 342, clientX : 445});
            expect(game.blackIsNext).toBe(!blackIsNextBeforeClick);
        });
        it("puts true in model when Black's turn", function() {
            game.blackIsNext = true;
            game.clickChessBoard({clientY : 103, clientX : 203});
            expect(game.squares[0][0]).toBe(1);
        });
        it("puts false in model when White's turn", function() {
            game.blackIsNext = false;
            game.clickChessBoard({clientY : 103, clientX : 203});
            expect(game.squares[0][0]).toBe(2);
        });
        it("does not count as turn when square already filled", function() {
            game.blackIsNext = true;
            game.squares[0][0] = 1;
            game.clickChessBoard({clientY : 103, clientX : 203});
            expect(game.blackIsNext).toBe(true);
            expect(game.squares[0][0]).toBe(1);
            //expect(gameBoard.getButton).not.toHaveBeenCalled();
        });
        it("sets gameOver=true when game is over", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.clickChessBoard({clientY : 103, clientX : 203});
            expect(game.gameOver).toBe(true);
        });
        it("alerts win for X if game over on X's turn", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.blackIsNext = true;
            game.click(0, 0);
            expect(alert).toHaveBeenCalledWith("Black wins!");
        });
        it("alerts win for white if game over on white's turn", function() {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.blackIsNext = false;
            game.click(0, 0);
            expect(alert).toHaveBeenCalledWith("Black wins!");
        });
        it("does not fill square when game is over", function() {
            game.gameOver = true;
            game.click(0, 0);
            expect(game.squares[0][0]).toBe(undefined);
            //expect(gameBoard.getButton).not.toHaveBeenCalled();
        });
    });
    describe("isGameOver", function() {
        it("does not end game with no piece", function () {
            expect(game.isGameOver(0,0)).toBe(false)
        })
        it("ends game with a row of black's ", function () {
            game.squares[0][0] = 1
            game.squares[0][1] = 1
            game.squares[0][2] = 1
            game.squares[0][3] = 1
            game.squares[0][4] = 1

            expect(game.isGameOver(0,3)).toBe(true)
        })
        it("ends game with a column of black's ", function () {
            game.squares[0][0] = 1
            game.squares[1][0] = 1
            game.squares[2][0] = 1
            game.squares[3][0] = 1
            game.squares[4][0] = 1
           
            expect(game.isGameOver(0,0)).toBe(true)
        })
        it("ends game with a diagonal of black's ", function () {
            game.squares[0][0] = 1
            game.squares[1][1] = 1
            game.squares[2][2] = 1
            game.squares[3][3] = 1
            game.squares[4][4] = 1

            expect(game.isGameOver(0,0)).toBe(true)
        })
    });
});