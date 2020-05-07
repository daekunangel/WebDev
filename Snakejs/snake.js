var canvas, ctx;
//so the js canvas shows up on the html canvas
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
// EventListener can hear an event being called later in code this is for the controls
  document.addEventListener("keydown", keyDownEvent);

  // setting the speed of the snake
  var x = 10;
  setInterval(draw, 1000 / x);
};


// making canvas
var gridSize = (tileSize = 20); // 20 x 20 = 400
var nextX = (nextY = 0);

// making the snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// making food for the snake 
var foodX = (foodY = 15);

// draw snake in next position 
function draw() {
 
  snakeX += nextX;
  snakeY += nextY;

  // placing snake in canvas 
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }

  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  //snake bite food?
  if (snakeX == foodX && snakeY == foodY) {
    tailSize++;

    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
  }

  //color background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // color snake
  ctx.fillStyle = "green";
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    //when snake bites it's tail?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }

  // paint food
  ctx.fillStyle = "purple";
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

// key input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0; 
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}

