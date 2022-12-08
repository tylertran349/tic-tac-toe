const board = document.querySelector('#board');
const statusIndicator = document.querySelector('#status-indicator');
const restartButton = document.querySelector('#restart-button');
const startGameButton = document.querySelector('#start-game-button');
const createPlayersOverlay = document.querySelector('#create-players-overlay');
const form = document.querySelector('#form');

const blankBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// Player factory function
const playerFactory = (playerName, object) => {
    playerName = playerName;
    object = object;
    function getObject() {
        return object;
    }
    function getPlayerName() {
        return playerName;
    }
    return {
        getPlayerName: getPlayerName,
        getObject: getObject
    };
};

// Game board module
let gameBoard = (function() {
    grid = blankBoard;
    gameEnd = false;
    currentPlayer = null;

    function clearBoard() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                grid[i][j] = "";
            }
        }
    }

    function resetGame() {
        clearBoard();
        gameEnd = false;
        currentPlayer = player1;
        displayController.updateStatus(currentPlayer.getPlayerName() + "'s turn");
        displayController.drawGrid(); // Draw new grid
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function addMove(column, row, player) {
        if(currentPlayer.getObject() === "player1") {
            grid[column][row] = "X";
            displayController.drawGrid();
            if(checkGameEnd() === true) { 
                return; // If there's a winner or tie, exit the function
            }
            currentPlayer = player2; // Change current player from Player 1 to Player 2
            displayController.updateStatus(currentPlayer.getPlayerName() + "'s turn");
        } else {
            grid[column][row] = "O"
            displayController.drawGrid();
            if(checkGameEnd() === true) {
                return; // If there's a winner or tie, exit the function
            }
            currentPlayer = player1; // Change current player from Player 2 to Player 1
            displayController.updateStatus(currentPlayer.getPlayerName() + "'s turn");
        }
    }

    function checkForTie() {
        // Check for tie
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(grid[i][j] === "") {
                    return;
                }
            }
        }
        disableGrid();
        displayController.updateStatus("It's a tie!");
        return;
    }

    function checkIfPlayerOneWon() {
        if(grid[0][0] === "X" && grid[0][1] === "X" && grid[0][2] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[1][0] === "X" && grid[1][1] === "X" && grid[1][2] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[2][0] === "X" && grid[2][1] === "X" && grid[2][2] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][0] === "X" && grid[1][0] === "X" && grid[2][0] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][1] === "X" && grid[1][1] === "X" && grid[2][1] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][2] === "X" && grid[1][2] === "X" && grid[2][2] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][2] === "X" && grid[1][1] === "X" && grid[2][0] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        }
        return;
    }

    function checkIfPlayerTwoWon() {
        if(grid[0][0] === "O" && grid[0][1] === "O" && grid[0][2] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[1][0] === "O" && grid[1][1] === "O" && grid[1][2] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[2][0] === "O" && grid[2][1] === "O" && grid[2][2] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][0] === "O" && grid[1][0] === "O" && grid[2][0] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][1] === "O" && grid[1][1] === "O" && grid[2][1] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][2] === "O" && grid[1][2] === "O" && grid[2][2] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][2] === "O" && grid[1][1] === "O" && grid[2][0] === "O") {
            
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        } else if(grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O") {
            displayController.updateStatus(currentPlayer.getPlayerName() + " wins!");
            disableGrid();
            return;
        }
        return;
    }

    // Prevent grid squares from being clicked once game is over
    function disableGrid() {
        gameEnd = true;
        gridSquares = document.querySelectorAll('#grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.setAttribute('disabled', 'true');
        });
    }

    function checkGameEnd() {
        checkForTie();
        checkIfPlayerOneWon();
        checkIfPlayerTwoWon();
        if(gameEnd === true) {
            return true;
        }
    }
    
    return {
        grid: grid,
        addMove: addMove,
        getCurrentPlayer: getCurrentPlayer,
        resetGame: resetGame
    };
})();

// Display controller module
let displayController = (function() {
    // Function to clear grid
    function clearGrid() {
        gridSquares = document.querySelectorAll('#grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.remove();
        });
    }

    function updateStatus(text) {
        statusIndicator.textContent = text;
    }

    // Function to print grid
    function drawGrid() {
        clearGrid();
        displayController.updateStatus(currentPlayer.getPlayerName() + "'s turn");
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                // Create grid squares
                gridSquare = document.createElement('button');

                // Change button text of grid squares
                if(gameBoard.grid[i][j] === "X") {
                    gridSquare.textContent = "❌";
                    gridSquare.setAttribute('style', 'color: #90EE90;');
                    gridSquare.setAttribute('disabled', 'true'); // Prevent grid square from being clicked
                } else if(gameBoard.grid[i][j] === "O") {
                    gridSquare.textContent = "⭕";
                    gridSquare.setAttribute('style', 'color: #FF0000');
                    gridSquare.setAttribute('disabled', 'true'); // Prevent grid square from being clicked
                } else {
                    gridSquare.textContent = "";
                }

                // Add ID attribute for each grid square
                gridSquare.setAttribute('id', 'grid-square');

                // Attach data attributes (column and row) to each grid square
                gridSquare.setAttribute('data-column', i);
                gridSquare.setAttribute('data-row', j);

                // Add grid square to board 
                board.appendChild(gridSquare);
            }
        }
        addGridSquareListeners();
    }

    function addGridSquareListeners() {
        gridSquares = document.querySelectorAll('#grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.addEventListener('click', () => {
                gameBoard.addMove(gridSquare.getAttribute('data-column'), gridSquare.getAttribute('data-row'), gameBoard.getCurrentPlayer());
                gridSquare.disabled = true;
            });
        });
    }

    // Add event listener to restart button
    restartButton.addEventListener('click', () => {
        gameBoard.resetGame();
    });

    function submitFunction() {
        const player1_input = document.querySelector('#player-1-input');
        const player2_input = document.querySelector('#player-2-input')

        // Create player objects using player factory function
        player1 = playerFactory(player1_input.value, "player1");
        player2 = playerFactory(player2_input.value, "player2");

        form.reset(); // Reset form input values
        createPlayersOverlay.style.display = "none"; // Hide add book overlay
        gameBoard.resetGame(); // Start new game from scratch
    }

    return {
        drawGrid: drawGrid,
        updateStatus: updateStatus,
        submitFunction: submitFunction
    };
})();