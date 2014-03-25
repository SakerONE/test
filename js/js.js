document.addEventListener("DOMContentLoaded", function(){
	"use strict";

	var data = [
		{
			value: 50,
			color: "red"
		},
		{
			value: 50,
			color: "blue"
		}
	],
	element = document.getElementsByClassName("pie-slider")[0],
	pieSlider = new PieSlider(element, data);

	element.addEventListener("click", function(event){
		console.log(event);
	});



/*	var x = 100, y = 100;

	document.addEventListener("click", function(event){
		var x2 = event.pageX, y2 = event.pageY,
			angle = Math.atan2(x2 - x, y - y2) * 180 / Math.PI;

		if(angle < 0){
			angle += 360;
		}

		console.log(angle);
	});
*/

/*	var angles = [-350, 190],
		canvas = document.getElementsByTagName("canvas")[0],
		context = canvas.getContext("2d"),
		radius = canvas.width / 2;

	context.fillStyle = "blue";
	context.lineWidth = 10;
	context.strokeStyle = "white";

	context.beginPath();
	context.moveTo(radius, radius);
	context.arc(radius, radius, radius + 6, convertAngle(350), convertAngle(190));
	context.lineTo(radius, radius);
	context.fill();
	context.stroke();

	context.fillStyle = "red";


	context.beginPath();
	context.moveTo(radius, radius);
	context.arc(radius, radius, radius + 6, convertAngle(190), convertAngle(350));
	context.lineTo(radius, radius);
	context.fill();
	context.stroke();

	context.fillStyle = "red";

	context.beginPath();
	context.moveTo(radius, radius);
	context.arc(radius, radius, radius + 6, convertAngle(190), convertAngle(350));
	context.lineTo(radius, radius);
	context.fill();
	context.stroke();


	function convertAngle(angle){
		return (angle - 90) * Math.PI / 180;
	}*/
});