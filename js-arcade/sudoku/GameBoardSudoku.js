function GameBoardSudoku(containerNode, sudokuString, sudokuSolution, handleClick) {
    var buttons = [];
    for (let i = 0; i < 9; i++)
        buttons.push([]);
    containerNode.innerHTML = "";
    var table = document.createElement("table");
    table.className = "board";
    var count = 0;
    for (var y = 0; y < 9; y++) {
        var row = document.createElement("tr");
        for (var x = 0; x < 9; x++) {
            var cell = document.createElement("td");
            cell.className = "board_cell";
            if (sudokuString.charAt(count) == "0") {
                var button = createButton();
                button.onclick = (function(x, y) {
                    return function() {
                        handleClick(x, y);
                    };
                })(x, y);
                buttons[x][y] = button;
                cell.appendChild(button);
            } else {
                cell.className = "board_cell number_cell";
                var number = createNumber(sudokuString.charAt(count));
                buttons[x][y] = number;
                cell.appendChild(number);
            }
            row.appendChild(cell);
            count++;
        }
        table.appendChild(row);
    }
    containerNode.appendChild(table);
    
    var solutionArea = document.getElementById("solutionArea");
    resetSolution();
    var solutionButton = document.createElement("button");
    solutionButton.innerHTML = "I give up :(";
    solutionButton.id = "solution_button";
    solutionButton.className = "top_button";
    solutionButton.onclick = function() {
        if (!document.getElementById("solution_table")) {
            createNewLine(solutionArea, 3);
            var table = document.createElement("table");
            table.id = "solution_table";
            table.className = "board";
            var count = 0;
            for (var y = 0; y < 9; y++) {
                var row = document.createElement("tr");
                for (var x = 0; x < 9; x++) {
                    var cell = document.createElement("td");
                    var number = createNumber(sudokuSolution.charAt(count));
                    cell.appendChild(number);
                    row.appendChild(cell);
                    count++;
                }
                table.appendChild(row);
            }
            solutionArea.appendChild(table);
        }
        
    };
    solutionArea.appendChild(solutionButton);

    this.getButtonOrNumber = function(x, y) {
        return buttons[x][y];
    };

    this.toString = function() {
        var build = "";
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                build = build + buttons[x][y].state;

            }
        }
        return build;
    };
}

function createButton() {
    var button = document.createElement("p");
    button.className = "button";
    button.state = 0;
    button.innerHTML = button.state.toString();
    return button;
}

function createNumber(content) {
    var number = document.createElement("p");
    number.className = "number";
    number.state = content;
    number.innerHTML = content.toString();
    return number;
}

function createNewLine(parent, length) {
    for (var i = 0; i < length; i++) {
        var space = document.createElement("br");
        space.className = "space";
        parent.appendChild(space);
    }
}

function resetSolution() {
    if (document.getElementById("solution_button")) {
        var oldSolutionButton = document.getElementById("solution_button");
        oldSolutionButton.parentNode.removeChild(oldSolutionButton);
    }
    if (document.getElementsByClassName("space")) {
        var oldSpace = document.getElementsByClassName("space");
        while(oldSpace[0]) {
            oldSpace[0].parentNode.removeChild(oldSpace[0]);
        }
    }
    if (document.getElementById("solution_table")) {
        var oldSolutionTable = document.getElementById("solution_table");
        oldSolutionTable.parentNode.removeChild(oldSolutionTable);
    }
}

function resetBoard() {
    if (document.getElementsByClassName("board")) {
        var oldBoard = document.getElementsByClassName("board");
        while(oldBoard[0]) {
            oldBoard[0].parentNode.removeChild(oldBoard[0]);
        }
    }
}
