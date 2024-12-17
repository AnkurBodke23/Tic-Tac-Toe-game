// script.js

// Initialize the game state
let board = Array(9).fill(null);
let currentPlayer = 'X'; // X starts first
let gameActive = true;

// DOM elements
const statusDiv = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');

// Winning combinations (indexes of the board array)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to update the game status
function updateStatus() {
    if (checkWinner()) {
        statusDiv.textContent = `${currentPlayer === 'X' ? 'X' : 'O'} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
    
    }
    else if (board.every(cell => cell == null)) {
        statusDiv.textContent = "Player X' turn ";
        gameActive = true;
    }
     else {
        statusDiv.textContent = `Player ${currentPlayer== 'X'?  'O' : 'X'}'s turn`;
    }
}

// Function to check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Handle a player's move
function handleClick(event) {
    const cellIndex = event.target.dataset.cell;
    
    if (board[cellIndex] || !gameActive) return; // Ignore if cell is filled or game is over

    // Place the current player's symbol in the cell
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer; // Update the cell's text content

    // Check for a winner or a draw
    updateStatus();

    // Change turn if no winner yet
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Reset the game
function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = ''); // Clear text content of cells
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
}

// Add event listeners for each cell
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Reset button functionality
resetBtn.addEventListener('click', resetGame);

// Initialize the status display
updateStatus();
