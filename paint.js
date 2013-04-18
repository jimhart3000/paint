(function(){
    var canvas = document.getElementById('canvas'),
        canvasContext = canvas.getContext('2d'),
        strokeColor = '#000000',
        strokeWeight = 1,
        mouseMoveHandler = function(evt) {
            evt.preventDefault();
            canvasContext.lineTo(evt.offsetX, evt.offsetY);
            canvasContext.stroke();
        };
    var colorButtons = document.getElementsByClassName('colorButton');
    var clearButton = document.getElementById('clear');
    for (var i = 0; i < colorButtons.length; i++) {
        console.log(colorButtons[i].id);
        colorButtons[i].addEventListener('click', function(evt){
            var newColor =  window.getComputedStyle(this).getPropertyValue('background-color');
            console.log(newColor);
            canvasContext.strokeStyle = newColor;
        });
    }
    clearButton.addEventListener('click', function(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    });
    canvas.addEventListener('mousedown', function(evt){
        evt.preventDefault();
        canvasContext.beginPath();
        console.log(evt);
        canvasContext.moveTo(evt.offsetX, evt.offsetY);
        canvas.addEventListener('mousemove', mouseMoveHandler);
    });
    canvas.addEventListener('mouseup', function(evt){
        evt.preventDefault();
        canvasContext.lineTo(evt.offsetX, evt.offsetY);
        canvasContext.stroke();
        canvas.removeEventListener('mousemove', mouseMoveHandler);
    });
    console.log(canvasContext);
})();