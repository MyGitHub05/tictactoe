function GameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const playerMove = (columnIndex, rowIndex, player) => {
    if (board[rowIndex][columnIndex].getValue() === "") {
      board[rowIndex][columnIndex].dropMove(player);
    } else {
      alert("May nakalagay na dito wag kang tangaa");
    }
  };

  const printBoard = () => {
    const boardWithCells = board.map((row) => {
      row.map((cell) => {
        cell.getValue();
      });
    });
  };

  return { getBoard, playerMove, printBoard };
}

function Cell() {
  let value = "";
  const dropMove = (player) => {
    value = player;
  };
  const getValue = () => value;

  return { dropMove, getValue };
}

function GameController(playerOne = "player 1", playerTwo = "player 2") {
  const board = GameBoard();

  const Players = [
    {
      name: playerOne,
      token: "X",
    },
    {
      name: playerTwo,
      token: "O",
    },
  ];

  let activePlayer = Players[0];
  const switchActivePlayer = () =>
    (activePlayer = activePlayer === Players[0] ? Players[1] : Players[0]);

  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
  };
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
      const valueA = board[Math.floor(a / 3)][a % 3].getValue();
      const valueB = board[Math.floor(b / 3)][b % 3].getValue();
      const valueC = board[Math.floor(c / 3)][c % 3].getValue();

      if (valueA === player && valueB === player && valueC === player) {
        return true;
      }
    }
    return false;
  };
  const playRound = (column, row) => {
    board.playerMove(column, row, getActivePlayer().token);
    if (checkWinningCombination(board.getBoard(), getActivePlayer().token)) {
      return;
    }
    switchActivePlayer();
    printNewRound();
  };

  return {
    getActivePlayer,
    playRound,
    getBoard: board.getBoard,
    checkWinningCombination,
  };
}

function ScreenController() {
  let game = GameController();
  const message = document.querySelector(".message");
  const boardDiv = document.querySelector(".board");
  const resetBtn = document.querySelector(".resetBtn");
  const startBtn = document.querySelector(".startBtn");

  const startingScreen = () => {
    boardDiv.textContent = "";
    message.textContent = "Play tictactoe";
    const board = game.getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });

    boardDiv.removeEventListener("click", ClickHandleBoard);
  };

  const updateScreen = () => {
    message.textContent = "";
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const winner = game.checkWinningCombination(
      game.getBoard(),
      game.getActivePlayer().token
    );
    message.textContent = winner
      ? `${activePlayer.name} Win`
      : `${activePlayer.name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });

    boardDiv.addEventListener("click", ClickHandleBoard);
  };

  function resetGame() {
    game = GameController();
    boardDiv.innerHTML = "";
    message.textContent = "";

    updateScreen();
  }

  function ClickHandleBoard(e) {
    const selectedrow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedColumn && selectedrow) return;
    game.playRound(selectedColumn, selectedrow);
    updateScreen();
  }

  resetBtn.addEventListener("click", resetGame);
  startBtn.addEventListener("click", updateScreen);

  startingScreen();
}

ScreenController();
