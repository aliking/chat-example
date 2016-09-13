(function loop() {
  setTimeout(function () {
    var random = Math.floor(Math.random()*24);
		el = $("#boxes div").eq(random);
    console.log(el.css('background-color'));
    if(el.css('background-color') == 'rgb(0, 128, 0)'){
    	el.css('background-color', "rgb(0, 200, 0)");
    } else {
    	el.css('background-color', "rgb(0, 128, 0)");
    }
    loop();
  }, 1000);
}());
