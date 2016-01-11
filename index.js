var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Emit new message to Client
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', {
      message: msg,
      username: socket.username
    });
  });

//store username when Client emits new user
socket.on('add user', function (username) {
  socket.username = username;
    });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
