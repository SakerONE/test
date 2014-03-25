(function(){
	'use strict';
	function RadialSlider(element, options){
		this.element = element;
		this.active = false;
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		this.prevAngle = 0;
		this.startAngle = 0;
		this.max = 360;
		this.onchange = function(){};

		this.element.addEventListener(touchy.events.start, this);
		this.element.addEventListener(touchy.events.move, this);
		this.element.addEventListener(touchy.events.end, this);

		['swipeleft', 'swiperight', 'swipeup', 'swipedown'].forEach(function(swipeEvent){
			this.element.addEventListener(swipeEvent, touchy.stop);
		}, this);
	}

	RadialSlider.prototype.handleEvent = function(event){
		switch(event.type){
			case touchy.events.start:
				this.active = true;
				if(!this.x){
					this.refresh();
				}
				this.startAngle = this.getAngle(event) - this.angle;
				break;
			case touchy.events.move:
				if(this.active){
					this.move(event);
					this.onchange();
				}
				break;
			case touchy.events.end:
				this.active = false;
				break;
		}
	};

	RadialSlider.prototype.refresh = function(){
		var rect = this.element.getBoundingClientRect();

		this.x = rect.left + rect.width / 2;
		this.y = rect.top + rect.height / 2;
	};

	RadialSlider.prototype.fullCircleAngle = function(angle){
		return (angle + 360) % 360;
	};

	RadialSlider.prototype.move = function(event){
		this.angle = this.fullCircleAngle(this.getAngle(event) - this.startAngle);

		if(this.angle > 270 && this.prevAngle < 90){
			this.angle = 0;
		}else if(this.angle > 0 && this.angle < 90 && this.prevAngle > 270){
			this.angle = 360;
		}else{
			this.prevAngle = this.angle;
		}
		if(this.angle > this.max){
			this.angle = this.max;
		}
		this.setAngle();
	};

	RadialSlider.prototype.getAngle = function(event){
		var offsetX, offsetY, angle;

		offsetX = event.pageX - this.x;
		offsetY = event.pageY - this.y;

		angle = -Math.atan2(offsetX, offsetY) * 180 / Math.PI;

		if(angle < 0){
			angle += 360;
		}

		return angle;
	};

	RadialSlider.prototype.setAngle = function(){
		this.element.style.webkitTransform = 'translate3d(0, 0, 0) rotate3d(0, 0, 1, ' + this.angle + 'deg)';
	};

	RadialSlider.prototype.setTo = function(angle){
		this.angle = angle;
		this.setAngle();
		this.onchange();
	};

	window.RadialSlider = RadialSlider;
})();