const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

const userScore = new Audio("./sound/userScore.mp3");
const compScore = new Audio("./sound/compScore.mp3");
const hit = new Audio("./sound/hit.mp3");
const wall = new Audio("./sound/wall.mp3");

const user = {
  x: 0,
  y: cvs.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "#000",
  score: 0
}

const comp = {
  x: cvs.width - 10,
  y: cvs.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "#000",
  score: 0
}

const ball = {
  x: cvs.width/2,
  y: cvs.height/2,
  radius: 10,
  speed: 8,
  velocityX: 5,
  velocityY: 5,
  color: "#000"
}

const net = {
  x: (cvs.width - 2)/2,
  y: 0,
  width: 2,
  height: 10,
  color: "#000"
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawNet() {
  for (let i = 0; i <= cvs.height; i += 15) {
    drawRect(net.x, net.y+i, net.width, net.height, net.color);
  }
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

function drawArc(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "55px sans-serif";
  ctx.fillText(text, x, y);
}

function update() {
  if (ball.x - ball.radius < 0) {
    comp.score++;
    compScore.play();
    resetBall();
  } else if (ball.x + ball.radius > cvs.width) {
    user.score++;
    userScore.play();
    resetBall();
  }

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  comp.y += ((ball.y - (comp.y + comp.height/2)))*0.1;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > cvs.height) {
    ball.velocityY = -ball.velocityY;
    wall.play();
  }
  let player = (ball.x + ball.radius < cvs.width/2) ? user : comp;

  if (collision(ball, player)) {
    hit.play();
    let collidePoint = (ball.y - (player.y + player.height/2));
    collidePoint = collidePoint / (player.height/2);
    let angleRad = (Math.PI/4) * collidePoint;
    let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.15;
  }
}

function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall() {
  ball.x = cvs.width/2;
  ball.y = cvs.height/2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 8;
}

cvs.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
  let rect = cvs.getBoundingClientRect();
  user.y = evt.clientY - rect.top - user.height/2;
}

function render() {
  drawRect(0, 0, cvs.width, cvs.height, "#fff");
  drawNet();
  drawCircle(ball.x, ball.y, ball.radius, "#000");
  drawText(user.score, cvs.width/4, cvs.height/5, "#000");
  drawText(comp.score, 3*cvs.width/4, cvs.height/5, "#000");
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
  drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
  update();
  render();
}
let framePerSecond = 60;
let loop = setInterval(game, 1000/framePerSecond);