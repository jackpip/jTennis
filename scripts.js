window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var canvasContext = canvas.getContext('2d');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);  
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(100,200,50,25);
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(150,250,10,10);
}
