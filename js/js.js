function Parent(){
	this.name = "Adam";
}

Parent.prototype.say = function(){
	console.log(this.name);
};

var parent = new Parent();

function Child(){

}

Child.prototype = Object.create(Parent.prototype);

console.log(new Child());