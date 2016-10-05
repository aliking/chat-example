var express = require('express');
var app = express();
var bodyParser     =        require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/components', express.static(__dirname + '/components'));

var switch_name = {'bk' : "Key Switch beta...",
                    'sk' : "Key Switch alpha...",
                    'rb' : "Big Red Button...",
                    'gb' : "Green Button...",};

var message_state = 0;
var switch_state = '0000';

var message_list = [
                     [ // 0
                       "System booting..."
                  //     "Preparing Launcher module...",
                  //     "Spinning up Cinematic Artificial Intelligence...",
                  //     "Priming physical launcher interface...",
                     ],
                     [ // 1

                  //     "Hello Jason, Brad.",
                       "Please initiate Security Protocol 814."
                     ],
                  //   [ // 2
                  //     "No, Jason.",
                  //     "Turn it the other way.",
                  //   ],
                     [ // 3
                  //     "Better.",
                       "Please arm system:"
                     ],
                     [ // 4
                       "System armed...",
                       "Ready for launch",
                       "Initiate countdown:"
                     ]
];

var state_triggers = [
                       '0000',
                       '0000',
                      // '1100',
                       '1100',
                       '1110',
                       '1111'
];

function check_trigger() {
  var nextState = message_state + 1;
  if(state_triggers[nextState] == switch_state){
    message_state += 1;
    console.log(message_list[message_state]);
    if(message_state  + 1 < (state_triggers.length) ){
      io.emit('console', message_list[message_state]);
    } else {
      io.emit('countdown');
    }
  }
  console.log(message_state);
}

function set_switch_state(switchy, state) {
  var swArr = switch_state.split('');
  var swIndex = {'bk' : 0,
                      'sk' : 1,
                      'rb' : 2,
                      'gb' : 3,};
  swArr[swIndex[switchy]] = state == 'on' ? 1 : 0;
  switch_state = swArr.join('');

  console.log(switch_state);
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/controlcenter', function(req, res){
  res.sendFile(__dirname + '/controlcenter.html');
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
  //io.emit('console', switch_name[switchy]);
  set_switch_state(switchy, state);
  check_trigger();

  res.send();
});

app.get('/msgstate/:state', function(req,res) {
  switch_state = req.params.state;

  check_trigger();
  res.send();
});

app.get('/booted', function(req,res) {
  check_trigger();
  res.send();
});

app.get('/reset', function(req,res) {
  message_state = 0;
  switch_state = '0000';
  io.emit('reload');
  res.send();
});

io.on('connection', function(socket){
  io.emit('console', message_list[message_state]);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
