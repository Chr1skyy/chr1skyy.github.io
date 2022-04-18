const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    // Rzędy
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],

    // Kolumny
    ["0","3","6"],
    ["1","4","7"],
    ["2","5","8"],

    // Przekątne
    ["0","4","8"],
    ["2","4","6"]
  ]
};

const gameOver = document.querySelector(".game-over")
const gameOverText = document.querySelector(".game-over-text");
document.addEventListener("click", event => {
  const target = event.target;
  const isCell = target.classList.contains("item");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;
    game.xTurn === true
      ? game.xState.push(cellValue)
      : game.oState.push(cellValue);

    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x": "o");

    game.xTurn = !game.xTurn;
    if (!document.querySelectorAll(".item:not(.disabled)").length) {
      gameOver.classList.add("visible");
      gameOverText.textContent = "Remis!";
    }

    game.winningStates.forEach(winningState => {
      const xWins = winningState.every(state => game.xState.includes(state));
      const oWins = winningState.every(state => game.oState.includes(state));
      if (xWins || oWins) {
        document.querySelectorAll(".item").forEach(cell => cell.classList.add("disabled"));
        gameOver.classList.add("visible");
        gameOverText.textContent = xWins
        ? "X wygrał!" : "O wygrał!";
      }
    });
  }
});

document.querySelector(".restart").addEventListener("click", () => {
  gameOver.classList.remove("visible");
  document.querySelectorAll(".item").forEach(cell => {
    cell.classList.remove("disabled", "x", "o");
  });

  game.xTurn = true;
  game.xState = [];
  game.oState = [];
})