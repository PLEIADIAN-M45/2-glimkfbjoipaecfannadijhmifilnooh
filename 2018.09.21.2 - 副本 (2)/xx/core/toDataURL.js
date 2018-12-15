var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var jsonObj = [{ x: 1, y: 2 }, { x: 3, x: 4 }];

// draw using your data, you implement this
context.beginPath();
context.moveTo(jsonObj[0].x, jsonObj[0].y);
context.moveTo(jsonObj[1].x, jsonObj[1].y);
context.closePath();
context.lineWidth = 5;
context.fillStyle = '#8ED6FF';
context.fill();
context.strokeStyle = '#0000ff';
context.stroke();

// save canvas image as data url (png format by default)
var dataURL = canvas.toDataURL();
alert(dataURL);