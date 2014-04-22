document.addEventListener("DOMContentLoaded", function(){
	"use strict";

	var canvas = document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d');

	context.scale(1, 0.1);

	context.fillRect(0, 0, 250, 250);

	// context.clearRect(-250, -250, 250, 250);
});
