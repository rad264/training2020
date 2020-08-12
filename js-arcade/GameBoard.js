function GameBoard(containerNode, width, height, handleClick) {
    var buttons = [];
    var isWhite = true;
    for (var i = 0; i < width; i++)
        buttons.push([]);
    containerNode.innerHTML = "";
    var table = document.createElement("table");
    for (var y = 0; y < height; y++) {
        var row = document.createElement("tr");
        for (var x = 0; x < width; x++) {
            var cell = document.createElement("td");
            cell.classList.add("board_cell");
            if (isWhite){
                cell.classList.add("white_cell");
            }
            else{
                cell.classList.add("black_cell");
            }
            isWhite = !isWhite;
            var button = document.createElement("button");
            button.onclick = (function(x, y) {
                return function() { handleClick(x, y) };
            })(x, y);
            buttons[x][y] = button;
            cell.appendChild(button);
            row.appendChild(cell);
        }
        isWhite = !isWhite;
        table.appendChild(row);
    }
    containerNode.appendChild(table);

    this.getButton = function(x, y) {
        return buttons[x][y];
    }
}