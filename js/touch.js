(function(){
	'use strict';
	var isTouch = window.hasOwnProperty('ontouchstart'), events, customEvents = {},
		target, startTime, startX, startY, endX, endY;

	function stopBubbling(event){
		event.cancelBubble = true;
		setTimeout(function(){
			event.cancelBubble = false;
		}, 0);
	}

	function getOriginalEvent(event){
		return isTouch ? event.changedTouches[0] : event;
	}

	function convertEvent(event){
		if(!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)){
			event.preventDefault();
		}
		return getOriginalEvent(event);
	}

	function initTouchEvent(event){
		startTime = Date.now();
		target = event.target;
		startX = event.pageX;
		startY = event.pageY;
	}

	function getFinalPosition(event){
		endX = event.pageX;
		endY = event.pageY;
	}

	function dispatchCompletedEvent(){
		var timeDiff = Date.now() - startTime,
			diffX = startX - endX,
			diffY = startY - endY;
		if(Math.abs(diffX) < 5 && Math.abs(diffY) < 5){
			target.dispatchEvent(customEvents[timeDiff < 300 ? 'tap' : 'hold']);
		}else if(timeDiff < 300){
			if(Math.abs(diffX) >= Math.abs(diffY)){
				target.dispatchEvent(customEvents[diffX > 0 ? 'swiperight' : 'swipeleft']);
			}else{
				target.dispatchEvent(customEvents[diffY > 0 ? 'swipedown' : 'swipeup']);
			}
		}
	}

	if(isTouch){
		events = {start: 'touchstart', move: 'touchmove', end: 'touchend'};
	}else{
		events = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
	}
	['tap', 'hold', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'].forEach(function(eventName){
		customEvents[eventName] = document.createEvent('UIEvents');
		customEvents[eventName].initEvent(eventName, true, true);
	});
	document.addEventListener(events.start, function(event){
		event = convertEvent(event);
		initTouchEvent(event);
		getFinalPosition(event);
	});
	document.addEventListener(events.move, function(event){
		event = convertEvent(event);
		getFinalPosition(event);
	});
	document.addEventListener(events.end, dispatchCompletedEvent);

	window.touch = {
		events: events,
		isTouch: isTouch,
		getOriginalEvent: getOriginalEvent,
		stop: stopBubbling
	};
})();