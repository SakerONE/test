var flag = false,
	event;

toggle.addEventListener("click", function(){
	front.classList.toggle('animate');
});

front.addEventListener("webkitTransitionEnd", function(event){
	// webkitRequestAnimationFrame(function(){
		// alert(1);
	if(event.propertyName === '-webkit-transform'){
		article.classList.toggle('animate');
		// alert(1);
	}
	// });


	// alert(webkitRequestAnimationFrame);
	// setTimeout(function(){
	// alert(event.propertyName);
/*		if(flag){
			front.style.left = '0px';
		}else{
			front.style.left = '100px';
		}
		flag = !flag;
*/	// front.dispatchEvent(new CustomEvent('blabla', { bubbles: true, cancelable: false }));
	// }, 100);
	// console.log('end');
}, true);


// alert(window.hasOwnProperty('transitionend'));

/*setInterval(function(){
	front.classList.toggle('animate');
}, 2000);*/