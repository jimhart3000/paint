(function(){
    var canvas = document.getElementById('canvas'),
        body = document.getElementsByTagName('body'),
        canvasContext = canvas.getContext('2d'),
        strokeColor = '#000000',
        strokeWeight = 1,
        mouseMoveHandler = function(evt) {
            evt.preventDefault();
            socket.emit('line', {location: [evt.layerX, evt.layerY]});
            canvasContext.lineTo(evt.layerX - 8, evt.layerY - 8);
            canvasContext.stroke();
        };
    var mouseUpHandler = function(evt) {
        console.log(evt);
        evt.preventDefault();
        canvasContext.lineTo(evt.layerX - 8, evt.layerY - 8);
        canvasContext.stroke();
        window.removeEventListener('mousemove', mouseMoveHandler);
    };
    var colorListener = function(evt) {
        var newColor =  window.getComputedStyle(this).getPropertyValue('background-color');
        console.log(newColor);
        canvasContext.strokeStyle = newColor;
    };
    console.log(body[0]);
    var colorButtons = document.getElementsByClassName('colorButton');
    var clearButton = document.getElementById('clear');
    for (var i = 0; i < colorButtons.length; i++) {
        console.log(colorButtons[i].id);
        colorButtons[i].addEventListener('click', colorListener);
    }
    clearButton.addEventListener('click', function(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    });
    canvas.addEventListener('mousedown', function(evt){
        evt.preventDefault();
        socket.emit('line', {location: [evt.layerX, evt.layerY]});
        canvasContext.beginPath();
        console.log(evt);
        canvasContext.moveTo(evt.layerX - 8, evt.layerY - 8);
        window.addEventListener('mousemove', mouseMoveHandler);
        canvas.addEventListener('mouseup', mouseUpHandler);
    });
})();