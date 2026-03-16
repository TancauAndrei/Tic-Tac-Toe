const board = Array(9).fill("");
let turn = "X";
let gameOver = false;
let player1Name = "Jucător X";
let player2Name = "Jucător O";

const cells = document.querySelectorAll(".cell");
const turnEl = document.getElementById("turn");
const playerNameEl = document.getElementById("playerName");

// Load player names from localStorage
window.addEventListener('DOMContentLoaded', () => {
  player1Name = localStorage.getItem('tictactoe_player1') || "Jucător X";
  player2Name = localStorage.getItem('tictactoe_player2') || "Jucător O";
  updatePlayerDisplay();

  // Load saved theme
  const theme = localStorage.getItem('tictactoe_theme') || 'theme-default';
  document.body.className = theme;
  const select = document.querySelector('select[onchange*="changeTheme"]');
  if (select) select.value = theme;
});

console.log(cells);

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => move(i));
});


// Update player name display
function updatePlayerDisplay() {
  playerNameEl.textContent = turn === "X" ? player1Name : player2Name;
}

function move(i){
  if (board[i] || gameOver) return;
  board[i] = turn;
  cells[i].textContent = turn;
  cells[i].dataset.v = turn;

  if (checkWinner()) {
    gameOver = true;
    const winnerName = turn === "X" ? player1Name : player2Name;
    alert(winnerName + " (" + turn + ") a câștigat!");
    reset();
    return;
  }

  turn = turn === "X" ? "O" : "X";
  turnEl.textContent = turn;
  updatePlayerDisplay();
}

function changeTheme(theme){
  document.body.className = theme;
  localStorage.setItem('tictactoe_theme', theme);
}

function changeMode(mode) {

}
function reset(){
  board.fill("");
  cells.forEach(c => {
    c.textContent = "";
    c.dataset.v = "";
  });
  turn = "X";
  gameOver = false;
  turnEl.textContent = turn;
  updatePlayerDisplay();
}



function checkWinner() {
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}





