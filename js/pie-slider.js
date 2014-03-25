(function(){
	"use strict";

	function PieSlider(element, data){
		this.element = element;
		this.data = data;
		this.length = data.length;
		this.values = data.map(function(sector){
			return sector.value;
		});

		console.log(this.values);

		this.init();
	}

	PieSlider.prototype.init = function(){
		this.width = this.element.offsetWidth,
		this.height = this.element.offsetHeight;

		this.appendCanvas();
		this.appendHandlers();
		this.set();
	};

	PieSlider.prototype.set = function(){

	};

	PieSlider.prototype.appendCanvas = function(){
		var canvas = document.createElement("canvas");

		canvas.width = this.width * 2;
		canvas.height = this.height * 2;

		this.context = canvas.getContext("2d");

		this.element.appendChild(canvas);
	};

	PieSlider.prototype.appendHandlers = function(){
		var counter = this.length,
			fragment = document.createDocumentFragment();

		while(counter--){
			fragment.appendChild(createHandler());
		}

		this.element.appendChild(fragment);
	};

	function createHandler(){
		var handler = document.createElement("div");
		handler.className = "ps-handler";

		return handler;
	}

	window.PieSlider = PieSlider;
})();