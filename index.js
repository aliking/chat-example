var app = require('express')();
var bodyParser     =        require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/send/:msg', function(req,res){
  var msg = req.params.msg;
  io.emit('message',  msg );
  res.send('sent msg: ' + msg);
});

app.post('/state', function(req, res) {

  var data = req.body.data.split(":");
  var switchy = data[0];
  var state = data[1];

  console.log(switchy);
  console.log(state);
  res.send();
});

io.on('connection', function(socket){
  io.emit('message', 'ready...');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
