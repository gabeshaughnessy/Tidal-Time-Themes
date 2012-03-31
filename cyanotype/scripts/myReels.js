function pad(number, length) {//helper function to create numbers like 001, 0005, etc...
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function build_sequence(img_prefix, img_suffix, zero_padding, img_count){//helper padding to build the image arrays
var img_seq = new Array();
for (i=1;i<img_count;i+=1){
img_seq[i-1] = [img_prefix + pad(i, zero_padding) + img_suffix];
console.log(img_seq[i]);
}
return img_seq;
}

jQuery(window).load(function () {
var images = build_sequence("alt_frame_sequence", ".png", 4, 44);//build the image sequence array
jQuery('#sculpture').reel({//this is the function from http://jquery.vostrel.cz/reel
images: images, //the array of images
frames: images.length, //number of images in the array
indicator: 0, //the size of the visual indicator
revolution:800, //distance the mouse moves for one revolution
path: "/wp-content/themes/cyanotype/images/500px/",//prepended before the file name in the images array
speed: 0, //animation spped in revolutions per second
brake: .1, //braking force when thrown
clickfree: true, //Instead of clicking and dragging, binds to mouse enter and exit events
}); //jquery reel plugin http://jquery.vostrel.cz/reel
	
jQuery('#sculpture').disableTextSelect();
//Make the images draggable by activating these options
jQuery('.reel').touch({
    animate: false,
    sticky: false,
    dragx: false,
    dragy: true,
    rotate: false,
    resort: false,
    scale: false,
});
jQuery('#sculpture').bind('touchmove', function(e) {
   e.preventDefault();
}, false);//disable the default touch to scroll the page
});