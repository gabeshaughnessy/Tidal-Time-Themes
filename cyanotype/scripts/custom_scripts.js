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
 
  jQuery('.page').click(function(e){
	  if (isSmall == true){
		  var mouseX = e.pageX;
		  var mouseY = e.pageY;
		   
		    jQuery(this).css({'transform': 'scale(.75)'}).animate({
		        left: function(){
		        return (mouseX + "px ")},
		        top: function(){
		        return (mouseY + "px ")}
		      }, 4000, function() {
		       // Animation complete.
		      });
		      isSmall = !isSmall;
		 e.preventDefault();
	    }
    });
    

  jQuery('.page').click(function(){
  
    jQuery(this).css({'transform': 'scale(.75)'}).animate({
        left: '0',
        top: '0'
      }, 2000, function() {
       // Animation complete.
      });
    
    });
  
  });

//Tidal Times from Weather Underground: http://www.wunderground.com/weather/api/d/documentation.html

//Weather underground API key : cde80ff6abe8da06
//Project name: tidaltime

//Format : http://api.wunderground.com/api/KEY/FEATURE/[FEATURE…]/q/QUERY.FORMAT
//example call - http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/q/CA/San_Francisco.json

jQuery(document).ready(function($) {
	jQuery.ajax({

		url: "http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/astronomy/q/CA/San_Francisco.json",
		dataType: "jsonp",
		success: function(parsed_json) {
		
		weatherUnderground = parsed_json;
		getOrbits();
		console.log("raw tide json object: ", parsed_json);
		
		var current_tide_height = parsed_json.rawtide.rawTideObs[0].height;
		console.log("current tide height in meters: ", current_tide_height);
		/*url: "http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/q/CA/San_Francisco.json",
		dataType: "jsonp",
		success: function(parsed_json) {
		console.log("raw tide json object: ", parsed_json);
		var current_tide_height = parsed_json.rawtide.rawTideObs[0].height;
		console.log("current tide height in feet: ", current_tide_height);*/

			/*var location = parsed_json['location']['city'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			alert("Current temperature in "+location+" is: " + temp_f);*/
		}
	});
	
	// Modal Popovers
	
	// First we need to find all the menu items that we want to make modals (class="modal_btn")
	var modal_id;

	
	$('.menu .modal_btn a').click(function(e){
	
	var modal_link = $(this).attr('href');
		jQuery.ajax({
			url: modal_link,
			success: function(modal) {
			$('#modal article').replaceWith(modal);
			}
		});
		$('#modal').modal();
			e.preventDefault();
			console.log("modal_link: " + modal_link)
			
	}
	);
});



