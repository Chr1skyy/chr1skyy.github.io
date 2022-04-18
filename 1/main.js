const comp = document.getElementById("comp");
const player = document.getElementById("player");
const result = document.getElementById("result");
const playerScore = document.getElementById("playerScore");
const compScore = document.getElementById("compScore");
let playerChoice, compChoice;
let pScore = 0,
    cScore = 0;
const emoji = ["✋", "✊", "✌️"];
const choice = document.querySelectorAll("button");
choice.forEach(choice => choice.addEventListener("click", (x) => {
  playerChoice = x.target.id;
  player.innerHTML = playerChoice;
  compCoiceGen();
  checkResult();
}))

function compCoiceGen() {
  const rng = Math.floor(Math.random() * 3);
  if (rng === 0) {
    compChoice = emoji[0];
  }
  if (rng === 1) {
    compChoice = emoji[1];
  }
  if (rng === 2) {
    compChoice = emoji[2];
  }
  comp.innerHTML = compChoice;
}

function checkResult() {
  if (playerChoice === compChoice) {
    result.innerHTML = "Remis!";
    result.style.color = "yellow";
  }
  if (playerChoice === emoji[0] && compChoice === emoji[1]) {
    result.innerHTML = "Wygrałeś!";
    result.style.color = "green";
    pScore++;
  }
  if (playerChoice === emoji[0] && compChoice === emoji[2]) {
    result.innerHTML = "Przegrałeś!";
    result.style.color = "red";
    cScore++;
  }
  if (playerChoice === emoji[1] && compChoice === emoji[0]) {
    result.innerHTML = "Przegrałeś!";
    result.style.color = "red";
    cScore++;
  }
  if (playerChoice === emoji[1] && compChoice === emoji[2]) {
    result.innerHTML = "Wygrałeś!";
    result.style.color = "green";
    pScore++;
  }
  if (playerChoice === emoji[2] && compChoice === emoji[0]) {
    result.innerHTML = "Wygrałeś!";
    result.style.color = "green";
    pScore++;
  }
  if (playerChoice === emoji[2] && compChoice === emoji[1]) {
    result.innerHTML = "Przegrałeś!";
    result.style.color = "red";
    cScore++;
  }
  playerScore.innerHTML = pScore;
  compScore.innerHTML = cScore;
  result.classList.add("resStyle");
}