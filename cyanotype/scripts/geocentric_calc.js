<!-----------------------------------------------------------------------------

//=============================================================================
// global variables
//=============================================================================

var bName = navigator.appName;
var bVer  = parseInt(navigator.appVersion);
var browser;
if( bName == "Netscape" )
    browser = "Netscape";
else if( bName == "Microsoft Internet Explorer" )
    browser = "IE";
else
    browser = "other";

var month = new Array("January","February","March","April","May","June","July",
                      "August","September","October","November","December");
var monthdays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" );

var now = new Date();
var current_year = now.getYear();
if( current_year < 2000 ) current_year += 1900;


//=============================================================================
// utilities
//=============================================================================

//-----------------------------------------------------------------------------
// disable all "on error" alert messages
//-----------------------------------------------------------------------------
function stopError() {
	return true;
}
window.onerror = stopError;

//-----------------------------------------------------------------------------
// current system date and time
//-----------------------------------------------------------------------------
function TimeStamp() {
    var today = new Date();
    var year = today.getYear();
    if( year < 1000 ) {
        year += 1900;
        if( year < 1990 ) year += 100;  //Netscape 3 and IE 4.7 return 0 instead of 100 for dates > 2000
    }
    var month = today.getMonth();
    var day   = today.getDate();
    var hour  = today.getHours();
    var mins  = today.getMinutes();
    var secs  = today.getSeconds();
    if( day  < 10 ) day  = "0" + day;
    if( hour < 10 ) hour = "0" + hour;
    if( mins < 10 ) mins = "0" + mins;
    if( secs < 10 ) secs = "0" + secs;
    return month + "/" + day + "/" + year + "  " + hour + ":" + mins + ":" + secs;
}

//-----------------------------------------------------------------------------
// document's modified date and time
//-----------------------------------------------------------------------------
function ModifiedDate() {
	updated = new Date(document.lastModified);
	Month   = month[updated.getMonth()];
	Day     = updated.getDate();
	Year    = updated.getYear();
	Hour    = updated.getHours();
	Min     = updated.getMinutes();
    if( Year < 1000 ) {
        Year += 1900;
        if( Year < 1990 ) Year += 100;  //Netscape 3 and IE 4.7 return 0 instead of 100 for dates > 2000
    }
	if( Hour < 10 )  Hour = "0" + Hour;
	if( Min  < 10 )  Min  = "0" + Min;
	return "modified " + Month + " " + Day +  ", " + Year 
           + " at " + Hour + ":" + Min;
}

//-----------------------------------------------------------------------------
// status bar messages
//-----------------------------------------------------------------------------
function message( msg )   { window.status = msg; }
function remove_message() { window.status = "";  }

//-----------------------------------------------------------------------------
// change the fg and/or bg color of a *positioned* div or span
//
// N4 only (bug in IE4)
//-----------------------------------------------------------------------------
function hilight( ObjId, fgcolor, bgcolor ) {
	if( document && document.layers ) {		//does not work for stupid IE4 if 'position' is not specified inline!
		div = GetObject(ObjId);
		if(document.layers) {
			div.fgColor = fgcolor;
			div.bgColor = bgcolor;
		} else if(document.all) {
			div.foregroundColor = fgcolor;
			div.backgroundColor = bgcolor;
		}
	}
}


//=============================================================================
// windows
//=============================================================================

var satellite = null;
var satellite_url = null;

