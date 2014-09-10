var flag = false;

toggle.addEventListener("click", function(){
	front.classList.toggle('animate');
});

front.addEventListener("webkitTransitionEnd", function(event){
	// article.classList.toggle('animate');
	setTimeout(function(){
		if(flag){
			front.style.left = '0px';
		}else{
			front.style.left = '100px';
		}
		flag = !flag;
	}, 100);
}, true);

/*setInterval(function(){
	front.classList.toggle('animate');
}, 2000);*/