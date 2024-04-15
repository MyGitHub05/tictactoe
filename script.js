function GameBoard() {
  const rows = 20;
  const cols = 20;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;

  const playerMove = (column, player) => {
    const availableCells = board.filter()
  };
}

console.log(GameBoard());
