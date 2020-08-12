//TODO

//Need to implement pawn promotion

//Bug: pawns that can move 2 spaces can jump over pawns immediately ahead

//Need to implement lose conditions and king rules

//Would be nice to implement possible-choice highlighting
//Would be nice to implement castling

//Should do some heavy-duty refactoring

function Chess() {

    var thisObj = this;
    this.whitesTurn = true;
    this.selectedPiece = null;
    this.gameOver = false;
    gameBoard = new GameBoard(document.getElementById("gameArea"), 8, 8, function (x, y) { thisObj.click(x, y) });
    document.getElementById("whos_turn").style.display = "block";

    boardSetup();

    this.click = function(x, y) {
        if (this.selectedPiece == null){
            let clickedOn = squares[y][x];
            if (!this.gameOver && clickedOn && clickedOn.isWhite === this.whitesTurn) {
                this.selectPiece(x,y);
            }
        }
        else{
            if (this.selectedPiece.canMoveTo(x,y)){
                this.lastMovePlayerSelected = this.selectedPiece;
                this.lastMovePlayerX = this.selectedPiece.x;
                this.lastMovePlayerY = this.selectedPiece.y;

                this.lastMoveMovedToPiece = squares[y][x];
                this.lastMoveMovedToX = x;
                this.lastMoveMovedToY = y;

                deselectAll();
                this.moveSelected(x,y);
                this.whitesTurn = !this.whitesTurn;
                let whosTurn = this.whitesTurn? "White's": "Black's";
                document.getElementById("whos_turn").innerHTML = whosTurn + " Turn";
                this.selectedPiece = null;
            }
            else {
                this.selectedPiece.deselect();
                this.selectedPiece = null;
            }
        }
    };

    this.selectPiece = function(x,y){
        this.selectedPiece = squares[y][x];
        squares[y][x].select();
    };

    this.moveSelected = function(toX, toY){
        let p = this.selectedPiece;
        if(squares[toY][toX]){
            let button = gameBoard.getButton(toX,toY);
            button.removeChild(button.childNodes[0]);
            squares[p.y][p.x] = null;
        }

        squares[toY][toX] = p.copy(toX,toY);

        let button = gameBoard.getButton(p.x,p.y);
        button.removeChild(button.childNodes[0]);
        squares[p.y][p.x] = null;
    }

    this.isGameOver = function(x, y) {

    };

    function boardSetup(){
        let row1 = [new Rook(0,0,false), new Knight(1,0,false), new Bishop(2,0,false), new Queen(3,0,false), new King(4,0,false), new Bishop(5,0,false), new Knight(6,0,false), new Rook(7,0,false)];
        let row2 = [];
        let row7 = [];
        let row8 = [new Rook(0,7,true), new Knight(1,7,true), new Bishop(2,7,true), new King(3,7,true), new Queen(4,7,true), new Bishop(5,7,true), new Knight(6,7,true), new Rook(7,7,true)];
        for (let i =0; i<8; i++){
            row2[i] = Pawn(i,1,false);
            row7[i] = Pawn(i,6,true);
        }
        squares = [ 
            row1,
            row2,
            [], [], [], [], 
            row7,
            row8
        ];   
    }

    this.kingInCheck = function(checkWhiteKing){
        let kingX = this.blackKingX;
        let kingY = this.blackKingY;
        if (checkWhiteKing){
            kingX = this.whiteKingX;
            kingY = this.whiteKingY;
        }
        for (let y=0; y<8; y++){
            for (let x=0; x<8;x++){
                let piece = squares[y][x];
                if (piece == null) continue;
                if (piece.canMoveTo(kingX, kingY)) return true;
            }
        }
        return false;
    }
}

function deselectAll(){
    for (let y = 0; y<8;y++){
        for (let x = 0; x<8; x++){
            gameBoard.getButton(x,y).classList.remove("movable");
        }
    }
}