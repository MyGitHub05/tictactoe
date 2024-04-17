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

  const playerMove = (column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === " ")
      .map((row) => row[column]);

    if (!availableCells) return;
    availableCells[column] = player;

    return availableCells;
  };

  const printBoard = () => {
    const boardWithCells = board.map((row) => {
      row.map((cell) => {
        cell.getValue();
      });
    });
    console.log(boardWithCells);
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

  const Player = [
    {
      name: playerOne,
      token: "X",
    },
    {
      name: playerTwo,
      token: "O",
    },
  ];

  const activePlayer = Player[0];
  const switchActivePlayer = () =>
    activePlayer === Player[0] ? Player[1] : Player[0];

  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
  };
  const playRound = (column) => {
    board.dropMove(column, getActivePlayer().token);
    switchActivePlayer();
    printNewRound();
  };

  printNewRound();
  return { getActivePlayer, playRound, getBoard: board.getBoard };
}

function ScreenController() {
  const game = GameController();
  const message = document.querySelector(".message");
  const boardDiv = document.querySelector(".board");
  const fullGame = document.querySelector(".game");

  const updateScreen = () => {
    fullGame.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    message.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function ClickHandleBoard(e) {
    const selectedColumn = e.target.dataset.column;

    if (!selectedColumn) return;
    game.playRound(selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", ClickHandleBoard);

  updateScreen();
}

ScreenController();
