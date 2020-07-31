describe("Othello", function() {
    const gameArea = document.createElement("div");
    gameArea.id = "gameArea";
    document.body.appendChild(gameArea);

    const blackScore = document.createElement("div");
    blackScore.id = "black-score"

    const whiteScore = document.createElement("div");
    whiteScore.id = "white-score"

    document.body.appendChild(blackScore)
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
            expect(GameBoard).toHaveBeenCalledWith(gameArea, 8, 8, jasmine.any(Function));
        })
    })

})