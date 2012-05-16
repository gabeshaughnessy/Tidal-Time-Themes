//Define a Bird Class of objects
//
//Each html canvas is a new bird


window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();
var bird;
function animateBird(bird, index, i, birdLeft, rando, growing){


var jQueryBird = "#"+bird;


    canvas = document.getElementById(bird);
    ctx = canvas.getContext("2d");
var birdOffsetY =  jQuery(jQueryBird).data('offsety');
var birdOffsetX =  jQuery(jQueryBird).data('offsetx');
    // update
 
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.beginPath();
   //The Left Wing
    ctx.moveTo(2, i+3); //moveTo(startX, startY);
	    //The middle of the bird
	    ctx.bezierCurveTo(canvas.width/2-canvas.width/15,canvas.height/2+canvas.width/15,canvas.width/3,canvas.height/2,canvas.width/2-canvas.width/15,canvas.height); //bezierCurveTo(controlPoint1x,controlPoint1y,controlPoint2x, controlPoint2y,endPointX,endPointY); 
	//The Right Wing
	ctx.bezierCurveTo(canvas.width/2+canvas.width/15,canvas.height/2+canvas.width/15,canvas.width/3,canvas.height/2,canvas.width-canvas.width/5,i+canvas.width/10);
	
	 ctx.lineWidth = 1;
	 ctx.strokeStyle = 'rgb(220,220,220)';
	 ctx.stroke();
	
	 speed[index] =  jQuery(jQueryBird).data('speed');
	 //console.log(index, speed[index]);
	jQuery(jQueryBird).css({"top": i, "left": birdLeft-birdOffsetX*rando });
	 
	 if(growing == true){
	 jQuery(jQueryBird).css({"top": i/2+birdOffsetY*3*rando, "left": birdLeft-birdOffsetX*3*rando });
	birdLeft += speed[index];
	
	 i += speed[index];
	 	 }
	 
	 else {
	 
	 jQuery(jQueryBird).css({"top": i/2+birdOffsetY*3*rando, "left": birdLeft-birdOffsetX*3*rando });
	birdLeft += speed[index];
	 i-= speed[index];
	 
	 }
	 //console.log("document: ", jQuery(document).width(), " birdLeft: ", birdLeft);
	 
	 if(birdLeft == jQuery(document).width()){
	 birdLeft = 0;
	 }
	 if (i >= canvas.width || i >= canvas.height) {
	 	growing = false
	 }
	 else if(i <= 0) {
	 	growing = true;
	 }
	//console.log("i: ",i," Growing: ",growing);
	 ctx.fillStyle = 'rgb(255,255,255)';
	 //ctx.fillRect(i,i,10,10);
    // request new frame
    jQuery(jQueryBird).next('.factoid').css({"top": i/2+birdOffsetY*3*rando-100, "left": birdLeft-birdOffsetX*3*rando })
    
    requestAnimFrame(function(){
        animateBird(bird, index, i, birdLeft, rando, growing);
    });
}

//Global Variables
//var growing = true;
var clickSpot = new Object();
var canvas;
var speed = new Array();
var ctx;// canvas context, for drawing methods



jQuery(document).ready(function(){
//var canvas = document.getElementById("bird"	);
// Check the element is in the DOM and the browser supports canvas
//if(canvas.getContext) {
// Initaliase a 2-dimensional drawing context
// var ctx = canvas.getContext('2d');

//Canvas commands go here
jQuery('.factoid.bird').hide();
jQuery('.bird-canvas').click(function(e){
	jQuery('.factoid.bird').hide();
	jQuery(this).next('.factoid').show('fast');
	e.preventDefault();
});


//stuff to animate to the browsers best frame rate

animateBird("bird1",0, 1, 0, 10*Math.random()); //animateBird(bird, index, i, birdLeft)

animateBird("bird2",1, 1, 3, 10*Math.random(), true);
animateBird("bird3",2, 1, 2, 2*Math.random(), true);
animateBird("bird4",3, 1, 1, 5*Math.random(), true);
animateBird("bird5",4, 1, 0, 100*Math.random(), true);
animateBird("bird6",5, 1, 2.2, 50*Math.random(), true);

});