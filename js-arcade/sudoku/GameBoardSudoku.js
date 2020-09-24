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
                var button = document.createElement("p");
                button.className = "button";
                button.state = 0;
                button.innerHTML = button.state.toString();
                button.onclick = (function(x, y) {
                    return function() {
                        handleClick(x, y);
                    };
                })(x, y);
                buttons[x][y] = button;
                cell.appendChild(button);
            } else {
                var number = document.createElement("p");
                number.className = "number";
                number.state = sudokuString.charAt(count);
                number.innerHTML = sudokuString.charAt(count).toString();
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
    [1, 2, 3].forEach(function () {
        solutionArea.appendChild(document.createElement("br"));
    })
    var solutionButton = document.createElement("button");
    solutionButton.innerHTML = "Solution";
    solutionButton.className = "top_button";
    solutionButton.onclick = function() {
        [1, 2, 3].forEach(function () {
            solutionArea.appendChild(document.createElement("br"));
        })
        var table = document.createElement("table");
        table.className = "board";
        var count = 0;
        for (var y = 0; y < 9; y++) {
            var row = document.createElement("tr");
            for (var x = 0; x < 9; x++) {
                var cell = document.createElement("td");
                var number = document.createElement("p");
                number.className = "number";
                number.state = sudokuSolution.charAt(count);
                number.innerHTML = sudokuSolution.charAt(count).toString();
                cell.appendChild(number);
                row.appendChild(cell);
                count++;
            }
            table.appendChild(row);
        }
        solutionArea.appendChild(table);
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
