function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

var rows = 5;
var cols = 4;
var doc = document;

var fragment = doc.createDocumentFragment();

for (i = 0; i < rows; i++) {
  var tr = doc.createElement("tr");

  for (j = 0; j < cols; j++) {
    var td = doc.createElement("td");
    var dv = doc.createElement("div");
    dv.innerHTML = randomString(3,'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    td.appendChild(dv);
    tr.appendChild(td);
  }
  fragment.appendChild(tr);
}

var table = doc.createElement("table");

table.appendChild(fragment);

doc.getElementById("boxes").appendChild(table);


(function loop() {
  setTimeout(function () {
    var random = Math.floor(Math.random()*rows*cols);
    el = $("#boxes div").eq(random);
    if(el.css('background-color') == 'rgb(0, 128, 0)'){
      el.css('background-color', "rgb(0, 200, 0)");
    } else {
      el.css('background-color', "rgb(0, 128, 0)");
    }
    loop();
  }, 1000);
}());
