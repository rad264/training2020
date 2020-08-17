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
        
        while (destination.firstChild) 
            destination.removeChild(destination.firstChild); 
        
        while (board.firstChild) 
            board.removeChild(board.firstChild); 
        
       
        array = new Array(rows);
        for (var i = 0; i < rows; i++) {
            array[i] = new Array(columns);
            
           
            for (var j = 0; j < columns; j++) {
                array[i][j] = 0;
            }
        }
        
        currentIndexOfCol = new Array(columns);
        
        for (var j = 0; j < columns; j++) {
             currentIndexOfCol[j] = 0;
        }
        
        var table = document.createElement('table');
        
        for (var i=rows; i>0 ; i--){
            var tr = document.createElement('tr');
                for (var j = columns ; j>0 ; j--){
                    var td = document.createElement('td');
                    td.id = (i-1) + "" + (-j+7); 
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
                    td.id = (i-1) + "" + (-j+7)+"b"; 
                    td.onclick = tdClicked;
                    td.onmouseover = tdMouseOver;
                    td.onmouseout = tdMouseOut;
                    tr.appendChild(td);
                }
            table2.appendChild(tr);
        }
        board.appendChild(table2);
       
        canvas.parentNode.removeChild(canvas);
        canvas = document.createElement('canvas');
        canvas.width = "585";
        canvas.height= "500";
        var wrapper = document.getElementById("wrapper");
        wrapper.insertBefore(canvas, wrapper.firstChild);
        context = canvas.getContext('2d');
        
        role=0;
        setTimeout(function(){gameRunning = true;resetNotClicked = true;},100); 
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
        if (currentIndexOfCol[col]>=6) {
            output.innerHTML = "Column is full";
        }
        else {
            dropDisk(col,(role++%2)+1);
            
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
    var td = document.getElementById(""+row+col); 
    
    var fieldX = Math.round( (cellWidth+0.5)*col );
    var fieldY = 0;
    var fieldWidth = cellWidth;
    var fieldHeight = Math.round((6-row)*(cellWidth));
        
    if (player==1) { 
        array[row][col] = 1 ;                
        diskColor = "rgb(226, 65, 65)";
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    else { 
        array[row][col] = 2 ;
        diskColor = "rgb(248, 210, 52)";
        animateDroppingDisk(fieldX, fieldY, fieldWidth, fieldHeight, diskColor); 
    }
    output.innerHTML = "Turn: Player " + ((role%2)+1);

    if (isAWinningMove(row, col)) { 
        gameRunning=false; 
        
        
        for (i=(rows-1) ; i>=0 ;i--){
            td = document.getElementById(i+""+col);
            td.style.background = "none";
        }
        
        
        for (var m=0 ; m < winningMoveCells.length ; m++){
            td = document.getElementById(""+winningMoveCells[m]);
            td.style.background = "rgba(0,0,0,0.4)";
        }
    
        if (((role-1)%2 +1) == 1 ) { 
            output.innerHTML = "Player 1 WON!";
            output.className = "player1";
            player1ScoreOutput.innerHTML = ++player1Score;
        }
        else { 
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

function accessArray(row, col){ 
    try {
        var val = array[row][col];
        if (val==undefined)
            return 0;
        return val;
    }
    catch(err) {
        return 0;
    }
}

function isAWinningMove(row, col) {
    
}

