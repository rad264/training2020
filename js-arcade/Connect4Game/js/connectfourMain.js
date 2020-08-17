var array;
var currentIndexOfCol; 
var role; 
var gameRunning;
var player1Score;
var player2Score;
var player1ScoreOutput;
var player2ScoreOutput;
var rows;
var columns;
var output;
var canvas;
var context;
var cellWidth;
var diskColor;
var winningMoveCells;
var resetNotClicked;
var onHold;
var board;

function init (rows, columns, destination) {
    canvas = document.getElementById("canvas");
    cellWidth = 83;
    winningMoveCells = new Array();
    onHold = false;
    player1Score =0;
    player2Score =0;
    player1ScoreOutput = document.getElementById("player1Score");
    player1ScoreOutput.innerHTML = player1Score;
    player2ScoreOutput = document.getElementById("player2Score");
    player2ScoreOutput.innerHTML = player2Score;
    this.rows = rows;
    this.columns = columns;
    output = document.getElementById("output");
    board = document.getElementById("board");
    resetGame(rows, columns, destination); 
}

function resetGame (rows, columns, destination) {
    if (!onHold){
        resetNotClicked = false;
        output.className = "none";
        
        while (destination.firstChild) // While the destination has children
            destination.removeChild(destination.firstChild); // Clear the previous tables
        
        while (board.firstChild) // While the board has children
            board.removeChild(board.firstChild); // Clear the previous tables
        
        /* Initialize array */
        array = new Array(rows);
        for (var i = 0; i < rows; i++) {
            array[i] = new Array(columns);
            
            /* set all elements to zero */
            for (var j = 0; j < columns; j++) {
                array[i][j] = 0;
            }
        }
        
        currentIndexOfCol = new Array(columns);
        /* set all elements to zero */
        for (var j = 0; j < columns; j++) {
             currentIndexOfCol[j] = 0;
        }
        
        var table = document.createElement('table');
        
        for (var i=rows; i>0 ; i--){
            var tr = document.createElement('tr');
                for (var j = columns ; j>0 ; j--){
                    var td = document.createElement('td');
                    td.id = (i-1) + "" + (-j+7); // (-j+7) to fix the order (to have td '00' being the bottom-left one)
                    td.onclick = tdClicked;
                    td.onmouseover = tdMouseOver;
                    td.onmouseout = tdMouseOut;
                    tr.appendChild(td);
                }
            table.appendChild(tr);
        }
        destination.appendChild(table);
        
        var table2 = document.createElement('table');
        for (var i=rows; i>0 ; i--){
            var tr = document.createElement('tr');
                for (var j = columns ; j>0 ; j--){
                    var td = document.createElement('td');
                    td.id = (i-1) + "" + (-j+7)+"b"; // (-j+8) to fix the order (to have td '00' being the bottom-left one)
                    td.onclick = tdClicked;
                    td.onmouseover = tdMouseOver;
                    td.onmouseout = tdMouseOut;
                    tr.appendChild(td);
                }
            table2.appendChild(tr);
        }
        board.appendChild(table2);
        
        /*
        context.clearRect( 0 , 0 , canvas.width , canvas.height); // Clear canvas
        canvas.width = canvas.width; // Clear canvas
        */
        
        /* Remove the current canvas then create a new one and insert it */
        canvas.parentNode.removeChild(canvas);
        canvas = document.createElement('canvas');
        canvas.width = "585";
        canvas.height= "500";
        var wrapper = document.getElementById("wrapper");
        wrapper.insertBefore(canvas, wrapper.firstChild);
        context = canvas.getContext('2d');
        
        role=0;
        setTimeout(function(){gameRunning = true;resetNotClicked = true;},100); // To handle clearing canvas issues
        output.innerHTML = "Turn: Player " + ((role%2)+1);
    }
}

function tdMouseOver () {
    if (gameRunning){
        var col = this.id.charAt(1);
        var ind = currentIndexOfCol[col];
        var td;
        for (i=(rows-1) ; i>=ind ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "rgb(255,255,255)";
        }
    }
}

function tdMouseOut (){
    if (gameRunning){
        var col = this.id.charAt(1);
        var td;
        for (i=(rows-1) ; i>=0 ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "none";
        }
    }
}

function tdClicked () {
    if (gameRunning) {
        var col = this.id.charAt(1);
        if (currentIndexOfCol[col]>=6) {// if the column is full
            output.innerHTML = "Column is full";
        }
        else {
            dropDisk(col,(role++%2)+1);
            /* Clear the white */
            if (gameRunning){
                var td;
                for (i=(rows-1) ; i>=0 ;i--){
                    td = document.getElementById(i+""+col);
                    td.style.background = "none";
                }
            }
            

        }
    }
}

function dropDisk (col, player){
    gameRunning = true;
    var row = currentIndexOfCol[col]++;
    var td = document.getElementById(""+row+col); // to make it string
    
    var fieldX = Math.round( (cellWidth+0.5)*col );
    var fieldY = 0;
    var fieldWidth = cellWidth;
    var fieldHeight = Math.round((6-row)*(cellWidth));
        
    if (player==1) { // Player 1  
        array[row][col] = 1 ;                
        diskColor = "rgb(226, 65, 65)";
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    else { // Player 2
        array[row][col] = 2 ;
        diskColor = "rgb(248, 210, 52)";
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    output.innerHTML = "Turn: Player " + ((role%2)+1);

    if (isAWinningMove(row, col)) { // If this was a winning move
        gameRunning=false; // Stop game
        
        /* Clear the highlighting white */
        for (i=(rows-1) ; i>=0 ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "none";
        }
        
        /* Mark the winning cells */
        for (var m=0 ; m < winningMoveCells.length ; m++){
            td = document.getElementById(""+winningMoveCells[m]);
            td.style.background = "rgba(0,0,0,0.4)";
        }
    
        if (((role-1)%2 +1) == 1 ) { // Player 1 won
            output.innerHTML = "Player 1 WON!";
            output.className = "player1";
            player1ScoreOutput.innerHTML = ++player1Score;
        }
        else { // Player 2 won
            output.innerHTML = "Player 2 WON!";
            output.className = "player2";
            player2ScoreOutput.innerHTML = ++player2Score;
        }
    }
    if (gridIsFull()){
        output.innerHTML = "Tie! Game finished";
        gameRunning = false;
    }
}

function gridIsFull() {
    var isFull = true;
    for (var i=0 ; i<currentIndexOfCol.length ; i++){
        if (currentIndexOfCol[i] < 6)
            isFull = false;
    }
    return (isFull);
}

function accessArray(row, col){ // This function is created seperately to handle the case of having invalid input to the array
    try {
        var val = array[row][col];
        if (val==undefined)
            return 0;
        return val;
    }
    catch(err) {
        return 0; // Not applicable (out of range)
    }
}

function isAWinningMove(row, col) {
    
}

