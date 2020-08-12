
function Pawn(x, y, isWhite){
    let pawn = new Piece(x,y,isWhite);
    pawn.piece.innerHTML = "P";
    pawn.piece.innerHTML = "♟";

    pawn.canMoveTo = function(toX,toY){
        let plusminus = -1;
        if (isWhite)
            plusminus = 1;
        let oneAhead = this.y === toY+plusminus*1;
        let twoAhead = this.y === toY+plusminus*2;
        let sameCol = this.x === toX;
        let adjacentCol = (this.x === toX+1) || (this.x === toX-1);
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 
        let hasNotMoved = (isWhite && this.y === 6) || (!isWhite && this.y===1);
        if (toX >7 || toX <0) return false;
        //Going out of range on y is allowed bc it means promotion to queen. Has not been implemented yet
        if (oneAhead && sameCol && !moveToIsOccupied) return true;
        if (twoAhead && sameCol && !moveToIsOccupied && hasNotMoved) return true;
        if (oneAhead && adjacentCol && moveToIsOccupied && moveToOccupant.isWhite != this.isWhite) return true;
        return false;
    }

    pawn.copy = function(newX, newY){
        return Pawn(newX, newY, this.isWhite);
    }

    return pawn;        
}

function Knight(x, y, isWhite){
    let knight = new Piece(x,y,isWhite);
    knight.piece.innerHTML = "🐴";
    // knight.piece.innerHTML = "H";

    knight.canMoveTo = function(toX,toY){
        let xDist = Math.abs(this.x-toX);
        let yDist = Math.abs(this.y-toY);
        let isHorseMove = (xDist == 1 && yDist == 2) || (xDist==2 && yDist == 1);
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 
        if (isHorseMove && !moveToIsOccupied) return true;
        if (isHorseMove && moveToIsOccupied && moveToOccupant.isWhite != this.isWhite) return true;
        return false;
    }

    knight.copy = function(newX, newY){
        return Knight(newX, newY, this.isWhite);
    }

    return knight;        
}

function Rook(x, y, isWhite){
    let rook = new Piece(x,y,isWhite);
    rook.piece.innerHTML = "🏛";
    // rook.piece.innerHTML = "R";

    rook.canMoveTo = function(toX,toY){
        let isGridAligned = (this.y == toY) || (this.x == toX);
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 
        if (!this.doesntGoThroughPieces(toX,toY)) return false; 
        if (isGridAligned && !moveToIsOccupied) return true;
        if (isGridAligned && moveToIsOccupied && moveToOccupant.isWhite !== this.isWhite) return true;
        return false;
    }

    rook.copy = function(newX,newY){
        return Rook(newX, newY, this.isWhite);
    }

    return rook;
}

function Bishop(x, y, isWhite){
    let bishop = new Piece(x,y,isWhite);
    bishop.piece.innerHTML = "♦️";
    // bishop.piece.innerHTML = "B";
    //➕

    bishop.canMoveTo = function(toX,toY){
        let isDiagonal = Math.abs(this.x-toX) == Math.abs(this.y-toY);
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 
            
        if (!this.doesntGoThroughPiecesDiag(toX,toY)) return false;
        if (isDiagonal && !moveToIsOccupied) return true;
        if (isDiagonal && moveToIsOccupied && moveToOccupant.isWhite !== this.isWhite) return true;
        return false;
    }

    bishop.copy = function(newX,newY){
        return Bishop(newX, newY, this.isWhite);
    }

    return bishop;
}

function Queen(x, y, isWhite){
    let queen = new Piece(x,y,isWhite);
    queen.piece.innerHTML = "👸";
    // queen.piece.innerHTML = "Q";

    queen.canMoveTo = function(toX,toY){
        let isDiagonal = Math.abs(this.x-toX) == Math.abs(this.y-toY);
        let isGridAligned = this.y == toY || this.x == toX;
        let queenMoves = isDiagonal || isGridAligned;
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 

        let isDiagonalMotion = Math.abs(this.x-toX) === Math.abs(this.y-toY);

        if(isDiagonalMotion && !this.doesntGoThroughPiecesDiag(toX,toY)) return false;
        if(!isDiagonalMotion && !this.doesntGoThroughPieces(toX,toY)) return false;
        if (queenMoves && !moveToIsOccupied) return true;
        if (queenMoves && moveToIsOccupied && moveToOccupant.isWhite !== this.isWhite) return true;
        return false;
    }

    queen.copy = function(newX,newY){
        return Queen(newX, newY, this.isWhite);
    }

    return queen;
}

function King(x, y, isWhite){
    let king = new Piece(x,y,isWhite);
    king.piece.innerHTML = "👑";
    // king.piece.innerHTML = "K";

    king.canMoveTo = function(toX,toY){
        let inVerticalRadius = Math.abs(this.x-toX) <= 1;
        let inHorizontalRadius = Math.abs(this.y-toY) <= 1;
        let kingMoves = inVerticalRadius && inHorizontalRadius;
        let moveToOccupant = squares[toY][toX];
        let moveToIsOccupied = moveToOccupant; 
        if (kingMoves && !moveToIsOccupied) return true;
        if (kingMoves && moveToIsOccupied && moveToOccupant.isWhite !== this.isWhite) return true;
        return false;
    }

    king.copy = function(newX,newY){
        return King(newX, newY, this.isWhite);
    }

    return king;
}
