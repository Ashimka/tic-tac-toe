const cells = document.querySelectorAll(".cell");
const title = document.querySelector(".header__title");
const OPlayer = document.querySelector("#O_player");
const XPlayer = document.querySelector("#X_player");
const restartBtn = document.querySelector(".restart");

let player;
let isPauseGame = false;
let isStartGame = false;

const inputCells = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const choosePlayer = (selectPlayer) => {
  if (!isStartGame) {
    player = selectPlayer;
    if (player === "X") {
      XPlayer.classList.add("active");
      OPlayer.classList.remove("active");
    } else {
      XPlayer.classList.remove("active");
      OPlayer.classList.add("active");
    }
    isStartGame = true;
  }
};

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});

const tapCell = (cell, index) => {
  if (cell.textContent === "" && !isPauseGame && isStartGame) {
    isStartGame = true;
    updateCell(cell, index);

    if (!checkWinner() && isStartGame) {
      changePlayer();
      randomPick();
    }
  }
};

const updateCell = (cell, index) => {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player === "X" ? "#ffd700" : "#1892ea";
};

const changePlayer = () => {
  player = player === "X" ? "O" : "X";
};

const randomPick = () => {
  isPauseGame = true;
  setTimeout(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (inputCells[randomIndex] !== "");

    updateCell(cells[randomIndex], randomIndex, player);

    if (!checkWinner()) {
      changePlayer();
      isPauseGame = false;

      return;
    }
    player = changePlayer();
  }, 1500);
};

const checkWinner = () => {
  for (const [a, b, c] of winConditions) {
    if (
      inputCells[a] === player &&
      inputCells[b] === player &&
      inputCells[c] === player
    ) {
      declareWinner([a, b, c]);

      return true;
    }
  }
  if (inputCells.every((cell) => cell !== "")) {
    declareDraw();

    return true;
  }
};

const declareWinner = (winningIndices) => {
  title.textContent = `'${player}'   Победил!`;
  isPauseGame = true;

  winningIndices.forEach(
    (index) => (cells[index].style.background = "#743274")
  );

  restartBtn.style.visibility = "visible";
};

const declareDraw = () => {
  title.textContent = "Ничья!";
  isPauseGame = true;
  restartBtn.style.visibility = "visible";
};

restartBtn.addEventListener("click", () => {
  restartBtn.style.visibility = "hidden";
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isPauseGame = false;

  title.textContent = "Крестики нолики";
  player = XPlayer.classList.contains("active") ? "X" : "O";
});
