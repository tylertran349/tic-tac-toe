/*
TODO:
- Fix restart button (currently, the board does not reset when pressing restart)
*/

board = document.querySelector('#board');
statusIndicator = document.querySelector('#status-indicator');
restartButton = document.querySelector('#restart-button');

let blankBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

restartButton.addEventListener('click', () => {
    gameBoard.resetGame();
});

let gameBoard = (function() {
    grid = blankBoard;
    gameEnd = false;
    winner = null;
    currentPlayer = "Player 1";

    function resetGame() {
        grid = blankBoard;
        gameEnd = false;
        winner = null;
        currentPlayer = "Player 1";
        statusIndicator.textContent = "Player 1's turn";
        displayController.drawGrid(); // Draw new grid
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function addMove(column, row, player) {
        if(player === "Player 1") {
            grid[column][row] = "X";
            currentPlayer = "Player 2"; // Change current player from Player 1 to Player 2
            statusIndicator.textContent = "Player 2's turn";
        } else {
            grid[column][row] = "O"
            currentPlayer = "Player 1"; // Change current player from Player 2 to Player 1
            statusIndicator.textContent = "Player 1's turn";
        }
        displayController.drawGrid();
        checkGameEnd();
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
        console.log("tie");
        statusIndicator.textContent = "It's a tie!";
        return;
    }

    function checkIfPlayerOneWon() {
        if(grid[0][0] === "X" && grid[0][1] === "X" && grid[0][2] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[1][0] === "X" && grid[1][1] === "X" && grid[1][2] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[2][0] === "X" && grid[2][1] === "X" && grid[2][2] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[0][0] === "X" && grid[1][0] === "X" && grid[2][0] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[0][1] === "X" && grid[1][1] === "X" && grid[2][1] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[0][2] === "X" && grid[1][2] === "X" && grid[2][2] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[0][2] === "X" && grid[1][1] === "X" && grid[2][0] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        } else if(grid[0][0] === "X" && grid[1][1] === "X" && grid[2][2] === "X") {
            console.log("Player 1 won");
            statusIndicator.textContent = "Player 1 wins!";
            disableGrid();
            return;
        }
        return;
    }

    function checkIfPlayerTwoWon() {
        if(grid[0][0] === "O" && grid[0][1] === "O" && grid[0][2] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[1][0] === "O" && grid[1][1] === "O" && grid[1][2] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[2][0] === "O" && grid[2][1] === "O" && grid[2][2] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[0][0] === "O" && grid[1][0] === "O" && grid[2][0] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[0][1] === "O" && grid[1][1] === "O" && grid[2][1] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[0][2] === "O" && grid[1][2] === "O" && grid[2][2] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[0][2] === "O" && grid[1][1] === "O" && grid[2][0] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
            disableGrid();
            return;
        } else if(grid[0][0] === "O" && grid[1][1] === "O" && grid[2][2] === "O") {
            console.log("Player 2 won");
            statusIndicator.textContent = "Player 2 wins!";
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
    }
    
    return {
        grid: grid,
        gameEnd: gameEnd,
        addMove: addMove,
        getCurrentPlayer: getCurrentPlayer,
        resetGame: resetGame
    };
})();

let displayController = (function() {
    // Function to clear grid
    function clearGrid() {
        gridSquares = document.querySelectorAll('#grid-square');
        gridSquares.forEach((gridSquare) => {
            gridSquare.remove();
        });
    }

    // Function to print grid
    function drawGrid() {
        clearGrid();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                // Create grid squares
                gridSquare = document.createElement('button');

                // Change button text of grid squares
                if(gameBoard.grid[i][j] === "X") {
                    gridSquare.textContent = "❌";
                    gridSquare.setAttribute('style', 'color: #90EE90; font-size: 12rem;');
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
                console.log("Grid square at " + gridSquare.getAttribute('data-column') + gridSquare.getAttribute('data-row') + " was clicked");
                gameBoard.addMove(gridSquare.getAttribute('data-column'), gridSquare.getAttribute('data-row'), gameBoard.getCurrentPlayer());
                gridSquare.disabled = true;
            });
        });
    }

    return {
        clearGrid: clearGrid,
        drawGrid: drawGrid
    };
})();

displayController.drawGrid();