var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  path = require('path');

app.listen(3000);

function handler (req, res) {
  var filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html';
  }
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }
  path.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          res.writeHead(500);
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });

}

io.sockets.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });
  socket.on('line', function (data) {
    console.log(data);
  });
});