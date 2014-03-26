document.addEventListener("DOMContentLoaded", function(){
	"use strict";

	var data = [
		{
			value: 50,
			color: "green",
			label: "blaasdf blaas<br><output>N</output>",
			smallValue: 20
		},
		{
			value: 50,
			color: "blue",
			label: "N",
			smallValue: 10
		}
	],
	element = document.getElementsByClassName("pie-slider")[0],
	pieSlider = new PieSlider(element, data);

/*	var values = [50, 100, 100],
		angles = [0], i, len = values.length - 1;

	for(i = 0; i < len; i++){

	}*/


/*	var angles = [-350, 190],
		canvas = document.getElementsByTagName("canvas")[0],
		context = canvas.getContext("2d"),
		radius = canvas.width / 2;

	context.fillStyle = "blue";

	context.beginPath();
	context.moveTo(radius, radius);
	context.arc(radius, radius, radius, convertAngle(0), convertAngle(-0.0000000000000000001));
	context.lineTo(radius, radius);
	context.fill();



	function convertAngle(angle){
		return (angle - 90) * Math.PI / 180;
	}
*/});