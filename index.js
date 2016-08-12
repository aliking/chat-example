var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/send/:msg', function(req,res){
  var msg = req.params.msg;
  io.emit('message',  msg );
  res.send('sent msg: ' + msg);
});

app.post('/state', function(req, res) {
  console.log(req.params);
  res.send();
});

io.on('connection', function(socket){
  io.emit('message', 'ready...');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
