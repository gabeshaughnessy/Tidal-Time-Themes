var isSmall = true;
var weatherUnderground = new Object();;

function getOrbits(){
//Move the sun and moon into position 
var pos = new Object();
  pos = CalculateAngles();//get the angles of everything and load them into an object
  //console.log('sunLongitude: ' + pos.SunLongitude);
  
  //  (suset - sunrise)/2 + sunrise = high noon, or 0 degrees
  // (24 - sunset)/2 + sunset = midnight or 180 degrees
  //  sunset = 270 degrees
  // sunrise = 90 degrees
  
  // currentTime = 14
  // sunset = 19
  // sunrise = 6
  // highNoon = 12.5
  // midnight = 21.5
  
  // (360/24)*(currentTime - highNoon) = sunangle
  
  var currentTime = weatherUnderground.moon_phase.current_time.hour;
  var sunset = weatherUnderground.moon_phase.sunset.hour;
  var sunrise = weatherUnderground.moon_phase.sunrise.hour;
  var moonPercent = weatherUnderground.moon_phase.percentIlluminated;
  var midnight = (24 - sunset)/2 + sunset;
  var highNoon = (sunset - sunrise)/2 + sunrise;
  var sunAngle;
  console.log("current time: ", currentTime, " sunrise: ", sunrise," high noon: ", highNoon, " sunset: ", sunset," midnight: ", midnight, " moonpercent: ", moonPercent); 
  sunAngle = (360/24)*(currentTime - highNoon) - 45;
  var sunRotation = Number(sunAngle);
  console.log("sun rotation: " + sunRotation);
  var sunLabelRotation = Number(sunAngle) - 165;
  
  moonAngle = 360/(moonPercent);
  console.log('moon angle: ', moonAngle);
  moonPosition = sunAngle + 180 - moonAngle;
  var moonLabelRotation = moonAngle*-1;
  console.log("sun label rotation: " + sunLabelRotation);
  jQuery('#sun-ring').css({'transform': 'rotate(' + sunRotation + 'deg)'}); //need to offset the degrees
  jQuery('#sun-ring .orbital_label').css({'transform': 'rotate(' + sunLabelRotation + 'deg)'});
  jQuery('#moon-ring').css({'transform': 'rotate(' +moonAngle + 'deg)'}); //need to offset the degrees
  jQuery('#moon-ring .orbital_label').css({'transform': 'rotate(' + moonLabelRotation + 'deg)'});
  //old
 /* console.log(pos);
  var sunRotation = Number(pos.SunLongitude);
  console.log("sun rotation: " + sunRotation);
  var sunLabelRotation = Number(pos.SunLongitude)+45;
  console.log("sun label rotation: " + sunLabelRotation);
  console.log('moonLongitude: ' + pos.MoonLon);
  var moonRotation =Number(pos.MoonLon);
  console.log("moon rotation: " + moonRotation);
  var moonLabelRotation = moonRotation*-1;
  console.log("moon label rotation: " + moonLabelRotation);
  jQuery('#sun-ring').css({'transform': 'rotate(' + sunRotation + 'deg)'}); //need to offset the degrees
  jQuery('#sun-ring .orbital_label').css({'transform': 'rotate(' + sunLabelRotation + 'deg)'});
  jQuery('#moon-ring').css({'transform': 'rotate(' +moonRotation + 'deg)'}); //need to offset the degrees
  jQuery('#moon-ring .orbital_label').css({'transform': 'rotate(' + moonLabelRotation + 'deg)'});
  */
  };

jQuery(document).ready(function(jQuery){
/*jQuery('.close_page').click(function(){
//console.log(jQuery(this).parent('.page'));
 
  jQuery(this).parent('.page').css({'transform': 'scale(.5)'}).animate({
      left: '0',
      top: '0'
    }, 2000, function() {
     // Animation complete.
    });
  return false;
  });*/
 

    

    
  });
  
  //Floating Factoids
var windowWidth;
var windowHeight;
var sculptureHeight;

function bubbleUp(target){

jQuery(target).animate({'bottom':windowHeight - sculptureHeight + 150}, 50000*Math.random(), function(){
jQuery(target).css({"bottom":-20, "left":(windowWidth-300)*Math.random()});
bubbleUp(target);
});
}
function floatingFactoids(){
//get each factoid in the document
var factoids = jQuery('#factoids').find('.factoid');


factoids.each( function(i){
var rando = new Array();
rando[i] = Math.random();

jQuery(this).css({
"textIndent":"-9999%",
"borderWidth":"1px",
"borderRadius":10,
"width":10,
"height":10
});
		jQuery(this).click(function(e){
		jQuery('.factoid').css({
		"textIndent":"-9999%",
		"borderWidth":"1px",
		"width":"10px",
		"height":"10px"
		});
		
			jQuery(this).css({
			"textIndent":0,
			"borderWidth":0,
			"width":"300px",
			"height":"auto",
			"backgroundColor":"transparent"
			});
			e.preventDefault();
		});
//for each factoid, increment its position from the bottom based on a random speed


jQuery(this).css({"left":(windowWidth-300)*Math.random()});
bubbleUp(this);

//if the position from the bottom is more than the depth of the water, send it back under
});


//start over again

} 

//Tidal Times from Weather Underground: http://www.wunderground.com/weather/api/d/documentation.html

//Weather underground API key : cde80ff6abe8da06
//Project name: tidaltime

//Format : http://api.wunderground.com/api/KEY/FEATURE/[FEATURE…]/q/QUERY.FORMAT
//example call - http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/q/CA/San_Francisco.json

jQuery(document).ready(function($) {
windowWidth= jQuery(window).width();
windowHeight = jQuery(window).height();

var element = $("#sculpture");
var width = element.width();
var height = element.height();
var position = element.position();

var bottomLeftX = position.left;
var bottomLeftY = position.top + height;

var bottomRightX = position.left + width;
var bottomRightY = position.top + height;

sculptureHeight = bottomLeftY;

console.log('elementHeight: ', height, ' bottomCorner: ', bottomLeftY);
console.log('calculated water level: ',windowHeight - sculptureHeight + 150);


//need to calculate position of the water level from the bottom
		floatingFactoids();
	// Modal Popovers
	
	// First we need to find all the menu items that we want to make modals (class="modal_btn")
	var modal_id;

	var empty_modal = $('#modal').html();
	
	$('.menu .modal_btn a').click(function(e){

	$('#modal').empty().append(empty_modal);
	var modal_link = $(this).attr('href');
		jQuery.ajax({
			url: modal_link,
			success: function(modal) {
			$('#modal').empty().append(modal);
			}
		});
		$('#modal').modal();
			e.preventDefault();
			
			
	}
	);
	
	
});



