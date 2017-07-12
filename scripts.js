var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;
var playerOneScore = 0;
var playerTwoScore = 0;
var paddleOneY = 250;
var paddleTwoY = 250;
var paddleTwoSpeed = 5;
var showingWinScreen = false;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_PADDING = 15;
const WINNING_SCORE = 3;

function calculateMousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function handleMouseClick(e) {
  if (showingWinScreen) {
    playerOneScore = 0;
    playerTwoScore = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', function(e) {
    var mousePos = calculateMousePosition(e);
    paddleOneY = mousePos.y - (PADDLE_HEIGHT/2);
  });
}

function computerMovement() {
  var paddleTwoYCenter = paddleTwoY + (PADDLE_HEIGHT/2);
  if (paddleTwoYCenter < ballY - (PADDLE_HEIGHT/3)) {
    paddleTwoY += paddleTwoSpeed;
  } else if (paddleTwoYCenter > ballY + (PADDLE_HEIGHT/3)) {
    paddleTwoY -= paddleTwoSpeed;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < PADDLE_PADDING) {
    if (ballY > paddleOneY && ballY < paddleOneY+PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      var deltaY = ballY - (paddleOneY + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      playerTwoScore++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddleTwoY && ballY < paddleTwoY+PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      var deltaY = ballY - (paddleTwoY + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      playerOneScore++;
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY *= -1;
  }
  if (ballY > canvas.height) {
    ballSpeedY *= -1;
  }
}

function drawNet() {
  for (var i =0; i<canvas.height; i+= 40) {
    colorRect(canvas.width/2-1, i, 2, 20, 'white');
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width,canvas.height, 'black');
  if (showingWinScreen) {
    if (playerOneScore >= WINNING_SCORE) {
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('Player One Wins', 350, 200);
    } else {
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('Player Two Wins', 350, 200);
    }
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('click to continue', 350, 500);
    return;
  }
  colorRect(PADDLE_PADDING, paddleOneY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  colorRect(canvas.width-PADDLE_THICKNESS-PADDLE_PADDING, paddleTwoY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  drawNet();
  colorCircle(ballX, ballY, 10, 'white');

  canvasContext.fillText(playerOneScore, 100, 100);
  canvasContext.fillText(playerTwoScore, canvas.width-100, 100);

}

function ballReset() {
  if (playerOneScore >= WINNING_SCORE || playerTwoScore >= WINNING_SCORE) {
    showingWinScreen = true;
  }
  ballSpeedX *= -1;
  ballSpeedY = 5;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
