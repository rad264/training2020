function Piece(x,y,isWhite){
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
    this.button = gameBoard.getButton(this.x, this.y);
    this.piece = document.createElement("div");
    this.button.appendChild(this.piece);
    this.piece.classList.add("piece");
    if (isWhite)
        this.piece.classList.add("whitePiece");
    else
        this.piece.classList.add("blackPiece");

    this.select = function(){
        this.piece.classList.add("selected");
        for (let y = 0; y<8; y++){
            for (let x=0; x<8; x++){
                if (this.canMoveTo(x,y)){
                    let button = gameBoard.getButton(x,y);
                    button.classList.add("movable");
                }
            }
        }
    }

    this.deselect = function(){
        this.piece.classList.remove("selected");
        deselectAll();
    }

    this.movesUp = movesUp; 
    this.movesDown=movesDown;
    this.movesLeft = movesLeft;
    this.movesRight = movesRight;
    this.movesUpLeft = movesUpLeft;
    this.movesUpRight = movesUpRight;
    this.movesDownLeft = movesDownLeft;
    this.movesDownRight = movesDownRight;

    this.doesntGoThroughPieces = doesntGoThroughPieces;
    this.doesntGoThroughPiecesDiag = doesntGoThroughPiecesDiag;
}
