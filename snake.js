/* Constants */

const DIRECTION = {
  up: 1,
  down: 2,
  left: 3,
  right: 4
}
const FPS = 1000 / 10;
const CANVAS = document.getElementById('snakeCanvas');
const CTX = CANVAS.getContext('2d');
const SCORE = document.getElementById('score');

/* Game state */

let cicle;
let snake;
let actualDirection;
let newDirection;
let food;
let score;

/* Draw schema */

function drawMap(CTX) {
  CTX.beginPath();
  CTX.lineWidth = "2";
  CTX.rect(20, 20, 560, 560);
  CTX.stroke();
}

function fillSquare(CTX, posX, posY) {
  CTX.beginPath();
  CTX.fillStyle = "black";
  CTX.fillRect(posX, posY, 20, 20);
  CTX.stroke();
}

function drawSnake(CTX, snake) {
  for (let i = 0; i < snake.length; i++) {
    fillSquare(CTX, snake[i].posX, snake[i].posY);
  }
}

function drawFood(CTX, food) {
  fillSquare(CTX, food.posX, food.posY);
}

// Uncoment this function to play with grid

// function drawGrid(CTX) {
//   for (let x = 20; x < 600; x += 20) {
//     CTX.beginPath();
//     CTX.fillStyle = "black";
//     CTX.moveTo(x, 0);
//     CTX.lineTo(x, 600);
//     CTX.stroke();
//   }

//   for (let y = 20; y < 600; y += 20) {
//     CTX.beginPath();
//     CTX.fillStyle = "black";
//     CTX.moveTo(0, y);
//     CTX.lineTo(600, y);
//     CTX.stroke();
//   }
// }

/* Move snake */

function moveSnake(movingDirection, snake) {
  let headPosX = snake[0].posX;
  let headPosY = snake[0].posY;

  if (movingDirection === DIRECTION.up) {
    headPosY -= 20;
  } else if (movingDirection === DIRECTION.down) {
    headPosY += 20;
  } else if (movingDirection === DIRECTION.left) {
    headPosX -= 20;
  } else if (movingDirection === DIRECTION.right) {
    headPosX += 20;
  } else {
    return;
  }
  snake.unshift({ posX: headPosX, posY: headPosY });
  snake.pop();
}

/* Generate food */

function generateFood(snake) {
  while (true) {
  let columnX = Math.max(Math.floor(Math.random() * 29), 1);
  let columnY = Math.max(Math.floor(Math.random() * 29), 1);

  let posX = columnX * 20;
  let posY = columnY * 20;

  let overlap = false;
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].posX === posX && snake[i].posY === posY) {
      overlap = true;
      break;
    }
  }
  if (overlap) { continue; }
  return { posX: posX, posY: posY };
  }
}

/* Scoring */

function showScore() {
  SCORE.innerHTML = `Score: ${score}`;
}

function increaseScore() {
  score++;
  showScore(score);
}

/* Game over */

function wallCollision(snake) {
  let head = snake[0];

  if ( head.posX < 20 || head.posX >= 580 || head.posY < 20 ||head.posY >= 580) { return true;}
  if (snake.length === 1) { return false; }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].posX === head.posX && snake[i].posY === head.posY) {
      return true;
    }
  }
  return false;
}

/* Game cicle */

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp" && actualDirection !== DIRECTION.down) {
    newDirection = DIRECTION.up;
  } else if (event.code === "ArrowDown" && actualDirection !== DIRECTION.up) {
    newDirection = DIRECTION.down;
  } else if (event.code === "ArrowLeft" && actualDirection !== DIRECTION.right) {
    newDirection = DIRECTION.left;
  } else if (event.code === "ArrowRight" && actualDirection !== DIRECTION.left) {
    newDirection = DIRECTION.right;
  }
});

function gameCicle() {
  moveSnake(newDirection, snake);
  actualDirection = newDirection;

  if (snake[0].posX === food.posX && snake[0].posY === food.posY) {
    snake.push({ posX: snake[snake.length - 1].posX, posY: snake[snake.length - 1].posY });
    food = generateFood(snake);
    increaseScore();
  }

  if (wallCollision(snake)) {
    clearInterval(cicle);
    cicle = undefined;
    return;
  }

  CTX.clearRect(0, 0, 600, 600);
  drawMap(CTX);
  drawSnake(CTX, snake);
  drawFood(CTX, food);
}

/* Start game */

function startGame() {
  score = 0;
  showScore(score);
  snake = [
    { posX: 60, posY: 20 },
    { posX: 40, posY: 20 },
    { posX: 20, posY: 20 }
  ];
  actualDirection = DIRECTION.right;
  newDirection = DIRECTION.right;
  food = generateFood(snake);
  showScore(score);
  cicle = setInterval(gameCicle, FPS);
}

drawMap(CTX);

CANVAS.addEventListener("click", function () {
  if (cicle === undefined) { startGame(); }
});
