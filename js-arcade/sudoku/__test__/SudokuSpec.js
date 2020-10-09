describe("Sudoku", function() {
    const gameArea = document.createElement("div");
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
        game = new Sudoku();
    });
    describe("constructor", function() {
    }); 
});