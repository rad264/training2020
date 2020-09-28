function ImportPage() {
    resetBoard();
    resetSolution();
    resetImport();
    var importPage = document.createElement("div");
    importPage.id = "import_page";
    var instructions = document.createElement("p");
    instructions.id = "import_instructions";
    instructions.innerHTML = 
    "<b>(Feature coming soon) </b>Import a .txt file with two strings with 81 digits each, the first representing the sudoku game and the second representing the answers. Separate them with a new line.";
    importPage.appendChild(instructions);
    var inputSudoku = document.createElement("input");
    inputSudoku.type = "file";
    inputSudoku.id = "sudoku_input";
    inputSudoku.accept = "text/plain";
    importPage.appendChild(inputSudoku);
    // TODO: implement import function
    document.getElementById("gameArea").appendChild(importPage);
}

function resetImport() {
    if (document.getElementById("import_page")) {
        var oldImportPage = document.getElementById("import_page");
        oldImportPage.parentNode.removeChild(oldImportPage);
    }
}