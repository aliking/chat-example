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

var rect = canvas.parentNode.getBoundingClientRect();

canvas.width = 165;//rect.width - 10;
canvas.height = 165;//rect.width -10;
var w = canvas.width;
var h = canvas.height;

var fromPercent = function(percent) {
  var radius = w / 2;
  return percent  * radius / 100;
};

//settable
var sunRadius = fromPercent(20);
var earthRadius = fromPercent(10);
var earthOrbitRadius = fromPercent(80);
var earthOrbitSpeed = 100;

//calculated
var mercuryRadius = earthRadius * 0.394;
var mercuryOrbitRadius = earthOrbitRadius * 0.387;
var mercuryOrbitSpeed = earthOrbitSpeed / 1.607;

var venusRadius = earthRadius * 0.962;
var venusOrbitRadius = earthOrbitRadius * 0.723;
var venusOrbitSpeed = earthOrbitSpeed / 1.174;

var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
};

var mercuryCounter = 0;
var venusCounter = 0;
var earthCounter = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    circle('lime', sunRadius);

    // draw planets
    // rotate + move along x
    ctx.rotate(mercuryCounter / mercuryOrbitSpeed);
    ctx.translate(mercuryOrbitRadius, 0);

    //draw planet
    circle('lime', mercuryRadius);

    //move and rotate back
    ctx.translate(0 - mercuryOrbitRadius, 0);
    ctx.rotate(0-(mercuryCounter/mercuryOrbitSpeed));

    //venus
    ctx.rotate(venusCounter/venusOrbitSpeed);
    ctx.translate(venusOrbitRadius,0);
    circle('lime',venusRadius);

    ctx.translate(0 - venusOrbitRadius, 0);
    ctx.rotate(0-(venusCounter/venusOrbitSpeed));

    //earth
    ctx.rotate(earthCounter/earthOrbitSpeed);
    ctx.translate(earthOrbitRadius,0);
    circle('lime',earthRadius);

    ctx.restore();

    mercuryCounter++;
    venusCounter++;
    earthCounter++;

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
