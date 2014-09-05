var flipped = false;

setTimeout(function(){
	front.classList.add('animate');
}, 500);

button.addEventListener("click", function(){
	flip.classList.toggle('flipped');
	front.classList.toggle('animate');
	back.classList.toggle('animate');
});