//-----------------------------------------------------------------------------
// create a popup window to show an image
//-----------------------------------------------------------------------------
function ImageWindow( image_url, w, h ) {
	//tell the ImageWindow.php script whether or not the url is external
    args  = arguments;
    nargs = arguments.length;
	var external = 0;
    for( i=0; i < nargs; ++i ) {
        if( args[i] == "external" ) external = 1;
    }
	//make room for chrome
    var dw = 17;
    var dh = 17;
    if( browser == "IE" ) {
        dw = 33;
        dh = 30;
		if( satellite == null ) {
			dw -= 12;
			dh -= 4;
		}
    }
	var opener_url = window.location;
	var request    = "/ImageWindow.php?url=" + image_url + "&referer="+opener_url 
					 + "&w=" + w + "&h=" + h + "&external=" + external;

	//if the popup window is already defined and hasn't been closed via the
	//close() method yet, resize it for the new contents; otherwise, (re)open 
	//the popup window in the center of the screen
    var ww = w + dw;
    var hh = h + dh;
	if( !window.satellite || satellite.closed ) {
		var Swidth  = screen.availWidth;
		var Sheight = screen.availHeight;
		var left    = (Swidth-ww)*0.5;
		var top     = (Sheight-hh)*0.5;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
	    topleft = ",left=" + left + ",top=" + top;
	
		//finally, open the popup window
		str = "width=" + ww + ",height=" + hh + topleft + 
		      ",location=0,resizable=1,menubar=0,toolbar=0,status=0,scrollbars=0,directories=0";
		satellite = window.open( request, 'satwin', str );
    } else if( image_url != satellite_url ) {
		if( browser == "IE" ) {
			satellite.resizeTo(ww,hh+dh);
		} else {
			satellite.resizeTo(ww+0.8*dw,hh+3*dh);
		}
		satellite.location.href = request;
	}
    if( satellite.focus ) satellite.focus();
	satellite_url = image_url;
}

//-----------------------------------------------------------------------------
// create a general purpose satellite window
//
// valid "extra" args: "doscroll", "showloc", "noresize", "showmenu", 
//					   "showstatus", "showtools"
//-----------------------------------------------------------------------------
function makeWindow( url, w, h )
{
	//window dressing
    loc     = ",location=0";
    resz    = ",resizable=1";
    menub   = ",menubar=0";
    toolb   = ",toolbar=0";
    stat    = ",status=0";
	scrollb = ",scrollbars=0";
    args    = arguments;
    nargs   = arguments.length;
    for( i=0; i < nargs; ++i ) {
        if( args[i] == "showloc" )    loc     = ",location=1";
        if( args[i] == "noresize" )   resz    = ",resizable=0";
        if( args[i] == "showmenu" )   menub   = ",menubar=1";
        if( args[i] == "showtools" )  toolb   = ",toolbar=1";
        if( args[i] == "showstatus" ) stat    = ",status=1";
        if( args[i] == "doscroll" )   scrollb = ",scrollbars=1";
    }
	
	//make room for chrome
    var dw = 17;
    var dh = 17;
    if( browser == "IE" ) {
        dw = 33;
        dh = 30;
		if( satellite == null && scrollb == ",scrollbars=0" ) {
			dw -= 12;
			dh -= 4;
		}
    }

	//if the popup window is already defined and hasn't been closed via the
	//close() method yet, resize it for the new contents; otherwise, (re)open 
	//the popup window in the center of the screen
    var ww = w + dw;
    var hh = h + dh;
	if( !window.satellite || satellite.closed ) {
		var Swidth  = screen.availWidth;
		var Sheight = screen.availHeight;
		var left    = (Swidth-ww)*0.5;
		var top     = (Sheight-hh)*0.5;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
	    topleft = ",left=" + left + ",top=" + top;
	
		//finally, open the popup window
	    satellite = window.open( url, 'satwin', 'width=' + ww + ',height=' + hh +
								 resz + toolb + loc + stat + menub + topleft 
								 + scrollb + ',directories=0' );
    } else if( url != satellite_url ) {
		if( browser == "IE" ) {
			if( scrollb == ",scrollbars=0" ) {
				satellite.resizeTo(ww,hh+dh);
			} else {
				satellite.resizeTo(ww+0.5*dw,hh+1.1*dh);
			}
		} else {
			satellite.resizeTo(ww+0.8*dw,hh+2*dh);
		}
		satellite.location.href = url;
	}
    if( satellite.focus ) satellite.focus();
	satellite_url = url;
}

//-----------------------------------------------------------------------------
//close the satellite window
//-----------------------------------------------------------------------------
function CloseWindow() {
    if( satellite != null && satellite.open ) {
        satellite.close();
        satellite = null;
    }
}

