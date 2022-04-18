const wybor = document.getElementById("choice").value;
const edycje = ["mole",
  "zsz1",
  "zsz2",
  "zsz3",
  "zsz4"];
const square = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#timeLeft");
const score = document.querySelector("#score");
const hitSound = new Audio("./sound/hit.mp3");
const missSound = new Audio("./sound/miss.mp3");
const endGame = new Audio("./sound/endgame.mp3");
const gameOver = document.querySelector(".gameOver");
const gameOverText = document.querySelector(".gameOverText");
const editionChoice = document.getElementById("editionChoice");
const clickSound = new Audio("./sound/click.mp3");

document.onclick = () => {
  clickSound.play();
};

function play() {
  let result = 0,
    currentTime = 60,
    hitPosition,
    lastPosition = null;
  function rndSquare() {
    square.forEach(square => {
      square.classList.remove("mole", "zsz1", "zsz2", "zsz3", "zsz4");
    });
    let randomSquare = square[Math.floor(Math.random() * 9)];
    if (lastPosition === randomSquare) {
      randomSquare = square[Math.floor(Math.random() * 9)];
    }
    lastPosition = randomSquare;
    randomSquare.classList.add(edycje[wybor]);
    hitPosition = randomSquare.id;
  }

  square.forEach(square => {
    square.addEventListener("click", () => {
      if (square.id === hitPosition) {
        result++;
        hitSound.play();
        score.textContent = result;
        hitPosition = null;
      }
      if (square.id != hitPosition) {
        missSound.play();
      }
    });
  });
  let timerId = setInterval(rndSquare, 750);

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
      gameOver.classList.add("visible");
      gameOverText.textContent = "Koniec gry! Twój wynik to: " + result;
      endGame.play();
      clearInterval(countDownTimerId);
      clearInterval(timerId);
    }
  }
  let countDownTimerId = setInterval(countDown, 1000);
  hide();
}

function hide() {
  editionChoice.style.display = "none";
}
  
function restart() {
  timeLeft.textContent = "60";
  score.textContent = "0";
  gameOver.classList.remove("visible");
  editionChoice.style.display = "block";
  square.forEach(square => {
      square.classList.remove("mole", "zsz1", "zsz2", "zsz3", "zsz4");
    });
}