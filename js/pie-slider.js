/*(function(){
	"use strict";

	var degToRad = Math.PI / 180, radToDeg = 180 / Math.PI,
		pctToDeg = 360 / 100, degToPct = 100 / 360;

	function PieSlider(element, data){
		this.element = element;
		this.data = data;
		this.length = data.length;
		this.values = data.map(function(sector){
			return sector.value;
		});

		this.init();
	}

	PieSlider.prototype.init = function(){
		var rect = this.element.getBoundingClientRect();

		this.center = {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};

		this.radius = rect.width / 2;

		this.width = rect.width,
		this.height = rect.height;

		this.appendCanvas();
		this.appendHandlers();
		this.appendLabels();
		this.set();
	};

	PieSlider.prototype.set = function(){
		this.angles = this.getAngles(this.values);
		this.handlers.forEach(function(handler, index){
			handler.setTo(this.angles[index]);
		}, this);
		this.setLimits();
		this.redraw();
	};

	PieSlider.prototype.setLimits = function(){
		this.handlers.forEach(function(handler, index){
			var prev = this.getNext(index - 1),
				next = this.getNext(index + 1);
			handler.from = this.handlers[prev].angle;
			handler.to = this.handlers[next].angle;
		}, this);
	};

	PieSlider.prototype.getAngles = function(values){
		var angles = [0], index = 0, len = values.length - 1, sum = 0;

		for(; index < len; index++){
			sum += values[index];
			angles.push(sum * pctToDeg);
		}

		return angles;
	};

	PieSlider.prototype.appendCanvas = function(){
		var canvas = document.createElement("canvas");

		canvas.width = this.width;
		canvas.height = this.height;

		this.context = canvas.getContext("2d");

		this.element.appendChild(canvas);
	};

	PieSlider.prototype.appendHandlers = function(){
		var index = 0, len = this.length,
			fragment = document.createDocumentFragment(),
			handler, handlers = [], that = this;

		for(; index < len; index++){
			handler = new Handler(index, this.center);

			handler.onchange = function(){
				that.angles[this.index] = this.angle;
				that.redraw();
			};

			handler.onfinalchange = function(){
				that.updateLimits(this.index, this.angle);
			};

			handlers.push(handler);
			fragment.appendChild(handler.element);
		}

		this.handlers = handlers;
		this.element.appendChild(fragment);
	};

	PieSlider.prototype.appendLabels = function(){
		var index = 0, len = this.length,
			fragment = document.createDocumentFragment(),
			label, output, labels = [], outputs = [];

		for(; index < len; index++){
			label = document.createElement("p");
			label.className = "ps-label ps-label" + (index + 1);

			output = document.createElement("output");
			output.className = "ps-output ps-output" + (index + 1);

			labels.push(label);
			outputs.push(output);

			label.appendChild(output);
			fragment.appendChild(label);
		}

		this.labels = labels;
		this.outputs = outputs;
		this.element.appendChild(fragment);
	};

	PieSlider.prototype.updateLimits = function(index, angle){
		var next = this.getNext(index + 1),
			prev = this.getNext(index - 1);

		this.handlers[next].from = angle;
		this.handlers[prev].to = angle;
	};

	PieSlider.prototype.getNext = function(index){
		return (index + this.length) % this.length;
	};

	PieSlider.prototype.redraw = function(){
		var angles = this.angles.slice();

		angles.push(angles[0]);

		this.updateValues(angles);
		this.updateLabels(angles);
		this.redrawCanvas(angles);
	};

	PieSlider.prototype.updateValues = function(angles){
		var index = 0, len = this.length;

		for(; index < len; index++){
			this.values[index] = getValue(angles[index], angles[index + 1]);
		}
	};

	PieSlider.prototype.updateLabels = function(angles){
		var index = 0, len = this.length, middle;

		for(; index < len; index++){
			if(this.values[index] < this.data[index].smallValue){
				this.labels[index].classList.add("small-value");
			}else{
				this.labels[index].classList.remove("small-value");
			}
			middle = getMiddle(angles[index], angles[index + 1]);
			setAngle(this.labels[index], middle);
			setAngle(this.outputs[index], -middle);
			this.outputs[index].innerHTML = this.data[index].label.replace("N", this.values[index]);
		}
	};

	PieSlider.prototype.redrawCanvas = function(angles){
		var index = 0, len = this.length;

		this.context.clearRect(0, 0, this.width, this.height);

		for(; index < len; index++){
			this.context.fillStyle = this.data[index].color;
			this.drawSector(angles[index], angles[index + 1]);
		}
	};

	PieSlider.prototype.drawSector = function(from, to){
		this.context.beginPath();
		this.context.moveTo(this.radius, this.radius);
		this.context.arc(this.radius, this.radius, this.radius, convertAngle(from), convertAngle(to));
		this.context.fill();
	};

	function convertAngle(angle){
		return (angle - 90) * degToRad;
	}

	function getValue(from, to){
		to = check(from, to);
		return Math.round((to - from) * degToPct);
	};

	function getMiddle(from, to){
		to = check(from, to);
		return from + Math.abs(from - to) / 2;
	}

	function check(from, to){
		if(to < from){
			to += 360;
		}
		return to;
	}

	function Handler(index, center){
		this.index = index;
		this.element = document.createElement("div");
		this.center = center;

		this.element.className = "ps-handler ps-handler-" + (index + 1);

		this.element.addEventListener(touch.events.start, this);
		document.addEventListener(touch.events.move, this);
		document.addEventListener(touch.events.end, this);
	}

	Handler.prototype.handleEvent = function(event){
		if(touch.isTouch && event.touches.length > 1){
			return;
		}
		switch(event.type){
			case touch.events.start:
				this.active = true;
				break;
			case touch.events.move:
				if(this.active){
					this.move(event);
				}
				break;
			case touch.events.end:
				if(this.active){
					this.active = false;
					this.onfinalchange();
				}
				break;
		}
	};

	Handler.prototype.move = function(event){
		var angle = this.getAngle(event);

		if(this.isInRange(angle) && this.limit(angle)){
			this.setTo(angle);
			this.onchange();
		}
	};

	Handler.prototype.limit = function(angle){
/*		var temp = angle;

		if(Math.abs(angle - this.from) > 180 && this.prev < (this.from + 90)){
			angle -= 360;
		}
		if(angle < this.from && this.prev < (this.from + 90)){
			return false;
		}

		this.prev = temp;*/
		return true;
	};

	Handler.prototype.isInRange = function(angle){
		var from = this.from + 0.0001,
			to = this.to - 0.0001;

		if(to < from){
			to += 360;
		}
		if(angle < from){
			angle += 360;
		}


		return angle >= from && angle <= to;
	};

	Handler.prototype.getAngle = function(event){
		var x = event.pageX, y = event.pageY,
			angle = Math.atan2(x - this.center.x, this.center.y - y) * radToDeg;

		if(angle < 0){
			angle += 360;
		}

		return angle;
	};

	Handler.prototype.setTo = function(angle){
		this.angle = angle;
		setAngle(this.element, this.angle);
	};

	function setAngle(element, angle){
		element.style.webkitTransform = 'rotate3d(0, 0, 1, ' + angle + 'deg)';
	}

	window.PieSlider = PieSlider;
})();*/
