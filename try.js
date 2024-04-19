const board = [];
const rows = 3;
const cols = 3;

for (let i = 0; i < rows; i++) {
  board[i] = [];
  for (let j = 0; j < cols; j++) {
    board[i].push("");
  }
}

const playerMove = (columnIndex, rowIndex, player) => {
  if (board[rowIndex][columnIndex] === "") {
    board[rowIndex][columnIndex] = player;
    console.log(board);
  } else {
    console.log("meron na nakalagay");
  }
};
playerMove(0, 1, "x");
playerMove(0, 1, "0");
//console.log(board);
const checkWinningCombination = (board, player) => {
  const winningConditions = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    console.log(`${a},${b},${c}`);
    console.log(a % 3);
  }
};
checkWinningCombination(board, "x");
