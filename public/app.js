//globals
var username;

// Socket events
//Emit user msg to server
var socket = io();
$('form').submit(function(){
 socket.emit('chat message', $('#m').val());
 $('#m').val('');
 return false;
});
//when server emits msg, append to html body
socket.on('chat message', function(data){
 var nickName = $('<span/>').text(data.username + ": ");
 var msg = $('<span>').text(data.message);
 if(data.message) {
 var messageBody = $('<li>').append(nickName, msg)
 $('#messages').append(messageBody);
 }
});

//Create a nickname and emit to Server
$('#addUser').on('click', function() {
  username = $('#nickNameInput').val();
  socket.emit('add user', username);
  $("#nickNameBox").css('visibility','hidden');
});