//-----------------------------------------------------------------------------
// a popup window
// optional 5th argument: title
//-----------------------------------------------------------------------------
var popupwin = null;
function popup( evt, w, h, msg )
{
    var X, Y;
	if( bVer > 3 && evt ) {
        if( browser == "IE" ) {
    		X = evt.screenX + 10;
    		Y = evt.screenY + 10;
        } else { // Netscape coordinates must be adjusted for scrolling
    		X = evt.screenX - pageXOffset + 10;
    		Y = evt.screenY - pageYOffset + 10;
        }
	} else {
		X = 200;
		Y = 200;
	}
    var title = "";
    if( nargs > 4 ) title = args[4];
    popupwin = open( "", "popup_window",
                     "width=" + (w+16) + ",height=" + (h+16) + ",toolbar=0,resizable=1,"
                     + "scrollbars=1,location=0,status=0,directories=0,menubar=0,"
                     + "top=" + Y + ",left=" + X );
    popupwin.document.open();
    popupwin.document.write( "<html><head>" );
    popupwin.document.write( "<title>" + title + "</title>" );
	if( browser == "Netscape" ) {
        popupwin.document.write( "<link rel=\"stylesheet\" href=\"http://arnold.usno.navy.mil/murison/css/default.css\" type=\"text/css\">" );
    }
    popupwin.document.write("</head><body>");
    popupwin.document.write( msg );
//	popupwin.document.write( "<p style='font: 12px/12px verdana, arial, sans-serif;'><center><form><input OnClick='self.close()' type='button' "
//						   + "value='Close this window'></form></center></p>" );
	popupwin.document.write( "</body></html>" );
	popupwin.document.close();
	if( popupwin.focus ) popupwin.focus();
}
function close_popup() {
    if( popupwin != null && popupwin.open ) popupwin.close();
}

//-----------------------------------------------------------------------------
// a popup window for abstracts and paper references
//
// usage:
//<a href="javascript:void(0)" 
// onMouseOver="popref(event,Gaffey);"
// onMouseOut="close_popref();">Gaffey et al.</a>
//-----------------------------------------------------------------------------
var refwin = null;
function popref( evt, n )
{
    var X, Y;
	if( bVer > 3 && evt ) {
        if( browser == "IE" ) {
    		X = evt.screenX + 10;
    		Y = evt.screenY + 10;
        } else { // Netscape coordinates must be adjusted for scrolling
    		X = evt.screenX - pageXOffset + 10;
    		Y = evt.screenY - pageYOffset + 10;
        }
	} else {
		X = 200;
		Y = 200;
	}
	if( abstracts[n] ) {
		w = 550;
		h = 300;
	} else {
		w = 300;
		h = 150;
	}
	refwin = open( "", "reference",
                    "width=" + w + ",height=" + h + ",toolbar=0,resizable=1,"
                    + "scrollbars=1,location=0,status=0,directories=0,menubar=0,"
                    + "top=" + Y + ",left=" + X );
	refwin.document.open();
	refwin.document.write( "<html><head><title>Reference</title>" );
	if( browser == "Netscape" ) {
        refwin.document.write( "<link rel=\"stylesheet\" href=\"http://arnold.usno.navy.mil/murison/css/default.css\" type=\"text/css\">" );
    }
	refwin.document.write("</head><body>");
	refwin.document.write( refs[n] );
	if( absURL[n] ) {
		refwin.document.write( "<br><a href=\"" + absURL[n] + "\" target=\"_new\">ADS: abstract</a>" );
	}
	if( paperURL[n] ) {
		refwin.document.write( "&nbsp;&nbsp;&nbsp;");
		refwin.document.write( "<a href=\"" + paperURL[n] + "\" target=\"_new\">ADS: full article</a>" );
	}
	if( abstracts[n] ) {
		refwin.document.write( "<center><h3>Abstract</h3></center><p>" );
		refwin.document.write( abstracts[n] );
	}
//	refwin.document.write( "<br><center><form><input onClick='self.close()' type='button' "
//						   + "value='Close this window'></form></center>" );
	refwin.document.write( "</body></html>" );
	refwin.document.close();
	if( refwin.focus ) refwin.focus();
}
function close_popref() {
    if( refwin != null && refwin.open ) refwin.close();
}


//=============================================================================
// stuff NOT written by Murison
//=============================================================================

