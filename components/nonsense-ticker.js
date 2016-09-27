function nonseArray() {
  var arr = [];
  var minLines = 3;
  var maxLines = 20;
  var lines = Math.floor(Math.random() * maxLines) + minLines;

  for(i=0; i<lines;i++) {
    var key = randomString(6,'qwertyuiopasdfghjklzxcvbnmmm1234567890-=~!@#$%^&*(QWERTYUIOPASDFGHJKLZXCVBNM{})');
    var val = randomString(3,'0123456789');
    var dots = 12;
    arr.push( key + Array(dots).join(".") + val);
  }
  return arr;
}

function tickNonsense(){
  $('#console2').vintageTxt({
    text: nonseArray(),
    textSpeed: 5,
    maxRows: 11,
    linePause: 2300,
    promptEnabled: false,
    'onFinishedTyping' : tickNonsense
  });
}
tickNonsense();
