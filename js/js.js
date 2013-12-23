window.addEventListener("load", function(){
	"use strict";

	var canvas	 =	 window.eraser,
		context	 =	 canvas.getContext("2d"),
		image	 =	 new Image(),
		pattern, isDrawing;

	image.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';

	image.addEventListener('load', function(){
		pattern = context.createPattern(image, 'repeat');
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.lineWidth = 100;

		// function canvasInit(){
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.globalCompositeOperation = 'none';
			
			context.fillStyle = pattern;
			context.rect(0, 0, canvas.width, canvas.height);
			context.fill();

			context.globalCompositeOperation = 'destination-out';
			
			['start', 'move', 'end'].forEach(function(eventName){
				canvas.addEventListener(touch.events[eventName], drawController, false);
			});	

	});

	
	// }

	function drawController(event){
		var type = event.type;
		event.stopPropagation();
		event.preventDefault();
		if(touch.isTouch){
			event = event.changedTouches[0];
		}
		switch(type){
			case touch.events.start:
				isDrawing = true;
				context.beginPath();
				context.moveTo(event.pageX * 2, event.pageY * 2);
				break;
			case touch.events.move:
				if(isDrawing){
					context.lineTo(event.pageX * 2, event.pageY * 2);
					context.stroke();
				}
				break;
			case touch.events.end:
				isDrawing = false;
				context.closePath();
				break;
		}
	}


});

