var winWidth = window.innerWidth;
	var fontSize = winWidth/750*100;
	var html = document.documentElement;
	html.style.fontSize = fontSize + "px";
	window.onresize = function(){
		var winWidth = window.innerWidth;
		var fontSize = winWidth/750*100;
		var html = document.documentElement;
		html.style.fontSize = fontSize + "px";
	}
require(['jquery'],function($){
	console.log(1);
})
