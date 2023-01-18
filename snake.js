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

/* Game state */

let cicle;
let snake = [
  { posX: 60, posY: 20 },
  { posX: 40, posY: 20 },
  { posX: 20, posY: 20 }
];
let actualDirection = DIRECTION.right;
let newDirection = DIRECTION.right;

/* Draw schema */

function drawGrid(CTX) {
  for (let x = 20; x < 600; x += 20) {
    CTX.beginPath();
    CTX.fillStyle = "black";
    CTX.moveTo(x, 0);
    CTX.lineTo(x, 600);
    CTX.stroke();
  }

  for (let y = 20; y < 600; y += 20) {
    CTX.beginPath();
    CTX.fillStyle = "black";
    CTX.moveTo(0, y);
    CTX.lineTo(600, y);
    CTX.stroke();
  }
}

function drawSnake(CTX, snake) {
  for (let i = 0; i < snake.length; i++) {
  CTX.beginPath();
  CTX.fillStyle = "black";
  CTX.fillRect(snake[i].posX, snake[i].posY, 20, 20);
  CTX.stroke();
  }
}

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

/* Game Cicle */

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
  CTX.clearRect(0, 0, 600, 600);
  drawGrid(CTX);
  drawSnake(CTX, snake);
}

drawGrid(CTX);
drawSnake(CTX, snake);

CANVAS.addEventListener("click", function () {
  if (cicle === undefined) { cicle = setInterval(gameCicle, FPS); }
});
