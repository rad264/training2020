function GameBoardSudoku(containerNode, sudokuString, gameOverFunction, handleClick, handleRightClick) {
    var buttons = [];
    for (let i = 0; i < 9; i++)
        buttons.push([]);
    containerNode.innerHTML = "";
    var table = document.createElement("table");
    var count = 1;
    for (var y = 0; y < 9; y++) {
        var row = document.createElement("tr");
        for (var x = 0; x < 9; x++) {
            var cell = document.createElement("td");
            cell.className = "board_cell";
            if (sudokuString.charAt(count) == "0") {
                var button = document.createElement("button");
                button.state = 0;
                button.innerHTML = button.state.toString();
                button.onclick = (function(x, y) {
                    return function() {
                        handleClick(x, y);
                    };
                })(x, y);
                if (handleRightClick !== undefined) {
                    button.oncontextmenu = (function(x, y) {
                        return function() {
                            handleRightClick(x, y);
                            return false;
                        };
                    })(x, y);
                }
                buttons[x][y] = button;
                cell.appendChild(button);
            } else {
                var number = document.createElement("p");
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
