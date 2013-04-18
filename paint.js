(function(){
    var canvas = document.getElementById('canvas'),
        body = document.getElementsByTagName('body'),
        canvasContext = canvas.getContext('2d'),
        strokeColor = '#000000',
        strokeWeight = 1,
        mouseMoveHandler = function(evt) {
            evt.preventDefault();
            canvasContext.lineTo(evt.clientX - 8, evt.clientY - 8);
            canvasContext.stroke();
        };
    var mouseUpHandler = function(evt) {
        console.log(evt);
        evt.preventDefault();
        canvasContext.lineTo(evt.clientX - 8, evt.clientY - 8);
        canvasContext.stroke();
        window.removeEventListener('mousemove', mouseMoveHandler);
    }
    console.log(body[0]);
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
        canvasContext.moveTo(evt.clientX - 8, evt.clientY - 8);
        window.addEventListener('mousemove', mouseMoveHandler);
        canvas.addEventListener('mouseup', mouseUpHandler);
        
    });
    
    console.log(canvasContext);
})();