/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 * https://gist.github.com/838785
 */
if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 60 );

        };

    } )();
}

var canvas = document.getElementById('planetary-monitor');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
};

var i = 0;
var j = 0;
var k = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    circle('lime', 20);

    // rotate + move along x
    ctx.rotate(i / 100);
    ctx.translate(100, 0);

    // draw planet
    circle('lime', 10);

    ctx.translate(-100, 0);
    ctx.rotate(0-(i/100));

    ctx.rotate(j/75);
    ctx.translate(75,0);
    circle('lime',7);

    ctx.translate(-75, 0);
    ctx.rotate(0-(j/75));

    ctx.rotate(k/50);
    ctx.translate(50,0);
    circle('lime',5);

    ctx.restore();

    i++;
    j++;
    k++;

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
