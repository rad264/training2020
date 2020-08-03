describe("Othello", function() {
    const gameArea = document.createElement("div");
    gameArea.id = "gameArea";
    document.body.appendChild(gameArea);

    const blackScore = document.createElement("div");
    blackScore.id = "black-score"

    const whiteScore = document.createElement("div");
    whiteScore.id = "white-score"

    const scoreSeparator = document.createElement("div");
    scoreSeparator.id = "score-separator"

    const black_marker = "B"
    const white_marker = "W"

    const width = 8
    const height = 8

    document.body.appendChild(blackScore)
    document.body.appendChild(scoreSeparator)
    document.body.appendChild(whiteScore)

    let gameBoard;
    let game;

    beforeEach(function () {
        gameBoard = {
            getButton: jasmine.createSpy().and.returnValue({
                classList: ({
                    add: jasmine.createSpy().and.returnValue({}),
                    remove: jasmine.createSpy().and.returnValue({})
                }),
                innerHTML: ({})
            })
        };
        GameBoard = jasmine.createSpy().and.returnValue(gameBoard);
        alert = jasmine.createSpy();
        game = new Othello();
    })

    describe("constructor", function() {
        it("creates 8x8 GameBoard in div#gameArea", function (){
            expect(GameBoard).toHaveBeenCalledWith(gameArea, width, height, jasmine.any(Function));
        });
        it("starts on black turn", function() {
            expect(game.blackIsNext).toBe(true);
        });
        it("starts with gameOver=false", function() {
            expect(game.gameOver).toBe(false);
        });
        it("starts with four center pieces placed", function(){
            expect(game.squares[3][3]).toBe(black_marker);
            expect(game.squares[4][4]).toBe(black_marker);
            expect(game.squares[3][4]).toBe(white_marker);
            expect(game.squares[4][3]).toBe(white_marker);
        })
        it("all but the center four squares are empty", function(){
            for(i = 0; i < width; i++){
                for(j = 0; j < width; j++){
                    if(!(i === 3 && j=== 3) && !(i === 4 && j=== 3) && !(i === 3 && j=== 4) && !(i === 4 && j=== 4)){
                        expect(game.squares[i][j]).toBe(undefined);
                    }
                }
            }
        });
    });

    describe("click", function() {
        it("does not place a token if an empty space is clicked", function() {
            game.click(0,0);
            expect(game.squares[0][0]).toBe(undefined);
        });
        it("does not place a token if a taken space is clicked", function() {
            game.click(3,3);
            expect(game.squares[3][3]).toBe(black_marker);
        });
        it("does not change to the other player's turn if an empty space is clicked", function() {
            const blackIsNextBeforeClick = game.blackIsNext;
            game.click(0,0);
            expect(game.blackIsNext).toBe(blackIsNextBeforeClick);
        });
        it("does not change to the other player's turn if a taken space is clicked", function() {
            const blackIsNextBeforeClick = game.blackIsNext;
            game.click(3,3);
            expect(game.blackIsNext).toBe(blackIsNextBeforeClick);
        });
        it("places a marker in the model when Black turn", function() {
            game.click(3,5);
            expect(game.squares[3][5]).toBe(black_marker)
        });
        it("places a marker in the model when White turn", function() {
            game.blackIsNext = false;
            game.click(3,2);
            expect(game.squares[3][2]).toBe(white_marker)
        });
        it("alerts win for Black if game over on black higher score", function () {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.blackIsNext = true;
            game.click(3, 5);
            expect(game.black_score).toBeGreaterThan(game.white_score)

            expect(alert).toHaveBeenCalledWith("Black wins!");
        });
        it("alerts win for White if game over on white higher score", function () {
            game.isGameOver = jasmine.createSpy().and.returnValue(true);
            game.blackIsNext = false;
            game.click(3, 2);
            expect(game.white_score).toBeGreaterThan(game.black_score)
            expect(alert).toHaveBeenCalledWith("White wins!");
        });

    });

    describe("isGameOver", function() {
        it("starts the game without isGameOver", function (){
            expect(game.isGameOver()).toBe(false);
        });

    });

    describe("flip", function() {
        it("flips squares to black", function() {
            game.click(3,5);
            expect(game.squares[3][4]).toBe(black_marker)
        });
        it("flips squares to white", function() {
            game.blackIsNext = false;
            game.click(3,2);
            expect(game.squares[3][3]).toBe(white_marker)
        });

    });



})