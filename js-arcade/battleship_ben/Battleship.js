// allow vertical ships (click and drag, drag and drop)
// add sound effect
// new game should completely reset
// why number not changing


class Battleship {
    constructor() {
        var thisObj = this;
        var ownBoard1 = new GameBoard(document.getElementById("ownBoard1"), 10, 10, function(x, y) { thisObj.click(x, y); });
		var guessingBoard1 = new GameBoard(document.getElementById("guessingBoard1"), 10, 10, function(x, y) { thisObj.click(x, y); });
		var ownBoard2 = new GameBoard(document.getElementById("ownBoard2"), 10, 10, function(x, y) { thisObj.click(x, y); });
		var guessingBoard2 = new GameBoard(document.getElementById("guessingBoard2"), 10, 10, function(x, y) { thisObj.click(x, y); });
	
		var playerOne = {
			player: "ONE",
			ownBoard: ownBoard1,
			guessingBoard: guessingBoard1, 
			shipNumber: 2,
			ships: []	
		};
		var playerTwo = {
			player: "TWO",
			ownBoard: ownBoard2,
			guessingBoard: guessingBoard2,
			shipNumber: 2,
			ships: []	
		};
		var gameStage = "setup";
		var setupTurn = true;
		var playTurn = true;
		
		disableBoard(playerOne.guessingBoard);
		disableBoard(playerTwo.ownBoard);
		disableBoard(playerTwo.guessingBoard);

		// document.getElementById("player").innerHTML = "Player ONE";
		// document.getElementById("console").innerHTML = "Mark your ship (5 spaces)";
		
        this.click = function(x, y) {
            switch (gameStage) {
                case "setup":
                    if (setupTurn) setupBoardAndMarkShips(x, y, playerOne);
					else setupBoardAndMarkShips(x, y, playerTwo);
					break;
                case "play":
					switch (true) {
						case playTurn:
							// document.getElementById("player").innerHTML = "Player ONE's turn";
							attack(x, y, playerOne, playerTwo);
							break;
						case !playTurn:
							// document.getElementById("player").innerHTML = "Player TWO's turn";
							attack(x, y,playerTwo, playerOne);
							break;
					}
            }
        };
        function setupBoardAndMarkShips(x, y, player) {
			var ship = [];
            for (var i = x; i < x + player.shipNumber; i++) {
                var button = player.ownBoard.getButton(i, y);
				button.className = "shipButton";
				button.disabled = true;
				ship.push({x: i, y: y});
            }
			player.ships.push(ship);
            player.shipNumber--;
            switch (player.shipNumber) {
                case player.shipNumber > 0:
					// document.getElementById("player").innerHTML = "Player " + player.player;
                    // document.getElementById("console").innerHTML = "Mark your ship (" + player.shipNumber + " spaces)";
                    break;
				case 0:
					if (!setupTurn) {
						// document.getElementById("player").innerHTML = "Player ONE's turn";
						// document.getElementById("console").innerHTML = "";
						gameStage = "play";
						disableBoard(playerTwo.ownBoard);
						enableBoard(playerOne.guessingBoard);
						return;
					} else {
						disableBoard(playerOne.ownBoard)
						enableBoard(playerTwo.ownBoard)
						// document.getElementById("player").innerHTML = "Player TWO";
						// document.getElementById("console").innerHTML = "Mark your ship (5 spaces)";
						setupTurn = !setupTurn;
						return;
					}
            }
        };
		function attack(x, y, player, opponent) {
			var hit = false;
			for (var i = 0; i < opponent.ships.length; i++) {
				for (var j = 0 ; j < opponent.ships[i].length; j++) {
					if (opponent.ships[i][j].x === x && opponent.ships[i][j].y === y) {
						hit = true;
						markMove(x, y, opponent, player, "hit");
						console.log("hit")
						opponent.ships[i].splice(j, 1);

						if (opponent.ships[i].length === 0) {
							opponent.ships.splice(i, 1);
						}
						
						if (opponent.ships.length === 0) {
							alert("Game over! Player " + player.player + " WON.")
						}
						
						return true;
					}
				}
			}
			if (!hit) {
				markMove(x, y, opponent, player, "miss");
				disableBoard(player.guessingBoard);
				enableBoard(opponent.guessingBoard);
				playTurn = !playTurn;
				return false;
			}
		};

		function markMove(x, y, player, opponent, attack) {
			var ownBoardButton = player.ownBoard.getButton(x, y);
			var opponentGuessBoardButton = opponent.guessingBoard.getButton(x, y);
			if (attack === "hit") {
				ownBoardButton.innerHTML = 'X';
				opponentGuessBoardButton.innerHTML = 'X';
				ownBoardButton.disabled = true;
				opponentGuessBoardButton.disabled = true;
				ownBoardButton.className = "hitButton";
				opponentGuessBoardButton.className = "hitButton";
			} else {
				ownBoardButton.innerHTML = '\u2022';
				opponentGuessBoardButton.innerHTML = '\u2022';
				ownBoardButton.disabled = true;
				opponentGuessBoardButton.disabled = true;
				ownBoardButton.className = "missedButton";
				opponentGuessBoardButton.className = "missedButton"
			}
		};
		
		function enableBoard(board) {
			if (board === playerOne.ownBoard) {
				var div = document.getElementById("ownBoard1");
				div.className = "enabled"
			} else if (board === playerTwo.ownBoard){
				var div = document.getElementById("ownBoard2");
				div.className = "enabled"
			} else if (board === playerOne.guessingBoard){
				var div = document.getElementById("guessingBoard1");
				div.className = "enabled"
			} else if (board === playerTwo.guessingBoard){
				var div = document.getElementById("guessingBoard2");
				div.className = "enabled"
			}				
		};
		
		function disableBoard(board) {
			if (board === playerOne.ownBoard) {
				var div = document.getElementById("ownBoard1");
				div.className = "disabled"
			} else if (board === playerTwo.ownBoard){
				var div = document.getElementById("ownBoard2");
				div.className = "disabled"
			} else if (board === playerOne.guessingBoard){
				var div = document.getElementById("guessingBoard1");
				div.className = "disabled"
			} else if (board === playerTwo.guessingBoard){
				var div = document.getElementById("guessingBoard2");
				div.className = "disabled"
			}		
		};
    }
}

