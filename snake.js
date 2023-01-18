let direction = {
  up: 1,
  down: 2,
  left: 3,
  right: 4
}

let snakeCanvas = document.getElementById('snakeCanvas');
let snakeCtx = snakeCanvas.getContext('2d');

let snake = [
  { posX: 60, posY: 20 },
  { posX: 40, posY: 20 },
  { posX: 20, posY: 20 }
];

let actualDirection = direction.right;

function moveSnake(movingDirection, snake) {
  let headPosX = snake[0].posX;
  let headPosY = snake[0].posY;

  if (movingDirection === direction.up) {
    headPosY -= 20;
  } else if (movingDirection === direction.down) {
    headPosY += 20;
  } else if (movingDirection === direction.left) {
    headPosX -= 20;
  } else if (movingDirection === direction.right) {
    headPosX += 20;
  } else {
    return;
  }

  snake.unshift({ posX: headPosX, posY: headPosY });
  snake.pop();
}

function drawGrid(snakeCtx) {
  for (let x = 20; x < 600; x += 20) {
    snakeCtx.beginPath();
    snakeCtx.fillStyle = "black";
    snakeCtx.moveTo(x, 0);
    snakeCtx.lineTo(x, 600);
    snakeCtx.stroke();
  }

  for (let y = 20; y < 600; y += 20) {
    snakeCtx.beginPath();
    snakeCtx.fillStyle = "black";
    snakeCtx.moveTo(0, y);
    snakeCtx.lineTo(600, y);
    snakeCtx.stroke();
  }
}

function drawSnake(snakeCtx, snake) {
  for (let i = 0; i < snake.length; i++) {
  snakeCtx.beginPath();
  snakeCtx.fillStyle = "black";
  snakeCtx.fillRect(snake[i].posX, snake[i].posY, 20, 20);
  snakeCtx.stroke();
  }
}

drawGrid(snakeCtx);
drawSnake(snakeCtx, snake);

document.addEventListener("keydown", function (event) {
  let newDirection;

  if (event.code === "ArrowUp" && actualDirection !== direction.down) {
    newDirection = direction.up;
  } else if (event.code === "ArrowDown" && actualDirection !== direction.up) {
    newDirection = direction.down;
  } else if (event.code === "ArrowLeft" && actualDirection !== direction.right) {
    newDirection = direction.left;
  } else if (event.code === "ArrowRight" && actualDirection !== direction.left) {
    newDirection = direction.right;
  } else {
    return;
  }

  actualDirection = newDirection;
  moveSnake(actualDirection, snake);
  snakeCtx.clearRect(0, 0, 600, 600);
  drawGrid(snakeCtx);
  drawSnake(snakeCtx, snake);
});
