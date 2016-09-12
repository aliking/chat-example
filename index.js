var express = require('express');
var app = express();
var bodyParser     =        require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/components', express.static(__dirname + '/components'));

var switch_name = {'bk' : "Key Switch Number 2",
                    'sk' : "Key Switch Number 1",
                    'rb' : "Big Red Button",
                    'gb' : "Green Button",};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/send/:msg', function(req,res){
  var msg = req.params.msg;
  io.emit('console',  msg );
  res.send('sent msg: ' + msg);
});

app.post('/state', function(req, res) {
console.log(req.body);
  var data = req.body.data.split(":");
  var switchy = data[0];
  var state = data[1];


  io.emit('console', switch_name[switchy] + " was turned " + state);

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
