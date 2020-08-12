this.movesUp = function(){
    let differentColorHit = false;
    let count = 0;
    let y = this.y;
    while(y > 0){
        y--;
        if (squares[y][this.x] == null)
        count++;
        else if (!differentColorHit && squares[y][this.x].isWhite != this.isWhite){
            count++;
            differentColorHit = true;
        }
        else
        break;
    }
    return count;
}

this.movesDown = function(){
    let differentColorHit = false;
    let count = 0;
    let y = this.y;
    while(y < 7){
        y++;
        if (squares[y][this.x] == null)
        count++;
        else if (!differentColorHit && squares[y][this.x].isWhite != this.isWhite){
            count++;
            differentColorHit = true;
        }
        else
        break;
    }
    return count;
}

this.movesLeft = function(){
    let differentColorHit = false;
    let count = 0;
    let x = this.x;
    while(x > 0){
        x--;
        if (squares[this.y][x] == null)
        count++;
        else if (!differentColorHit && squares[this.y][x].isWhite != this.isWhite){
            count++;
            differentColorHit = true;
        }else
        break;
    }
    return count;
}

this.movesRight = function(){
    let differentColorHit = false;
    let count = 0;
    let x = this.x;
    while(x < 7){
        x++;
        if (squares[this.y][x] == null)
        count++;
        else if (!differentColorHit && squares[this.y][x].isWhite != this.isWhite){
            count++;
            differentColorHit = true;
        }
        else
        break;
    }
    return count;
}

movesUpRight = function(){
    let differentColorHit = false;
    let count = 0; 
    let x = this.x;
    let y = this.y;
    while(y>0 && x<7 ){
        x++;
        y--;
        if (squares[y][x] == null)
            count++
        else if (!differentColorHit && squares[y][x].isWhite != this.isWhite){
            count++
            differentColorHit = true;
        }
        else
            break;
    }
    return count;
}

movesUpLeft = function(){
    let differentColorHit = false;
    let count = 0; 
    let x = this.x;
    let y = this.y;
    while(y>0 && x>0 ){
        x--;
        y--;
        if (squares[y][x] == null)
            count++
        else if (!differentColorHit && squares[y][x].isWhite != this.isWhite){
            count++
            differentColorHit = true;
        }
        else
            break;
    }
    return count;
}

movesDownLeft = function(){
    let differentColorHit = false;
    let count = 0; 
    let x = this.x;
    let y = this.y;
    while(y<7 && x>0 ){
        x--;
        y++;
        if (squares[y][x] == null)
            count++
        else if (!differentColorHit && squares[y][x].isWhite != this.isWhite){
            count++
            differentColorHit = true;
        }
        else
            break;
    }
    return count;
}

movesDownRight = function(){
    let differentColorHit = false;
    let count = 0; 
    let x = this.x;
    let y = this.y;
    while(y<7 && x<7){
        x++;
        y++;
        if (squares[y][x] == null)
            count++
        else if (!differentColorHit && squares[y][x].isWhite != this.isWhite){
            count++
            differentColorHit = true;
        }
        else
            break;
    }
    return count;
}

doesntGoThroughPieces = function(toX,toY){
    //automatic semi-colon insertion is pretty dumb
    let result =
    (toX <= this.x+this.movesRight()) && 
    (toX >= this.x-this.movesLeft()) &&
    (toY <= this.y+this.movesDown()) &&
    (toY >= this.y-this.movesUp());
    return result;
}

doesntGoThroughPiecesDiag = function(toX,toY){
    let doesntGoThroughPiecesDiag = true;
    if (toX > this.x && toY < this.y)
        doesntGoThroughPiecesDiag = (Math.abs(this.y-toY) <= this.movesUpRight());
    if (toX > this.x && toY > this.y)
        doesntGoThroughPiecesDiag = (Math.abs(this.y-toY) <= this.movesDownRight());
    if (toX < this.x && toY > this.y)
        doesntGoThroughPiecesDiag = (Math.abs(this.y-toY) <= this.movesDownLeft());
    if (toX < this.x && toY < this.y)
        doesntGoThroughPiecesDiag = (Math.abs(this.y-toY) <= this.movesUpLeft());
    return doesntGoThroughPiecesDiag;
}

kingIsInCheck = function(kingsX, kingsY, isKingWhite){
    for (let y =0; y<8; y++){
        for (let x = 0; x<8; x++){
            let piece = squares[y][x];
            if (piece == null) continue;
            if (piece.isWhite == isKingWhite) continue;
            if (piece.canMoveTo(kingsX, kingsY)) return true;
        }
    }
    return false;
}