describe("MineSweeper", function() {

    let gameBoard;
    let game;

    beforeEach(function() {
        gameBoard = {
            getButton: jasmine.createSpy().and.returnValue({})
        };
        GameBoard = jasmine.createSpy().and.returnValue(gameBoard);
        alert = jasmine.createSpy();
        game = new MineSweeper(0);
        const flagHTML = {};
        gameBoard.getButton.and.returnValue(flagHTML);
    });

    describe("click", function() {
        it("first click is not mine", function() {
            // game.click(0, 0);
            expect(game.gameOver).toBe(false);
        });
    });

});