//-----------------------------------------------------------------------------
// look up a word on FreeDictionary.com by double-clicking it in the browser
//-----------------------------------------------------------------------------
//don't forget to add <body ondblclick="FreeDictionary()">
//function FreeDictionary() {
//	if (navigator.appName == "Netscape") {
//		t = document.getSelection();
//		opennewdictwin(t);
//	} else {
//		t = document.selection.createRange();
//		if(document.selection.type == 'Text' && t.text != '') {
//			document.selection.empty();
//			opennewdictwin(t.text);
//		}
//	}
//}

//this function modified by Murison:
function opennewdictwin(text) {
	while (text.substr(text.length-1,1)==' ') 
		text=text.substr(0,text.length-1)
	while (text.substr(0,1)==' ') 
		text=text.substr(1)
	if(text > '') {
		var w = 700;
		var h = 700;
		var Swidth  = screen.availWidth;
		var Sheight = screen.availHeight;
		var left    = (Swidth-w)*0.5;
		var top     = (Sheight-h)*0.5;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
	    topleft = "left=" + left + ",top=" + top + ",width=" + w + ",height=" + h;
		var newwin = window.open( 'http://www2.thefreedictionary.com/'+escape(text), 
								  'dictionary', 
								  topleft+'resizable=1,menubar=0,scrollbars=1,status=1,'
										 +'titlebar=1,toolbar=0,location=0,directories=0,'
										 +'personalbar=0');
	}
}
//status='double-click any word - get its instant definition in the dictionary.'
document.ondblclick=FreeDictionary //works for IE only. For NS add <body ondblclick="dictionary()">


//-----------------------------------------------------------------------------
// tooltips
//
// usage: 
//  ddrivetip('TEXT TO DISPLAY', 'OPTIONAL BACKGROUND COLOR', OPTIONAL TIP WIDTH)
// example:
// 	<a href="#" onMouseover="ddrivetip('blah blah')"; onMouseout="hideddrivetip()">
//	 blah blah</a>
//-----------------------------------------------------------------------------
/***********************************************
* Cool DHTML tooltip script- � Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

var offsetxpoint=-60 //Customize x offset of tooltip
var offsetypoint=20 //Customize y offset of tooltip
var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
if (ie||ns6)
	var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thecolor, thewidth){
	if (ns6||ie){
	if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
	if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
		tipobj.innerHTML=thetext
		enabletip=true
		return false
	}
}

function positiontip(e){
	if (enabletip){
		var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
		var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
		//Find out how close the mouse is to the corner of the window
		var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
		var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20
		
		var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000
		
		//if the horizontal distance isn't enough to accomodate the width of the context menu
		if (rightedge<tipobj.offsetWidth)
			//move the horizontal position of the menu to the left by it's width
			tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px"
		else if (curX<leftedge)
			tipobj.style.left="5px"
		else
			//position the horizontal position of the menu where the mouse is positioned
			tipobj.style.left=curX+offsetxpoint+"px"
		
		//same concept with the vertical position
		if (bottomedge<tipobj.offsetHeight)
			tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px"
		else
			tipobj.style.top=curY+offsetypoint+"px"
		tipobj.style.visibility="visible"
	}
}

function hideddrivetip(){
	if (ns6||ie){
		enabletip=false
		tipobj.style.visibility="hidden"
		tipobj.style.left="-1000px"
		tipobj.style.backgroundColor=''
		tipobj.style.width=''
	}
}

document.onmousemove=positiontip


//-----------------------------------------------------------------------------
// image rollover helper function
// (originally written by Charity Kahn, formerly of C|NET, called ChangeImage())
//-----------------------------------------------------------------------------
function imageswap() {
    if(document.images) {
        for( var i=0; i < imageswap.arguments.length; i += 2 ) {
            document[imageswap.arguments[i]].src = eval(imageswap.arguments[i+1]+".src");
        }
    }
}

//-----------------------------------------------------------------------------
// return the object reference of a *positioned* html object, identified by id='ObjId', 
// even if ObjId is nested (works with both N4 and IE4)
//
// this function (but renamed) is from Wired's WebMonkey code archive
// http://www.hotwired.com/webmonkey/javascript/code_library/wm_ckin_full/?category=dhtml
//-----------------------------------------------------------------------------
function GetObject( ObjId ) { 
/*
WM_checkIn()
Takes the ID of a positioned HTML element and returns an object reference.

Source: Webmonkey Code Library
(http://www.hotwired.com/webmonkey/javascript/code_library/)

Author: Taylor
Author Email: taylor@wired.com
Author URL: http://www.taylor.org/

Usage: GetObject('id')
*/
  // First we initialize all the variables.
  var theObj,ss,sr,i,j,WM_layers=new Array();
  // This chunk handles the IE portion of the checkIn code.
  if (document && document.all) {
    // This checks to see if the inline style declaration has 
    // a position property associated with it. If not, it will 
    // scan the global stylesheets for the ID.
    if((document.all[ObjId].style.position != 'absolute') && (document.all[ObjId].style.position != 'relative')){
      // This little loop I'm very proud of, because it's kinda 
      // slick and I wrote it all myself. It loops through all 
      // global stylesheets and all the rules in each stylesheet, 
      // tests for the selected ID, then returns that as the object.
      for (ss=0 ; ss < document.styleSheets.length; ss++) {
        for (sr=0 ; sr < document.styleSheets(ss).rules.length; sr++) { 
          if (document.styleSheets(ss).rules(sr).selectorText == '#' + ObjId) {
            theObj = document.styleSheets(ss).rules(sr).style;
            break;
          }
        }
      }
    } else {
      // This works the same as in the light version, so you can 
      // use inline styles.
      theObj = document.all[ObjId].style;
    }
  } else if(document && document.layers) {
    // Now we're in Netscapeland. The main problem here 
    // is finding the object in a maze of hierarchy.
    // I wish I could say that I'm proud of this code, 
    // because it's really slick. Unfortunately, I ripped 
    // it off from Macromedia Dreamweaver's drag layer code 
    // (with permission, of course :-) 
    // Dreamweaver/Configuration/Behaviors/Actions/Drag Layer.htm 
    // It works wonderfully and solves the problem.
    WM_layers = new Array();
    with (document) {
      for (i=0; i<layers.length; i++) WM_layers[i]=layers[i]; {
        for (i=0; i<WM_layers.length; i++) {
          if (WM_layers[i].document && WM_layers[i].document.layers) {
            for (j=0; j<WM_layers[i].document.layers.length; j++) {
              WM_layers[WM_layers.length] = WM_layers[i].document.layers[j];
            }
            if(WM_layers[i].name == ObjId){
              // So if the code matches the name of the layer, 
              // return the reference. 
              theObj = WM_layers[i];
            }
          }
        }
      }
    }
  }
  return theObj;
}

