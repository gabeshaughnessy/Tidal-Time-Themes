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
var midnight = (24 - sunset)/2 + sunset;
var highNoon = (sunset - sunrise)/2 + sunrise;

console.log("current time: ", currentTime, " sunrise: ", sunrise," high noon: ", highNoon, " sunset: ", sunset," midnight: ", midnight); 

// calculatedSunAngle = 360/(moon 100 percent full )-180;
// (moon 0 percent full) = sunAngle 