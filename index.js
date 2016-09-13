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

var message_state = 0;
var message_list = [
                     [ // 0
                       "System booting...",
                       "Preparing Launcher module...",
                       "Spinning up Cinematic Artificial Intelligence..."
                     ],
                     [ //1
                       "Priming physical launcher interface..."
                     ],
                     [ // 2
                       "Hello, Jason. Brad",
                       "Please initiate Security Protocol 814"
                     ],
                     [ // 3
                       "No, Jason. Turn it the other way",
                     ],
                     [ // 4
                       "Better.",
                       "Please arm system:",
                     ],
                     [ // 5
                       "System armed...",
                       "Ready for launch",
                       "Initiate countdown:"
                     ]
];

var state_triggers = [
                       '0000:0',
                       '0000:1',
                       '1100:2',
                       '1100:3',
                       '1110:4',
                       '1111:5'
];

function check_trigger() {
  
}

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
