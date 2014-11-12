var image = document.getElementById('iona')
var iw = image.width;
var ih = image.height;
var border_left = iw/3.8;
var border_right = iw - border_left;
var border_top = ih/4.2;
var border_bottom = ih - border_top;

document.addEventListener('DOMContentLoaded', function () {
	if (typeof (MozActivity) == 'undefined') {
		document.getElementById('folder').style.visibility="hidden";
	}
function pickImage() {

	try {
// Use the 'pick' activity to acquire an image
var pick = new MozActivity({
name: "pick",
data: {
type: ["image/jpeg", "image/png", "image/jpg"]
}
});
pick.onsuccess = function () {
// Pick the returned image blob and upload to imgur.com
  var img = document.getElementById('iona');
  img.src = window.URL.createObjectURL(this.result.blob);
  currentImage = this.result.blob;
};

	} catch(e) {
// no mozactivity		
	}
}

	document.getElementById('folder').onclick = pickImage;


	
function getBorders() {
	iw = document.getElementById('iona').width;
	ih = document.getElementById('iona').height;
	border_left = iw/3.8;
	border_right = iw - border_left;
	border_top = ih/4;
  border_bottom = ih - border_top;
	scaleImage();
}
	function scaleImage() {
	var img = document.getElementById('iona');
	if (screen.width > screen.height) {
	img.height=screen.height;
	img.width=screen.width;
	} else {
		img.height=screen.width;
	img.width=screen.height;
	}
	console.log("imag resized")


	}
	scaleImage();

// on scale
window.onresize = function(event) {
	getBorders();
		scaleImage();


}


	function touchScreen(x,y, isMoving) {
		console.log("letouch ",x,y);


	getBorders();
	if (y < border_top) {
		// nothing
	} else if (y > border_bottom) {
		// nothing
	} else if (x < border_left) {
		// nothing
	} else if (x > border_right) {
		// nothing
	} else {
		const colors = "ABCDE";
		var wiz = (border_right - border_left) / 5;
		var xpos = x-border_left;
		var colorpos = 0|(xpos / wiz);

		var key = colors[colorpos];
		console.log(key);
		if (isMoving) {
			if (key == playingKey)
				return;
		}
		var audio = document.getElementById(key);
		try {
  		audio.pause();
	  	audio.currentTime = 0;
		} catch(e) {
			/* do nothing */
		}
		audio.play();
		playingKey = key;
		console.log(key);
	}
}
	function onTouchMove(e) {
			var x = e.changedTouches[0].pageX;
	    var y = e.changedTouches[0].pageY;
		touchScreen (x, y, true);
		
	}
	function onTouchStart(e) {
	// ONTOUCHSTART
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY;
	touchScreen(x,y);
}
	function onClick(e) {
		touchScreen (e.clientX, e.clientY);
	}
	
	// hello world!
	document.getElementById('A').play();
	var iona = document.getElementById('iona');
	if ('ontouchstart' in window) {
	  iona.addEventListener("touchstart",onTouchStart, false);
	  iona.addEventListener("touchmove",onTouchMove, false);
	} else {
		iona.addEventListener("click", onClick, false);
	}
  });

