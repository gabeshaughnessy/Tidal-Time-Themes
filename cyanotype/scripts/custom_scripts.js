var isSmall = true;
jQuery(document).ready(function($){
$('.close_page').click(function(){
//console.log($(this).parent('.page'));
 
  $(this).parent('.page').css({'transform': 'scale(.1)'}).animate({
      left: '0',
      top: '0'
    }, 2000, function() {
     // Animation complete.
    });
  return false;
  });
 
  $('.page').click(function(e){
	  if (isSmall == true){
		  var mouseX = e.pageX;
		  var mouseY = e.pageY;
		   
		    $(this).css({'transform': 'scale(.75)'}).animate({
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
    
    
  //Move the sun and moon into position 
  var pos = new Object();
  pos = CalculateAngles();//get the angles of everything and load them into an object
  //console.log('sunLongitude: ' + pos.SunLongitude);
  var sunRotation = Number(pos.SunLongitude);
  //console.log("sun rotation: " + sunRotation);
  var sunLabelRotation = Number(pos.SunLongitude)+45;
  //console.log("sun label rotation: " + sunLabelRotation);
  console.log('moonLongitude: ' + pos.MoonLon);
  var moonRotation =Number(pos.MoonLon);
  console.log("moon rotation: " + moonRotation);
  var moonLabelRotation = moonRotation*-1;
  console.log("moon label rotation: " + moonLabelRotation);
  $('#sun-ring').css({'transform': 'rotate(' + sunRotation + 'deg)'}); //need to offset the degrees
  $('#sun-ring .orbital_label').css({'transform': 'rotate(' + sunLabelRotation + 'deg)'});
  $('#moon-ring').css({'transform': 'rotate(' +moonRotation + 'deg)'}); //need to offset the degrees
  $('#moon-ring .orbital_label').css({'transform': 'rotate(' + moonLabelRotation + 'deg)'});
});

//Tidal Times from Weather Underground: http://www.wunderground.com/weather/api/d/documentation.html

//Weather underground API key : cde80ff6abe8da06
//Project name: tidaltime

//Format : http://api.wunderground.com/api/KEY/FEATURE/[FEATURE…]/q/QUERY.FORMAT
//example call - http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/q/CA/San_Francisco.json

jQuery(document).ready(function($) {
	$.ajax({
		url: "http://api.wunderground.com/api/cde80ff6abe8da06/rawtide/tide/q/CA/San_Francisco.json",
		dataType: "jsonp",
		success: function(parsed_json) {
		console.log("raw tide json object: ", parsed_json);
		
		var current_tide_height = parsed_json.rawtide.rawTideObs[0].height;
		console.log("current tide height in meters: ", current_tide_height);
			/*var location = parsed_json['location']['city'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			alert("Current temperature in "+location+" is: " + temp_f);*/
		}
	});
});