//-----------------------------------------------------------------------------
// a hack to deal with the Netscape resizing bug, whereby CSS positioning croaks on resize
//
// this function (but renamed) is from Wired's WebMonkey code archive
// http://www.hotwired.com/webmonkey/javascript/code_library/wm_ns_css_rs_fx/?category=layout_css
//-----------------------------------------------------------------------------
function netscapeCSSFix() {
  // This part was inspired by Matthew_Baird@wayfarer.com
  // It gets around another unfortunate bug whereby Netscape 
  // fires a resize event when the scrollbars pop up. This 
  // checks to make sure that the window's available size 
  // has actually changed.
  if (document.WM.netscapeCssFix.initWindowWidth != window.innerWidth || document.WM.netscapeCssFix.initWindowHeight != window.innerHeight) {
    document.location = document.location;
  }
}

function netscapeCSSFixCheckIn() {
  // This function checks to make sure the version of Netscape 
  // in use contains the bug; if so, it records the window's 
  // width and height and sets all resize events to be handled 
  // by the netscapeCSSFix() function.
  if ((navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4)) {
    if (typeof document.WM == 'undefined'){
      document.WM = new Object;
    }
    if (typeof document.WM.scaleFont == 'undefined') {
      document.WM.netscapeCssFix = new Object;
      document.WM.netscapeCssFix.initWindowWidth = window.innerWidth;
      document.WM.netscapeCssFix.initWindowHeight = window.innerHeight;
    }
    window.onresize = netscapeCSSFix;
  }
}

//netscapeCSSFixCheckIn()

//---------------------------------------------------------------------------->
